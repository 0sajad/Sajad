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
  NetworkState
> = (set, get, _store) => ({
  // حالة الشبكة
  isConnected: true,
  isOnline: navigator.onLine,
  lastCheck: null,
  networkStatus: {
    isConnected: true,
    isOnline: navigator.onLine,
    lastCheck: null
  },
  dataLoading: {
    isLoading: false,
    lastUpdated: null,
    error: null
  },
  
  // وظائف تعديل الحالة
  checkNetworkStatus: async () => {
    try {
      const response = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      });
      
      const isOnline = response.type === 'opaque' || response.ok;
      const now = new Date();
      
      set({ 
        isConnected: true,
        isOnline,
        lastCheck: now,
        networkStatus: {
          isConnected: true,
          isOnline,
          lastCheck: now
        }
      });
      
      return isOnline;
    } catch (error) {
      const now = new Date();
      
      set({ 
        isConnected: false,
        isOnline: false,
        lastCheck: now,
        networkStatus: {
          isConnected: false,
          isOnline: false,
          lastCheck: now
        }
      });
      
      return false;
    }
  },
  
  setNetworkStatus: (status) => {
    const now = new Date();
    
    set({
      isConnected: status.isConnected,
      isOnline: status.isOnline,
      lastCheck: now,
      networkStatus: {
        ...get().networkStatus,
        isConnected: status.isConnected,
        isOnline: status.isOnline,
        lastCheck: now
      }
    });
  },
  
  handleOfflineStatus: () => {
    const now = new Date();
    
    set({
      isOnline: false,
      lastCheck: now,
      networkStatus: {
        ...get().networkStatus,
        isOnline: false,
        lastCheck: now
      }
    });
  },

  handleOnlineStatus: () => {
    const now = new Date();
    
    set({
      isOnline: true,
      lastCheck: now,
      networkStatus: {
        ...get().networkStatus,
        isOnline: true,
        lastCheck: now
      }
    });
  }
});