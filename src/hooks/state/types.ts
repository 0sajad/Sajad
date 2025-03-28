
/**
 * أنواع البيانات لإدارة حالة التطبيق
 */

/**
 * نوع البيانات للتفضيلات العامة للتطبيق
 */
export interface AppPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  telemetry: boolean;
  animations: boolean;
  fullWidthLayout: boolean;
  compactMode: boolean;
}

/**
 * نوع البيانات لحالة واجهة المستخدم
 */
export interface UIState {
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isSearchOpen: boolean;
  activeSection: string | null;
  lastVisitedPage: string;
}

/**
 * نوع البيانات لحالة المستخدم
 */
export interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: 'guest' | 'user' | 'admin' | null;
  userSettings: Record<string, any>;
}

/**
 * نوع البيانات لحالة التطبيق المتعلقة بالأخطاء والتحميل
 */
export interface AppStatusState {
  isOnline: boolean;
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
}

/**
 * نوع البيانات للحالة الكاملة للتطبيق
 */
export interface AppState extends UIState, AppStatusState {
  // تفضيلات التطبيق
  preferences: AppPreferences;
  
  // حالة المستخدم
  isAuthenticated: boolean;
  userId: string | null;
  userRole: 'guest' | 'user' | 'admin' | null;
  userSettings: Record<string, any>;
  
  // وظائف لتعديل الحالة
  toggleSidebar: () => void;
  toggleSettings: () => void;
  toggleSearch: () => void;
  setActiveSection: (section: string | null) => void;
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
  setIsLoading: (key: string, value: boolean) => void;
  setError: (key: string, value: string | null) => void;
  clearAllErrors: () => void;
  
  // وظائف إدارة المستخدم
  login: (userId: string, role: 'user' | 'admin') => void;
  logout: () => void;
  updateUserSettings: (settings: Record<string, any>) => void;
}
