
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
      partialize: (state) => ({
        deviceTier: state.deviceTier,
        preferences: state.preferences,
      }),
    }
  )
);
