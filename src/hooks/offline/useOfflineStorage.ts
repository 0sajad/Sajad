
import { useState, useCallback } from 'react';

/**
 * خطاف لإدارة التخزين المحلي للبيانات في وضع عدم الاتصال
 */
export function useOfflineStorage() {
  const [isLoading, setIsLoading] = useState(false);

  // حفظ البيانات في التخزين المحلي
  const saveData = useCallback((key: string, data: any): boolean => {
    try {
      const storageKey = `offline_${key}`;
      const storageData = {
        data,
        timestamp: Date.now()
      };
      
      localStorage.setItem(storageKey, JSON.stringify(storageData));
      
      // تحديث سجل العناصر غير المتزامنة
      const syncRegistry = JSON.parse(localStorage.getItem('offline_sync_registry') || '{}');
      syncRegistry[key] = Date.now();
      localStorage.setItem('offline_sync_registry', JSON.stringify(syncRegistry));
      
      return true;
    } catch (error) {
      console.error('فشل في حفظ البيانات محليًا:', error);
      return false;
    }
  }, []);

  // استرداد البيانات من التخزين المحلي
  const getData = useCallback((key: string): { data: any; timestamp: number } | null => {
    try {
      const storageKey = `offline_${key}`;
      const storedData = localStorage.getItem(storageKey);
      
      if (storedData) {
        return JSON.parse(storedData);
      }
      
      return null;
    } catch (error) {
      console.error('فشل في استرداد البيانات المحلية:', error);
      return null;
    }
  }, []);

  // حذف البيانات من التخزين المحلي
  const removeData = useCallback((key: string): boolean => {
    try {
      const storageKey = `offline_${key}`;
      localStorage.removeItem(storageKey);
      
      // تحديث سجل العناصر غير المتزامنة
      const syncRegistry = JSON.parse(localStorage.getItem('offline_sync_registry') || '{}');
      delete syncRegistry[key];
      localStorage.setItem('offline_sync_registry', JSON.stringify(syncRegistry));
      
      return true;
    } catch (error) {
      console.error('فشل في حذف البيانات المحلية:', error);
      return false;
    }
  }, []);

  // الحصول على قائمة بجميع العناصر غير المتزامنة
  const getPendingItems = useCallback((): Record<string, number> => {
    try {
      return JSON.parse(localStorage.getItem('offline_sync_registry') || '{}');
    } catch (error) {
      console.error('فشل في استرداد قائمة العناصر غير المتزامنة:', error);
      return {};
    }
  }, []);

  // مسح جميع البيانات غير المتزامنة
  const clearAllData = useCallback((): boolean => {
    try {
      const syncRegistry = getPendingItems();
      
      // حذف كل عنصر
      Object.keys(syncRegistry).forEach(key => {
        const storageKey = `offline_${key}`;
        localStorage.removeItem(storageKey);
      });
      
      // مسح السجل
      localStorage.removeItem('offline_sync_registry');
      
      return true;
    } catch (error) {
      console.error('فشل في مسح البيانات المحلية:', error);
      return false;
    }
  }, [getPendingItems]);

  return {
    saveData,
    getData,
    removeData,
    getPendingItems,
    clearAllData,
    isLoading
  };
}
