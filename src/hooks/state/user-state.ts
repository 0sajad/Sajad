
import { StateCreator } from 'zustand';
import { AppState, UserState } from './types';

/**
 * مخزن حالة المستخدم
 * يحتوي على الوظائف المتعلقة بمصادقة المستخدم وبياناته وإعداداته
 */
export const createUserSlice: StateCreator<
  AppState,
  [],
  [],
  UserState
> = (set) => ({
  // حالة المستخدم
  isAuthenticated: false,
  userId: null,
  userEmail: null,
  userDisplayName: null,
  userRole: null,
  userSettings: {},
  
  // وظائف تعديل الحالة
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  
  setUserData: (userData) => set({
    userId: userData.id,
    userEmail: userData.email,
    userDisplayName: userData.displayName,
    userRole: userData.role,
  }),
  
  updateUserSettings: (newSettings) => set(state => ({
    userSettings: {
      ...state.userSettings,
      ...newSettings
    }
  })),
  
  logout: () => set({
    isAuthenticated: false,
    userId: null,
    userEmail: null,
    userDisplayName: null,
    userRole: null,
    userSettings: {},
  }),
});
