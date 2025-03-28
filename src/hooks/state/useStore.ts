
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  deviceTier: 'high' | 'medium' | 'low';
  setDeviceTier: (tier: 'high' | 'medium' | 'low') => void;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    reducedMotion: boolean;
    highContrast: boolean;
  };
  setPreference: <K extends keyof StoreState['preferences']>(key: K, value: StoreState['preferences'][K]) => void;
}

// Check if we're in a browser environment with localStorage
const isServer = typeof window === 'undefined';
const storage = {
  getItem: (name: string): string | null => {
    if (isServer) return null;
    return localStorage.getItem(name);
  },
  setItem: (name: string, value: string): void => {
    if (isServer) return;
    localStorage.setItem(name, value);
  },
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      deviceTier: 'medium',
      setDeviceTier: (tier) => set({ deviceTier: tier }),
      preferences: {
        theme: 'system',
        reducedMotion: false,
        highContrast: false,
      },
      setPreference: (key, value) => set((state) => ({
        preferences: {
          ...state.preferences,
          [key]: value,
        },
      })),
    }),
    {
      name: 'app-store',
      storage: {
        getItem: (name) => {
          try {
            const value = storage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch (e) {
            console.error('Error getting item from storage', e);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            storage.setItem(name, JSON.stringify(value));
          } catch (e) {
            console.error('Error setting item in storage', e);
          }
        },
      },
      partialize: (state) => ({
        deviceTier: state.deviceTier,
        preferences: state.preferences,
      }),
    }
  )
);
