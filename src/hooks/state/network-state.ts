
import { StateCreator } from 'zustand';
import { AppState } from './types';

export interface NetworkStatusState {
  isConnected: boolean;
  isOnline: boolean;
  lastCheck: Date | null;
}

export const createNetworkSlice: StateCreator<
  AppState,
  [],
  [],
  { networkStatus: NetworkStatusState }
> = (set) => ({
  networkStatus: {
    isConnected: true,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastCheck: null
  },
});

// Export the useNetworkStatus hook for compatibility
export const useNetworkStatus = () => {
  return {
    isConnected: true,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastCheck: null,
    checkConnection: async () => true
  };
};
