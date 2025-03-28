
import { ColorBlindMode } from '@/hooks/accessibility/useA11yColor';

export interface UIState {
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isSearchOpen: boolean;
  activeSection: string | null;
  lastVisitedPage: string;
  
  toggleSidebar: () => void;
  toggleSettings: () => void;
  toggleSearch: () => void;
  setActiveSection: (section: string | null) => void;
}

export interface AppPreferences {
  theme: 'system' | 'light' | 'dark';
  language: string;
  notifications: boolean;
  telemetry: boolean;
  animations: boolean;
  fullWidthLayout: boolean;
  compactMode: boolean;
  soundEffects: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  arabicNumerals: boolean;
  autoSave: boolean;
}

export interface PreferencesState {
  preferences: AppPreferences;
  
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
}

export interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  userSettings: Record<string, any>;
  
  login: (userId: string, role: string) => void;
  logout: () => void;
  updateUserSettings: (settings: Record<string, any>) => void;
}

export interface AppStatusState {
  isOnline: boolean;
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  
  setIsLoading: (key: string, value: boolean) => void;
  setError: (key: string, value: string | null) => void;
  clearAllErrors: () => void;
}

export interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  readingGuide: boolean;
  colorBlindMode: ColorBlindMode;
  dyslexicFont: boolean;
  soundFeedback: boolean;
  
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setFocusMode: (value: boolean) => void;
  setReadingGuide: (value: boolean) => void;
  setColorBlindMode: (value: ColorBlindMode) => void;
  setDyslexicFont: (value: boolean) => void;
  setSoundFeedback: (value: boolean) => void;
}

export interface NetworkState {
  isConnected: boolean;
  isOnline: boolean;
  lastCheck: Date | null;
  
  setNetworkStatus: (status: { isConnected: boolean; isOnline: boolean }) => void;
  checkConnection: () => Promise<boolean>;
}

export interface PerformanceState {
  deviceTier: 'high' | 'medium' | 'low';
  isLowEndDevice: boolean;
  
  setDeviceTier: (tier: 'high' | 'medium' | 'low') => void;
  optimizeForLowEndDevice: () => void;
  restoreDefaultPerformance: () => void;
}

export interface AppState extends 
  UIState, 
  PreferencesState, 
  UserState, 
  AppStatusState, 
  AccessibilityState,
  NetworkState,
  PerformanceState
{
  // حالة الشبكة
  networkStatus: {
    isConnected: boolean;
    isOnline: boolean;
    lastCheck: Date | null;
  };
  
  // حالة تحميل البيانات
  dataLoading: {
    isLoading: boolean;
    lastUpdated: Date | null;
    error: string | null;
  };
}
