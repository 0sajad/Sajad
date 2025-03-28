
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState } from './types';
import { createUISlice } from './ui-state';
import { createPreferencesSlice } from './preferences-state';
import { createUserSlice } from './user-state';
import { createAppStatusSlice } from './app-status-state';

/**
 * متجر إدارة الحالة المركزية للتطبيق
 * استخدام Zustand للحالة مع الحفظ التلقائي في localStorage
 */
export const useAppState = create<AppState>()(
  persist(
    (...args) => ({
      ...createUISlice(...args),
      ...createPreferencesSlice(...args),
      ...createUserSlice(...args),
      ...createAppStatusSlice(...args),
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
