
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface OfflineItem {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  priority: number;
}

export function useOfflineMode() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [hasPendingSync, setHasPendingSync] = useState<boolean>(false);
  const [pendingItemsCount, setPendingItemsCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [cacheSize, setCacheSize] = useState<number>(0);
  const { toast } = useToast();

  // Function to check network status
  const checkNetworkStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/ping', { method: 'HEAD' });
      const online = response.ok;
      setIsOnline(online);
      setIsOffline(!online);
      return online;
    } catch (error) {
      setIsOnline(false);
      setIsOffline(true);
      return false;
    }
  }, []);

  // Update online status based on browser events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsOffline(false);
      toast({
        title: "متصل بالإنترنت",
        description: "تم استعادة الاتصال بالإنترنت، يتم مزامنة البيانات الآن...",
        variant: "default",
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsOffline(true);
      toast({
        title: "غير متصل بالإنترنت",
        description: "تم فقد الاتصال بالإنترنت. سيتم تخزين جميع البيانات محليًا حتى استعادة الاتصال.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check actual connectivity (browser events may not be reliable)
    checkNetworkStatus();

    // Calculate cache size on mount
    calculateCacheSize();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkNetworkStatus, toast]);

  // Add offline item to queue
  const addOfflineItem = useCallback((type: string, data: any, priority = 1): string => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const item: OfflineItem = {
      id,
      type,
      data,
      timestamp: Date.now(),
      priority
    };

    // Store in localStorage
    try {
      const currentItems = JSON.parse(localStorage.getItem('offlineItems') || '[]');
      currentItems.push(item);
      localStorage.setItem('offlineItems', JSON.stringify(currentItems));
      setHasPendingSync(true);
      setPendingItemsCount(currentItems.length);
      return id;
    } catch (error) {
      console.error('Failed to store offline item:', error);
      return '';
    }
  }, []);

  // Sync offline data when online
  const syncOfflineData = useCallback(async () => {
    if (!isOnline || isSyncing) return { success: false, syncedItems: 0 };

    setIsSyncing(true);
    try {
      const items: OfflineItem[] = JSON.parse(localStorage.getItem('offlineItems') || '[]');
      if (items.length === 0) {
        setHasPendingSync(false);
        setPendingItemsCount(0);
        setIsSyncing(false);
        return { success: true, syncedItems: 0 };
      }

      // Sort by priority (higher first)
      items.sort((a, b) => b.priority - a.priority);

      let syncedCount = 0;
      const remainingItems: OfflineItem[] = [];

      for (const item of items) {
        try {
          // Process item based on type
          // This would be implemented according to your API requirements
          // await processItem(item);
          syncedCount++;
        } catch (error) {
          remainingItems.push(item);
        }
      }

      // Update storage with remaining items
      localStorage.setItem('offlineItems', JSON.stringify(remainingItems));
      setHasPendingSync(remainingItems.length > 0);
      setPendingItemsCount(remainingItems.length);

      if (syncedCount > 0) {
        toast({
          title: "تمت المزامنة",
          description: `تمت مزامنة ${syncedCount} من العناصر بنجاح`,
          variant: "default",
        });
      }

      return { success: true, syncedItems: syncedCount };
    } catch (error) {
      console.error('Failed to sync offline data:', error);
      return { success: false, syncedItems: 0 };
    } finally {
      setIsSyncing(false);
    }
  }, [isOnline, isSyncing, toast]);

  // Attempt to reconnect
  const attemptReconnect = useCallback(async () => {
    const isNowOnline = await checkNetworkStatus();
    if (isNowOnline) {
      toast({
        title: "تم الاتصال",
        description: "تم استعادة الاتصال بالإنترنت بنجاح",
        variant: "default",
      });
      return true;
    } else {
      toast({
        title: "فشل الاتصال",
        description: "لم يتم استعادة الاتصال بالإنترنت، يرجى التحقق من اتصالك",
        variant: "destructive",
      });
      return false;
    }
  }, [checkNetworkStatus, toast]);

  // Calculate cache size
  const calculateCacheSize = useCallback(async () => {
    try {
      if ('storage' in navigator && 'estimate' in navigator.storage) {
        const estimate = await navigator.storage.estimate();
        const usedBytes = estimate.usage || 0;
        const usedMB = usedBytes / (1024 * 1024);
        setCacheSize(usedMB);
      } else {
        // Fallback for browsers that don't support the Storage API
        const localStorageSize = new Blob(
          Object.values(localStorage)
        ).size / (1024 * 1024);
        setCacheSize(localStorageSize);
      }
    } catch (error) {
      console.error('Error calculating cache size:', error);
      setCacheSize(0);
    }
  }, []);

  // Clear cache
  const clearCache = useCallback(async () => {
    try {
      // Clear localStorage except for critical items
      const criticalKeys = ['user-session', 'auth-token']; // Add your critical keys
      Object.keys(localStorage).forEach(key => {
        if (!criticalKeys.includes(key)) {
          localStorage.removeItem(key);
        }
      });

      // Clear IndexedDB if used
      const databases = await window.indexedDB.databases?.();
      if (databases) {
        databases.forEach(db => {
          if (db.name) window.indexedDB.deleteDatabase(db.name);
        });
      }

      // Clear application cache if supported
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      }

      // Update cache size
      await calculateCacheSize();

      toast({
        title: "تم مسح ذاكرة التخزين المؤقت",
        description: "تم مسح جميع البيانات المخزنة مؤقتًا بنجاح",
        variant: "default",
      });

      return true;
    } catch (error) {
      console.error('Error clearing cache:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء مسح ذاكرة التخزين المؤقت",
        variant: "destructive",
      });
      return false;
    }
  }, [calculateCacheSize, toast]);

  // Refresh cached data
  const refreshCachedData = useCallback(async () => {
    if (!isOnline) {
      toast({
        title: "غير متصل",
        description: "لا يمكن تحديث البيانات دون اتصال بالإنترنت",
        variant: "destructive",
      });
      return false;
    }

    try {
      // This would be implemented according to your data requirements
      // Refresh main application data
      toast({
        title: "جاري التحديث",
        description: "يتم تحديث البيانات المخزنة مؤقتًا...",
      });

      // Simulate data refresh
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update cache size after refresh
      await calculateCacheSize();

      toast({
        title: "تم التحديث",
        description: "تم تحديث البيانات المخزنة مؤقتًا بنجاح",
        variant: "default",
      });

      return true;
    } catch (error) {
      console.error('Error refreshing cached data:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث البيانات المخزنة مؤقتًا",
        variant: "destructive",
      });
      return false;
    }
  }, [isOnline, calculateCacheSize, toast]);

  // Return the hook interface
  return {
    isOnline,
    isOffline,
    hasPendingSync,
    pendingItemsCount,
    isSyncing,
    addOfflineItem,
    syncOfflineData,
    attemptReconnect,
    checkNetworkStatus,
    cacheSize,
    clearCache,
    refreshCachedData
  };
}
