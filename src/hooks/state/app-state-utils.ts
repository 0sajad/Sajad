
import { AppPreferences } from './preferences-state';

/**
 * الدالة المساعدة للتحقق من صحة واستكمال تفضيلات التطبيق
 * تعيد نسخة مصححة ومكتملة من كائن التفضيلات
 * @param preferences تفضيلات المستخدم الواردة
 * @param defaultPreferences التفضيلات الافتراضية للتطبيق
 */
export const sanitizePreferences = (
  preferences: Partial<AppPreferences>,
  defaultPreferences: AppPreferences
): AppPreferences => {
  // إنشاء نسخة جديدة من التفضيلات الافتراضية
  const sanitized = { ...defaultPreferences };

  // إذا كان الكائن الوارد غير محدد، إرجاع التفضيلات الافتراضية
  if (!preferences) {
    return sanitized;
  }

  // تخصيص قيم من التفضيلات الواردة
  if (typeof preferences.language === 'string') {
    sanitized.language = preferences.language;
  }

  if (['system', 'light', 'dark'].includes(preferences.theme as string)) {
    sanitized.theme = preferences.theme as 'system' | 'light' | 'dark';
  }

  // التفضيلات الثنائية
  const booleanProps: (keyof AppPreferences)[] = [
    'notificationsEnabled',
    'autoRefresh',
    'compactMode',
    'developerMode',
    'analyticsEnabled',
    'highContrast',
    'largeText',
    'reducedMotion',
    'animationsEnabled',
    'focusMode',
    'readingGuide',
    'dyslexicFont',
    'soundFeedback',
    'notifications',
    'telemetry',
    'animations',
    'fullWidthLayout',
    'syncSystemPreferences'
  ];

  booleanProps.forEach(prop => {
    if (typeof preferences[prop] === 'boolean') {
      (sanitized as any)[prop] = preferences[prop];
    }
  });

  // معدل التحديث - يجب أن يكون رقمًا إيجابيًا
  if (typeof preferences.refreshRate === 'number' && preferences.refreshRate > 0) {
    sanitized.refreshRate = preferences.refreshRate;
  }

  // وضع عمى الألوان - فقط القيم المسموح بها
  const validColorBlindModes = ['none', 'protanopia', 'deuteranopia', 'tritanopia'];
  if (preferences.colorBlindMode && validColorBlindModes.includes(preferences.colorBlindMode)) {
    sanitized.colorBlindMode = preferences.colorBlindMode as 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  }

  return sanitized;
};

/**
 * دالة مساعدة لتحديث تفضيلات التطبيق المخزنة محليًا
 * @param preferences تفضيلات التطبيق الجديدة
 * @param storageKey مفتاح التخزين المحلي
 */
export const persistPreferences = (
  preferences: AppPreferences,
  storageKey: string = 'app-preferences'
): void => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error persisting preferences:', error);
  }
};

/**
 * دالة مساعدة لاسترجاع تفضيلات التطبيق المخزنة محليًا
 * @param storageKey مفتاح التخزين المحلي
 * @param defaultPreferences التفضيلات الافتراضية للتطبيق
 */
export const retrievePersistedPreferences = (
  storageKey: string = 'app-preferences',
  defaultPreferences: AppPreferences
): AppPreferences => {
  try {
    const persisted = localStorage.getItem(storageKey);
    if (persisted) {
      const parsed = JSON.parse(persisted);
      return sanitizePreferences(parsed, defaultPreferences);
    }
  } catch (error) {
    console.error('Error retrieving persisted preferences:', error);
  }
  return { ...defaultPreferences };
};
