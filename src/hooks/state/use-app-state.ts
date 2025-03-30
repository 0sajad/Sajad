
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

/**
 * متجر إدارة الحالة المركزية للتطبيق
 * استخدام Zustand للحالة مع الحفظ التلقائي في localStorage
 */
export const useAppState = create<AppState>()(
  persist(
    (set, get, ...rest) => ({
      // Initialize required properties explicitly
      isLoading: {},
      errors: {},
      isInitialized: false,
      setIsLoading: (key, loading) => set((state) => ({
        isLoading: { ...state.isLoading, [key]: loading }
      })),
      setError: (key, error) => set((state) => ({
        errors: { ...state.errors, [key]: error }
      })),
      setInitialized: (initialized) => set({ isInitialized: initialized }),

      // Network status methods
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
      
      setNetworkStatus: (status) => set({
        isConnected: status.isConnected,
        isOnline: status.isOnline,
        // Fix 1: Don't try to access lastCheck if it's not in the status object
        lastCheck: new Date() // Simply set to current date
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

      // Initialize network status
      networkStatus: {
        isConnected: true,
        isOnline: navigator.onLine,
        lastCheck: null
      },
      
      // Initialize data loading
      dataLoading: {
        isLoading: false,
        lastUpdated: null,
        error: null
      },
      
      // Additional required properties
      isSidebarOpen: false,
      isConnected: true,
      isOnline: true,
      lastCheck: null,
      
      // UI state properties required by AppState
      isDrawerOpen: false,
      activePage: 'home',
      lastVisitedPage: null,
      modals: {},
      
      // Required preferences properties from AppState
      theme: 'system',
      language: 'ar',
      notificationsEnabled: true,
      animations: true,
      compactMode: false,
      
      // Add the required checkConnection function
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
      
      // Combine all state slices - Fix 2: Fixed parameter spread
      ...createUISlice(set, get),
      ...createPreferencesSlice(set, get),
      ...createUserSlice(set, get),
      ...createAppStatusSlice(set, get),
      ...createAccessibilitySlice(set, get),
      ...createNetworkSlice(set, get),
      ...createPerformanceSlice(set, get),
      ...createCacheSlice(set, get),
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
