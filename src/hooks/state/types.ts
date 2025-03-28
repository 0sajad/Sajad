/**
 * أنواع بيانات مخزن الحالة
 * تعريف الواجهات والأنواع المستخدمة في إدارة حالة التطبيق
 */

// النوع الرئيسي لحالة التطبيق
export interface AppState extends
  UIState,
  NetworkState,
  PerformanceState,
  AppStatusState,
  PreferencesState,
  UserState,
  AccessibilityState,
  CacheState {
  // وظائف أساسية لإدارة الحالة
  checkConnection: () => Promise<boolean>;
  isLoading: Record<string, boolean>;
  errors: Record<string, any>;
  isInitialized: boolean;
  setIsLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: any) => void;
  setInitialized: (initialized: boolean) => void;
}

// حالة واجهة المستخدم
export interface UIState {
  isSidebarOpen: boolean;
  isDrawerOpen: boolean;
  activePage: string;
  lastVisitedPage: string | null;
  modals: Record<string, boolean>;
  
  setSidebarOpen: (isOpen: boolean) => void;
  setDrawerOpen: (isOpen: boolean) => void;
  setActivePage: (page: string) => void;
  setLastVisitedPage: (page: string) => void;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
}

// حالة الشبكة
export interface NetworkState {
  isConnected: boolean;
  isOnline: boolean;
  lastCheck: Date | null;
  networkStatus: {
    isConnected: boolean;
    isOnline: boolean;
    lastCheck: Date | null;
  };
  dataLoading: {
    isLoading: boolean;
    lastUpdated: Date | null;
    error: Error | null;
  };
  
  checkNetworkStatus: () => Promise<boolean>;
  setNetworkStatus: (status: {
    isConnected: boolean;
    isOnline: boolean;
  }) => void;
  handleOfflineStatus: () => void;
  handleOnlineStatus: () => void;
}

// حالة الأداء
export interface PerformanceState {
  deviceTier: DeviceTier;
  isLowEndDevice: boolean;
  
  setDeviceTier: (tier: DeviceTier) => void;
  optimizeForLowEndDevice: () => void;
  restoreDefaultPerformance: () => void;
}

// حالة التطبيق
export interface AppStatusState {
  appVersion: string;
  environment: string;
  isOnline: boolean;
  isInitialized: boolean;
  isLoading: Record<string, boolean>;
  errors: Record<string, any>;
  
  setAppVersion: (version: string) => void;
  setEnvironment: (env: string) => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setIsLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: any) => void;
  setInitialized: (initialized: boolean) => void;
}

// حالة التفضيلات
export interface PreferencesState {
  theme: ThemeType;
  language: string;
  notificationsEnabled: boolean;
  animations: boolean;
  compactMode: boolean;
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
  userSettings: UserSettings;
  socket: any | null;
  
  setAuthenticated: (isAuthenticated: boolean) => void;
  setUserId: (id: string | null) => void;
  setUserRole: (role: string | null) => void;
  setUserSettings: (settings: UserSettings) => void;
  setSocket: (socket: any | null) => void;
  setUserData: (userData: {
    id: string;
    email: string;
    displayName: string;
    role: string;
  }) => void;
  updateUserSettings: (newSettings: Partial<UserSettings>) => void;
  logout: () => void;
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

// حالة التخزين المؤقت
export interface CacheState {
  cachedData: Record<string, any>;
  lastCacheUpdate: Date | null;
  
  setCachedData: (key: string, data: any, ttl?: number) => void;
  getCachedData: (key: string) => any;
  clearCache: () => void;
  clearCacheItem: (key: string) => void;
  isCacheExpired: (key: string) => boolean;
}

// أنواع إضافية
export type ThemeType = 'light' | 'dark' | 'system';
export type DeviceTier = 'low' | 'medium' | 'high';
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

// واجهات تفضيلات التطبيق
export interface AppPreferences {
  theme: ThemeType;
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
  notificationsEnabled: boolean;
  syncSystemPreferences: boolean;
}

// واجهة إعدادات المستخدم
export interface UserSettings {
  theme: ThemeType;
  language: string;
  notificationsEnabled: boolean;
}

// واجهة أساسية إضافية للمتجر
export interface StoreState {
  // أي حالة إضافية متعلقة بالمتجر
}
