
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from './state/use-app-state';
import { useToast } from '@/components/ui/use-toast';
import { useA11y } from './useA11y';
import { useOfflineStorage } from './offline/useOfflineStorage';

interface PendingAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  retryCount: number;
  priority: number;
}

/**
 * خطاف لإدارة تجربة المستخدم في وضع عدم الاتصال
 * يوفر وظائف للتعامل مع حالة الاتصال وتخزين البيانات مؤقتًا
 */
export function useOfflineSupport() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [hasPendingSync, setHasPendingSync] = useState<boolean>(false);
  const [pendingItemsCount, setPendingItemsCount] = useState<number>(0);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [syncProgress, setSyncProgress] = useState<number>(0);
  const [failedSyncAttempts, setFailedSyncAttempts] = useState<number>(0);
  const networkStatus = useAppState(state => state.networkStatus);
  const checkNetworkStatus = useAppState(state => state.checkNetworkStatus);
  const { announce, playNotificationSound } = useA11y?.() || { 
    announce: undefined, 
    playNotificationSound: undefined 
  };
  const { 
    saveData, 
    getData, 
    removeData, 
    getPendingItems, 
    clearAllData 
  } = useOfflineStorage();
  
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
      toast({
        title: t('network.backOnline', 'متصل بالإنترنت'),
        description: t('network.backOnlineDescription', 'تم استعادة الاتصال بالإنترنت'),
        duration: 3000
      });
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
      toast({
        title: t('network.offline', 'غير متصل بالإنترنت'),
        description: t('network.offlineDescription', 'تم فقدان الاتصال بالإنترنت'),
        variant: "destructive",
        duration: 5000
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // تحقق من حالة الاتصال عند تركيب المكون
    checkConnection();
    loadPendingActions();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [t, announce, playNotificationSound, checkNetworkStatus, toast]);
  
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
      saveData('pendingActions', pendingActions, {
        priority: 10, // أولوية عالية
        expiresIn: 7 * 24 * 60 * 60 * 1000 // تنتهي بعد أسبوع
      });
    }
  }, [pendingActions, saveData]);
  
  // تحميل الإجراءات المعلقة من التخزين المحلي
  const loadPendingActions = useCallback(() => {
    try {
      const storedActions = getData<PendingAction[]>('pendingActions');
      if (storedActions && storedActions.data) {
        setPendingActions(storedActions.data);
      }
    } catch (error) {
      console.error('Error loading pending actions:', error);
    }
  }, [getData]);
  
  // إضافة إجراء جديد إلى قائمة الانتظار
  const addPendingAction = useCallback((type: string, data: any, priority: number = 1): string => {
    const newAction: PendingAction = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      data,
      timestamp: Date.now(),
      retryCount: 0,
      priority
    };
    
    setPendingActions(prev => [...prev, newAction]);
    toast.info(t('network.actionSavedOffline', 'تم حفظ الإجراء في وضع عدم الاتصال'));
    
    return newAction.id;
  }, [t, toast]);
  
  // حذف إجراء من قائمة الانتظار
  const removePendingAction = useCallback((id: string) => {
    setPendingActions(prev => prev.filter(action => action.id !== id));
  }, []);
  
  // تحديد أولوية إجراء معلق
  const updateActionPriority = useCallback((id: string, priority: number) => {
    setPendingActions(prev => 
      prev.map(action => 
        action.id === id ? { ...action, priority } : action
      )
    );
  }, []);
  
  // فحص حالة الاتصال يدويًا
  const checkConnection = useCallback(async () => {
    try {
      const isNowOnline = await checkNetworkStatus();
      
      setIsOnline(isNowOnline);
      
      if (isNowOnline && !isOnline && hasPendingSync) {
        toast({
          title: t('network.connectionRestored', 'تم استعادة الاتصال بالإنترنت'),
          description: t('network.syncRecommended', 'يوصى بمزامنة البيانات المعلقة'),
          action: {
            label: t('network.syncNow', 'مزامنة الآن'),
            onClick: () => syncOfflineData()
          }
        });
      } else if (isNowOnline && !isOnline) {
        toast.success(t('network.connectionRestored', 'تم استعادة الاتصال بالإنترنت'));
      } else if (!isNowOnline) {
        toast.error(t('network.stillOffline', 'ما زلت غير متصل بالإنترنت'));
      }
      
      return isNowOnline;
    } catch (error) {
      console.error('Error checking connection:', error);
      setIsOnline(false);
      toast.error(t('network.connectionError', 'خطأ في فحص الاتصال'));
      return false;
    }
  }, [checkNetworkStatus, isOnline, hasPendingSync, t, toast, syncOfflineData]);
  
  // مزامنة البيانات المعلقة عند استعادة الاتصال
  const syncOfflineData = useCallback(async () => {
    if (!isOnline || pendingActions.length === 0 || isSyncing) {
      return;
    }
    
    setIsSyncing(true);
    setSyncProgress(0);
    
    try {
      toast.info(t('network.syncingData', 'جارِ مزامنة البيانات المعلقة...'));
      if (announce) {
        announce(t('network.syncingData', 'جارِ مزامنة البيانات المعلقة'), 'polite');
      }
      
      // ترتيب الإجراءات حسب الأولوية (الأعلى أولاً)
      const sortedActions = [...pendingActions].sort((a, b) => b.priority - a.priority);
      
      // مزامنة كل إجراء على حدة مع تقدم نسبي
      let completedCount = 0;
      const totalCount = sortedActions.length;
      
      for (const action of sortedActions) {
        try {
          // هنا يتم محاكاة عملية المزامنة للإجراء
          await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
          
          // زيادة عداد المزامنة المكتملة
          completedCount++;
          setSyncProgress((completedCount / totalCount) * 100);
          
          // إزالة الإجراء المكتمل
          removePendingAction(action.id);
          
        } catch (error) {
          console.error(`Error syncing action ${action.type}:`, error);
          
          // زيادة عداد المحاولات الفاشلة
          const updatedAction = {
            ...action,
            retryCount: action.retryCount + 1
          };
          
          // إعادة إضافة الإجراء مع زيادة عداد المحاولات
          setPendingActions(prev => 
            prev.map(a => a.id === action.id ? updatedAction : a)
          );
          
          // إذا فشلت المزامنة بعد عدة محاولات، خفض الأولوية
          if (updatedAction.retryCount >= 3) {
            updateActionPriority(action.id, Math.max(1, action.priority - 1));
          }
        }
      }
      
      setLastSyncTime(new Date());
      setFailedSyncAttempts(0);
      
      toast.success(t('network.syncComplete', 'تم مزامنة جميع البيانات بنجاح'));
      if (announce) {
        announce(t('network.syncComplete', 'تم مزامنة جميع البيانات بنجاح'), 'polite');
      }
      if (playNotificationSound) {
        playNotificationSound('success');
      }
    } catch (error) {
      console.error('Error syncing offline data:', error);
      
      setFailedSyncAttempts(prevCount => prevCount + 1);
      
      toast.error(t('network.syncFailed', 'فشلت مزامنة البيانات'));
      if (announce) {
        announce(t('network.syncFailed', 'فشلت مزامنة البيانات'), 'assertive');
      }
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  }, [isOnline, pendingActions, isSyncing, t, announce, playNotificationSound, toast, removePendingAction, updateActionPriority]);
  
  // مزامنة تلقائية عند استعادة الاتصال
  useEffect(() => {
    if (isOnline && pendingActions.length > 0 && !isSyncing) {
      const timer = setTimeout(() => {
        syncOfflineData();
      }, 5000); // تأخير المزامنة التلقائية لتجنب المزامنة الفورية عند تقلبات الشبكة
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, pendingActions, isSyncing, syncOfflineData]);
  
  // مسح جميع الإجراءات المعلقة
  const clearPendingActions = useCallback(() => {
    setPendingActions([]);
    removeData('pendingActions');
    
    toast({
      title: t('network.actionsCleared', 'تم مسح الإجراءات'),
      description: t('network.allPendingActionsCleared', 'تم مسح جميع الإجراءات المعلقة')
    });
    
  }, [removeData, t, toast]);
  
  return {
    isOnline,
    hasPendingSync,
    pendingItemsCount,
    pendingActions,
    isSyncing,
    lastSyncTime,
    syncProgress,
    failedSyncAttempts,
    addPendingAction,
    removePendingAction,
    updateActionPriority,
    syncOfflineData,
    checkConnection,
    clearPendingActions,
    networkStatus
  };
}
