
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from './types';
import { createAccessibilitySlice } from './accessibility-state';
import { createPerformanceSlice } from './performance-state';
import { createNetworkSlice } from './network-state';

/**
 * مخزن حالة التطبيق الرئيسي
 * يجمع بين مختلف شرائح الحالة
 */
export const useAppState = create<AppState>()(
  persist(
    (set, get) => ({
      // حالة إمكانية الوصول (من شريحة إمكانية الوصول)
      ...createAccessibilitySlice(set, get),
      
      // حالة أداء التطبيق (من شريحة الأداء)
      ...createPerformanceSlice(set, get),
      
      // حالة شبكة الاتصال
      ...createNetworkSlice(set, get),
      
      // حالة التفضيلات
      theme: 'system',
      language: 'ar',
      developerMode: false,
      compactMode: false,
      animations: true,
      preferences: {},
      
      // وظائف التفضيلات
      setTheme: (theme) => set({ theme }),
      
      setLanguage: (language) => set({ language }),
      
      toggleDeveloperMode: () => 
        set((state) => ({ developerMode: !state.developerMode })),
      
      setCompactMode: (compactMode) => set({ compactMode }),
      
      setAnimations: (animations) => set({ animations }),
      
      setPreference: (key, value) => 
        set((state) => ({
          preferences: {
            ...state.preferences,
            [key]: value
          }
        })),
    }),
    {
      name: 'app-state',
      partialize: (state) => ({
        // حفظ فقط التفضيلات وإعدادات إمكانية الوصول
        highContrast: state.highContrast,
        largeText: state.largeText,
        reducedMotion: state.reducedMotion,
        colorBlindMode: state.colorBlindMode,
        dyslexicFont: state.dyslexicFont,
        theme: state.theme,
        language: state.language,
        developerMode: state.developerMode,
        compactMode: state.compactMode,
        animations: state.animations,
        preferences: state.preferences,
      }),
    }
  )
);

// وظائف مساعدة للوصول إلى حالات محددة
export const useA11y = () => useAppState((state) => ({
  highContrast: state.highContrast,
  largeText: state.largeText,
  reducedMotion: state.reducedMotion,
  focusMode: state.focusMode,
  dyslexicFont: state.dyslexicFont,
  readingGuide: state.readingGuide,
  colorBlindMode: state.colorBlindMode,
  soundFeedback: state.soundFeedback,
  keyboardNavigationVisible: state.keyboardNavigationVisible,
  setHighContrast: state.setHighContrast,
  setLargeText: state.setLargeText,
  setReducedMotion: state.setReducedMotion,
  setFocusMode: state.setFocusMode,
  setDyslexicFont: state.setDyslexicFont,
  setReadingGuide: state.setReadingGuide,
  setColorBlindMode: state.setColorBlindMode,
  setSoundFeedback: state.setSoundFeedback,
  setKeyboardNavigationVisible: state.setKeyboardNavigationVisible,
}));

export const usePreferences = () => useAppState((state) => ({
  theme: state.theme,
  language: state.language,
  developerMode: state.developerMode,
  compactMode: state.compactMode,
  animations: state.animations,
  preferences: state.preferences,
  setTheme: state.setTheme,
  setLanguage: state.setLanguage,
  toggleDeveloperMode: state.toggleDeveloperMode,
  setCompactMode: state.setCompactMode,
  setAnimations: state.setAnimations,
  setPreference: state.setPreference,
}));

export const useNetworkState = () => useAppState((state) => ({
  isOnline: state.network.isOnline,
  setOnlineStatus: state.network.setOnlineStatus,
}));

export const usePerformanceState = () => useAppState((state) => ({
  deviceTier: state.performance.deviceTier,
  isLowEndDevice: state.performance.isLowEndDevice,
  setDeviceTier: state.performance.setDeviceTier,
  optimizeForLowEndDevice: state.performance.optimizeForLowEndDevice,
  restoreDefaultPerformance: state.performance.restoreDefaultPerformance,
}));
