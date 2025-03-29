
import { StateCreator } from 'zustand';
import { AppState, NetworkState } from './types';

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
    
    // تعيين حالة الاتصال
    setOnlineStatus: (status) => 
      set((state) => ({ 
        network: { 
          ...state.network,
          isOnline: status 
        } 
      })),
  }
});
