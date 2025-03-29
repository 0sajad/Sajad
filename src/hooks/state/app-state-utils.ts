import { AppPreferences } from './preferences-state';
import { AppState, ColorBlindMode } from './types';

/**
 * يُستخدم لتطبيق تفضيلات النظام على حالة التطبيق
 * @param preferences تفضيلات المستخدم
 */
export const applySystemPreferences = (preferences: AppPreferences) => {
  // تطبيق الوضع المظلم
  if (preferences.theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  } else {
    document.documentElement.classList.toggle('dark', preferences.theme === 'dark');
  }
  
  // تطبيق تقليل الحركة
  if (preferences.syncSystemPreferences) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      preferences.reducedMotion = true;
      document.documentElement.classList.add('reduce-motion');
    }
  } else if (preferences.reducedMotion) {
    document.documentElement.classList.add('reduce-motion');
  }
  
  // تطبيق وضع عمى الألوان
  applyColorBlindMode(preferences.colorBlindMode);
};

/**
 * تطبيق وضع عمى الألوان على المستند
 * @param mode وضع عمى الألوان
 */
export const applyColorBlindMode = (mode: ColorBlindMode) => {
  const body = document.body;
  
  // إزالة كل فئات عمى الألوان
  body.classList.remove('protanopia', 'deuteranopia', 'tritanopia', 'achromatopsia');
  
  // إضافة الفئة المناسبة
  if (mode !== 'none') {
    body.classList.add(mode);
  }
};

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
  soundEffects: false,
  highContrast: false,
  largeText: false,
  reducedMotion: false,
  animationsEnabled: true, // إضافة هذا الإعداد الناقص
  focusMode: false,
  readingGuide: false,
  dyslexicFont: false,
  colorBlindMode: 'none',
  soundFeedback: false
};

/**
 * إنشاء كائن تفضيلات افتراضي
 */
export const createDefaultPreferences = (): AppPreferences => {
  return {
    language: 'ar',
    theme: 'system',
    fontSize: 'normal',
    notificationsEnabled: true,
    autoRefresh: true,
    refreshRate: 30,
    compactMode: false,
    developerMode: false,
    analyticsEnabled: true,
    colorBlindMode: 'none',
    dyslexicFont: false,
    readingGuide: false,
    soundFeedback: false,
    notifications: true,
    telemetry: false,
    animations: true,
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    focusMode: false,
    arabicNumerals: false,
    autoSave: true,
    syncSystemPreferences: true,
    fullWidthLayout: false,
    soundEffects: false
  };
};

/**
 * استخراج قيم الإعدادات من localStorage
 */
export const extractPreferencesFromLocalStorage = (): Partial<AppPreferences> => {
  const preferences: Partial<AppPreferences> = {};
  
  try {
    // محاولة استخراج اللغة
    const storedLang = localStorage.getItem('i18nextLng');
    if (storedLang) {
      preferences.language = storedLang;
    }
    
    // استخراج السمة
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && (storedTheme === 'dark' || storedTheme === 'light' || storedTheme === 'system')) {
      preferences.theme = storedTheme;
    }
    
    // استخراج المزيد من الإعدادات إذا كانت محفوظة
    try {
      const octaPreferences = localStorage.getItem('octa-preferences');
      if (octaPreferences) {
        const parsedPrefs = JSON.parse(octaPreferences);
        if (parsedPrefs && parsedPrefs.state && parsedPrefs.state.preferences) {
          // دمج الإعدادات المحفوظة
          Object.assign(preferences, parsedPrefs.state.preferences);
        }
      }
    } catch (e) {
      console.error('Error parsing stored preferences:', e);
    }
  } catch (e) {
    console.error('Error accessing localStorage:', e);
  }
  
  return preferences;
};

/**
 * يحفظ تفضيلات المستخدم إلى ذاكرة التخزين المحلية
 */
export const savePreferencesToLocalStorage = (preferences: AppPreferences) => {
  try {
    // حفظ الإعدادات
    localStorage.setItem('theme', preferences.theme);
    localStorage.setItem('i18nextLng', preferences.language);
    
    // يمكن إضافة المزيد من الإعدادات للحفظ هنا
  } catch (e) {
    console.error('Error saving preferences to localStorage:', e);
  }
};

/**
 * استرجاع الإعدادات من ذاكرة التخزين المؤقت
 */
export const getPreferencesFromCache = (): Partial<AppPreferences> => {
  try {
    const cachedPrefs = sessionStorage.getItem('cached-preferences');
    if (cachedPrefs) {
      return JSON.parse(cachedPrefs);
    }
  } catch (e) {
    console.error('Error retrieving preferences from cache:', e);
  }
  
  return {};
};

/**
 * حفظ الإعدادات في ذاكرة التخزين المؤقت
 */
export const savePreferencesToCache = (preferences: AppPreferences) => {
  try {
    sessionStorage.setItem('cached-preferences', JSON.stringify(preferences));
  } catch (e) {
    console.error('Error saving preferences to cache:', e);
  }
};

/**
 * تصدير الإعدادات لملف JSON
 */
export const exportPreferencesToJson = (preferences: AppPreferences): string => {
  return JSON.stringify(preferences, null, 2);
};

/**
 * استيراد الإعدادات من ملف JSON
 */
export const importPreferencesFromJson = (jsonText: string): Partial<AppPreferences> => {
  try {
    const importedPrefs = JSON.parse(jsonText);
    // التحقق من صحة البيانات المستوردة
    if (typeof importedPrefs !== 'object') {
      throw new Error('Invalid preferences format');
    }
    
    return importedPrefs;
  } catch (e) {
    console.error('Error parsing preferences JSON:', e);
    throw e;
  }
};

/**
 * تطبيق تفضيلات الاستخدام مرة واحدة عند بدء التطبيق
 */
export const applyInitialPreferences = (state: AppState) => {
  applySystemPreferences(state.preferences);
  
  // تطبيق إعدادات إمكانية الوصول على عنصر الـ body
  document.body.classList.toggle('high-contrast', state.preferences.highContrast);
  document.body.classList.toggle('large-text', state.preferences.largeText);
  document.body.classList.toggle('dyslexic-font', state.preferences.dyslexicFont);
  
  // إذا كان وضع المطور مفعلاً، قم بتسجيل الإعدادات للتصحيح
  if (state.preferences.developerMode) {
    console.info('Initial preferences applied:', state.preferences);
  }
};
