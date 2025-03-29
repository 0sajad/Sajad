
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from './state/use-app-state';
import { toast } from 'sonner';
import { useA11y } from './useA11y';

interface PendingAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  retryCount: number;
}

/**
 * خطاف لإدارة تجربة المستخدم في وضع عدم الاتصال
 * يوفر وظائف للتعامل مع حالة الاتصال وتخزين البيانات مؤقتًا
 */
export function useOfflineSupport() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [hasPendingSync, setHasPendingSync] = useState<boolean>(false);
  const [pendingItemsCount, setPendingItemsCount] = useState<number>(0);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const networkStatus = useAppState(state => state.networkStatus);
  const checkNetworkStatus = useAppState(state => state.checkNetworkStatus);
  const { announce, playNotificationSound } = useA11y?.() || { 
    announce: undefined, 
    playNotificationSound: undefined 
  };
  
  // مراقبة حالة الاتصال بالإنترنت
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (announce) {
        announce(t('network.reconnected', 'تم استعادة الاتصال بالإنترنت'), 'polite');
      }
      if (playNotificationSound) {
        playNotificationSound('success');
      }
      toast.success(t('network.backOnline', 'تم استعادة الاتصال بالإنترنت'));
      checkNetworkStatus(); // تحديث حالة الشبكة في المخزن
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      if (announce) {
        announce(t('network.disconnected', 'انقطع الاتصال بالإنترنت'), 'assertive');
      }
      if (playNotificationSound) {
        playNotificationSound('warning');
      }
      toast.error(t('network.offline', 'انقطع الاتصال بالإنترنت'));
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // تحقق من حالة الشبكة عند تركيب المكون
    checkNetworkStatus();
    loadPendingActions();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t, announce, playNotificationSound, checkNetworkStatus]);
  
  // تحديث حالة الاتصال من مخزن الحالة
  useEffect(() => {
    setIsOnline(networkStatus.isOnline);
  }, [networkStatus]);
  
  // تحديث عدد العناصر المعلقة
  useEffect(() => {
    setHasPendingSync(pendingActions.length > 0);
    setPendingItemsCount(pendingActions.length);
  }, [pendingActions]);
  
  // تخزين الإجراءات المعلقة في التخزين المحلي عند تغييرها
  useEffect(() => {
    if (pendingActions.length > 0) {
      localStorage.setItem('pendingActions', JSON.stringify(pendingActions));
    }
  }, [pendingActions]);
  
  // تحميل الإجراءات المعلقة من التخزين المحلي
  const loadPendingActions = useCallback(() => {
    try {
      const savedActions = localStorage.getItem('pendingActions');
      if (savedActions) {
        const actions: PendingAction[] = JSON.parse(savedActions);
        setPendingActions(actions);
      }
    } catch (error) {
      console.error('Error loading pending actions:', error);
    }
  }, []);
  
  // إضافة إجراء جديد إلى قائمة الانتظار
  const addPendingAction = useCallback((type: string, data: any) => {
    const newAction: PendingAction = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };
    
    setPendingActions(prev => [...prev, newAction]);
    toast.info(t('network.actionSavedOffline', 'تم حفظ الإجراء في وضع عدم الاتصال'));
    
    return newAction.id;
  }, [t]);
  
  // حذف إجراء من قائمة الانتظار
  const removePendingAction = useCallback((id: string) => {
    setPendingActions(prev => prev.filter(action => action.id !== id));
  }, []);
  
  // فحص حالة الاتصال يدويًا
  const checkConnection = useCallback(async () => {
    try {
      const isNowOnline = await checkNetworkStatus();
      
      if (isNowOnline && !isOnline) {
        toast.success(t('network.connectionRestored', 'تم استعادة الاتصال بالإنترنت'));
        if (announce) {
          announce(t('network.connectionRestored', 'تم استعادة الاتصال بالإنترنت'), 'polite');
        }
      } else if (!isNowOnline) {
        toast.error(t('network.stillOffline', 'ما زلت غير متصل بالإنترنت'));
        if (announce) {
          announce(t('network.stillOffline', 'ما زلت غير متصل بالإنترنت'), 'polite');
        }
      }
      
      return isNowOnline;
    } catch (error) {
      console.error('Error checking connection:', error);
      return false;
    }
  }, [isOnline, checkNetworkStatus, t, announce]);
  
  // مزامنة البيانات المعلقة عند استعادة الاتصال
  const syncOfflineData = useCallback(async () => {
    if (!isOnline || pendingActions.length === 0 || isSyncing) {
      return;
    }
    
    setIsSyncing(true);
    
    try {
      toast.info(t('network.syncingData', 'جارِ مزامنة البيانات المعلقة...'));
      if (announce) {
        announce(t('network.syncingData', 'جارِ مزامنة البيانات المعلقة'), 'polite');
      }
      
      // محاكاة المزامنة - هنا يمكن تنفيذ المنطق الحقيقي
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // محاكاة نجاح المزامنة
      setPendingActions([]);
      localStorage.removeItem('pendingActions');
      
      setLastSyncTime(new Date());
      toast.success(t('network.syncComplete', 'تم مزامنة جميع البيانات بنجاح'));
      if (announce) {
        announce(t('network.syncComplete', 'تم مزامنة جميع البيانات بنجاح'), 'polite');
      }
      if (playNotificationSound) {
        playNotificationSound('success');
      }
    } catch (error) {
      console.error('Error syncing offline data:', error);
      toast.error(t('network.syncFailed', 'فشلت مزامنة البيانات'));
      if (announce) {
        announce(t('network.syncFailed', 'فشلت مزامنة البيانات'), 'assertive');
      }
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, pendingActions, isSyncing, t, announce, playNotificationSound]);
  
  // مزامنة تلقائية عند استعادة الاتصال
  useEffect(() => {
    if (isOnline && pendingActions.length > 0 && !isSyncing) {
      const timer = setTimeout(() => {
        syncOfflineData();
      }, 5000); // تأخير المزامنة التلقائية لتجنب المزامنة الفورية عند تقلبات الشبكة
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, pendingActions, isSyncing, syncOfflineData]);
  
  return {
    isOnline,
    hasPendingSync,
    pendingItemsCount,
    pendingActions,
    isSyncing,
    lastSyncTime,
    addPendingAction,
    removePendingAction,
    syncOfflineData,
    checkConnection,
    networkStatus
  };
}
