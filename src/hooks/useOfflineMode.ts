import { useState, useEffect, useCallback } from 'react';
import { useAppState } from './state/use-app-state';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface OfflineSyncItem {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  priority: number;
}

/**
 * خطاف لإدارة وضع عدم الاتصال والمزامنة عندما يعود الاتصال
 */
export function useOfflineMode() {
  const { t } = useTranslation();
  const appState = useAppState();
  const isOnline = appState.networkStatus?.isOnline ?? true;
  const checkNetworkStatus = appState.checkConnection;
  const setNetworkStatus = (status: { isConnected: boolean; isOnline: boolean }) => {
    appState((state) => ({ 
      networkStatus: { 
        ...state.networkStatus, 
        isConnected: status.isConnected, 
        isOnline: status.isOnline,
        lastCheck: new Date()
      } 
    }));
  };
  
  const [isOffline, setIsOffline] = useState(!isOnline);
  const [pendingSyncItems, setPendingSyncItems] = useState<OfflineSyncItem[]>([]);
  const [syncInProgress, setSyncInProgress] = useState(false);
  
  useEffect(() => {
    const handleOnline = async () => {
      const isActuallyOnline = await checkNetworkStatus();
      
      if (isActuallyOnline) {
        setIsOffline(false);
        setNetworkStatus({ isConnected: true, isOnline: true });
        
        toast.success(
          t('network.backOnline', 'تمت استعادة الاتصال'),
          {
            description: hasPendingSync() 
              ? t('network.syncPending', 'جاري مزامنة البيانات المحفوظة محليًا')
              : undefined,
            duration: 3000
          }
        );
        
        if (hasPendingSync() && appState.preferences?.autoSave) {
          syncOfflineData();
        }
      }
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      setNetworkStatus({ isConnected: false, isOnline: false });
      
      toast.warning(
        t('network.offline', 'تم فقدان الاتصال'),
        {
          description: t('network.offlineDescription', 'سيتم حفظ التغييرات محليًا ومزامنتها عند استعادة الاتصال'),
          duration: 5000
        }
      );
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (!isOnline) {
      setIsOffline(true);
    }
    
    loadPendingSyncItems();
    
    const checkInterval = setInterval(async () => {
      if (isOffline) {
        const isActuallyOnline = await checkNetworkStatus();
        if (isActuallyOnline) {
          handleOnline();
        }
      }
    }, 30000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(checkInterval);
    };
  }, [isOnline, checkNetworkStatus, setNetworkStatus, t, isOffline, appState.preferences]);
  
  const loadPendingSyncItems = useCallback(() => {
    try {
      const storedItems = localStorage.getItem('offline_sync_items');
      if (storedItems) {
        setPendingSyncItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Error loading offline sync items:', error);
    }
  }, []);
  
  const savePendingSyncItems = useCallback((items: OfflineSyncItem[]) => {
    try {
      localStorage.setItem('offline_sync_items', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving offline sync items:', error);
    }
  }, []);
  
  const addOfflineItem = useCallback((type: string, data: any, priority = 1) => {
    const newItem: OfflineSyncItem = {
      id: `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      data,
      timestamp: Date.now(),
      priority
    };
    
    setPendingSyncItems(prev => {
      const newItems = [...prev, newItem].sort((a, b) => b.priority - a.priority);
      savePendingSyncItems(newItems);
      return newItems;
    });
    
    return newItem.id;
  }, [savePendingSyncItems]);
  
  const hasPendingSync = useCallback(() => {
    return pendingSyncItems.length > 0;
  }, [pendingSyncItems]);
  
  const syncOfflineData = useCallback(async () => {
    if (syncInProgress || !isOnline || pendingSyncItems.length === 0) {
      return;
    }
    
    setSyncInProgress(true);
    
    try {
      const itemsToSync = [...pendingSyncItems];
      const failedItems: OfflineSyncItem[] = [];
      
      const toastId = toast.loading(
        t('network.syncing', 'جاري المزامنة'),
        {
          description: t('network.syncingItems', 'جاري مزامنة {{count}} عنصر', { count: itemsToSync.length }),
          duration: Infinity
        }
      );
      
      for (const item of itemsToSync) {
        try {
          switch (item.type) {
            case 'form_submission':
              console.log('Syncing form submission:', item.data);
              await new Promise(resolve => setTimeout(resolve, 500));
              break;
            
            case 'user_preference':
              console.log('Syncing user preference:', item.data);
              await new Promise(resolve => setTimeout(resolve, 300));
              break;
            
            default:
              console.warn('Unknown sync item type:', item.type);
              failedItems.push(item);
          }
        } catch (error) {
          console.error('Error syncing item:', item, error);
          failedItems.push(item);
        }
      }
      
      setPendingSyncItems(failedItems);
      savePendingSyncItems(failedItems);
      
      toast.dismiss(toastId);
      
      if (failedItems.length === 0) {
        toast.success(
          t('network.syncComplete', 'تمت المزامنة بنجاح'),
          { duration: 3000 }
        );
      } else {
        toast.warning(
          t('network.syncPartial', 'تمت المزامنة جزئيًا'),
          {
            description: t('network.syncFailed', 'فشل مزامنة {{count}} عنصر', { count: failedItems.length }),
            duration: 5000
          }
        );
      }
    } finally {
      setSyncInProgress(false);
    }
  }, [isOnline, pendingSyncItems, savePendingSyncItems, syncInProgress, t]);
  
  const attemptReconnect = useCallback(async () => {
    toast.loading(
      t('network.checkingConnection', 'جاري التحقق من الاتصال'),
      { duration: 2000 }
    );
    
    const isConnected = await checkNetworkStatus();
    
    if (isConnected) {
      setIsOffline(false);
      setNetworkStatus({ isConnected: true, isOnline: true });
      
      toast.success(
        t('network.connectionRestored', 'تم استعادة الاتصال'),
        { duration: 3000 }
      );
      
      return true;
    } else {
      toast.error(
        t('network.stillOffline', 'لا يزال الاتصال مفقودًا'),
        {
          description: t('network.checkNetworkSettings', 'تحقق من إعدادات الشبكة وحاول مرة أخرى'),
          duration: 5000
        }
      );
      
      return false;
    }
  }, [checkNetworkStatus, setNetworkStatus, t]);
  
  return {
    isOnline,
    isOffline,
    hasPendingSync: hasPendingSync(),
    pendingItemsCount: pendingSyncItems.length,
    isSyncing: syncInProgress,
    
    addOfflineItem,
    syncOfflineData,
    attemptReconnect
  };
}
