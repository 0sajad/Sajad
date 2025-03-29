
import { useCallback, useEffect } from 'react';
import { useAppState } from './state/use-app-state';

type Theme = 'light' | 'dark' | 'system';

/**
 * خطاف لإدارة سمة التطبيق (الوضع الفاتح والداكن)
 */
export function useTheme() {
  const theme = useAppState(state => state.preferences.theme);
  const setPreference = useAppState(state => state.setPreference);
  
  /**
   * تطبيق السمة المناسبة على الصفحة بناءً على قيمة السمة المختارة
   */
  const applyTheme = useCallback((theme: Theme) => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      // استخدام تفضيلات النظام
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      
      root.classList.remove('light', 'dark');
      root.classList.add(systemTheme);
    } else {
      // استخدام السمة المحددة يدوياً
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, []);
  
  /**
   * تعيين سمة التطبيق
   */
  const setTheme = useCallback((newTheme: Theme) => {
    setPreference('theme', newTheme);
  }, [setPreference]);
  
  // تطبيق السمة عند تغييرها أو عند تحميل الصفحة
  useEffect(() => {
    applyTheme(theme);
    
    // إعداد مراقب لتغييرات تفضيلات النظام
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, applyTheme]);
  
  return {
    theme,
    setTheme,
    isDark: document.documentElement.classList.contains('dark'),
    isLight: document.documentElement.classList.contains('light'),
  };
}
