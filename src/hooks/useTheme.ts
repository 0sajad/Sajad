
import { useEffect, useState } from 'react';
import { useAppState } from './state/use-app-state';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const { preferences, setPreference } = useAppState(state => ({
    preferences: state.preferences,
    setPreference: state.setPreference
  }));
  
  const [theme, setTheme] = useState<Theme>(preferences.theme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');
  
  // مراقبة تغييرات نظام التشغيل للسمة
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // تحديث السمة الحالية للنظام
    const updateSystemTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    
    // تعيين القيمة الأولية
    updateSystemTheme(mediaQuery);
    
    // مراقبة التغييرات
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateSystemTheme);
      return () => mediaQuery.removeEventListener('change', updateSystemTheme);
    } else if (typeof mediaQuery.addListener === 'function') {
      // لدعم المتصفحات القديمة
      mediaQuery.addListener(updateSystemTheme);
      return () => mediaQuery.removeListener(updateSystemTheme);
    }
  }, []);
  
  // تحديث السمة عند تغير التفضيلات
  useEffect(() => {
    setTheme(preferences.theme);
  }, [preferences.theme]);
  
  // تطبيق السمة على المستند
  useEffect(() => {
    const root = window.document.documentElement;
    
    // استخدام السمة المحددة، أو السمة النظامية إذا كانت مضبوطة على "system"
    const activeTheme = theme === 'system' ? systemTheme : theme;
    
    // إزالة الفئات السابقة
    root.classList.remove('light', 'dark');
    
    // إضافة الفئة الجديدة
    root.classList.add(activeTheme);
    
    // تحديث خاصية CSS المخصصة
    root.style.setProperty('--theme-mode', activeTheme);
  }, [theme, systemTheme]);
  
  // تغيير السمة
  const setThemePreference = (newTheme: Theme) => {
    setTheme(newTheme);
    setPreference('theme', newTheme);
    
    // حفظ السمة في localStorage أيضاً (للتوافق مع أجزاء أخرى من التطبيق)
    try {
      localStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme to localStorage', error);
    }
  };
  
  // الحصول على السمة الفعلية (المطبقة حالياً)
  const getComputedTheme = (): 'light' | 'dark' => {
    return theme === 'system' ? systemTheme : theme;
  };
  
  return {
    theme,                // السمة المحددة (قد تكون 'system')
    systemTheme,          // السمة النظامية
    computedTheme: getComputedTheme(),  // السمة الفعلية المطبقة
    setTheme: setThemePreference,  // دالة لتغيير السمة
    isDark: getComputedTheme() === 'dark'  // اختصار للتحقق مما إذا كانت السمة الحالية مظلمة
  };
}
