
import { StateCreator } from 'zustand';
import { AppState, CacheState } from './types';

/**
 * مخزن التخزين المؤقت
 * يحتوي على الوظائف المتعلقة بإدارة بيانات التخزين المؤقت
 */
export const createCacheSlice: StateCreator<
  AppState,
  [],
  [],
  CacheState
> = (set, get, _store) => ({
  // حالة التخزين المؤقت
  cachedData: {},
  lastCacheUpdate: null,
  
  // وظائف تعديل الحالة
  setCachedData: (key, data, ttl = 60 * 60 * 1000) => {
    const expiresAt = new Date(Date.now() + ttl);
    
    set(state => ({
      cachedData: {
        ...state.cachedData,
        [key]: {
          data,
          timestamp: new Date(),
          expiresAt
        }
      },
      lastCacheUpdate: new Date()
    }));
  },
  
  getCachedData: (key) => {
    const state = get();
    const cachedItem = state.cachedData[key];
    
    if (!cachedItem) {
      return null;
    }
    
    // التحقق من صلاحية العنصر المخزن مؤقتًا
    if (cachedItem.expiresAt && new Date() > cachedItem.expiresAt) {
      // العنصر منتهي الصلاحية، حذفه من التخزين المؤقت
      set(state => {
        const newCachedData = { ...state.cachedData };
        delete newCachedData[key];
        
        return {
          cachedData: newCachedData,
          lastCacheUpdate: new Date()
        };
      });
      
      return null;
    }
    
    return cachedItem.data;
  },
  
  clearCache: () => set({ 
    cachedData: {}, 
    lastCacheUpdate: new Date() 
  }),
  
  clearCacheItem: (key) => set(state => {
    const newCachedData = { ...state.cachedData };
    delete newCachedData[key];
    
    return {
      cachedData: newCachedData,
      lastCacheUpdate: new Date()
    };
  }),
  
  isCacheExpired: (key) => {
    const state = get();
    const cachedItem = state.cachedData[key];
    
    if (!cachedItem || !cachedItem.expiresAt) {
      return true;
    }
    
    return new Date() > cachedItem.expiresAt;
  }
});
