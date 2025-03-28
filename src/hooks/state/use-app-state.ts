
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

/**
 * متجر إدارة الحالة المركزية للتطبيق
 * استخدام Zustand للحالة مع الحفظ التلقائي في localStorage
 */
export const useAppState = create<AppState>()(
  persist(
    (...args) => ({
      // Initialize network status
      networkStatus: {
        isConnected: true,
        isOnline: true,
        lastCheck: null
      },
      
      // Initialize data loading
      dataLoading: {
        isLoading: false,
        lastUpdated: null,
        error: null
      },
      
      // Combine all state slices
      ...createUISlice(...args),
      ...createPreferencesSlice(...args),
      ...createUserSlice(...args),
      ...createAppStatusSlice(...args),
      ...createAccessibilitySlice(...args),
      ...createNetworkSlice(...args),
      ...createPerformanceSlice(...args),
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
      }),
    }
  )
);
