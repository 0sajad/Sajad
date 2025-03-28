
import { StateCreator } from 'zustand';
import { AppState, CacheState } from './types';

/**
 * مخزن حالة التخزين المؤقت
 * يحتوي على الوظائف المتعلقة بإدارة التخزين المؤقت
 */
export const createCacheSlice: StateCreator<
  AppState,
  [],
  [],
  CacheState
> = (set, get) => ({
  // حالة التخزين المؤقت
  cachedData: {},
  
  // وظائف التخزين المؤقت
  setCachedData: (key, data, ttl = 5 * 60 * 1000) => {
    const state = get();
    const updatedCachedData = {
      ...state.cachedData,
      [key]: {
        data,
        timestamp: Date.now(),
        ttl: ttl,
      },
    };
    
    set({ cachedData: updatedCachedData });
  },
  
  getCachedData: (key) => {
    const state = get();
    const cachedItem = state.cachedData[key];
    
    if (!cachedItem) {
      return null;
    }
    
    // التحقق مما إذا كانت البيانات المخزنة مؤقتًا صالحة
    if (Date.now() > cachedItem.timestamp + cachedItem.ttl) {
      // إذا انتهت صلاحية البيانات، قم بإزالتها ورجوع null
      get().invalidateCache(key);
      return null;
    }
    
    return cachedItem.data;
  },
  
  invalidateCache: (key) => {
    const state = get();
    const updatedCachedData = { ...state.cachedData };
    delete updatedCachedData[key];
    
    set({ cachedData: updatedCachedData });
  },
  
  clearCache: () => {
    set({ cachedData: {} });
  },
});
