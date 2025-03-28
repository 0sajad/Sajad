
/**
 * واجهة حالة التطبيق
 * تحدد بنية حالة التطبيق بأكمله
 */
export interface AppState extends UIState, UserState, AppStatusState, NetworkState, PerformanceState, PreferencesState, AccessibilityState, CacheState {
  // حالة الشبكة
  networkStatus: NetworkStatus;
  
  // حالة تحميل البيانات
  dataLoading: DataLoadingState;
  
  // خصائص أخرى للتوافق مع الشيفرة الموجودة
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  isInitialized: boolean;
  setIsLoading: (key: string, loading: boolean) => void;
  setError: (key: string, error: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  
  // حالة الشبكة
  isOnline: boolean;
  isConnected: boolean;
  lastCheck: Date | null;
  checkConnection: () => Promise<boolean>;
  
  // حالة التفضيلات
  preferences: AppPreferences;
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
  
  // خصائص مفقودة أخرى
  modals: Record<string, boolean>;
  activePage: string;
}

/**
 * حالة واجهة المستخدم
 * تحتوي على معلومات حول حالة واجهة المستخدم
 */
export interface UIState {
  isSidebarOpen: boolean;
  isDrawerOpen?: boolean; // إضافة للتوافق مع الشيفرة الموجودة
  lastVisitedPage: string | null;
  setSidebarOpen: (isOpen: boolean) => void;
  setDrawerOpen?: (isOpen: boolean) => void; // إضافة للتوافق مع الشيفرة الموجودة
  setLastVisitedPage: (page: string) => void;
  setActivePage?: (page: string) => void; // إضافة للتوافق مع الشيفرة الموجودة
  openModal?: (modalId: string) => void; // إضافة للتوافق مع الشيفرة الموجودة
  closeModal?: (modalId: string) => void; // إضافة للتوافق مع الشيفرة الموجودة
}

/**
 * حالة المستخدم
 * تحتوي على معلومات حول المستخدم الحالي
 */
export interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  userEmail?: string | null; // إضافة للتوافق مع الشيفرة الموجودة
  userDisplayName?: string | null; // إضافة للتوافق مع الشيفرة الموجودة
  userSettings: UserSettings | null;
  socket?: any | null; // بدلاً من Socket من socket.io-client
  setAuthenticated: (auth: boolean) => void;
  setUserId: (id: string | null) => void;
  setUserRole: (role: string | null) => void;
  setUserSettings: (settings: UserSettings | null) => void;
  setSocket?: (socket: any | null) => void; // إضافة للتوافق مع الشيفرة الموجودة
  setUserData?: (userData: { id: string; email: string; displayName: string; role: string }) => void; // إضافة للتوافق مع الشيفرة الموجودة
  updateUserSettings?: (newSettings: Partial<UserSettings>) => void; // إضافة للتوافق مع الشيفرة الموجودة
  logout?: () => void; // إضافة للتوافق مع الشيفرة الموجودة
}

/**
 * حالة التطبيق
 * تحتوي على معلومات حول حالة التطبيق نفسه
 */
export interface AppStatusState {
  appVersion: string;
  environment: 'development' | 'production';
  isOnline: boolean;
  isInitialized?: boolean; // إضافة للتوافق مع الشيفرة الموجودة
  setAppVersion: (version: string) => void;
  setEnvironment: (env: 'development' | 'production') => void;
  setOnlineStatus: (isOnline: boolean) => void;
  setInitialized?: (initialized: boolean) => void; // إضافة للتوافق مع الشيفرة الموجودة
}

/**
 * حالة الشبكة
 * تحتوي على معلومات حول حالة الشبكة
 */
export interface NetworkState {
  networkType: 'wifi' | 'ethernet' | 'cellular' | 'unknown';
  connectionSpeed: number;
  dataUsage: DataUsageStats;
  signalStrength: number;
  connectedDevices: number;
  isConnected?: boolean; // إضافة للتوافق مع الشيفرة الموجودة
  isOnline?: boolean; // إضافة للتوافق مع الشيفرة الموجودة
  lastCheck?: Date | null; // إضافة للتوافق مع الشيفرة الموجودة
  setNetworkType: (type: 'wifi' | 'ethernet' | 'cellular' | 'unknown') => void;
  setConnectionSpeed: (speed: number) => void;
  setDataUsage: (usage: DataUsageStats) => void;
  setSignalStrength: (strength: number) => void;
  setConnectedDevices: (devices: number) => void;
  setNetworkStatus?: ({ isConnected, isOnline }: { isConnected: boolean; isOnline: boolean }) => void; // إضافة للتوافق مع الشيفرة الموجودة
  checkConnection?: () => Promise<boolean>; // إضافة للتوافق مع الشيفرة الموجودة
}

/**
 * حالة الأداء
 * تحتوي على معلومات حول أداء التطبيق
 */
export interface PerformanceState {
  deviceTier: 'low' | 'medium' | 'high';
  isLowEndDevice: boolean;
  setDeviceTier: (tier: 'low' | 'medium' | 'high') => void;
  optimizeForLowEndDevice: () => void;
  restoreDefaultPerformance: () => void;
}

/**
 * تفضيلات التطبيق
 * القيم المحفوظة لتفضيلات المستخدم
 */
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
  notificationsEnabled?: boolean; // إضافة للتوافق مع الشيفرة الموجودة
}

/**
 * حالة التفضيلات
 * تحتوي على معلومات حول تفضيلات المستخدم
 */
export interface PreferencesState {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notificationsEnabled: boolean;
  animations: boolean;
  compactMode: boolean;
  preferences?: AppPreferences; // إضافة للتوافق مع الشيفرة الموجودة
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
}

/**
 * حالة إمكانية الوصول
 * تحتوي على معلومات حول إعدادات إمكانية الوصول
 */
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

/**
 * حالة التخزين المؤقت
 * تحتوي على معلومات حول البيانات المخزنة مؤقتًا
 */
export interface CacheState {
  cachedData: Record<string, any>;
  lastCacheUpdate?: Date | null;
  setCachedData: (key: string, data: any, ttl?: number) => void;
  getCachedData?: (key: string) => any;
  updateCache?: (key: string, data: any) => void;
  clearCache: () => void;
  invalidateCache?: (key: string) => void;
}

/**
 * أنواع البيانات والمُعَرّفات
 */
export type Theme = 'light' | 'dark' | 'system';
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';

/**
 * واجهات البيانات
 */
export interface NetworkStatus {
  isConnected: boolean;
  isOnline: boolean;
  lastCheck: Date | null;
}

export interface DataLoadingState {
  isLoading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

export interface UserSettings {
  theme: Theme;
  language: string;
  notificationsEnabled: boolean;
}

export interface DataUsageStats {
  totalUsage: number;
  usageBreakdown: {
    wifi: number;
    cellular: number;
  };
}

// إضافة واجهة StoreState بجانب الواجهات الأخرى
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
