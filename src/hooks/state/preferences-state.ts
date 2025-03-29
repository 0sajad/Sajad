
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
  soundFeedback: false
};
