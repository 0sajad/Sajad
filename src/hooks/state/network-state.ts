
import { StateCreator } from 'zustand';
import { AppState, NetworkState, NetworkStatus } from './types';

/**
 * مخزن حالة الشبكة
 * يحتوي على الوظائف المتعلقة بإدارة حالة الاتصال بالشبكة
 */
export const createNetworkSlice: StateCreator<
  AppState,
  [],
  [],
  { network: NetworkState }
> = (set) => ({
  network: {
    // حالة الاتصال بالشبكة
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    isConnected: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastCheck: new Date(),
    
    // تعيين حالة الاتصال
    setOnlineStatus: (status) => 
      set((state) => ({ 
        network: { 
          ...state.network,
          isOnline: status 
        } 
      })),
      
    // فحص الاتصال بالشبكة
    checkConnection: async () => {
      try {
        const response = await fetch('/api/ping', { 
          method: 'HEAD',
          cache: 'no-cache',
          mode: 'no-cors',
          headers: { 'Cache-Control': 'no-cache' }
        });
        return response.ok;
      } catch (error) {
        console.error('فشل فحص الاتصال بالشبكة:', error);
        return false;
      }
    }
  }
});

// وظيفة مساعدة للتعامل مع حالة الشبكة
export function useNetworkStatus() {
  return {
    isOnline: true,
    isConnected: true,
    lastCheck: new Date(),
    checkConnection: async () => true
  };
}
