
import { StateCreator } from 'zustand';
import { AppState } from './types';

export interface NetworkStatusState {
  isConnected: boolean;
  isOnline: boolean;
  lastCheck: Date | null;
}

/**
 * شريحة حالة الشبكة - تتعامل مع حالة الاتصال بالإنترنت
 */
export const createNetworkSlice: StateCreator<
  AppState,
  [],
  [],
  { 
    networkStatus: NetworkStatusState;
    checkNetworkConnection: () => Promise<boolean>;
  }
> = (set, get, _store) => ({
  networkStatus: {
    isConnected: true,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastCheck: null
  },
  
  // إضافة وظيفة فحص اتصال الشبكة
  checkNetworkConnection: async () => {
    try {
      // استخدام وظيفة Electron إذا كانت متاحة
      if (typeof window !== 'undefined' && window.electron?.checkNetworkConnection) {
        const isConnected = await window.electron.checkNetworkConnection();
        
        set({
          networkStatus: {
            isConnected,
            isOnline: isConnected,
            lastCheck: new Date()
          }
        });
        
        return isConnected;
      }
      
      // استخدام وظيفة التحقق من الاتصال الموجودة
      if (typeof get().checkNetworkStatus === 'function') {
        return await get().checkNetworkStatus();
      }
      
      // الطريقة البديلة إذا لم تكن الوظيفة الأصلية متاحة
      const response = await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      });
      
      const isOnline = response.type === 'opaque' || response.ok;
      
      set({
        networkStatus: {
          isConnected: true,
          isOnline,
          lastCheck: new Date()
        }
      });
      
      return isOnline;
    } catch (error) {
      set({
        networkStatus: {
          isConnected: false,
          isOnline: false,
          lastCheck: new Date()
        }
      });
      
      return false;
    }
  }
});

// تصدير خطاف حالة الشبكة للتوافق
export const useNetworkStatus = () => {
  return {
    isConnected: true,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastCheck: null,
    checkConnection: async () => true
  };
};
