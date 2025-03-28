
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
  // حالة التطبيق
  appVersion: '1.0.0',
  environment: 'development',
  isOnline: true,
  isInitialized: false,
  isLoading: {},
  errors: {},
  
  // وظائف تعديل الحالة
  setAppVersion: (version) => set({ appVersion: version }),
  
  setEnvironment: (env) => set({ environment: env }),
  
  setOnlineStatus: (isOnline) => set({ isOnline }),
  
  setIsLoading: (key, loading) => set((state) => ({
    isLoading: { ...state.isLoading, [key]: loading }
  })),
  
  setError: (key, error) => set((state) => ({
    errors: { ...state.errors, [key]: error }
  })),
  
  setInitialized: (initialized) => set({ isInitialized: initialized }),
});
