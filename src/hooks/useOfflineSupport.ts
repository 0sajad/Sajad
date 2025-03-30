
import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

export function useOfflineSupport() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [networkStatus, setNetworkStatus] = useState<string | null>(null);
  const [hasPendingChanges, setHasPendingChanges] = useState(false);
  const [unsavedChangesCount, setUnsavedChangesCount] = useState(0);
  const [isSyncingData, setSyncingData] = useState(false);
  const previousIsOnline = useRef(isOnline);
  
  // Function to update network status
  const updateNetworkStatus = useCallback(() => {
    setIsOnline(navigator.onLine);
    setNetworkStatus(navigator.onLine ? 'online' : 'offline');
  }, []);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      updateNetworkStatus();
      toast({
        title: t('offline.backOnline'),
        description: t('offline.backOnlineDesc'),
      });
    };

    const handleOffline = () => {
      updateNetworkStatus();
      toast({
        title: t('offline.offline'),
        description: t('offline.offlineDesc'),
        variant: 'destructive',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial status update
    updateNetworkStatus();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t, updateNetworkStatus]);
  
  // Function to sync offline data - memoize to prevent re-renders
  const syncOfflineData = useCallback(async () => {
    if (!isOnline) {
      toast({
        title: t('offline.syncFailed'),
        description: t('offline.syncFailedOffline'),
        variant: 'destructive',
      });
      return false;
    }

    try {
      setSyncingData(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear pending changes
      setHasPendingChanges(false);
      
      // Reset unsaved changes counter
      setUnsavedChangesCount(0);
      
      // Show success toast
      toast({
        title: t('offline.syncComplete'),
        description: t('offline.syncCompleteDesc'),
      });
      
      return true;
    } catch (error) {
      toast({
        title: t('offline.syncFailed'),
        description: String(error),
        variant: 'destructive',
      });
      return false;
    } finally {
      setSyncingData(false);
    }
  }, [isOnline, t]);

  // Function to save changes locally
  const saveLocally = useCallback(async (data: any) => {
    try {
      // Simulate storage operation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state
      setHasPendingChanges(true);
      setUnsavedChangesCount(prev => prev + 1);
      
      return true;
    } catch (error) {
      toast({
        title: t('offline.saveFailed'),
        description: String(error),
        variant: 'destructive',
      });
      return false;
    }
  }, [t]);

  // Auto-sync when coming back online
  useEffect(() => {
    const current = isOnline;
    const prev = previousIsOnline.current;
    
    if (!prev && current && hasPendingChanges) {
      toast({
        title: t('offline.syncReminder'),
        description: t('offline.syncReminderDesc', { count: unsavedChangesCount }),
        action: (
          <ToastAction 
            altText={t('offline.syncNow')}
            onClick={() => syncOfflineData()}
          >
            {t('offline.syncNow')}
          </ToastAction>
        ),
      });
    }
    
    // Update ref for next comparison
    previousIsOnline.current = current;
  }, [isOnline, hasPendingChanges, unsavedChangesCount, syncOfflineData, t]);

  // Warn about unsaved changes before unload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasPendingChanges) {
        const message = t('offline.unsavedChanges');
        e.returnValue = message;
        return message;
      }
    };
    
    if (hasPendingChanges) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [hasPendingChanges, t]);

  return {
    isOnline,
    isOffline: !isOnline,
    networkStatus,
    hasPendingChanges,
    unsavedChangesCount,
    isSyncingData,
    saveLocally,
    syncOfflineData
  };
}
