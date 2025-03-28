
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
    appState.setState({ 
      networkStatus: { 
        ...appState.networkStatus, 
        isConnected: status.isConnected, 
        isOnline: status.isOnline,
        lastCheck: new Date()
      } 
    });
  };
  
  const [isOffline, setIsOffline] = useState(!isOnline);
  const [pendingSyncItems, setPendingSyncItems] = useState<OfflineSyncItem[]>([]);
  const [syncInProgress, setSyncInProgress] = useState(false);
  
  // الاستماع إلى أحداث الاتصال بالشبكة
  useEffect(() => {
    const handleOnline = async () => {
      // التحقق من حالة الاتصال بالفعل (وليس فقط الاعتماد على أحداث الشبكة)
      const isActuallyOnline = await checkNetworkStatus();
      
      if (isActuallyOnline) {
        setIsOffline(false);
        setNetworkStatus({ isConnected: true, isOnline: true });
        
        // إعلام المستخدم
        toast.success(
          t('network.backOnline', 'تمت استعادة الاتصال'),
          {
            description: hasPendingSync() 
              ? t('network.syncPending', 'جاري مزامنة البيانات المحفوظة محليًا')
              : undefined,
            duration: 3000
          }
        );
        
        // مزامنة البيانات المخزنة محليًا
        if (hasPendingSync() && appState.preferences?.autoSave) {
          syncOfflineData();
        }
      }
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      setNetworkStatus({ isConnected: false, isOnline: false });
      
      // إعلام المستخدم
      toast.warning(
        t('network.offline', 'تم فقدان الاتصال'),
        {
          description: t('network.offlineDescription', 'سيتم حفظ التغييرات محليًا ومزامنتها عند استعادة الاتصال'),
          duration: 5000
        }
      );
    };
    
    // الاستماع إلى أحداث الشبكة
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // التحقق من الحالة الأولية
    if (!isOnline) {
      setIsOffline(true);
    }
    
    // تحميل العناصر المعلقة من التخزين المحلي
    loadPendingSyncItems();
    
    // التحقق من حالة الاتصال دوريًا
    const checkInterval = setInterval(async () => {
      if (isOffline) {
        // محاولة إعادة الاتصال
        const isActuallyOnline = await checkNetworkStatus();
        if (isActuallyOnline) {
          handleOnline();
        }
      }
    }, 30000); // التحقق كل 30 ثانية
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(checkInterval);
    };
  }, [isOnline, checkNetworkStatus, setNetworkStatus, t, isOffline, appState.preferences]);
  
  // تحميل العناصر المعلقة من التخزين المحلي
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
  
  // حفظ العناصر المعلقة في التخزين المحلي
  const savePendingSyncItems = useCallback((items: OfflineSyncItem[]) => {
    try {
      localStorage.setItem('offline_sync_items', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving offline sync items:', error);
    }
  }, []);
  
  // إضافة عنصر للمزامنة عندما يعود الاتصال
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
  
  // التحقق مما إذا كان هناك عناصر معلقة للمزامنة
  const hasPendingSync = useCallback(() => {
    return pendingSyncItems.length > 0;
  }, [pendingSyncItems]);
  
  // مزامنة البيانات المخزنة محليًا
  const syncOfflineData = useCallback(async () => {
    if (syncInProgress || !isOnline || pendingSyncItems.length === 0) {
      return;
    }
    
    setSyncInProgress(true);
    
    try {
      // تكرار المصفوفة لتجنب مشاكل التحديث المتزامن
      const itemsToSync = [...pendingSyncItems];
      const failedItems: OfflineSyncItem[] = [];
      
      // إعلام المستخدم
      const toastId = toast.loading(
        t('network.syncing', 'جاري المزامنة'),
        {
          description: t('network.syncingItems', 'جاري مزامنة {{count}} عنصر', { count: itemsToSync.length }),
          duration: Infinity
        }
      );
      
      for (const item of itemsToSync) {
        try {
          // هنا يتم تنفيذ المزامنة الفعلية حسب نوع العنصر
          // هذا مجرد مثال، ويجب تنفيذ المنطق الفعلي حسب متطلبات التطبيق
          switch (item.type) {
            case 'form_submission':
              // إرسال بيانات النموذج إلى الخادم
              // await api.submitForm(item.data);
              console.log('Syncing form submission:', item.data);
              await new Promise(resolve => setTimeout(resolve, 500)); // تأخير وهمي للمحاكاة
              break;
            
            case 'user_preference':
              // تحديث تفضيلات المستخدم على الخادم
              // await api.updatePreferences(item.data);
              console.log('Syncing user preference:', item.data);
              await new Promise(resolve => setTimeout(resolve, 300)); // تأخير وهمي للمحاكاة
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
      
      // تحديث قائمة العناصر المعلقة
      setPendingSyncItems(failedItems);
      savePendingSyncItems(failedItems);
      
      // إعلام المستخدم
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
  
  // محاولة إعادة الاتصال يدويًا
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
