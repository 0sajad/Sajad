
import { StateCreator } from 'zustand';
import { AppState, UserState, UserSettings } from './types';

/**
 * القيم الافتراضية لإعدادات المستخدم
 */
const defaultUserSettings: UserSettings = {
  theme: 'system',
  language: 'ar',
  notificationsEnabled: true
};

/**
 * مخزن حالة المستخدم
 * يحتوي على الوظائف المتعلقة بمصادقة المستخدم وبياناته وإعداداته
 */
export const createUserSlice: StateCreator<
  AppState,
  [],
  [],
  UserState
> = (set, get, _store) => ({
  // حالة المستخدم
  isAuthenticated: false,
  userId: null,
  userEmail: null,
  userDisplayName: null,
  userRole: null,
  userSettings: defaultUserSettings,
  socket: null,
  
  // وظائف تعديل الحالة
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  
  setUserId: (id) => set({ userId: id }),
  
  setUserRole: (role) => set({ userRole: role }),
  
  setUserSettings: (settings) => set({ userSettings: settings }),
  
  setSocket: (socket) => set({ socket }),
  
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
    userSettings: defaultUserSettings,
    socket: null
  }),
});
