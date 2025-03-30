
import { create } from 'zustand';
import { AppState } from './types';

// Create a single store with initial state
export const useAppState = create<AppState>((set) => ({
  // Base application state
  theme: 'system',
  language: 'en',
  developerMode: false,
  compactMode: false,
  animations: true,
  preferences: {},
  performance: {
    deviceTier: 'medium',
    isLowEndDevice: false,
    optimizeForLowEndDevice: () => {},
    restoreDefaultPerformance: () => {},
    setDeviceTier: () => {}
  },
  network: {
    isOnline: true,
    isConnected: true,
    lastCheck: new Date(),
    checkConnection: async () => true,
    setOnlineStatus: () => {}
  },
  
  // Network status
  networkStatus: {
    isConnected: true,
    isOnline: true,
    lastCheck: new Date()
  },
  
  // UI state
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusMode: false,
  dyslexicFont: false,
  readingGuide: false,
  soundFeedback: true,
  colorBlindMode: 'none',
  keyboardNavigationVisible: false,
  
  // Setters
  setTheme: (theme) => {
    set({ theme });
  },
  
  setLanguage: (language) => {
    set({ language });
  },
  
  toggleDeveloperMode: () => {
    set((state) => ({ developerMode: !state.developerMode }));
  },
  
  setCompactMode: (enabled) => {
    set({ compactMode: enabled });
  },
  
  setAnimations: (enabled) => {
    set({ animations: enabled });
  },
  
  toggleCompactMode: () => {
    set((state) => ({ compactMode: !state.compactMode }));
  },
  
  toggleAnimations: () => {
    set((state) => ({ animations: !state.animations }));
  },
  
  setPreference: (key, value) => {
    set((state) => ({
      preferences: { ...state.preferences, [key]: value }
    }));
  },
  
  // Accessibility setters
  setHighContrast: (value) => {
    set({ highContrast: value });
  },
  
  setLargeText: (value) => {
    set({ largeText: value });
  },
  
  setReducedMotion: (value) => {
    set({ reducedMotion: value });
  },
  
  setFocusMode: (value) => {
    set({ focusMode: value });
  },
  
  setDyslexicFont: (value) => {
    set({ dyslexicFont: value });
  },
  
  setReadingGuide: (value) => {
    set({ readingGuide: value });
  },
  
  setSoundFeedback: (value) => {
    set({ soundFeedback: value });
  },
  
  setColorBlindMode: (mode) => {
    set({ colorBlindMode: mode });
  },
  
  setKeyboardNavigationVisible: (value) => {
    set({ keyboardNavigationVisible: value });
  },

  // Cache-related properties and functions with stub implementations
  cachedData: {},
  lastCacheUpdate: null,
  setCachedData: () => {},
  getCachedData: () => null,
  clearCache: () => {},
  clearCacheItem: () => {},
  isCacheExpired: () => false
}));

// Separate hook for preferences to avoid unnecessary re-renders
export const usePreferences = <T,>(key: string, defaultValue: T): [T, (value: T) => void] => {
  const value = useAppState((state) => (state.preferences[key] as T) ?? defaultValue);
  const setPreference = useAppState((state) => state.setPreference);
  
  const setValue = (newValue: T) => {
    setPreference(key, newValue);
  };
  
  return [value, setValue];
};
