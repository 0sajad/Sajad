
import { StateCreator } from 'zustand';
import { AppState, AppStatusState } from './types';

/**
 * مخزن حالة التطبيق المتعلقة بالأخطاء والتحميل
 * يحتوي على الوظائف المتعلقة بإدارة الأخطاء وحالة التحميل
 */
export const createAppStatusSlice: StateCreator<
  AppState,
  [],
  [],
  Pick<AppState, 'isOnline' | 'isLoading' | 'errors' | 
    'setIsLoading' | 'setError' | 'clearAllErrors'>
> = (set) => ({
  // حالة التطبيق
  isOnline: true,
  isLoading: {},
  errors: {},
  
  // وظائف تعديل الحالة
  setIsLoading: (key, value) => set(state => ({
    isLoading: {
      ...state.isLoading,
      [key]: value
    }
  })),
  
  setError: (key, value) => set(state => ({
    errors: {
      ...state.errors,
      [key]: value
    }
  })),
  
  clearAllErrors: () => set({ errors: {} }),
});
