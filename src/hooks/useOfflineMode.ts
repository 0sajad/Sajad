
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useAppState } from './state/use-app-state';

export interface NetworkStatus {
  downlink: number | null;
  effectiveType: string | null;
  rtt: number | null;
  saveData: boolean | null;
  type: string | null;
}

/**
 * خطاف لإدارة وضع عدم الاتصال وحالة الشبكة
 */
export function useOfflineMode() {
  const { t } = useTranslation();
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date>(new Date());
  const [networkInfo, setNetworkInfo] = useState<NetworkStatus>({
    downlink: null,
    effectiveType: null,
    rtt: null,
    saveData: null,
    type: null,
  });
  const [pendingActions, setPendingActions] = useState<any[]>([]);
  const [cacheSize, setCacheSize] = useState<number>(0);
  const [hasPendingSync, setHasPendingSync] = useState<boolean>(false);

  // الحصول على حالة الاتصال من مخزن الحالة
  const isOnline = useAppState(state => state.network.isOnline);
  const isOffline = !isOnline;
  const setOnlineStatus = useAppState(state => state.network.setOnlineStatus);

  // التحقق من حالة الاتصال بالشبكة
  const checkConnection = useCallback(async (): Promise<boolean> => {
    setIsChecking(true);

    try {
      // إنشاء إشارة لإلغاء الطلب إذا استغرق وقتًا طويلاً
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // إجراء طلب للتحقق من الاتصال (URL صغير للتحقق فقط)
      const response = await fetch('/api/ping', {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      const online = response.ok;
      setOnlineStatus(online);
      setLastCheck(new Date());
      
      // جمع معلومات الشبكة إذا كانت متوفرة
      if (online && navigator.connection) {
        const conn = navigator.connection as any;
        setNetworkInfo({
          downlink: conn.downlink || null,
          effectiveType: conn.effectiveType || null,
          rtt: conn.rtt || null,
          saveData: conn.saveData || null,
          type: conn.type || null,
        });
      }
      
      return online;
    } catch (error) {
      console.error('فشل التحقق من الاتصال:', error);
      setOnlineStatus(false);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [setOnlineStatus]);

  // استمع إلى تغييرات حالة الاتصال
  useEffect(() => {
    const handleOnline = () => {
      setOnlineStatus(true);
      syncPendingData();
    };
    
    const handleOffline = () => {
      setOnlineStatus(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // التحقق من الاتصال مباشرة عند التحميل
    checkConnection();

    // إعداد فاصل زمني للتحقق الدوري
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        checkConnection();
      }
    }, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [checkConnection, setOnlineStatus]);

  // تبديل وضع عدم الاتصال
  const toggleOfflineMode = () => {
    setOnlineStatus(!isOnline);
  };

  // إضافة إجراء معلق للمزامنة
  const addPendingAction = useCallback((action: any) => {
    setPendingActions(prev => [...prev, action]);
    setHasPendingSync(true);
    
    // تخزين الإجراءات المعلقة في التخزين المحلي
    try {
      const storedActions = JSON.parse(localStorage.getItem('pendingActions') || '[]');
      localStorage.setItem('pendingActions', JSON.stringify([...storedActions, action]));
    } catch (error) {
      console.error('فشل تخزين الإجراء المعلق:', error);
    }
    
    toast.info(t('network.actionSaved', 'تم حفظ الإجراء للمزامنة عند استعادة الاتصال'));
  }, [t]);

  // مزامنة البيانات المعلقة
  const syncPendingData = useCallback(async () => {
    if (!isOnline || pendingActions.length === 0) return;
    
    let successCount = 0;
    let failCount = 0;
    
    toast.info(t('network.syncingData', 'جاري مزامنة البيانات المعلقة...'));
    
    for (const action of pendingActions) {
      try {
        // محاولة تنفيذ الإجراء
        await fetch(action.url, {
          method: action.method,
          headers: action.headers,
          body: action.body,
        });
        
        successCount++;
      } catch (error) {
        console.error('فشل مزامنة الإجراء:', error);
        failCount++;
      }
    }
    
    // تحديث الإجراءات المعلقة بعد المزامنة
    if (successCount > 0) {
      setPendingActions([]);
      localStorage.removeItem('pendingActions');
      setHasPendingSync(false);
      
      toast.success(
        t('network.syncComplete', 'تمت مزامنة البيانات بنجاح', {
          count: successCount
        })
      );
    }
    
    if (failCount > 0) {
      toast.error(
        t('network.syncFailed', 'فشلت مزامنة بعض البيانات', {
          count: failCount
        })
      );
    }
  }, [isOnline, pendingActions, t]);

  // مسح ذاكرة التخزين المؤقت
  const clearCache = useCallback(async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        setCacheSize(0);
        toast.success(t('network.cacheCleared', 'تم مسح ذاكرة التخزين المؤقت'));
      } catch (error) {
        console.error('فشل مسح ذاكرة التخزين المؤقت:', error);
        toast.error(t('network.cacheClearFailed', 'فشل مسح ذاكرة التخزين المؤقت'));
      }
    }
  }, [t]);

  // تحديث البيانات المخزنة مؤقتًا
  const refreshCachedData = useCallback(async () => {
    if (isOnline) {
      try {
        // تحديث البيانات المخزنة مؤقتًا
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'REFRESH_CACHED_DATA'
          });
          
          toast.success(t('network.refreshingCache', 'جاري تحديث البيانات المخزنة مؤقتًا'));
        } else {
          // بديل - إعادة تحميل الصفحة مع تعطيل التخزين المؤقت
          window.location.reload();
        }
      } catch (error) {
        console.error('فشل تحديث البيانات المخزنة مؤقتًا:', error);
        toast.error(t('network.refreshFailed', 'فشل تحديث البيانات المخزنة مؤقتًا'));
      }
    } else {
      toast.error(t('network.refreshRequiresConnection', 'يتطلب تحديث البيانات اتصالاً بالإنترنت'));
    }
  }, [isOnline, t]);

  // حساب حجم التخزين المؤقت
  useEffect(() => {
    const calculateCacheSize = async () => {
      if ('storage' in navigator && navigator.storage.estimate) {
        try {
          const estimate = await navigator.storage.estimate();
          setCacheSize(estimate.usage || 0);
        } catch (error) {
          console.error('فشل حساب حجم التخزين المؤقت:', error);
        }
      }
    };
    
    calculateCacheSize();
    
    // تحميل الإجراءات المعلقة عند بدء التشغيل
    try {
      const storedActions = JSON.parse(localStorage.getItem('pendingActions') || '[]');
      if (storedActions.length > 0) {
        setPendingActions(storedActions);
        setHasPendingSync(true);
      }
    } catch (error) {
      console.error('فشل تحميل الإجراءات المعلقة:', error);
    }
  }, []);

  return {
    isOffline,
    isOnline,
    lastCheck,
    networkInfo,
    isChecking,
    checkConnection,
    toggleOfflineMode,
    hasPendingSync,
    pendingActions,
    addPendingAction,
    syncPendingData,
    cacheSize,
    clearCache,
    refreshCachedData
  };
}
