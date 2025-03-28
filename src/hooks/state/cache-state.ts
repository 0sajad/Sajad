
import { StateCreator } from 'zustand';
import { AppState, CacheState } from './types';

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
  
  // وظائف تعديل الحالة
  setCachedData: (key, data, ttl = 5 * 60 * 1000) => set(state => ({
    cachedData: {
      ...state.cachedData,
      [key]: {
        data,
        timestamp: Date.now(),
        ttl,
      }
    }
  })),
  
  getCachedData: (key) => {
    const entry = get().cachedData[key];
    
    if (!entry) {
      return null;
    }
    
    // التحقق من صلاحية العنصر
    if (Date.now() > entry.timestamp + entry.ttl) {
      get().invalidateCache(key);
      return null;
    }
    
    return entry.data;
  },
  
  invalidateCache: (key) => set(state => {
    const newCachedData = { ...state.cachedData };
    delete newCachedData[key];
    return { cachedData: newCachedData };
  }),
  
  clearCache: () => set({ cachedData: {} }),
});
