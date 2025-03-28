import { Socket } from 'socket.io-client';

/**
 * واجهة حالة التطبيق
 * تحدد بنية حالة التطبيق بأكمله
 */
export interface AppState extends UIState, UserState, AppStatusState, NetworkState, PerformanceState, PreferencesState, AccessibilityState, CacheState {
  // حالة الشبكة
  networkStatus: NetworkStatus;
  
  // حالة تحميل البيانات
  dataLoading: DataLoadingState;
}

/**
 * حالة واجهة المستخدم
 * تحتوي على معلومات حول حالة واجهة المستخدم
 */
export interface UIState {
  isSidebarOpen: boolean;
  lastVisitedPage: string | null;
  setSidebarOpen: (isOpen: boolean) => void;
  setLastVisitedPage: (page: string) => void;
}

/**
 * حالة المستخدم
 * تحتوي على معلومات حول المستخدم الحالي
 */
export interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  userSettings: UserSettings | null;
  socket: Socket | null;
  setAuthenticated: (auth: boolean) => void;
  setUserId: (id: string | null) => void;
  setUserRole: (role: string | null) => void;
  setUserSettings: (settings: UserSettings | null) => void;
  setSocket: (socket: Socket | null) => void;
}

/**
 * حالة التطبيق
 * تحتوي على معلومات حول حالة التطبيق نفسه
 */
export interface AppStatusState {
  appVersion: string;
  environment: 'development' | 'production';
  isOnline: boolean;
  setAppVersion: (version: string) => void;
  setEnvironment: (env: 'development' | 'production') => void;
  setOnlineStatus: (isOnline: boolean) => void;
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
  setNetworkType: (type: 'wifi' | 'ethernet' | 'cellular' | 'unknown') => void;
  setConnectionSpeed: (speed: number) => void;
  setDataUsage: (usage: DataUsageStats) => void;
  setSignalStrength: (strength: number) => void;
  setConnectedDevices: (devices: number) => void;
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
 * حالة التفضيلات
 * تحتوي على معلومات حول تفضيلات المستخدم
 */
export interface PreferencesState {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notificationsEnabled: boolean;
  animations: boolean;
  compactMode: boolean;
  setPreference: <K extends keyof PreferencesState>(key: K, value: PreferencesState[K]) => void;
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
  lastCacheUpdate: Date | null;
  setCachedData: (data: Record<string, any>) => void;
  updateCache: (key: string, data: any) => void;
  clearCache: () => void;
}

/**
 * أنواع البيانات والمُعَرّفات
 */
export type Theme = 'light' | 'dark' | 'system';
export type ColorBlindMode = 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';

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
