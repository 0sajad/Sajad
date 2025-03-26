
import { A11ySettings } from './types/accessibility';

type SetterFunction<T> = (value: T) => void;

/**
 * هوك لتنشيط ملفات تعريف إمكانية الوصول
 */
export function useProfileActivation(
  setHighContrast: SetterFunction<boolean>,
  setLargeText: SetterFunction<boolean>,
  setReducedMotion: SetterFunction<boolean>,
  setFocusMode: SetterFunction<boolean>,
  setColorBlindMode: SetterFunction<string | null>,
  setDyslexicFont: SetterFunction<boolean>,
  setReadingGuide: SetterFunction<boolean>,
  setSoundFeedback: SetterFunction<boolean>
) {
  // تطبيق الإعدادات من ملف التعريف
  const applySettings = (settings: A11ySettings) => {
    setHighContrast(settings.highContrast);
    setLargeText(settings.largeText);
    setReducedMotion(settings.reducedMotion);
    setFocusMode(settings.focusMode);
    setColorBlindMode(settings.colorBlindMode);
    setDyslexicFont(settings.dyslexicFont);
    setReadingGuide(settings.readingGuide || false);
    setSoundFeedback(settings.soundFeedback || false);
    
    // تطبيق الإعدادات على DOM لضمان تحديث الواجهة فوراً
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (settings.largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
    
    if (settings.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
    
    if (settings.focusMode) {
      document.documentElement.classList.add('focus-mode');
    } else {
      document.documentElement.classList.remove('focus-mode');
    }
    
    if (settings.dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
    
    // التعامل مع وضع عمى الألوان
    document.documentElement.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (settings.colorBlindMode) {
      document.documentElement.classList.add(settings.colorBlindMode);
    }
  };
  
  // تحميل ملف تعريف من التخزين المحلي
  const loadProfile = (profileName: string, getProfiles: () => Record<string, A11ySettings>) => {
    try {
      const profiles = getProfiles();
      const settings = profiles[profileName];
      
      if (!settings) {
        console.error(`Profile not found: ${profileName}`);
        return false;
      }
      
      applySettings(settings);
      
      // حفظ اسم الملف الشخصي النشط
      localStorage.setItem('a11yActiveProfile', profileName);
      
      return true;
    } catch (error) {
      console.error('Failed to load profile:', error);
      return false;
    }
  };
  
  return { loadProfile };
}
