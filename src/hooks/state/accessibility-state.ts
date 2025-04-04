
import { StateCreator } from 'zustand';
import { AppState, AccessibilityState, ColorBlindMode } from './types';

/**
 * مخزن حالة إمكانية الوصول
 * يحتوي على الوظائف المتعلقة بإدارة ميزات إمكانية الوصول
 */
export const createAccessibilitySlice: StateCreator<
  AppState,
  [],
  [],
  AccessibilityState
> = (set, get, _store) => ({
  // حالة إمكانية الوصول
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusMode: false,
  readingGuide: false,
  colorBlindMode: 'none' as ColorBlindMode,
  dyslexicFont: false,
  soundFeedback: false,
  keyboardNavigationVisible: false,
  
  // وظائف تعديل الحالة
  setHighContrast: (value) => set({ highContrast: value }),
  setLargeText: (value) => set({ largeText: value }),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  setFocusMode: (value) => set({ focusMode: value }),
  setReadingGuide: (value) => set({ readingGuide: value }),
  setColorBlindMode: (value) => set({ colorBlindMode: value }),
  setDyslexicFont: (value) => set({ dyslexicFont: value }),
  setSoundFeedback: (value) => set({ soundFeedback: value }),
  setKeyboardNavigationVisible: (value) => set({ keyboardNavigationVisible: value }),
});
