
/**
 * نوع البيانات لإعدادات إمكانية الوصول
 */
export interface A11ySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  colorBlindMode: string | null;
  dyslexicFont: boolean;
  readingGuide?: boolean;
  soundFeedback?: boolean;
  fontFamily?: string;
  lineHeight?: number;
  letterSpacing?: number;
  kashidaEnabled?: boolean;
  voiceName?: string;
  notificationVolume?: number;
  languagePreference?: string;
  contentRtl?: boolean;
}

/**
 * نوع البيانات للملف الشخصي المحفوظ
 */
export interface SavedProfile {
  name: string;
  settings: A11ySettings;
  lastModified: number;
  version?: string;
}

/**
 * نوع البيانات لملفات التعريف في التخزين المؤقت
 */
export interface ProfilesCache {
  version: string;
  profiles: Record<string, A11ySettings>;
  lastUpdated: number;
  languageProfiles?: Record<string, string[]>;
}

/**
 * نوع البيانات لمفضلات نظام التشغيل
 */
export interface SystemPreferences {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersLightMode: boolean;
  prefersDarkMode: boolean;
  prefersLanguage?: string;
}

/**
 * نوع البيانات لأنواع الإخطارات الصوتية
 */
export type SoundType = "success" | "error" | "warning" | "info" | "notification";

/**
 * نوع البيانات لسجل التغييرات
 */
export interface ChangeLog {
  timestamp: number;
  type: string;
  settings: Partial<A11ySettings>;
  language?: string;
}

/**
 * نوع البيانات لإعدادات الترجمة والتعريب
 */
export interface LocalizationSettings {
  rtlEnabled: boolean;
  defaultLanguage: string;
  availableLanguages: string[];
  arabicKashida?: boolean;
  arabicFontScale?: number;
  fontScaling?: Record<string, number>;
}
