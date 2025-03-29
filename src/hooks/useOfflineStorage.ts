
import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

type StorageKey = string;
type StorageValue = any;
type StoragePriority = 'high' | 'medium' | 'low';
type ExpirationType = 'never' | 'session' | number; // never, session, or milliseconds

interface StorageOptions {
  expiration?: ExpirationType; // وقت انتهاء الصلاحية
  priority?: StoragePriority; // أولوية العنصر في التخزين
  compress?: boolean; // ما إذا كان يجب ضغط البيانات
  encrypt?: boolean; // ما إذا كان يجب تشفير البيانات (للبيانات الحساسة)
}

interface StorageItem {
  value: StorageValue;
  timestamp: number;
  expiration: ExpirationType;
  priority: StoragePriority;
  encrypted: boolean;
  compressed: boolean;
}

interface StorageStats {
  totalItems: number;
  totalSize: number;
  oldestItem: string | null;
  newestItem: string | null;
}

export type StorageMechanism = 'localStorage' | 'sessionStorage' | 'indexedDB';

/**
 * خطاف لإدارة التخزين المحلي للاستخدام في وضع عدم الاتصال
 * يوفر وظائف متقدمة للتخزين مع دعم انتهاء الصلاحية والأولويات والإحصائيات
 */
export function useOfflineStorage(
  namespace: string = 'app',
  mechanism: StorageMechanism = 'localStorage'
) {
  const { t } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  const [storageStats, setStorageStats] = useState<StorageStats>({
    totalItems: 0,
    totalSize: 0,
    oldestItem: null,
    newestItem: null,
  });

  // الحصول على آلية التخزين
  const getStorageMechanism = useCallback(() => {
    if (typeof window === 'undefined') return null;
    
    switch (mechanism) {
      case 'sessionStorage':
        return window.sessionStorage;
      case 'indexedDB':
        // استخدام localStorage كآلية احتياطية إذا لم يكن indexedDB متاحًا
        return window.localStorage;
      case 'localStorage':
      default:
        return window.localStorage;
    }
  }, [mechanism]);

  // الحصول على المفتاح الكامل بناءً على مساحة الاسم
  const getFullKey = (key: StorageKey) => `${namespace}:${key}`;

  // تخزين عنصر
  const setItem = useCallback((
    key: StorageKey,
    value: StorageValue,
    options: StorageOptions = {}
  ) => {
    try {
      const storage = getStorageMechanism();
      if (!storage) return false;

      const fullKey = getFullKey(key);
      const timestamp = Date.now();
      
      let processedValue = value;
      
      // معالجة للضغط إذا تم تمكينه
      const compressed = !!options.compress;
      if (compressed && typeof processedValue === 'string' && processedValue.length > 500) {
        // هنا يمكن تنفيذ خوارزمية ضغط أو استخدام مكتبة خارجية
        // processedValue = compress(processedValue);
      }
      
      // معالجة للتشفير إذا تم تمكينه
      const encrypted = !!options.encrypt;
      if (encrypted && typeof processedValue === 'string') {
        // هنا يمكن تنفيذ خوارزمية تشفير بسيطة أو استخدام مكتبة خارجية
        // processedValue = encrypt(processedValue);
      }

      const item: StorageItem = {
        value: processedValue,
        timestamp,
        expiration: options.expiration || 'never',
        priority: options.priority || 'medium',
        encrypted,
        compressed,
      };

      storage.setItem(fullKey, JSON.stringify(item));
      updateStats();
      
      return true;
    } catch (error) {
      console.error(`فشل تخزين العنصر (${key}):`, error);
      
      // التعامل مع خطأ امتلاء التخزين
      if (error instanceof DOMException && (
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      )) {
        // محاولة إجراء مساحة عن طريق إزالة العناصر ذات الأولوية المنخفضة أولاً
        cleanStorage('low');
        
        try {
          // المحاولة مرة أخرى بعد التنظيف
          const storage = getStorageMechanism();
          if (!storage) return false;
          
          const fullKey = getFullKey(key);
          storage.setItem(fullKey, JSON.stringify({
            value,
            timestamp: Date.now(),
            expiration: options.expiration || 'never',
            priority: options.priority || 'medium',
            encrypted: false,
            compressed: false,
          }));
          
          updateStats();
          return true;
        } catch (retryError) {
          // إذا فشلت المحاولة الثانية، أخبر المستخدم
          toast.error(t('storage.quotaExceeded', 'امتلأ التخزين المحلي. يرجى مسح بعض البيانات.'));
          return false;
        }
      }
      
      return false;
    }
  }, [getStorageMechanism, namespace, t]);

  // الحصول على عنصر
  const getItem = useCallback(<T = any>(
    key: StorageKey,
    defaultValue?: T
  ): T | null => {
    try {
      const storage = getStorageMechanism();
      if (!storage) return defaultValue || null;

      const fullKey = getFullKey(key);
      const data = storage.getItem(fullKey);
      
      if (!data) return defaultValue || null;
      
      const item: StorageItem = JSON.parse(data);
      
      // التحقق من انتهاء الصلاحية
      if (isExpired(item)) {
        storage.removeItem(fullKey);
        updateStats();
        return defaultValue || null;
      }
      
      // فك التشفير إذا تم تشفير البيانات
      let processedValue = item.value;
      if (item.encrypted) {
        // هنا يمكن تنفيذ فك التشفير
        // processedValue = decrypt(processedValue);
      }
      
      // فك الضغط إذا تم ضغط البيانات
      if (item.compressed) {
        // هنا يمكن تنفيذ فك الضغط
        // processedValue = decompress(processedValue);
      }
      
      return processedValue as T;
    } catch (error) {
      console.error(`فشل قراءة العنصر (${key}):`, error);
      return defaultValue || null;
    }
  }, [getStorageMechanism, namespace]);

  // حذف عنصر
  const removeItem = useCallback((key: StorageKey) => {
    try {
      const storage = getStorageMechanism();
      if (!storage) return false;

      const fullKey = getFullKey(key);
      storage.removeItem(fullKey);
      updateStats();
      
      return true;
    } catch (error) {
      console.error(`فشل حذف العنصر (${key}):`, error);
      return false;
    }
  }, [getStorageMechanism, namespace]);

  // مسح جميع العناصر في مساحة الاسم
  const clear = useCallback(() => {
    try {
      const storage = getStorageMechanism();
      if (!storage) return false;
      
      // حذف العناصر التي تبدأ بمساحة الاسم فقط
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && key.startsWith(`${namespace}:`)) {
          keysToRemove.push(key);
        }
      }
      
      keysToRemove.forEach(key => storage.removeItem(key));
      updateStats();
      
      return true;
    } catch (error) {
      console.error('فشل مسح التخزين:', error);
      return false;
    }
  }, [getStorageMechanism, namespace]);

  // التحقق مما إذا كان العنصر منتهي الصلاحية
  const isExpired = (item: StorageItem) => {
    if (!item.expiration || item.expiration === 'never') {
      return false;
    }
    
    if (item.expiration === 'session') {
      // تنتهي صلاحية العناصر المؤقتة للجلسة عند إعادة تحميل الصفحة
      return false;
    }
    
    // التحقق من انتهاء الصلاحية بناءً على الوقت
    const expirationTime = item.timestamp + (item.expiration as number);
    return Date.now() > expirationTime;
  };

  // تنظيف التخزين استنادًا إلى الأولوية المحددة
  const cleanStorage = useCallback((minPriority: StoragePriority = 'low') => {
    try {
      const storage = getStorageMechanism();
      if (!storage) return false;
      
      const priorityRank: Record<StoragePriority, number> = {
        high: 3,
        medium: 2,
        low: 1
      };
      
      const minPriorityRank = priorityRank[minPriority];
      const keysToRemove: string[] = [];
      
      // تجميع المفاتيح التي تحتاج إلى الإزالة
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key || !key.startsWith(`${namespace}:`)) continue;
        
        try {
          const data = storage.getItem(key);
          if (!data) continue;
          
          const item: StorageItem = JSON.parse(data);
          
          // حذف العناصر المنتهية الصلاحية
          if (isExpired(item)) {
            keysToRemove.push(key);
            continue;
          }
          
          // حذف العناصر التي تكون أولويتها أقل من أو تساوي الحد الأدنى
          if (priorityRank[item.priority] <= minPriorityRank) {
            keysToRemove.push(key);
          }
        } catch (error) {
          // إذا فشل تحليل البيانات، قم بإزالة المفتاح
          keysToRemove.push(key);
        }
      }
      
      // حذف المفاتيح المحددة
      keysToRemove.forEach(key => storage.removeItem(key));
      updateStats();
      
      return keysToRemove.length > 0;
    } catch (error) {
      console.error('فشل تنظيف التخزين:', error);
      return false;
    }
  }, [getStorageMechanism, namespace]);

  // تحديث إحصائيات التخزين
  const updateStats = useCallback(() => {
    try {
      const storage = getStorageMechanism();
      if (!storage) return;
      
      let totalSize = 0;
      let totalItems = 0;
      let oldestTimestamp = Infinity;
      let newestTimestamp = 0;
      let oldestKey: string | null = null;
      let newestKey: string | null = null;
      
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key || !key.startsWith(`${namespace}:`)) continue;
        
        try {
          const data = storage.getItem(key);
          if (!data) continue;
          
          totalSize += data.length * 2; // تقدير تقريبي لحجم السلسلة بالبايت (UTF-16)
          totalItems++;
          
          const item: StorageItem = JSON.parse(data);
          
          if (item.timestamp < oldestTimestamp) {
            oldestTimestamp = item.timestamp;
            oldestKey = key.replace(`${namespace}:`, '');
          }
          
          if (item.timestamp > newestTimestamp) {
            newestTimestamp = item.timestamp;
            newestKey = key.replace(`${namespace}:`, '');
          }
        } catch (error) {
          // تجاهل العناصر التي لا يمكن تحليلها
        }
      }
      
      setStorageStats({
        totalItems,
        totalSize,
        oldestItem: oldestKey,
        newestItem: newestKey
      });
    } catch (error) {
      console.error('فشل تحديث الإحصائيات:', error);
    }
  }, [getStorageMechanism, namespace]);

  // تحديث الإحصائيات عند التحميل وبشكل دوري
  useEffect(() => {
    // تهيئة التخزين عند التحميل
    if (!initialized) {
      updateStats();
      
      // تنظيف العناصر منتهية الصلاحية عند البدء
      try {
        const storage = getStorageMechanism();
        if (storage) {
          for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            if (!key || !key.startsWith(`${namespace}:`)) continue;
            
            try {
              const data = storage.getItem(key);
              if (!data) continue;
              
              const item: StorageItem = JSON.parse(data);
              if (isExpired(item)) {
                storage.removeItem(key);
              }
            } catch (error) {
              // تجاهل الأخطاء للعناصر الفردية
            }
          }
        }
      } catch (error) {
        console.error('فشل تنظيف العناصر منتهية الصلاحية:', error);
      }
      
      setInitialized(true);
    }
    
    // تحديث الإحصائيات بشكل دوري (كل دقيقة)
    const interval = setInterval(updateStats, 60000);
    
    return () => {
      clearInterval(interval);
    };
  }, [initialized, updateStats, getStorageMechanism, namespace]);

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    cleanStorage,
    storageStats,
    updateStats,
  };
}

// تصدير أنواع إضافية للاستخدام في أماكن أخرى
export type { StoragePriority, ExpirationType, StorageOptions, StorageStats };
