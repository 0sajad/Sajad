
import { StateCreator } from 'zustand';
import { AppState, NetworkState } from './types';

/**
 * مخزن حالة الشبكة
 * يحتوي على الوظائف المتعلقة بإدارة حالة الاتصال بالإنترنت
 */
export const createNetworkSlice: StateCreator<
  AppState,
  [],
  [],
  NetworkState
> = (set, get) => ({
  // حالة الشبكة
  isConnected: true,
  isOnline: true,
  lastCheck: null,
  
  // وظائف تعديل الحالة
  setNetworkStatus: ({ isConnected, isOnline }) => set({ 
    isConnected, 
    isOnline,
    lastCheck: new Date()
  }),
  
  // وظيفة للتحقق من حالة الاتصال
  checkConnection: async () => {
    try {
      // التحقق من الاتصال بالإنترنت
      const response = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      });
      
      const isOnline = response.type === 'opaque' || response.ok;
      set({ 
        isConnected: true,
        isOnline,
        lastCheck: new Date()
      });
      
      return isOnline;
    } catch (error) {
      set({ 
        isConnected: false,
        isOnline: false,
        lastCheck: new Date()
      });
      
      return false;
    }
  }
});
