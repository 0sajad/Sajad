
import { StateCreator } from 'zustand';
import { AppState } from './types';

/**
 * تعريف واجهة تفضيلات التطبيق
 */
export interface AppPreferences {
  language: string;          // لغة التطبيق
  theme: 'system' | 'light' | 'dark'; // سمة التطبيق
  notificationsEnabled: boolean; // تمكين الإشعارات
  autoRefresh: boolean;     // تحديث تلقائي
  refreshRate: number;      // معدل التحديث (بالدقائق)
  compactMode: boolean;     // وضع العرض المضغوط
  developerMode: boolean;   // وضع المطور
  analyticsEnabled: boolean; // تمكين التحليلات
  highContrast: boolean;    // وضع التباين العالي
  largeText: boolean;       // نص كبير للقراءة
  reducedMotion: boolean;   // تقليل الحركة
  animationsEnabled: boolean; // تمكين الرسوم المتحركة
  focusMode: boolean;       // وضع التركيز
  readingGuide: boolean;    // دليل القراءة
  dyslexicFont: boolean;    // خط لعسر القراءة
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia'; // وضع عمى الألوان
  soundFeedback: boolean;   // تعليقات صوتية
  notifications: boolean;   // إشعارات
  telemetry: boolean;       // قياس عن بعد
  animations: boolean;      // رسوم متحركة
  fullWidthLayout: boolean; // تخطيط بعرض كامل
  syncSystemPreferences: boolean; // مزامنة تفضيلات النظام
  soundEffects: boolean;    // تأثيرات صوتية
  arabicNumerals: boolean;  // أرقام عربية
  autoSave: boolean;        // حفظ تلقائي
  fontSize: 'normal' | 'large' | 'x-large'; // حجم الخط
}

/**
 * التفضيلات الافتراضية للتطبيق
 */
export const defaultPreferences: AppPreferences = {
  language: 'ar',  // اللغة الافتراضية
  theme: 'system', // السمة: نظام، فاتح، داكن
  notificationsEnabled: true,
  autoRefresh: true,
  refreshRate: 30,
  compactMode: false,
  developerMode: false, // وضع المطور معطل افتراضيًا
  analyticsEnabled: true,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  animationsEnabled: true,
  focusMode: false,
  readingGuide: false,
  dyslexicFont: false,
  colorBlindMode: 'none',
  soundFeedback: false,
  notifications: true,
  telemetry: true,
  animations: true,
  fullWidthLayout: false,
  syncSystemPreferences: true,
  soundEffects: false,
  arabicNumerals: false,
  autoSave: true,
  fontSize: 'normal'
};

// تعريف شريحة التفضيلات بشكل صحيح
export const createPreferencesSlice: StateCreator<
  AppState,
  [],
  [],
  { 
    preferences: AppPreferences;
    setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
    resetPreferences: () => void;
  }
> = (set, get, _store) => ({
  preferences: { ...defaultPreferences },
  
  setPreference: (key, value) =>
    set((state) => ({
      preferences: {
        ...state.preferences,
        [key]: value,
      },
    })),
    
  resetPreferences: () =>
    set(() => ({
      preferences: { ...defaultPreferences },
    })),
});

// تصدير خطاف التفضيلات للتوافق
export const usePreferences = () => {
  const preferences = useAppState => useAppState.getState().preferences || defaultPreferences;
  const setPreference = useAppState => useAppState.getState().setPreference || (() => {});
  const resetPreferences = useAppState => useAppState.getState().resetPreferences || (() => {});
  
  return {
    preferences,
    setPreference,
    resetPreferences
  };
};

// وظيفة جلب حالة التطبيق - للتوافق الخلفي
function useAppState() {
  try {
    // محاولة استيراد حالة التطبيق الفعلية
    const { useAppState } = require('./use-app-state');
    return useAppState;
  } catch (err) {
    // إذا فشل الاستيراد، ارجع كائن بديل
    return {
      getState: () => ({
        preferences: defaultPreferences,
        setPreference: () => {},
        resetPreferences: () => {}
      })
    };
  }
}
