
import { useState, useEffect, useCallback } from 'react';
import { useAppState } from './state/use-app-state';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useNetworkManager } from './network/useNetworkManager';

interface OfflineSyncItem {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  priority: number;
}

/**
 * خطاف لإدارة وضع عدم الاتصال والمزامنة عندما يعود الاتصال
 * تم تحسينه لاستخدام useNetworkManager للتحقق من حالة الاتصال
 */
export function useOfflineMode() {
  const { t } = useTranslation();
  const { isOnline, retryConnection, checkNetworkStatus } = useNetworkManager();
  
  // تحسين الوصول إلى وظائف الحالة في Zustand
  const setNetworkStatus = useAppState(state => state.setNetworkStatus);
  const preferences = useAppState(state => state.preferences);
  
  const [isOffline, setIsOffline] = useState(!isOnline);
  const [pendingSyncItems, setPendingSyncItems] = useState<OfflineSyncItem[]>([]);
  const [syncInProgress, setSyncInProgress] = useState(false);
  
  // تحديث حالة الاتصال المحلية عند تغير حالة الاتصال العالمية
  useEffect(() => {
    setIsOffline(!isOnline);
    
    if (isOnline && hasPendingSync() && preferences?.autoSave) {
      syncOfflineData();
    }
  }, [isOnline, preferences]);
  
  useEffect(() => {
    loadPendingSyncItems();
    
    return () => {
      // حفظ أي عناصر معلقة قبل إنهاء المكون
      if (pendingSyncItems.length > 0) {
        savePendingSyncItems(pendingSyncItems);
      }
    };
  }, []);
  
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
  
  // تم تحسينها لاستخدام retryConnection من useNetworkManager
  const attemptReconnect = useCallback(async () => {
    return await retryConnection();
  }, [retryConnection]);
  
  return {
    isOnline,
    isOffline,
    hasPendingSync: hasPendingSync(),
    pendingItemsCount: pendingSyncItems.length,
    isSyncing: syncInProgress,
    
    addOfflineItem,
    syncOfflineData,
    attemptReconnect,
    checkNetworkStatus
  };
}
