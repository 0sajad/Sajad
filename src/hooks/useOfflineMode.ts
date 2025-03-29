
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAppState } from '@/hooks/state';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

export interface NetworkInfo {
  type?: string;
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
}

export interface UseOfflineModeReturn {
  isOnline: boolean;
  isOffline: boolean;
  lastCheck: Date | null;
  networkInfo: NetworkInfo | null;
  hasPendingSync: boolean;
  syncPendingData: () => Promise<boolean>;
  refreshCachedData: () => Promise<void>;
  clearCache: () => void;
  cacheSize: number;
}

/**
 * Hook for handling offline mode and network status
 */
export function useOfflineMode(): UseOfflineModeReturn {
  const { t } = useTranslation();
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [cacheSize, setCacheSize] = useState<number>(0);
  const [hasPendingSync, setHasPendingSync] = useState<boolean>(false);
  
  // Get online status from navigator
  const isOnline = navigator.onLine;
  const isOffline = !isOnline;
  
  // Get connection info if available
  const getConnectionInfo = useCallback(() => {
    // Using safe property access since 'connection' isn't available in all browsers
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      setNetworkInfo({
        type: connection.type,
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      });
    } else {
      setNetworkInfo(null);
    }
  }, []);
  
  // Update last check time
  const updateLastCheck = useCallback(() => {
    setLastCheck(new Date());
  }, []);
  
  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      updateLastCheck();
      getConnectionInfo();
      // Show toast notification
      toast({
        title: t('network.backOnline', 'متصل بالإنترنت'),
        description: t('network.backOnlineDesc', 'تم استعادة الاتصال بالإنترنت'),
        variant: 'default',
      });
    };
    
    const handleOffline = () => {
      updateLastCheck();
      // Show toast notification
      toast({
        title: t('network.offline', 'غير متصل'),
        description: t('network.offlineDesc', 'أنت حاليًا غير متصل بالإنترنت'),
        variant: 'destructive',
      });
    };
    
    // Initial check
    getConnectionInfo();
    updateLastCheck();
    
    // Set listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Simulate pending sync data for demo
    setHasPendingSync(Math.random() > 0.5);
    setCacheSize(Math.floor(Math.random() * 15 * 100) / 100); // Random cache size between 0-15MB
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t, getConnectionInfo, updateLastCheck]);
  
  // Sync pending data
  const syncPendingData = useCallback(async (): Promise<boolean> => {
    if (!isOnline) return false;
    
    // Simulate sync process
    return new Promise((resolve) => {
      setTimeout(() => {
        setHasPendingSync(false);
        resolve(true);
      }, 2000);
    });
  }, [isOnline]);
  
  // Refresh cached data
  const refreshCachedData = useCallback(async (): Promise<void> => {
    if (!isOnline) {
      toast({
        title: t('network.offline', 'غير متصل'),
        description: t('network.refreshFailedOffline', 'لا يمكن تحديث البيانات في وضع عدم الاتصال'),
        variant: 'destructive',
      });
      return;
    }
    
    // Simulate refresh process
    toast({
      title: t('network.refreshing', 'جاري التحديث'),
      description: t('network.refreshingDesc', 'جاري تحديث البيانات المخزنة مؤقتًا'),
    });
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Update cache size (simulate new data)
    setCacheSize(Math.floor(Math.random() * 20 * 100) / 100);
    
    toast({
      title: t('network.refreshSuccess', 'تم التحديث'),
      description: t('network.refreshSuccessDesc', 'تم تحديث البيانات المخزنة مؤقتًا بنجاح'),
      variant: 'default',
    });
  }, [isOnline, t]);
  
  // Clear cache
  const clearCache = useCallback(() => {
    // Simulate cache clearing
    setCacheSize(0);
    toast({
      title: t('network.cacheCleared', 'تم مسح التخزين المؤقت'),
      description: t('network.cacheClearedDesc', 'تم مسح جميع البيانات المخزنة مؤقتًا'),
      variant: 'default',
    });
  }, [t]);
  
  return useMemo(() => ({
    isOnline,
    isOffline,
    lastCheck,
    networkInfo,
    hasPendingSync,
    syncPendingData,
    refreshCachedData,
    clearCache,
    cacheSize
  }), [
    isOnline, 
    lastCheck, 
    networkInfo, 
    hasPendingSync, 
    syncPendingData, 
    refreshCachedData, 
    clearCache, 
    cacheSize
  ]);
}
