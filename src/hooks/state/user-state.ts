
import { StateCreator } from 'zustand';
import { AppState, UserState } from './types';

/**
 * مخزن حالة المستخدم
 * يحتوي على الوظائف المتعلقة بإدارة حالة المستخدم
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
  userRole: null,
  userSettings: {},
  
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
});
