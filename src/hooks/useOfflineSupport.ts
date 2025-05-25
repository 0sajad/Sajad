
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface OfflineSupportState {
  isOnline: boolean;
  hasPendingSync: boolean;
  pendingItemsCount: number;
  isSyncing: boolean;
}

export function useOfflineSupport() {
  const [state, setState] = useState<OfflineSupportState>({
    isOnline: navigator.onLine,
    hasPendingSync: false,
    pendingItemsCount: 0,
    isSyncing: false
  });

  const checkConnection = useCallback(async () => {
    try {
      const response = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store'
      });
      
      const isOnline = response.type === 'opaque' || response.ok;
      setState(prev => ({ ...prev, isOnline }));
      
      if (isOnline && !state.isOnline) {
        toast.success('تم استعادة الاتصال بالإنترنت');
      }
      
      return isOnline;
    } catch (error) {
      setState(prev => ({ ...prev, isOnline: false }));
      return false;
    }
  }, [state.isOnline]);

  const syncOfflineData = useCallback(async () => {
    if (state.isSyncing) return;
    
    setState(prev => ({ ...prev, isSyncing: true }));
    
    try {
      // محاكاة مزامنة البيانات
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setState(prev => ({ 
        ...prev, 
        isSyncing: false,
        hasPendingSync: false,
        pendingItemsCount: 0
      }));
      
      toast.success('تم مزامنة البيانات بنجاح');
    } catch (error) {
      setState(prev => ({ ...prev, isSyncing: false }));
      toast.error('فشل في مزامنة البيانات');
    }
  }, [state.isSyncing]);

  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({ ...prev, isOnline: true }));
      toast.success('تم استعادة الاتصال');
    };

    const handleOffline = () => {
      setState(prev => ({ ...prev, isOnline: false }));
      toast.warning('تم قطع الاتصال - وضع عدم الاتصال مفعل');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    ...state,
    checkConnection,
    syncOfflineData
  };
}
