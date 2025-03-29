
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

export interface NetworkStatus {
  isOnline: boolean;
  isConnected: boolean;
  lastCheck: Date | null;
  connectionType?: string;
  latency?: number;
}

export interface NetworkState {
  isOnline: boolean;
  setOnlineStatus: (status: boolean) => void;
  networkStatus?: NetworkStatus;
  checkConnection: () => Promise<boolean>;
  isConnected?: boolean;
  lastCheck?: Date | null;
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

export interface AppStatusState {
  appVersion: string;
  environment: string;
  isOnline: boolean;
  isInitialized: boolean;
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  
  setAppVersion: (version: string) => void;
  setEnvironment: (env: string) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setIsLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
}

export interface UIState {
  isSidebarOpen: boolean;
  isDrawerOpen: boolean;
  activePage: string;
  lastVisitedPage: string | null;
  modals: Record<string, boolean>;
  
  setSidebarOpen: (isOpen: boolean) => void;
  setDrawerOpen: (isOpen: boolean) => void;
  setActivePage: (page: string) => void;
  setLastVisitedPage: (page: string | null) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

export interface UserSettings {
  theme: string;
  language: string;
  notificationsEnabled: boolean;
  [key: string]: any;
}

export interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  userEmail: string | null;
  userDisplayName: string | null;
  userRole: string | null;
  userSettings: UserSettings;
  socket: any | null;
  
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUserId: (id: string | null) => void;
  setUserRole: (role: string | null) => void;
  setUserSettings: (settings: UserSettings) => void;
  setSocket: (socket: any | null) => void;
  setUserData: (userData: { id: string; email: string; displayName: string; role: string }) => void;
  updateUserSettings: (newSettings: Partial<UserSettings>) => void;
  logout: () => void;
}

export interface CacheState {
  cachedData: Record<string, any>;
  lastCacheUpdate: Date | null;
  
  setCachedData: (key: string, data: any, ttl?: number) => void;
  getCachedData: (key: string) => any;
  clearCache: () => void;
  clearCacheItem: (key: string) => void;
  isCacheExpired: (key: string) => boolean;
}

// الحالة الشاملة للتطبيق
export interface AppState extends AccessibilityState, PreferencesState {
  isInitialized?: boolean;
  isConnected?: boolean;
  isOnline?: boolean;
  deviceTier?: 'low' | 'medium' | 'high';
  network: NetworkState;
  performance: PerformanceState;
  networkStatus?: NetworkStatus;
  checkNetworkStatus?: () => void;
  checkConnection?: () => Promise<boolean>;
  setNetworkStatus?: (status: { isConnected: boolean; isOnline: boolean }) => void;
}

export interface StoreState {
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

export interface TranslationMetrics {
  totalLookups: number;
  keysByLanguage: Record<string, Set<string>>;
  uniqueKeysCount: number;
  missingKeys: string[] | Set<string>;
  missingKeysCount: number;
  lastUsedKey: string | null;
  topUsedKeys: Array<{ key: string; count: number }>;
}
