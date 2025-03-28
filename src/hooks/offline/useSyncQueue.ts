
import { useState, useCallback } from 'react';
import { useOfflineStorage } from './useOfflineStorage';
import { useNetworkManager } from '../network/useNetworkManager';

type SyncItemType = 'form' | 'preference' | 'data' | 'api';
type SyncPriority = 1 | 2 | 3 | 4 | 5; // 1 = أعلى أولوية، 5 = أقل أولوية

interface SyncItem {
  id: string;
  type: SyncItemType;
  endpoint?: string;
  data: any;
  method?: string;
  timestamp: number;
  priority: SyncPriority;
  retryCount?: number;
}

interface SyncResult {
  success: boolean;
  failedItems: SyncItem[];
  syncedItems: SyncItem[];
}

/**
 * خطاف لإدارة طابور المزامنة للبيانات غير المتصلة
 */
export function useSyncQueue() {
  const { isOnline } = useNetworkManager();
  const { saveData, getData, removeData, getPendingItems } = useOfflineStorage();
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [queue, setQueue] = useState<SyncItem[]>([]);
  const [lastSyncResult, setLastSyncResult] = useState<SyncResult | null>(null);

  // إضافة عنصر إلى طابور المزامنة
  const addToQueue = useCallback((
    type: SyncItemType,
    data: any,
    options?: {
      endpoint?: string;
      method?: string;
      priority?: SyncPriority;
    }
  ): string => {
    const { endpoint, method = 'POST', priority = 3 } = options || {};
    
    const id = `queue_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    const newItem: SyncItem = {
      id,
      type,
      endpoint,
      data,
      method,
      timestamp: Date.now(),
      priority,
      retryCount: 0
    };
    
    setQueue(prevQueue => {
      const updatedQueue = [...prevQueue, newItem].sort((a, b) => a.priority - b.priority);
      return updatedQueue;
    });
    
    // حفظ في التخزين المحلي أيضًا
    saveData(id, newItem);
    
    return id;
  }, [saveData]);

  // تحميل العناصر المعلقة من التخزين المحلي
  const loadPendingItems = useCallback(() => {
    const pendingItems = getPendingItems();
    const items: SyncItem[] = [];
    
    Object.keys(pendingItems).forEach(key => {
      const item = getData(key);
      if (item && item.data) {
        items.push(item.data as SyncItem);
      }
    });
    
    if (items.length > 0) {
      setQueue(prevQueue => {
        const combinedQueue = [...prevQueue, ...items]
          .filter((item, index, self) => 
            // إزالة العناصر المكررة
            index === self.findIndex(t => t.id === item.id)
          )
          .sort((a, b) => a.priority - b.priority);
          
        return combinedQueue;
      });
    }
    
    return items.length;
  }, [getData, getPendingItems]);

  // تنفيذ مزامنة العناصر في الطابور
  const syncQueue = useCallback(async (): Promise<SyncResult> => {
    if (!isOnline || isSyncing || queue.length === 0) {
      return { success: false, failedItems: [...queue], syncedItems: [] };
    }
    
    setIsSyncing(true);
    
    const failedItems: SyncItem[] = [];
    const syncedItems: SyncItem[] = [];
    
    for (const item of queue) {
      try {
        let synced = false;
        
        // محاكاة المزامنة لأغراض التوضيح
        if (item.endpoint) {
          console.log(`مزامنة العنصر مع النقطة النهائية: ${item.endpoint}`, item);
          // هنا سيتم إرسال البيانات إلى الخادم
          await new Promise(resolve => setTimeout(resolve, 300));
          synced = true;
        } else {
          switch (item.type) {
            case 'form':
              console.log('مزامنة بيانات النموذج:', item.data);
              await new Promise(resolve => setTimeout(resolve, 200));
              synced = true;
              break;
              
            case 'preference':
              console.log('مزامنة التفضيلات:', item.data);
              await new Promise(resolve => setTimeout(resolve, 100));
              synced = true;
              break;
              
            case 'data':
              console.log('مزامنة البيانات العامة:', item.data);
              await new Promise(resolve => setTimeout(resolve, 150));
              synced = true;
              break;
              
            default:
              console.warn('نوع غير معروف من العناصر:', item);
              failedItems.push({ ...item, retryCount: (item.retryCount || 0) + 1 });
          }
        }
        
        if (synced) {
          syncedItems.push(item);
          removeData(item.id);
        }
      } catch (error) {
        console.error('خطأ أثناء مزامنة العنصر:', item, error);
        failedItems.push({ ...item, retryCount: (item.retryCount || 0) + 1 });
      }
    }
    
    // تحديث الطابور لإزالة العناصر التي تمت مزامنتها
    setQueue(failedItems);
    
    const result = { 
      success: failedItems.length === 0, 
      failedItems, 
      syncedItems 
    };
    
    setLastSyncResult(result);
    setIsSyncing(false);
    
    return result;
  }, [isOnline, isSyncing, queue, removeData]);

  // إعادة محاولة مزامنة العناصر الفاشلة
  const retryFailedItems = useCallback(async (): Promise<SyncResult> => {
    // إعادة ترتيب العناصر الفاشلة حسب عدد مرات المحاولة (الأقل أولًا)
    setQueue(prevQueue => 
      [...prevQueue].sort((a, b) => (a.retryCount || 0) - (b.retryCount || 0))
    );
    
    return syncQueue();
  }, [syncQueue]);

  return {
    addToQueue,
    loadPendingItems,
    syncQueue,
    retryFailedItems,
    queue,
    isSyncing,
    lastSyncResult,
    queueLength: queue.length
  };
}
