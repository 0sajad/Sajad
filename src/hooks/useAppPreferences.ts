
import { useCallback } from 'react';
import { useAppState } from './state/use-app-state';
import { AppPreferences } from './state/preferences-state';
import { useTheme } from './useTheme';

/**
 * خطاف لسهولة استخدام تفضيلات التطبيق
 */
export function useAppPreferences() {
  const { 
    preferences, 
    setPreference 
  } = useAppState(state => ({
    preferences: state.preferences,
    setPreference: state.setPreference
  }));
  
  const { setTheme } = useTheme();
  
  /**
   * إعادة تعيين جميع التفضيلات إلى القيم الافتراضية
   */
  const resetPreferences = useCallback(() => {
    // بدلاً من استخدام resetPreferences الذي لا يوجد في AppState
    // سنستخدم defaultPreferences ونعين كل قيمة يدوياً
    const { defaultPreferences } = require('./state/preferences-state');
    
    Object.keys(defaultPreferences).forEach((key) => {
      setPreference(key as keyof AppPreferences, defaultPreferences[key as keyof AppPreferences]);
    });
    
    // تعيين السمة بشكل منفصل نظراً لأنها تحتاج معالجة خاصة
    setTheme(defaultPreferences.theme);
  }, [setPreference, setTheme]);
  
  /**
   * تغيير إعداد بناءً على اسمه والقيمة المطلوبة
   */
  const updatePreference = useCallback(<K extends keyof AppPreferences>(
    key: K, 
    value: AppPreferences[K]
  ) => {
    // معالجة خاصة للسمة
    if (key === 'theme') {
      setTheme(value as 'light' | 'dark' | 'system');
    }
    
    // تحديث التفضيل في حالة التطبيق
    setPreference(key, value);
  }, [setPreference, setTheme]);
  
  /**
   * تبديل قيمة إعداد ثنائي بين الصواب والخطأ
   */
  const togglePreference = useCallback((key: keyof AppPreferences) => {
    // التأكد من أن الإعداد هو قيمة ثنائية
    if (
      typeof preferences[key] === 'boolean' ||
      preferences[key] === true ||
      preferences[key] === false
    ) {
      const currentValue = Boolean(preferences[key]);
      updatePreference(key, !currentValue as any);
    }
  }, [preferences, updatePreference]);
  
  return {
    preferences,
    updatePreference,
    togglePreference,
    resetPreferences
  };
}
