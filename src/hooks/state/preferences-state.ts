
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StateCreator } from 'zustand';
import { AppState } from './types';

export interface AppPreferences {
  language: string;
  theme: 'light' | 'dark' | 'system';
  fontSize: 'normal' | 'large' | 'x-large';
  animationsEnabled: boolean;
  highContrast: boolean;
  notificationsEnabled: boolean;
  autoRefresh: boolean;
  refreshRate: number;
  compactMode: boolean;
  developerMode: boolean;
  analyticsEnabled: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
  dyslexicFont: boolean;
  readingGuide: boolean;
  soundFeedback: boolean;
}

export const defaultPreferences: AppPreferences = {
  language: 'ar',
  theme: 'system',
  fontSize: 'normal',
  animationsEnabled: true,
  highContrast: false,
  notificationsEnabled: true,
  autoRefresh: true,
  refreshRate: 30,
  compactMode: false,
  developerMode: false,
  analyticsEnabled: true,
  colorBlindMode: 'none',
  dyslexicFont: false,
  readingGuide: false,
  soundFeedback: false
};

export const usePreferences = create(
  persist<{
    preferences: AppPreferences;
    setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
    resetPreferences: () => void;
  }>(
    (set) => ({
      preferences: { ...defaultPreferences },
      setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => 
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value
          }
        })),
      resetPreferences: () => set({ preferences: { ...defaultPreferences } })
    }),
    {
      name: 'octa-preferences',
    }
  )
);

// Add the createPreferencesSlice function that was missing
export const createPreferencesSlice: StateCreator<
  AppState,
  [],
  [],
  {
    preferences: AppPreferences;
    setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
    resetPreferences: () => void;
  }
> = (set) => ({
  preferences: { ...defaultPreferences },
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => 
    set((state) => ({
      preferences: {
        ...state.preferences,
        [key]: value
      }
    })),
  resetPreferences: () => set({ preferences: { ...defaultPreferences } })
});
