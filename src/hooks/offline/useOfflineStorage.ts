
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

interface StorageOptions {
  /** مدة صلاحية البيانات بالمللي ثانية */
  expiresIn?: number;
  /** حد أقصى للحجم بالبايت (التقريبي) */
  maxSize?: number;
  /** أولوية العنصر (أعلى = أعلى أهمية عند التنظيف) */
  priority?: number;
}

interface StoredItem<T> {
  data: T;
  timestamp: number;
  expiresAt?: number;
  size: number;
  priority: number;
}

interface StorageUsage {
  totalItems: number;
  totalSize: number;
  oldestItem: Date | null;
  newestItem: Date | null;
}

/**
 * خطاف لإدارة التخزين المحلي للبيانات في وضع عدم الاتصال
 * مع دعم الصلاحية والتنظيف التلقائي
 */
export function useOfflineStorage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [storageUsage, setStorageUsage] = useState<StorageUsage>({
    totalItems: 0,
    totalSize: 0,
    oldestItem: null,
    newestItem: null
  });

  // الحد الأقصى للتخزين - 5 ميجابايت
  const MAX_STORAGE = 5 * 1024 * 1024; // 5MB
  
  // تحديث إحصاءات الاستخدام
  const updateStorageUsage = useCallback(() => {
    try {
      // استرداد كل مفاتيح التخزين التي تبدأ بـ offline_
      const keys = Object.keys(localStorage).filter(k => k.startsWith('offline_'));
      let totalSize = 0;
      let oldest: Date | null = null;
      let newest: Date | null = null;
      
      keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          totalSize += item.length * 2; // التقدير التقريبي لحجم الأحرف بالبايت
          
          try {
            const parsed = JSON.parse(item);
            const timestamp = parsed.timestamp;
            const date = new Date(timestamp);
            
            if (!oldest || date < oldest) {
              oldest = date;
            }
            
            if (!newest || date > newest) {
              newest = date;
            }
          } catch (e) {
            // تجاهل الأخطاء
          }
        }
      });
      
      setStorageUsage({
        totalItems: keys.length,
        totalSize,
        oldestItem: oldest,
        newestItem: newest
      });
      
    } catch (error) {
      console.error('Error updating storage stats:', error);
    }
  }, []);
  
  // تحديث الإحصاءات عند تحميل المكون
  useEffect(() => {
    updateStorageUsage();
    
    // تحديث كل دقيقة
    const interval = setInterval(updateStorageUsage, 60000);
    
    return () => clearInterval(interval);
  }, [updateStorageUsage]);

  // تنظيف العناصر المنتهية الصلاحية
  const cleanupExpiredItems = useCallback(() => {
    try {
      const now = Date.now();
      const keys = Object.keys(localStorage).filter(k => k.startsWith('offline_'));
      let cleanedCount = 0;
      
      keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            
            if (parsed.expiresAt && parsed.expiresAt < now) {
              localStorage.removeItem(key);
              cleanedCount++;
            }
          } catch (e) {
            // تجاهل الأخطاء
          }
        }
      });
      
      if (cleanedCount > 0) {
        updateStorageUsage();
        console.log(`[OfflineStorage] Cleaned up ${cleanedCount} expired items`);
      }
      
      return cleanedCount;
    } catch (error) {
      console.error('Error cleaning up expired items:', error);
      return 0;
    }
  }, [updateStorageUsage]);
  
  // تنظيف التخزين عندما يتجاوز الحد الأقصى
  const cleanupStorageIfNeeded = useCallback(() => {
    try {
      // أولاً، حذف العناصر منتهية الصلاحية
      cleanupExpiredItems();
      
      // ثم التحقق مما إذا كنا لا نزال بحاجة إلى التنظيف
      if (storageUsage.totalSize < MAX_STORAGE) {
        return;
      }
      
      // الحصول على جميع العناصر وفرزها حسب الأولوية والتاريخ
      const keys = Object.keys(localStorage).filter(k => k.startsWith('offline_'));
      const items: {key: string, priority: number, timestamp: number, size: number}[] = [];
      
      keys.forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          try {
            const parsed = JSON.parse(item);
            items.push({
              key,
              priority: parsed.priority || 0,
              timestamp: parsed.timestamp || 0,
              size: item.length * 2
            });
          } catch (e) {
            // تجاهل الأخطاء
          }
        }
      });
      
      // ترتيب العناصر: الأولوية الأقل أولاً، ثم الأقدم أولاً
      items.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.timestamp - b.timestamp;
      });
      
      // حذف العناصر حتى نصل إلى أقل من 80% من الحد الأقصى
      let currentSize = storageUsage.totalSize;
      let targetSize = MAX_STORAGE * 0.8;
      let removedCount = 0;
      
      while (currentSize > targetSize && items.length > 0) {
        const item = items.shift();
        if (item) {
          localStorage.removeItem(item.key);
          currentSize -= item.size;
          removedCount++;
        }
      }
      
      if (removedCount > 0) {
        updateStorageUsage();
        console.log(`[OfflineStorage] Removed ${removedCount} items during cleanup`);
        
        toast({
          title: t('storage.cleanup', 'تنظيف التخزين'),
          description: t('storage.itemsRemoved', 'تم إزالة {{count}} عنصر للحفاظ على أداء التخزين', { count: removedCount }),
        });
      }
    } catch (error) {
      console.error('Error during storage cleanup:', error);
    }
  }, [cleanupExpiredItems, storageUsage.totalSize, updateStorageUsage, t, toast]);

  // حفظ البيانات في التخزين المحلي
  const saveData = useCallback(<T>(key: string, data: T, options?: StorageOptions): boolean => {
    try {
      // التنظيف قبل الإضافة
      cleanupExpiredItems();
      
      const storageKey = `offline_${key}`;
      const now = Date.now();
      
      // تقدير حجم البيانات
      const dataString = JSON.stringify(data);
      const estimatedSize = dataString.length * 2;
      
      // إذا كان الحجم كبيرًا جدًا
      if (estimatedSize > MAX_STORAGE * 0.4) { // أكثر من 40% من المساحة المتاحة
        toast({
          title: t('storage.itemTooLarge', 'العنصر كبير جدًا'),
          description: t('storage.cannotStore', 'لا يمكن تخزين هذا العنصر لأنه كبير جدًا'),
          variant: "destructive"
        });
        return false;
      }
      
      // حساب وقت انتهاء الصلاحية إذا تم تحديده
      const expiresAt = options?.expiresIn ? now + options.expiresIn : undefined;
      
      const storageData: StoredItem<T> = {
        data,
        timestamp: now,
        expiresAt,
        size: estimatedSize,
        priority: options?.priority || 1
      };
      
      localStorage.setItem(storageKey, JSON.stringify(storageData));
      
      // تحديث سجل العناصر غير المتزامنة
      const syncRegistry = JSON.parse(localStorage.getItem('offline_sync_registry') || '{}');
      syncRegistry[key] = now;
      localStorage.setItem('offline_sync_registry', JSON.stringify(syncRegistry));
      
      // تحديث إحصاءات الاستخدام
      updateStorageUsage();
      
      // التنظيف إذا تجاوزنا الحد
      if (storageUsage.totalSize + estimatedSize > MAX_STORAGE * 0.9) {
        cleanupStorageIfNeeded();
      }
      
      return true;
    } catch (error) {
      console.error('فشل في حفظ البيانات محليًا:', error);
      
      toast({
        title: t('storage.saveFailed', 'فشل الحفظ'),
        description: t('storage.errorSavingData', 'فشل في حفظ البيانات محليًا'),
        variant: "destructive"
      });
      
      return false;
    }
  }, [cleanupExpiredItems, updateStorageUsage, storageUsage.totalSize, cleanupStorageIfNeeded, t, toast]);

  // استرداد البيانات من التخزين المحلي
  const getData = useCallback(<T>(key: string): { data: T; timestamp: number } | null => {
    try {
      const storageKey = `offline_${key}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        const parsed: StoredItem<T> = JSON.parse(storedData);
        const now = Date.now();
        
        // التحقق من انتهاء الصلاحية
        if (parsed.expiresAt && parsed.expiresAt < now) {
          // العنصر منتهي الصلاحية، حذفه
          localStorage.removeItem(storageKey);
          
          // تحديث السجل
          const syncRegistry = JSON.parse(localStorage.getItem('offline_sync_registry') || '{}');
          delete syncRegistry[key];
          localStorage.setItem('offline_sync_registry', JSON.stringify(syncRegistry));
          
          // تحديث الإحصاءات
          updateStorageUsage();
          
          return null;
        }
        
        return { 
          data: parsed.data,
          timestamp: parsed.timestamp
        };
      }
      
      return null;
    } catch (error) {
      console.error('فشل في استرداد البيانات المحلية:', error);
      return null;
    }
  }, [updateStorageUsage]);

  // حذف البيانات من التخزين المحلي
  const removeData = useCallback((key: string): boolean => {
    try {
      const storageKey = `offline_${key}`;
      localStorage.removeItem(storageKey);
      
      // تحديث سجل العناصر غير المتزامنة
      const syncRegistry = JSON.parse(localStorage.getItem('offline_sync_registry') || '{}');
      delete syncRegistry[key];
      localStorage.setItem('offline_sync_registry', JSON.stringify(syncRegistry));
      
      // تحديث الإحصاءات
      updateStorageUsage();
      
      return true;
    } catch (error) {
      console.error('فشل في حذف البيانات المحلية:', error);
      return false;
    }
  }, [updateStorageUsage]);

  // الحصول على قائمة بجميع العناصر غير المتزامنة
  const getPendingItems = useCallback((): Record<string, number> => {
    try {
      return JSON.parse(localStorage.getItem('offline_sync_registry') || '{}');
    } catch (error) {
      console.error('فشل في استرداد قائمة العناصر غير المتزامنة:', error);
      return {};
    }
  }, []);

  // مسح جميع البيانات غير المتزامنة
  const clearAllData = useCallback((): boolean => {
    try {
      setIsLoading(true);
      
      const syncRegistry = getPendingItems();
      
      // حذف كل عنصر
      Object.keys(syncRegistry).forEach(key => {
        const storageKey = `offline_${key}`;
        localStorage.removeItem(storageKey);
      });
      
      // مسح السجل
      localStorage.removeItem('offline_sync_registry');
      
      // تحديث الإحصاءات
      updateStorageUsage();
      
      toast({
        title: t('storage.cleared', 'تم مسح البيانات'),
        description: t('storage.allDataCleared', 'تم مسح جميع البيانات المخزنة محليًا'),
      });
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('فشل في مسح البيانات المحلية:', error);
      
      toast({
        title: t('storage.clearFailed', 'فشل المسح'),
        description: t('storage.errorClearingData', 'فشل في مسح البيانات المحلية'),
        variant: "destructive"
      });
      
      setIsLoading(false);
      return false;
    }
  }, [getPendingItems, updateStorageUsage, t, toast]);

  return {
    saveData,
    getData,
    removeData,
    getPendingItems,
    clearAllData,
    cleanupExpiredItems,
    cleanupStorageIfNeeded,
    isLoading,
    storageUsage
  };
}
