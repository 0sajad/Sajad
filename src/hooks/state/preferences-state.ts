
import { StateCreator } from 'zustand';
import { AppState, AppPreferences } from './types';

/**
 * القيم الافتراضية لتفضيلات التطبيق
 */
export const defaultPreferences: AppPreferences = {
  theme: 'system',
  language: 'ar',
  notifications: true,
  telemetry: false,
  animations: true,
  fullWidthLayout: false,
  compactMode: false,
};

/**
 * مخزن حالة التفضيلات
 * يحتوي على الوظائف المتعلقة بإدارة تفضيلات التطبيق
 */
export const createPreferencesSlice: StateCreator<
  AppState,
  [],
  [],
  Pick<AppState, 'preferences' | 'setPreference'>
> = (set) => ({
  // تفضيلات التطبيق
  preferences: defaultPreferences,
  
  // وظائف تعديل التفضيلات
  setPreference: (key, value) => set(state => ({
    preferences: {
      ...state.preferences,
      [key]: value
    }
  })),
});
