
import { useState, useEffect, useCallback } from 'react';
import { useAppState } from '@/hooks/state/use-app-state';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export function useOfflineMode() {
  const { t } = useTranslation();
  const [cacheSize, setCacheSize] = useState<number>(0);
  
  // Using the fixed AppState
  const isOnline = useAppState(state => state.isOnline);

  // Additional properties needed by components
  const isOffline = !isOnline;
  const [hasPendingSync, setHasPendingSync] = useState<boolean>(false);
  
  // Calculate cache size
  useEffect(() => {
    const calculateCacheSize = async () => {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        try {
          const estimate = await navigator.storage.estimate();
          if (estimate.usage) {
            // Convert bytes to megabytes
            setCacheSize(estimate.usage / (1024 * 1024));
          }
        } catch (error) {
          console.error('Error calculating cache size:', error);
        }
      } else {
        // Fallback for browsers that don't support the Storage API
        setCacheSize(
          Object.keys(localStorage).reduce((size, key) => {
            return size + (localStorage[key].length * 2) / (1024 * 1024);
          }, 0)
        );
      }
    };
    
    calculateCacheSize();
    
    // Check for pending sync items in localStorage
    const checkPendingSync = () => {
      try {
        const pendingActions = localStorage.getItem('pendingActions');
        setHasPendingSync(!!pendingActions && JSON.parse(pendingActions).length > 0);
      } catch (error) {
        console.error('Error checking pending sync:', error);
        setHasPendingSync(false);
      }
    };
    
    checkPendingSync();
    
    // Set up interval to periodically check for pending sync
    const syncCheckInterval = setInterval(checkPendingSync, 30000);
    
    return () => {
      clearInterval(syncCheckInterval);
    };
  }, []);
  
  // Clear cache data
  const clearCache = useCallback(() => {
    if ('caches' in window) {
      // Clear all cache storage
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        // Clear localStorage items that are cache-related
        const localStorageKeys = Object.keys(localStorage);
        localStorageKeys.forEach(key => {
          if (key.includes('cache') || key.includes('offline-data')) {
            localStorage.removeItem(key);
          }
        });
        
        setCacheSize(0);
        
        toast({
          title: t('offline.cacheCleared', 'تم مسح ذاكرة التخزين المؤقت'),
          description: t('offline.cacheRefreshed', 'تم تنظيف جميع البيانات المخزنة مؤقتاً'),
        });
      });
    } else {
      // Fallback for browsers without Cache API
      const localStorageKeys = Object.keys(localStorage);
      localStorageKeys.forEach(key => {
        if (key.includes('cache') || key.includes('offline-data')) {
          localStorage.removeItem(key);
        }
      });
      
      setCacheSize(0);
      
      toast({
        title: t('offline.cacheCleared', 'تم مسح ذاكرة التخزين المؤقت'),
        description: t('offline.cacheRefreshed', 'تم تنظيف جميع البيانات المخزنة مؤقتاً'),
      });
    }
  }, [t]);
  
  // Refresh cached data
  const refreshCachedData = useCallback(() => {
    if (!isOnline) {
      toast({
        title: t('offline.error', 'خطأ'),
        description: t('offline.needsConnection', 'يجب أن تكون متصلاً بالإنترنت لتحديث البيانات'),
        variant: 'destructive'
      });
      return;
    }
    
    toast({
      title: t('offline.refreshing', 'جارِ التحديث...'),
      description: t('offline.refreshingDescription', 'جارِ تحديث البيانات المخزنة مؤقتاً'),
    });
    
    // Simulate data refresh - in a real app, you would reload API data
    setTimeout(() => {
      toast({
        title: t('offline.refreshed', 'تم التحديث'),
        description: t('offline.refreshedDescription', 'تم تحديث جميع البيانات المخزنة مؤقتاً'),
      });
    }, 2000);
  }, [isOnline, t]);
  
  // Attempt to reconnect to the network
  const attemptReconnect = useCallback(async () => {
    toast({
      title: t('network.checking', 'جارِ التحقق من الاتصال...'),
      description: t('network.tryingToReconnect', 'جارِ محاولة إعادة الاتصال بالإنترنت'),
    });
    
    const checkConnection = useAppState.getState().checkConnection;
    
    try {
      const isConnected = await checkConnection();
      
      if (isConnected) {
        toast({
          title: t('network.connected', 'تم الاتصال'),
          description: t('network.connectionRestored', 'تم استعادة الاتصال بالإنترنت'),
        });
        return true;
      } else {
        toast({
          title: t('network.offline', 'غير متصل'),
          description: t('network.stillOffline', 'ما زلت غير متصل بالإنترنت'),
          variant: 'destructive'
        });
        return false;
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      toast({
        title: t('network.error', 'خطأ'),
        description: t('network.connectionCheckFailed', 'فشل التحقق من الاتصال'),
        variant: 'destructive'
      });
      return false;
    }
  }, [t]);
  
  return {
    isOnline,
    isOffline,
    cacheSize,
    clearCache,
    refreshCachedData,
    hasPendingSync,
    attemptReconnect
  };
}
