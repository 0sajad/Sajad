
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
  // إضافة الخصائص الناقصة التي تستخدمها الملفات الأخرى
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
  // القيم الافتراضية للخصائص الجديدة
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

// تعديل حجج دالة createPreferencesSlice لتستخدم فقط set و get
export const createPreferencesSlice = (set, get) => ({
  preferences: { ...defaultPreferences },
  setPreference: (key: keyof AppPreferences, value: any) =>
    set((state: any) => ({
      preferences: {
        ...state.preferences,
        [key]: value,
      },
    })),
  resetPreferences: () =>
    set((_state: any) => ({
      preferences: { ...defaultPreferences },
    })),
});

// Add the usePreferences export for index.ts
export const usePreferences = () => {
  // This is just a stub for compatibility
  // The actual implementation will be in other files
  return {
    preferences: defaultPreferences,
    setPreference: (_key: keyof AppPreferences, _value: any) => {},
    resetPreferences: () => {}
  };
};
