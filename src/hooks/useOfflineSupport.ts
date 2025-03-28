
import { useEffect, useState } from 'react';
import { useNetworkManager } from './network/useNetworkManager';
import { useSyncQueue } from './offline/useSyncQueue';
import { useOfflineStorage } from './offline/useOfflineStorage';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

/**
 * خطاف موحّد لإدارة حالة الاتصال بالإنترنت وتوفير دعم وضع عدم الاتصال
 * تم إعادة هيكلته لتحسين الأداء والقابلية للصيانة
 */
export function useOfflineSupport() {
  const { t } = useTranslation();
  const { isOnline, checkNetworkStatus } = useNetworkManager();
  const { addToQueue, syncQueue, queue, isSyncing, loadPendingItems } = useSyncQueue();
  const { saveData, getData, removeData } = useOfflineStorage();
  
  const [offlineReady, setOfflineReady] = useState(false);
  
  // تهيئة دعم عدم الاتصال
  useEffect(() => {
    // تحميل العناصر المعلقة من التخزين المحلي
    const pendingCount = loadPendingItems();
    
    // إذا كان هناك عناصر معلقة وكان المستخدم متصلًا، ابدأ المزامنة
    if (pendingCount > 0 && isOnline) {
      toast.info(
        t('network.pendingSync', 'بيانات غير متزامنة'),
        {
          description: t('network.syncStarting', 'جاري البدء في مزامنة {{count}} عنصر', { count: pendingCount }),
          duration: 5000,
          action: {
            label: t('common.sync', 'مزامنة الآن'),
            onClick: () => syncQueue()
          }
        }
      );
    }
    
    setOfflineReady(true);
  }, [isOnline, loadPendingItems, syncQueue, t]);
  
  // مزامنة تلقائية عند استعادة الاتصال
  useEffect(() => {
    if (isOnline && queue.length > 0 && !isSyncing) {
      syncQueue().then(result => {
        if (result.success) {
          toast.success(
            t('network.syncComplete', 'تمت المزامنة بنجاح'),
            { duration: 3000 }
          );
        } else if (result.syncedItems.length > 0) {
          toast.warning(
            t('network.syncPartial', 'تمت المزامنة جزئيًا'),
            {
              description: t('network.syncPartialDetails', 'تمت مزامنة {{synced}} من {{total}} عنصر', { 
                synced: result.syncedItems.length,
                total: result.syncedItems.length + result.failedItems.length
              }),
              duration: 5000
            }
          );
        }
      });
    }
  }, [isOnline, queue.length, isSyncing, syncQueue, t]);
  
  // وظيفة لإرسال البيانات مع دعم وضع عدم الاتصال
  const sendData = async (endpoint: string, data: any, options?: {
    method?: string;
    priority?: 1 | 2 | 3 | 4 | 5;
    headers?: Record<string, string>;
    retryOnReconnect?: boolean;
  }): Promise<{ success: boolean; offline?: boolean; data?: any }> => {
    const { 
      method = 'POST', 
      priority = 3, 
      headers = { 'Content-Type': 'application/json' },
      retryOnReconnect = true 
    } = options || {};
    
    // إذا كان المستخدم متصلاً، أرسل البيانات مباشرة
    if (isOnline) {
      try {
        const response = await fetch(endpoint, {
          method,
          headers,
          body: typeof data === 'string' ? data : JSON.stringify(data)
        });
        
        if (response.ok) {
          return { 
            success: true, 
            data: await response.json().catch(() => null) 
          };
        } else {
          // إذا فشل الطلب وكان مطلوبًا إعادة المحاولة، حفظ البيانات محليًا
          if (retryOnReconnect) {
            addToQueue('api', data, { endpoint, method, priority });
            
            toast.info(
              t('network.requestFailed', 'فشل الطلب'),
              {
                description: t('network.savedForLater', 'تم حفظ البيانات للمزامنة لاحقًا'),
                duration: 5000
              }
            );
          }
          
          return { success: false };
        }
      } catch (error) {
        // إذا حدث خطأ في الشبكة، حفظ البيانات محليًا
        if (retryOnReconnect) {
          addToQueue('api', data, { endpoint, method, priority });
          
          toast.info(
            t('network.connectionError', 'خطأ في الاتصال'),
            {
              description: t('network.dataSaved', 'تم حفظ البيانات للمزامنة لاحقًا'),
              duration: 5000
            }
          );
        }
        
        return { success: false, offline: true };
      }
    } else {
      // إذا كان المستخدم غير متصل، حفظ البيانات محليًا
      addToQueue('api', data, { endpoint, method, priority });
      
      toast.info(
        t('network.offlineMode', 'وضع عدم الاتصال'),
        {
          description: t('network.dataSaved', 'تم حفظ البيانات للمزامنة عند استعادة الاتصال'),
          duration: 5000
        }
      );
      
      return { success: false, offline: true };
    }
  };
  
  return {
    isOnline,
    hasPendingSync: queue.length > 0,
    isSyncing,
    pendingItemsCount: queue.length,
    offlineReady,
    
    saveOfflineData: saveData,
    getOfflineData: getData,
    syncOfflineData: syncQueue,
    sendData,
    checkConnection: checkNetworkStatus
  };
}
