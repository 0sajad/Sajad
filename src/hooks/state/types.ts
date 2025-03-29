
import { ColorBlindMode } from './accessibility-state';

// اكتب تعريفات الحالة هنا
export interface AccessibilityState {
  // حالة إمكانية الوصول
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  readingGuide: boolean;
  colorBlindMode: ColorBlindMode;
  dyslexicFont: boolean;
  soundFeedback: boolean;
  keyboardNavigationVisible: boolean;
  
  // وظائف تعديل الحالة
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setFocusMode: (value: boolean) => void;
  setReadingGuide: (value: boolean) => void;
  setColorBlindMode: (value: ColorBlindMode) => void;
  setDyslexicFont: (value: boolean) => void;
  setSoundFeedback: (value: boolean) => void;
  setKeyboardNavigationVisible: (value: boolean) => void;
}

export interface NetworkState {
  isOnline: boolean;
  setOnlineStatus: (status: boolean) => void;
}

export interface PerformanceState {
  deviceTier: 'low' | 'medium' | 'high';
  isLowEndDevice: boolean;
  setDeviceTier: (tier: 'low' | 'medium' | 'high') => void;
  optimizeForLowEndDevice: () => void;
  restoreDefaultPerformance: () => void;
}

export interface PreferencesState {
  theme: string;
  language: string;
  developerMode: boolean;
  compactMode: boolean;
  animations: boolean;
  preferences: Record<string, any>;
  setTheme: (theme: string) => void;
  setLanguage: (language: string) => void;
  toggleDeveloperMode: () => void;
  setCompactMode: (enabled: boolean) => void;
  setAnimations: (enabled: boolean) => void;
  setPreference: (key: string, value: any) => void;
}

// الحالة الشاملة للتطبيق
export interface AppState extends AccessibilityState, PreferencesState {
  network: NetworkState;
  performance: PerformanceState;
}
