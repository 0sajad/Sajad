
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from './types';
import { createUISlice } from './ui-state';
import { createPreferencesSlice } from './preferences-state';
import { createUserSlice } from './user-state';
import { createAppStatusSlice } from './app-status-state';
import { createAccessibilitySlice } from './accessibility-state';
import { createNetworkSlice } from './network-state';
import { createPerformanceSlice } from './performance-state';
import { createCacheSlice } from './cache-state';
import { createDataSlice } from './data-state';

/**
 * متجر إدارة الحالة المركزية للتطبيق
 * استخدام Zustand للحالة مع الحفظ التلقائي في localStorage
 */
export const useAppState = create<AppState>()(
  persist(
    (set, get, store) => ({
      // خصائص الحالة الأساسية
      isLoading: {},
      errors: {},
      isInitialized: false,
      
      // وظائف الحالة الأساسية
      setIsLoading: (key, loading) => set((state) => ({
        isLoading: { ...state.isLoading, [key]: loading }
      })),
      setError: (key, error) => set((state) => ({
        errors: { ...state.errors, [key]: error }
      })),
      setInitialized: (initialized) => set({ isInitialized: initialized }),

      // وظائف حالة الشبكة
      checkNetworkStatus: async () => {
        try {
          const response = await fetch('https://www.google.com/generate_204', {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
          });
          
          const isOnline = response.type === 'opaque' || response.ok;
          set({ 
            isConnected: true,
            isOnline,
            lastCheck: new Date()
          });
          
          return isOnline;
        } catch (error) {
          set({ 
            isConnected: false,
            isOnline: false,
            lastCheck: new Date()
          });
          
          return false;
        }
      },
      
      // وظائف إضافية للشبكة
      setNetworkStatus: (status) => set({
        isConnected: status.isConnected,
        isOnline: status.isOnline,
        lastCheck: new Date()
      }),
      
      handleOfflineStatus: () => {
        set({
          isOnline: false,
          lastCheck: new Date()
        });
      },

      handleOnlineStatus: () => {
        set({
          isOnline: true,
          lastCheck: new Date()
        });
      },

      // حالة الشبكة الأولية
      networkStatus: {
        isConnected: true,
        isOnline: navigator.onLine,
        lastCheck: null
      },
      
      // حالة تحميل البيانات الأولية
      dataLoading: {
        isLoading: false,
        lastUpdated: null,
        error: null
      },
      
      // خصائص إضافية مطلوبة
      isSidebarOpen: false,
      isConnected: true,
      isOnline: true,
      lastCheck: null,
      
      // خصائص حالة واجهة المستخدم
      isDrawerOpen: false,
      activePage: 'home',
      lastVisitedPage: null,
      modals: {},
      
      // خصائص التفضيلات
      theme: 'system',
      language: 'ar',
      notificationsEnabled: true,
      animations: true,
      compactMode: false,
      
      // وظيفة فحص الاتصال
      checkConnection: async () => {
        try {
          const response = await fetch('https://www.google.com/generate_204', {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
          });
          
          const isOnline = response.type === 'opaque' || response.ok;
          set({ 
            isConnected: true,
            isOnline,
            lastCheck: new Date()
          });
          
          return isOnline;
        } catch (error) {
          set({ 
            isConnected: false,
            isOnline: false,
            lastCheck: new Date()
          });
          
          return false;
        }
      },
      
      // دمج جميع شرائح الحالة مع تمرير المعاملات الصحيحة
      ...createUISlice(set, get, store),
      ...createPreferencesSlice(set, get, store),
      ...createUserSlice(set, get, store),
      ...createAppStatusSlice(set, get, store),
      ...createAccessibilitySlice(set, get, store),
      ...createNetworkSlice(set, get, store),
      ...createPerformanceSlice(set, get, store),
      ...createCacheSlice(set, get, store),
      ...createDataSlice(set, get, store)
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
        highContrast: state.highContrast,
        largeText: state.largeText,
        reducedMotion: state.reducedMotion,
        focusMode: state.focusMode,
        readingGuide: state.readingGuide,
        colorBlindMode: state.colorBlindMode,
        dyslexicFont: state.dyslexicFont,
        soundFeedback: state.soundFeedback,
        deviceTier: state.deviceTier,
        cachedData: state.cachedData,
      }),
    }
  )
);
