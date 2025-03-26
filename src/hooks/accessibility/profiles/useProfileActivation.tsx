
import { A11ySettings } from '../../types/accessibility';

/**
 * تنشيط ملفات تعريف إمكانية الوصول
 */
export function useProfileActivation(
  setHighContrast: (value: boolean) => void,
  setLargeText: (value: boolean) => void,
  setReducedMotion: (value: boolean) => void,
  setFocusMode: (value: boolean) => void,
  setColorBlindMode: (value: string | null) => void,
  setDyslexicFont: (value: boolean) => void,
  setReadingGuide: (value: boolean) => void,
  setSoundFeedback: (value: boolean) => void
) {
  // تطبيق إعدادات ملف التعريف على واجهة المستخدم
  const applySettings = (settings: A11ySettings) => {
    if (settings.highContrast !== undefined) {
      setHighContrast(settings.highContrast);
    }
    
    if (settings.largeText !== undefined) {
      setLargeText(settings.largeText);
    }
    
    if (settings.reducedMotion !== undefined) {
      setReducedMotion(settings.reducedMotion);
    }
    
    if (settings.focusMode !== undefined) {
      setFocusMode(settings.focusMode);
    }
    
    if (settings.colorBlindMode !== undefined) {
      setColorBlindMode(settings.colorBlindMode);
    }
    
    if (settings.dyslexicFont !== undefined) {
      setDyslexicFont(settings.dyslexicFont);
    }
    
    if (settings.readingGuide !== undefined) {
      setReadingGuide(settings.readingGuide);
    }
    
    if (settings.soundFeedback !== undefined) {
      setSoundFeedback(settings.soundFeedback);
    }
    
    // تطبيق تأثيرات نمط CSS إضافية إذا لزم الأمر
    document.documentElement.classList.toggle('high-contrast', settings.highContrast || false);
    document.documentElement.classList.toggle('large-text', settings.largeText || false);
    document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion || false);
    document.documentElement.classList.toggle('dyslexic-font', settings.dyslexicFont || false);
    
    // تطبيق وضع عمى الألوان إذا كان محددًا
    document.documentElement.setAttribute('data-color-blind-mode', settings.colorBlindMode || 'normal');
  };
  
  // تحميل ملف تعريف بالاسم
  const loadProfile = (
    profileName: string, 
    getProfiles: () => Record<string, A11ySettings>
  ): boolean => {
    try {
      const profiles = getProfiles();
      if (profiles && profiles[profileName]) {
        const profileSettings = profiles[profileName];
        applySettings(profileSettings);
        
        // إرسال إشعار صوتي إذا كان التعليق الصوتي مفعلًا
        if (profileSettings.soundFeedback) {
          const audio = new Audio('/sounds/profile-loaded.mp3');
          audio.volume = 0.5;
          audio.play().catch(err => console.error('فشل تشغيل إشعار صوتي:', err));
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('فشل تحميل ملف التعريف:', error);
      return false;
    }
  };
  
  return {
    loadProfile
  };
}
