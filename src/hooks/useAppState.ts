
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * نوع البيانات للتفضيلات العامة للتطبيق
 */
interface AppPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  telemetry: boolean;
  animations: boolean;
  fullWidthLayout: boolean;
  compactMode: boolean;
}

/**
 * نوع البيانات لحالة التطبيق
 */
interface AppState {
  // حالة الواجهة
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isSearchOpen: boolean;
  activeSection: string | null;
  lastVisitedPage: string;
  
  // تفضيلات التطبيق
  preferences: AppPreferences;
  
  // حالة المستخدم
  isAuthenticated: boolean;
  userId: string | null;
  userRole: 'guest' | 'user' | 'admin' | null;
  userSettings: Record<string, any>;
  
  // حالة أخرى
  isOnline: boolean;
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  
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

/**
 * متجر إدارة الحالة المركزية للتطبيق
 * استخدام Zustand للحالة مع الحفظ التلقائي في localStorage
 */
export const useAppState = create<AppState>()(
  persist(
    (set, get) => ({
      // حالة الواجهة
      isSidebarOpen: true,
      isSettingsOpen: false,
      isSearchOpen: false,
      activeSection: null,
      lastVisitedPage: '/',
      
      // تفضيلات التطبيق
      preferences: {
        theme: 'system',
        language: 'ar',
        notifications: true,
        telemetry: false,
        animations: true,
        fullWidthLayout: false,
        compactMode: false,
      },
      
      // حالة المستخدم
      isAuthenticated: false,
      userId: null,
      userRole: null,
      userSettings: {},
      
      // حالة أخرى
      isOnline: true,
      isLoading: {},
      errors: {},
      
      // وظائف لتعديل الحالة
      toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
      
      toggleSettings: () => set(state => ({ isSettingsOpen: !state.isSettingsOpen })),
      
      toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
      
      setActiveSection: (section) => set({ activeSection: section }),
      
      setPreference: (key, value) => set(state => ({
        preferences: {
          ...state.preferences,
          [key]: value
        }
      })),
      
      setIsLoading: (key, value) => set(state => ({
        isLoading: {
          ...state.isLoading,
          [key]: value
        }
      })),
      
      setError: (key, value) => set(state => ({
        errors: {
          ...state.errors,
          [key]: value
        }
      })),
      
      clearAllErrors: () => set({ errors: {} }),
      
      // وظائف إدارة المستخدم
      login: (userId, role) => set({
        isAuthenticated: true,
        userId,
        userRole: role,
      }),
      
      logout: () => set({
        isAuthenticated: false,
        userId: null,
        userRole: null,
        userSettings: {},
      }),
      
      updateUserSettings: (settings) => set(state => ({
        userSettings: {
          ...state.userSettings,
          ...settings
        }
      })),
    }),
    {
      name: 'app-state',
      partialize: (state) => ({
        // نحفظ فقط البيانات التي نريد بقاءها عند تحديث الصفحة
        preferences: state.preferences,
        lastVisitedPage: state.lastVisitedPage,
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
        userRole: state.userRole,
        userSettings: state.userSettings,
      }),
    }
  )
);

/**
 * خطاف مساعد للتعامل مع حالة الشبكة
 */
export function useNetworkStatus() {
  const { isOnline } = useAppState();
  
  return { isOnline };
}

/**
 * خطاف مساعد للتعامل مع تفضيلات التطبيق
 */
export function useAppPreferences() {
  const { preferences, setPreference } = useAppState();
  
  return { 
    preferences,
    setPreference,
    
    // وظائف مختصرة للتفضيلات الشائعة
    toggleTheme: () => {
      const currentTheme = useAppState.getState().preferences.theme;
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setPreference('theme', nextTheme);
    },
    
    toggleAnimations: () => {
      const currentValue = useAppState.getState().preferences.animations;
      setPreference('animations', !currentValue);
    }
  };
}

/**
 * خطاف مساعد للتعامل مع تحميل البيانات والأخطاء
 */
export function useDataLoading(key: string) {
  const isLoading = useAppState(state => state.isLoading[key] || false);
  const error = useAppState(state => state.errors[key] || null);
  const setIsLoading = useAppState(state => state.setIsLoading);
  const setError = useAppState(state => state.setError);
  
  return {
    isLoading,
    error,
    startLoading: () => setIsLoading(key, true),
    stopLoading: () => setIsLoading(key, false),
    setError: (errorMessage: string | null) => setError(key, errorMessage),
    clearError: () => setError(key, null),
  };
}
