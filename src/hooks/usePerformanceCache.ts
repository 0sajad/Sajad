
import { useState, useEffect, useCallback } from 'react';
import { usePerformanceOptimization } from './usePerformanceOptimization';

type CacheEntry<T> = {
  data: T;
  timestamp: number;
  ttl: number;
};

/**
 * خطاف لإدارة التخزين المؤقت وتحسين الأداء
 */
export function usePerformanceCache() {
  const { deviceTier } = usePerformanceOptimization();
  const [cache] = useState<Map<string, CacheEntry<any>>>(new Map());
  
  // تحديد مدة التخزين المؤقت بناءً على مستوى الجهاز
  const getDefaultTTL = useCallback(() => {
    switch (deviceTier) {
      case 'low':
        return 5 * 60 * 1000; // 5 دقائق للأجهزة الضعيفة (لتقليل استهلاك الشبكة)
      case 'medium':
        return 2 * 60 * 1000; // دقيقتان للأجهزة المتوسطة
      case 'high':
        return 1 * 60 * 1000; // دقيقة واحدة للأجهزة القوية
      default:
        return 3 * 60 * 1000; // 3 دقائق كقيمة افتراضية
    }
  }, [deviceTier]);
  
  // وظيفة لتنظيف التخزين المؤقت من العناصر منتهية الصلاحية
  const cleanCache = useCallback(() => {
    const now = Date.now();
    
    for (const [key, entry] of cache.entries()) {
      if (now > entry.timestamp + entry.ttl) {
        cache.delete(key);
      }
    }
  }, [cache]);
  
  // تنظيف التخزين المؤقت بشكل دوري
  useEffect(() => {
    const interval = setInterval(cleanCache, 60 * 1000); // تنظيف كل دقيقة
    return () => clearInterval(interval);
  }, [cleanCache]);
  
  // وضع البيانات في التخزين المؤقت
  const setCacheData = <T>(key: string, data: T, ttl = getDefaultTTL()) => {
    cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  };
  
  // الحصول على البيانات من التخزين المؤقت
  const getCacheData = <T>(key: string): T | null => {
    const entry = cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // التحقق من صلاحية العنصر
    if (Date.now() > entry.timestamp + entry.ttl) {
      cache.delete(key);
      return null;
    }
    
    return entry.data as T;
  };
  
  // مساعد لاسترداد البيانات مع دعم التخزين المؤقت
  const fetchWithCache = async <T>(
    key: string,
    fetchFn: () => Promise<T>,
    ttl = getDefaultTTL()
  ): Promise<T> => {
    // تحقق من التخزين المؤقت أولاً
    const cachedData = getCacheData<T>(key);
    if (cachedData !== null) {
      return cachedData;
    }
    
    // إذا لم تكن البيانات موجودة في التخزين المؤقت، استردها
    const data = await fetchFn();
    setCacheData(key, data, ttl);
    return data;
  };
  
  // إزالة عنصر من التخزين المؤقت
  const invalidateCache = (key: string) => {
    cache.delete(key);
  };
  
  // مسح التخزين المؤقت بالكامل
  const clearCache = () => {
    cache.clear();
  };
  
  return {
    getCacheData,
    setCacheData,
    fetchWithCache,
    invalidateCache,
    clearCache,
  };
}
