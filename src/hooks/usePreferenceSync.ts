
import { useEffect, useCallback } from 'react';
import { useA11y } from './useA11y';
import { useAppState } from './state/use-app-state';
import { useNotifications } from './useNotifications';
import { useTranslation } from 'react-i18next';

/**
 * خطاف لمزامنة تفضيلات التطبيق مع إعدادات النظام
 */
export function usePreferenceSync() {
  const { 
    setReducedMotion, 
    setHighContrast,
    setColorBlindMode
  } = useA11y();
  const appState = useAppState();
  const setPreference = (key: string, value: any) => {
    appState.setState({ 
      preferences: { 
        ...appState.preferences, 
        [key]: value 
      } 
    });
  };
  const { info } = useNotifications();
  const { t } = useTranslation();
  
  // التحقق من تفضيلات المستخدم لتقليل الحركة
  useEffect(() => {
    // استخدام استعلام الوسائط للكشف عن تفضيل تقليل الحركة
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const prefersReducedMotion = e.matches;
      const shouldSync = appState.preferences?.syncSystemPreferences ?? true;
      
      if (shouldSync) {
        setReducedMotion(prefersReducedMotion);
        setPreference('reducedMotion', prefersReducedMotion);
        
        if (prefersReducedMotion) {
          info(
            t('preferences.reducedMotionEnabled', 'تم تفعيل وضع تقليل الحركة'),
            t('preferences.syncedWithSystem', 'تمت المزامنة مع تفضيلات النظام')
          );
        }
      }
    };
    
    // التحقق عند التحميل
    handleReducedMotionChange(reducedMotionQuery);
    
    // الاستماع للتغييرات
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, [setReducedMotion, setPreference, info, t, appState.preferences]);
  
  // التحقق من وضع الألوان المظلم/الفاتح
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleDarkModeChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const prefersDarkMode = e.matches;
      const shouldSync = appState.preferences?.syncSystemPreferences ?? true;
      
      if (shouldSync) {
        setPreference('theme', prefersDarkMode ? 'dark' : 'light');
        
        if (prefersDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };
    
    // التحقق عند التحميل
    handleDarkModeChange(darkModeQuery);
    
    // الاستماع للتغييرات
    darkModeQuery.addEventListener('change', handleDarkModeChange);
    
    return () => {
      darkModeQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, [setPreference, appState.preferences]);
  
  // التحقق من تفضيلات التباين العالي
  useEffect(() => {
    const highContrastQuery = window.matchMedia('(prefers-contrast: more)');
    
    const handleHighContrastChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const prefersHighContrast = e.matches;
      const shouldSync = appState.preferences?.syncSystemPreferences ?? true;
      
      if (shouldSync) {
        setHighContrast(prefersHighContrast);
        setPreference('highContrast', prefersHighContrast);
        
        if (prefersHighContrast) {
          info(
            t('preferences.highContrastEnabled', 'تم تفعيل وضع التباين العالي'),
            t('preferences.syncedWithSystem', 'تمت المزامنة مع تفضيلات النظام')
          );
        }
      }
    };
    
    // التحقق عند التحميل
    handleHighContrastChange(highContrastQuery);
    
    // الاستماع للتغييرات
    highContrastQuery.addEventListener('change', handleHighContrastChange);
    
    return () => {
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, [setHighContrast, setPreference, info, t, appState.preferences]);
  
  // وظيفة لإعادة مزامنة جميع التفضيلات مع إعدادات النظام
  const syncAllWithSystem = useCallback(() => {
    // مزامنة وضع تقليل الحركة
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(reducedMotionQuery.matches);
    setPreference('reducedMotion', reducedMotionQuery.matches);
    
    // مزامنة وضع الألوان المظلم/الفاتح
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPreference('theme', darkModeQuery.matches ? 'dark' : 'light');
    if (darkModeQuery.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // مزامنة وضع التباين العالي
    const highContrastQuery = window.matchMedia('(prefers-contrast: more)');
    setHighContrast(highContrastQuery.matches);
    setPreference('highContrast', highContrastQuery.matches);
    
    // إعلام المستخدم
    info(
      t('preferences.syncComplete', 'تمت مزامنة التفضيلات'),
      t('preferences.syncedAllPreferences', 'تمت مزامنة جميع التفضيلات مع إعدادات النظام')
    );
  }, [setReducedMotion, setHighContrast, setPreference, info, t]);
  
  return {
    syncAllWithSystem
  };
}
