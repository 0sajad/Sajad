
import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import { type PerformanceState } from './types';

// Define a subset of the PerformanceState for our store
interface StoreState {
  // Device performance tier
  deviceTier: 'low' | 'medium' | 'high';
  setDeviceTier: (tier: 'low' | 'medium' | 'high') => void;
  
  // User preferences
  preferences: {
    theme: 'light' | 'dark' | 'system';
    reducedMotion: boolean;
    highContrast: boolean;
  };
  setPreference: <K extends keyof StoreState['preferences']>(
    key: K, 
    value: StoreState['preferences'][K]
  ) => void;
}

// Check if we're in a browser environment before using localStorage
const canUseLocalStorage = typeof window !== 'undefined' && window.localStorage;

// A fallback storage when localStorage is not available
const fallbackStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

// Create the store with the necessary middlewares
export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        // Device performance tier
        deviceTier: 'medium',
        setDeviceTier: (tier) => set({ deviceTier: tier }),
        
        // User preferences
        preferences: {
          theme: 'system',
          reducedMotion: false,
          highContrast: false,
        },
        setPreference: (key, value) => set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value,
          }
        })),
      }),
      {
        name: 'app-store',
        storage: createJSONStorage(() => {
          // Use localStorage if available, otherwise use fallback
          return canUseLocalStorage 
            ? window.localStorage 
            : fallbackStorage;
        }),
        // Only persist these specific parts of the state
        partialize: (state) => ({
          deviceTier: state.deviceTier,
          preferences: state.preferences,
        }),
      }
    )
  )
);
