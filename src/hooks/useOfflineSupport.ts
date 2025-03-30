
/**
 * Hook to provide offline support functionality
 */
import { useState, useEffect, useCallback } from 'react';
import { useAppState } from './state';
import { useNotifications } from './useNotifications';

interface OfflineSupportOptions {
  enableOfflineMode?: boolean;
  showNotifications?: boolean;
  autoSync?: boolean;
}

export interface UseOfflineModeReturn {
  isOnline: boolean;
  pendingActions: any[];
  isSyncing: boolean;
  queueAction: (action: any) => void;
  syncQueuedActions: () => Promise<void>;
  performOperation: (operation: () => Promise<any>, offlineAction?: any, requiresInternet?: boolean) => Promise<any>;
  canPerformOperation: (requiresInternet?: boolean) => boolean;
  checkConnection: () => Promise<boolean>;
  isChecking: boolean;
}

export const useOfflineSupport = (options: OfflineSupportOptions = {}): UseOfflineModeReturn => {
  const {
    enableOfflineMode = true,
    showNotifications = true,
    autoSync = true
  } = options;
  
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const { showNotification } = useNotifications();
  
  // Update online status
  const updateOnlineStatus = useCallback(() => {
    const online = navigator.onLine;
    setIsOnline(online);
    
    if (showNotifications) {
      if (online) {
        showNotification(
          'متصل بالإنترنت',
          'تمت استعادة الاتصال بالإنترنت',
          'success'
        );
      } else {
        showNotification(
          'غير متصل بالإنترنت',
          'أنت الآن في وضع عدم الاتصال، سيتم حفظ التغييرات محليًا',
          'warning'
        );
      }
    }
  }, [showNotifications, showNotification]);
  
  // Queue an action to be performed when back online
  const queueAction = useCallback((action: any) => {
    setPendingActions(prev => [...prev, action]);
  }, []);
  
  // Check connection status
  const checkConnection = useCallback(async (): Promise<boolean> => {
    setIsChecking(true);
    try {
      // Try to fetch a small resource
      const response = await fetch('/api/ping', { 
        method: 'HEAD',
        cache: 'no-cache',
        headers: { 'Cache-Control': 'no-cache' }
      });
      const online = response.ok;
      setIsOnline(online);
      return online;
    } catch (error) {
      setIsOnline(false);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, []);
  
  // Sync queued actions when back online
  const syncQueuedActions = useCallback(async () => {
    if (!isOnline || pendingActions.length === 0) return;
    
    setIsSyncing(true);
    
    try {
      // Process each action in the queue
      for (const action of pendingActions) {
        // This would be replaced with actual API calls
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Clear the queue after successful sync
      setPendingActions([]);
      
      if (showNotifications) {
        showNotification(
          'تمت المزامنة',
          'تمت مزامنة جميع الإجراءات المعلقة بنجاح',
          'success'
        );
      }
    } catch (error) {
      if (showNotifications) {
        showNotification(
          'فشل المزامنة',
          'حدث خطأ أثناء محاولة مزامنة البيانات',
          'error'
        );
      }
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, pendingActions, showNotifications, showNotification]);
  
  // Check if we can perform an operation based on current connectivity
  const canPerformOperation = useCallback((requiresInternet: boolean = true) => {
    return !requiresInternet || isOnline;
  }, [isOnline]);
  
  // Perform an operation with offline support
  const performOperation = useCallback(async (
    operation: () => Promise<any>,
    offlineAction?: any,
    requiresInternet: boolean = true
  ) => {
    if (canPerformOperation(requiresInternet)) {
      return await operation();
    } else if (offlineAction && enableOfflineMode) {
      queueAction(offlineAction);
      return { offline: true, queued: true };
    } else {
      throw new Error('تعذر إكمال العملية في وضع عدم الاتصال');
    }
  }, [canPerformOperation, enableOfflineMode, queueAction]);
  
  // Event listeners for online/offline status
  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [updateOnlineStatus]);
  
  // Auto sync when coming back online
  useEffect(() => {
    if (isOnline && autoSync && pendingActions.length > 0) {
      syncQueuedActions();
    }
  }, [isOnline, autoSync, pendingActions.length, syncQueuedActions]);
  
  return {
    isOnline,
    pendingActions,
    queueAction,
    syncQueuedActions,
    performOperation,
    canPerformOperation,
    isSyncing,
    checkConnection,
    isChecking
  };
};
