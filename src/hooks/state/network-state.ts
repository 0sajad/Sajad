
import { StateCreator } from 'zustand';
import { AppState, NetworkState, DataUsageStats } from './types';

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
  networkType: 'unknown',
  connectionSpeed: 0,
  dataUsage: { totalUsage: 0, usageBreakdown: { wifi: 0, cellular: 0 } },
  signalStrength: 0,
  connectedDevices: 0,
  isConnected: true,
  isOnline: true,
  lastCheck: null,
  
  // وظائف تعديل الحالة
  setNetworkType: (type) => set({ networkType: type }),
  
  setConnectionSpeed: (speed) => set({ connectionSpeed: speed }),
  
  setDataUsage: (usage) => set({ dataUsage: usage }),
  
  setSignalStrength: (strength) => set({ signalStrength: strength }),
  
  setConnectedDevices: (devices) => set({ connectedDevices: devices }),
  
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
