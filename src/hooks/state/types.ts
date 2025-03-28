import { ColorBlindMode } from '@/hooks/accessibility/useA11yColor';

/**
 * تعريف كافة واجهات الحالة المستخدمة في التطبيق
 */

// حالة واجهة المستخدم
export interface UIState {
  isDrawerOpen: boolean;
  activePage: string;
  lastVisitedPage: string | null;
  modals: {
    [key: string]: boolean;
  };
  
  // وظائف الحالة
  setDrawerOpen: (isOpen: boolean) => void;
  setActivePage: (page: string) => void;
  setLastVisitedPage: (page: string) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

// تفضيلات التطبيق
export interface AppPreferences {
  theme: 'light' | 'dark' | 'system';
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

// حالة التفضيلات
export interface PreferencesState {
  preferences: AppPreferences;
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
}

// حالة المستخدم
export interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  userEmail: string | null;
  userDisplayName: string | null;
  userRole: string | null;
  userSettings: Record<string, any>;
  
  // وظائف الحالة
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUserData: (userData: {
    id: string;
    email: string;
    displayName: string;
    role: string;
  }) => void;
  updateUserSettings: (newSettings: Record<string, any>) => void;
  logout: () => void;
}

// حالة التطبيق
export interface AppStatusState {
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  isInitialized: boolean;
  
  // وظائف الحالة
  setIsLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
}

// حالة إمكانية الوصول
export interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  readingGuide: boolean;
  colorBlindMode: ColorBlindMode;
  dyslexicFont: boolean;
  soundFeedback: boolean;
  keyboardNavigationVisible: boolean;
  
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

// حالة الشبكة
export interface NetworkState {
  isConnected: boolean;
  isOnline: boolean;
  lastCheck: Date | null;
  
  // وظائف تعديل الحالة
  setNetworkStatus: (status: { isConnected: boolean; isOnline: boolean }) => void;
  checkConnection: () => Promise<boolean>;
}

// حالة الأداء
export interface PerformanceState {
  deviceTier: 'low' | 'medium' | 'high';
  isLowEndDevice: boolean;
  
  // وظائف تعديل الحالة
  setDeviceTier: (tier: 'low' | 'medium' | 'high') => void;
  optimizeForLowEndDevice: () => void;
  restoreDefaultPerformance: () => void;
}

// حالة التخزين المؤقت
export interface CacheState {
  cachedData: Record<string, {
    data: any;
    timestamp: number;
    ttl: number;
  }>;
  
  // وظائف التخزين المؤقت
  setCachedData: <T>(key: string, data: T, ttl?: number) => void;
  getCachedData: <T>(key: string) => T | null;
  invalidateCache: (key: string) => void;
  clearCache: () => void;
}

// حالة تحميل البيانات
export interface DataLoadingState {
  dataLoading: {
    isLoading: boolean;
    lastUpdated: Date | null;
    error: string | null;
  }
}

// الحالة المجمعة للتطبيق
export type AppState = 
  UIState & 
  PreferencesState & 
  UserState & 
  AppStatusState & 
  AccessibilityState & 
  NetworkState & 
  PerformanceState &
  DataLoadingState &
  CacheState;
