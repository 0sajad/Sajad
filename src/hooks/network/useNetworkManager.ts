
import { useEffect, useCallback, useState } from 'react';
import { useAppState } from '../state/use-app-state';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

/**
 * خطاف موحد لإدارة حالة الاتصال بالشبكة
 * يقوم بتوحيد وظائف إدارة الشبكة من مختلف الخطافات
 */
export function useNetworkManager() {
  const { t } = useTranslation();
  const setNetworkStatus = useAppState(state => state.setNetworkStatus);
  const checkConnection = useAppState(state => state.checkConnection);
  const networkStatus = useAppState(state => state.networkStatus);
  
  const [isCheckingConnection, setIsCheckingConnection] = useState(false);
  
  // التحقق من الاتصال عند تشغيل الخطاف
  useEffect(() => {
    checkNetworkStatus();
    
    const handleOnline = () => {
      checkNetworkStatus();
    };
    
    const handleOffline = () => {
      setNetworkStatus({
        isConnected: false,
        isOnline: false
      });
      
      // إظهار رسالة للمستخدم
      toast.warning(
        t('network.connectionLost', 'تم فقدان الاتصال'),
        {
          description: t('network.workingOffline', 'سيتم حفظ تغييراتك محليًا ومزامنتها عند استعادة الاتصال'),
          duration: 5000
        }
      );
    };
    
    // الاستماع لأحداث الشبكة في المتصفح
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // جدولة فحص دوري للاتصال
    const checkInterval = setInterval(() => {
      if (!networkStatus?.isOnline) {
        checkNetworkStatus();
      }
    }, 30000); // التحقق كل 30 ثانية
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(checkInterval);
    };
  }, [checkConnection, setNetworkStatus, t, networkStatus]);
  
  // وظيفة محسّنة للتحقق من الاتصال
  const checkNetworkStatus = useCallback(async () => {
    if (isCheckingConnection) return networkStatus?.isOnline || false;
    
    setIsCheckingConnection(true);
    
    try {
      const isConnected = await checkConnection();
      
      setNetworkStatus({
        isConnected,
        isOnline: isConnected
      });
      
      if (isConnected && !networkStatus?.isOnline) {
        // إظهار رسالة للمستخدم عند استعادة الاتصال
        toast.success(
          t('network.connectionRestored', 'تم استعادة الاتصال'),
          { duration: 3000 }
        );
      }
      
      setIsCheckingConnection(false);
      return isConnected;
    } catch (error) {
      console.error('فشل التحقق من الاتصال:', error);
      setIsCheckingConnection(false);
      return false;
    }
  }, [checkConnection, setNetworkStatus, t, isCheckingConnection, networkStatus]);
  
  // وظيفة لإعادة محاولة الاتصال بشكل صريح
  const retryConnection = useCallback(async () => {
    toast.loading(
      t('network.checking', 'جاري التحقق من الاتصال...'),
      { duration: 2000 }
    );
    
    const isConnected = await checkNetworkStatus();
    
    if (isConnected) {
      return true;
    } else {
      toast.error(
        t('network.stillOffline', 'لا يزال الاتصال مفقودًا'),
        {
          description: t('network.checkSettings', 'تحقق من إعدادات الشبكة وحاول مرة أخرى'),
          duration: 4000
        }
      );
      return false;
    }
  }, [checkNetworkStatus, t]);
  
  return {
    isOnline: networkStatus?.isOnline || false,
    isConnected: networkStatus?.isConnected || false,
    isCheckingConnection,
    lastCheck: networkStatus?.lastCheck || null,
    checkNetworkStatus,
    retryConnection
  };
}
