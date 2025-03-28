
import { StateCreator } from 'zustand';
import { AppState, AppStatusState } from './types';

/**
 * مخزن حالة التطبيق
 * يحتوي على الوظائف المتعلقة بتحميل البيانات والأخطاء وحالة التهيئة
 */
export const createAppStatusSlice: StateCreator<
  AppState,
  [],
  [],
  AppStatusState
> = (set) => ({
  // حالة التحميل
  isLoading: {},
  errors: {},
  isInitialized: false,
  
  // وظائف تعديل الحالة
  setIsLoading: (key, loading) => set(state => ({
    isLoading: {
      ...state.isLoading,
      [key]: loading
    }
  })),
  
  setError: (key, error) => set(state => ({
    errors: {
      ...state.errors,
      [key]: error
    }
  })),
  
  setInitialized: (initialized) => set({ 
    isInitialized: initialized 
  }),
});
