
import { StateCreator } from 'zustand';
import { AppState, PreferencesState, AppPreferences } from './types';

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
  soundEffects: false,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  focusMode: false,
  arabicNumerals: false,
  autoSave: true,
  notificationsEnabled: true,
  syncSystemPreferences: true,
  // إضافة الخصائص الجديدة
  dyslexicFont: false,
  readingGuide: false,
  soundFeedback: false,
  colorBlindMode: 'none'
};

/**
 * مخزن حالة التفضيلات
 * يحتوي على الوظائف المتعلقة بإدارة تفضيلات التطبيق
 */
export const createPreferencesSlice: StateCreator<
  AppState,
  [],
  [],
  PreferencesState
> = (set) => ({
  // تفضيلات التطبيق
  theme: 'system',
  language: 'ar',
  notificationsEnabled: true,
  animations: true,
  compactMode: false,
  preferences: defaultPreferences,
  
  // وظائف تعديل التفضيلات
  setPreference: (key, value) => set((state) => ({
    preferences: {
      ...state.preferences,
      [key]: value
    }
  })),
});
