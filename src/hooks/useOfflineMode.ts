
import { useState, useEffect, useCallback } from 'react';
import { useAppState } from '@/hooks/state/use-app-state';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export function useOfflineMode() {
  const { t } = useTranslation();
  const [cacheSize, setCacheSize] = useState<number>(0);
  const { isOnline } = useAppState(state => ({
    isOnline: state.isOnline
  }));
  
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
  
  return {
    isOnline,
    cacheSize,
    clearCache,
    refreshCachedData
  };
}
