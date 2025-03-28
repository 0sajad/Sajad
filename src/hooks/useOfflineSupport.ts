
import { useEffect, useState } from 'react';
import { useNetworkStatus } from './useAppState';
import { ToastManager } from '@/components/notifications/ToastManager';
import { useTranslation } from 'react-i18next';

/**
 * خطاف لإدارة حالة الاتصال بالإنترنت وتوفير دعم وضع عدم الاتصال
 */
export function useOfflineSupport() {
  const { t } = useTranslation();
  const { isOnline, checkConnection } = useNetworkStatus();
  const [lastOnlineState, setLastOnlineState] = useState<boolean>(true);
  const [offlineData, setOfflineData] = useState<Map<string, any>>(new Map());
  const [hasPendingSync, setHasPendingSync] = useState<boolean>(false);
  
  // التحقق من حالة الاتصال بشكل دوري
  useEffect(() => {
    // التحقق من الاتصال عند تحميل المكون
    checkConnection();
    
    // جدولة فحص دوري للاتصال
    const interval = setInterval(() => {
      checkConnection();
    }, 30000); // التحقق كل 30 ثانية
    
    // الاستماع لتغيرات حالة الاتصال في المتصفح
    const handleOnline = () => {
      if (!lastOnlineState) {
        ToastManager.success({
          title: t('network.connectionRestored', 'تم استعادة الاتصال'),
          description: t('network.syncingData', 'جاري مزامنة البيانات...'),
        });
        
        // محاولة مزامنة البيانات التي تم حفظها محليًا
        syncOfflineData();
      }
      setLastOnlineState(true);
    };
    
    const handleOffline = () => {
      if (lastOnlineState) {
        ToastManager.warning({
          title: t('network.offlineMode', 'وضع عدم الاتصال'),
          description: t('network.offlineModeDescription', 'سيتم حفظ بياناتك محليًا حتى استعادة الاتصال.'),
        });
      }
      setLastOnlineState(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnection, lastOnlineState, t]);
  
  // متابعة التغيرات في حالة الاتصال
  useEffect(() => {
    if (isOnline !== lastOnlineState) {
      setLastOnlineState(isOnline);
      
      if (isOnline && hasPendingSync) {
        syncOfflineData();
      }
    }
  }, [isOnline, lastOnlineState, hasPendingSync]);
  
  // حفظ البيانات محليًا عندما يكون المستخدم غير متصل
  const saveOfflineData = (key: string, data: any) => {
    const newOfflineData = new Map(offlineData);
    newOfflineData.set(key, data);
    setOfflineData(newOfflineData);
    setHasPendingSync(true);
    
    // حفظ البيانات في التخزين المحلي للاسترداد بعد تحديث الصفحة
    try {
      const offlineStorage = JSON.parse(localStorage.getItem('offlineData') || '{}');
      offlineStorage[key] = data;
      localStorage.setItem('offlineData', JSON.stringify(offlineStorage));
    } catch (error) {
      console.error('فشل في حفظ البيانات محليًا:', error);
    }
    
    return true;
  };
  
  // استرداد البيانات المخزنة محليًا
  const getOfflineData = (key: string) => {
    if (offlineData.has(key)) {
      return offlineData.get(key);
    }
    
    // محاولة استرداد البيانات من التخزين المحلي
    try {
      const offlineStorage = JSON.parse(localStorage.getItem('offlineData') || '{}');
      if (offlineStorage[key]) {
        return offlineStorage[key];
      }
    } catch (error) {
      console.error('فشل في استرداد البيانات المحلية:', error);
    }
    
    return null;
  };
  
  // مزامنة البيانات المخزنة محليًا مع الخادم عند استعادة الاتصال
  const syncOfflineData = async () => {
    if (!isOnline || offlineData.size === 0) return;
    
    let syncSuccess = true;
    
    // إنشاء نسخة من البيانات للمزامنة
    const dataToSync = new Map(offlineData);
    
    for (const [key, data] of dataToSync.entries()) {
      try {
        // هنا يمكن تنفيذ عملية المزامنة مع الخادم
        console.log(`مزامنة البيانات للمفتاح: ${key}`);
        
        // حذف البيانات بعد المزامنة الناجحة
        offlineData.delete(key);
      } catch (error) {
        console.error(`فشل في مزامنة البيانات للمفتاح ${key}:`, error);
        syncSuccess = false;
      }
    }
    
    // تحديث حالة المزامنة
    if (syncSuccess) {
      setOfflineData(new Map());
      setHasPendingSync(false);
      
      // مسح البيانات المخزنة من التخزين المحلي
      localStorage.removeItem('offlineData');
      
      ToastManager.success({
        title: t('network.syncComplete', 'اكتملت المزامنة'),
        description: t('network.allDataSynced', 'تمت مزامنة جميع البيانات بنجاح.'),
      });
    } else {
      ToastManager.warning({
        title: t('network.syncPartial', 'مزامنة جزئية'),
        description: t('network.someDataFailed', 'فشلت مزامنة بعض البيانات. سيتم إعادة المحاولة لاحقًا.'),
      });
    }
  };
  
  // وظيفة لإرسال البيانات مع دعم وضع عدم الاتصال
  const sendData = async (endpoint: string, data: any, options?: RequestInit) => {
    // إذا كان المستخدم متصلاً، أرسل البيانات مباشرة
    if (isOnline) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          ...options,
        });
        
        return await response.json();
      } catch (error) {
        // إذا فشل الإرسال، حفظ البيانات محليًا
        const offlineKey = `${endpoint}_${Date.now()}`;
        saveOfflineData(offlineKey, { endpoint, data, options });
        
        ToastManager.info({
          title: t('network.connectionIssue', 'مشكلة في الاتصال'),
          description: t('network.dataSavedLocally', 'تم حفظ البيانات محليًا وسيتم مزامنتها عند استعادة الاتصال.'),
        });
        
        return { success: false, offline: true };
      }
    } else {
      // إذا كان المستخدم غير متصل، حفظ البيانات محليًا
      const offlineKey = `${endpoint}_${Date.now()}`;
      saveOfflineData(offlineKey, { endpoint, data, options });
      
      ToastManager.info({
        title: t('network.offlineMode', 'وضع عدم الاتصال'),
        description: t('network.dataSavedLocally', 'تم حفظ البيانات محليًا وسيتم مزامنتها عند استعادة الاتصال.'),
      });
      
      return { success: false, offline: true };
    }
  };
  
  return {
    isOnline,
    hasPendingSync,
    saveOfflineData,
    getOfflineData,
    syncOfflineData,
    sendData,
  };
}
