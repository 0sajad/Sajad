
import { useEffect, useState } from 'react';
import { useAppState } from './state/use-app-state';

/**
 * خطاف لإدارة وضع عدم الاتصال
 * يوفر حالة الاتصال والوظائف المساعدة للتعامل مع حالات الاتصال وعدم الاتصال
 */
export function useOfflineMode() {
  const { 
    isOnline, 
    networkStatus, 
    handleOfflineStatus, 
    handleOnlineStatus, 
    checkNetworkStatus 
  } = useAppState(state => state);
  
  // استخدام حالة محلية لتفادي مشاكل التزامن
  const [offlineMode, setOfflineMode] = useState(!isOnline);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(networkStatus?.lastCheck || null);
  
  // مراقبة تغيرات حالة الاتصال
  useEffect(() => {
    const handleOnline = () => {
      handleOnlineStatus();
      setOfflineMode(false);
      console.log('[Network] Browser went online');
    };
    
    const handleOffline = () => {
      handleOfflineStatus();
      setOfflineMode(true);
      console.log('[Network] Browser went offline');
    };
    
    // إضافة مستمعي الأحداث
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // التحقق من حالة الاتصال عند التحميل
    checkNetworkStatus().then(isConnected => {
      setOfflineMode(!isConnected);
      setLastCheckTime(new Date());
    });
    
    // إزالة مستمعي الأحداث عند التنظيف
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOfflineStatus, handleOnlineStatus, checkNetworkStatus]);
  
  // التحقق يدويًا من الاتصال
  const checkConnection = async () => {
    const isConnected = await checkNetworkStatus();
    setOfflineMode(!isConnected);
    setLastCheckTime(new Date());
    return isConnected;
  };
  
  // التبديل اليدوي لوضع عدم الاتصال (مفيد للاختبار)
  const toggleOfflineMode = () => {
    setOfflineMode(prev => !prev);
  };
  
  return {
    isOffline: offlineMode,
    isOnline: !offlineMode,
    lastCheck: lastCheckTime,
    checkConnection,
    toggleOfflineMode,
  };
}
