
import { useState, useEffect } from 'react';
import { useNetworkStatus } from './useAppState';
import { useOfflineSupport } from './useOfflineSupport';

type OfflineModeOptions = {
  autoSync?: boolean;
  showOfflineIndicator?: boolean;
  showNotifications?: boolean;
};

/**
 * خطاف مبسط لإدارة وضع عدم الاتصال في التطبيق
 */
export function useOfflineMode(options: OfflineModeOptions = {}) {
  const { 
    autoSync = true, 
    showOfflineIndicator = true,
    showNotifications = true 
  } = options;
  
  const { isOnline } = useNetworkStatus();
  const { saveOfflineData, getOfflineData, hasPendingSync, syncOfflineData } = useOfflineSupport();
  const [wasOnline, setWasOnline] = useState(true);
  
  // تتبع تغيرات حالة الاتصال
  useEffect(() => {
    // إذا استعاد المستخدم الاتصال وكان هناك بيانات للمزامنة
    if (isOnline && !wasOnline && hasPendingSync && autoSync) {
      syncOfflineData();
    }
    
    setWasOnline(isOnline);
  }, [isOnline, wasOnline, hasPendingSync, autoSync, syncOfflineData]);
  
  // إضافة مؤشر وضع عدم الاتصال إلى واجهة المستخدم
  useEffect(() => {
    if (!showOfflineIndicator) return;
    
    const offlineIndicator = document.getElementById('offline-indicator');
    
    if (!isOnline && !offlineIndicator) {
      const indicator = document.createElement('div');
      indicator.id = 'offline-indicator';
      indicator.className = 'fixed bottom-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium z-50 flex items-center';
      indicator.innerHTML = '<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> وضع عدم الاتصال';
      document.body.appendChild(indicator);
    } else if (isOnline && offlineIndicator) {
      offlineIndicator.remove();
    }
    
    return () => {
      const indicator = document.getElementById('offline-indicator');
      if (indicator) {
        indicator.remove();
      }
    };
  }, [isOnline, showOfflineIndicator]);
  
  return {
    isOnline,
    isOffline: !isOnline,
    hasPendingSync,
    saveOfflineData,
    getOfflineData,
    syncOfflineData,
  };
}
