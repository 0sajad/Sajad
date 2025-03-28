
import { StateCreator } from 'zustand';
import { AppState, CacheState } from './types';

// كائن لتخزين أوقات انتهاء صلاحية العناصر المخزنة مؤقتًا
const cacheTTL: Record<string, number> = {};

// وقت انتهاء الصلاحية الافتراضي (ساعة واحدة)
const DEFAULT_TTL = 60 * 60 * 1000;

/**
 * مخزن حالة التخزين المؤقت
 * يحتوي على الوظائف المتعلقة بإدارة التخزين المؤقت للبيانات
 */
export const createCacheSlice: StateCreator<
  AppState,
  [],
  [],
  CacheState
> = (set, get) => ({
  // حالة التخزين المؤقت
  cachedData: {},
  lastCacheUpdate: null,
  
  // تعيين بيانات في التخزين المؤقت مع وقت انتهاء الصلاحية
  setCachedData: (key, data, ttl = DEFAULT_TTL) => {
    // حفظ البيانات في التخزين المؤقت
    set(state => ({
      cachedData: {
        ...state.cachedData,
        [key]: data
      },
      lastCacheUpdate: new Date()
    }));
    
    // تعيين وقت انتهاء الصلاحية
    cacheTTL[key] = Date.now() + ttl;
    
    // حفظ في التخزين المحلي للاستمرارية
    try {
      localStorage.setItem(`cache_ttl_${key}`, cacheTTL[key].toString());
      localStorage.setItem(`cache_data_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error('خطأ في حفظ البيانات المخزنة مؤقتًا:', error);
    }
  },
  
  // الحصول على بيانات من التخزين المؤقت
  getCachedData: (key) => {
    // التحقق من وجود البيانات وصلاحيتها
    if (get().isCacheExpired(key)) {
      // مسح البيانات منتهية الصلاحية
      get().clearCacheItem(key);
      return null;
    }
    
    // إرجاع البيانات من التخزين المؤقت
    return get().cachedData[key] || null;
  },
  
  // مسح كل التخزين المؤقت
  clearCache: () => {
    // مسح بيانات التخزين المؤقت من الحالة
    set({
      cachedData: {},
      lastCacheUpdate: new Date()
    });
    
    // مسح أوقات انتهاء الصلاحية
    Object.keys(cacheTTL).forEach(key => {
      delete cacheTTL[key];
    });
    
    // مسح بيانات التخزين المحلي المتعلقة بالتخزين المؤقت
    try {
      const localStorageKeys = Object.keys(localStorage);
      localStorageKeys.forEach(key => {
        if (key.startsWith('cache_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('خطأ في مسح التخزين المؤقت:', error);
    }
  },
  
  // مسح عنصر محدد من التخزين المؤقت
  clearCacheItem: (key) => {
    set(state => {
      const newCachedData = { ...state.cachedData };
      delete newCachedData[key];
      
      return {
        cachedData: newCachedData,
        lastCacheUpdate: new Date()
      };
    });
    
    // مسح وقت انتهاء الصلاحية
    delete cacheTTL[key];
    
    // مسح من التخزين المحلي
    try {
      localStorage.removeItem(`cache_ttl_${key}`);
      localStorage.removeItem(`cache_data_${key}`);
    } catch (error) {
      console.error('خطأ في مسح عنصر التخزين المؤقت:', error);
    }
  },
  
  // التحقق مما إذا كان التخزين المؤقت منتهي الصلاحية
  isCacheExpired: (key) => {
    // التحقق من وجود البيانات في التخزين المؤقت أولاً
    if (!get().cachedData[key]) {
      return true;
    }
    
    // الحصول على وقت انتهاء الصلاحية
    const expiry = cacheTTL[key];
    
    // إذا لم يكن هناك وقت انتهاء صلاحية، حاول الحصول عليه من التخزين المحلي
    if (!expiry) {
      try {
        const storedExpiry = localStorage.getItem(`cache_ttl_${key}`);
        if (storedExpiry) {
          cacheTTL[key] = parseInt(storedExpiry, 10);
          return Date.now() > cacheTTL[key];
        }
      } catch (error) {
        console.error('خطأ في قراءة وقت انتهاء الصلاحية من التخزين المحلي:', error);
      }
      return true;
    }
    
    // التحقق مما إذا كان الوقت الحالي أكبر من وقت انتهاء الصلاحية
    return Date.now() > expiry;
  }
});
