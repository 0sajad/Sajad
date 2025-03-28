
import { useAppState } from './useAppState';
import { useCallback, useEffect } from 'react';
import { ColorBlindMode } from './accessibility/useA11yColor';

export type NotificationSoundType = 'success' | 'error' | 'warning' | 'info' | 'notification';

/**
 * خطاف مركزي لإدارة ميزات إمكانية الوصول
 */
export function useA11y() {
  const {
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    colorBlindMode,
    dyslexicFont,
    soundFeedback,
    keyboardNavigationVisible,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setReadingGuide,
    setColorBlindMode,
    setDyslexicFont,
    setSoundFeedback,
    setKeyboardNavigationVisible,
  } = useAppState(state => ({
    highContrast: state.highContrast,
    largeText: state.largeText,
    reducedMotion: state.reducedMotion,
    focusMode: state.focusMode,
    readingGuide: state.readingGuide,
    colorBlindMode: state.colorBlindMode,
    dyslexicFont: state.dyslexicFont,
    soundFeedback: state.soundFeedback,
    keyboardNavigationVisible: state.keyboardNavigationVisible,
    setHighContrast: state.setHighContrast,
    setLargeText: state.setLargeText,
    setReducedMotion: state.setReducedMotion,
    setFocusMode: state.setFocusMode,
    setReadingGuide: state.setReadingGuide,
    setColorBlindMode: state.setColorBlindMode,
    setDyslexicFont: state.setDyslexicFont,
    setSoundFeedback: state.setSoundFeedback,
    setKeyboardNavigationVisible: state.setKeyboardNavigationVisible,
  }));

  // إعلان للقراء الشاشة
  const announce = useCallback((message: string, priority: 'assertive' | 'polite' = 'polite') => {
    // استخدام واجهة برمجة التطبيقات العالمية للإعلان إذا كانت متاحة
    if (typeof window !== 'undefined' && 'announce' in window && typeof window.announce === 'function') {
      window.announce(message, priority);
      return;
    }
    
    // إعلان باستخدام عنصر منفصل
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', priority);
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    // تأخير قصير ثم إضافة الرسالة
    setTimeout(() => {
      announcer.textContent = message;
      
      // إزالة العنصر بعد قراءته
      setTimeout(() => {
        if (document.body.contains(announcer)) {
          document.body.removeChild(announcer);
        }
      }, 3000);
    }, 50);
  }, []);

  // تشغيل الإشعارات الصوتية
  const playNotificationSound = useCallback((type: NotificationSoundType) => {
    if (!soundFeedback) return;
    
    // تحديد الصوت المناسب حسب النوع
    let soundFile;
    switch (type) {
      case 'success':
        soundFile = '/sounds/success.mp3';
        break;
      case 'error':
        soundFile = '/sounds/error.mp3';
        break;
      case 'warning':
        soundFile = '/sounds/warning.mp3';
        break;
      case 'info':
        soundFile = '/sounds/info.mp3';
        break;
      case 'notification':
      default:
        soundFile = '/sounds/notification.mp3';
        break;
    }
    
    // تشغيل الصوت إذا كان مدعومًا
    try {
      const audio = new Audio(soundFile);
      audio.volume = 0.5; // مستوى صوت مناسب
      audio.play().catch(e => {
        console.warn('Failed to play sound notification:', e);
      });
    } catch (e) {
      console.warn('Sound notifications not supported in this browser');
    }
  }, [soundFeedback]);

  // تطبيق الإعدادات عند تغييرها
  useEffect(() => {
    // تطبيق فئات CSS استنادًا إلى الإعدادات الحالية
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('large-text', largeText);
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
    document.documentElement.classList.toggle('focus-mode', focusMode);
    document.documentElement.classList.toggle('reading-guide', readingGuide);
    document.documentElement.classList.toggle('dyslexic-font', dyslexicFont);
    document.documentElement.classList.toggle('keyboard-navigation-visible', keyboardNavigationVisible);
    
    // تطبيق وضع عمى الألوان
    document.documentElement.setAttribute('data-color-blind-mode', colorBlindMode);
    
    // تعيين الأسلوب مباشرة للاستجابة الفورية
    if (colorBlindMode !== 'none') {
      document.documentElement.style.filter = `url(#${colorBlindMode}-filter)`;
    } else {
      document.documentElement.style.filter = '';
    }
    
    // تعيين وسمات prefers-* للتوافق مع CSS
    if (reducedMotion) {
      document.documentElement.style.setProperty('--prefer-reduced-motion', 'reduce');
    } else {
      document.documentElement.style.removeProperty('--prefer-reduced-motion');
    }
    
    // تحديث متغيرات CSS للخطوط
    if (largeText) {
      document.documentElement.style.setProperty('--font-size-adjust', '1.2');
    } else {
      document.documentElement.style.removeProperty('--font-size-adjust');
    }
  }, [highContrast, largeText, reducedMotion, focusMode, readingGuide, colorBlindMode, dyslexicFont, keyboardNavigationVisible]);

  return {
    // الإعدادات الحالية
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    colorBlindMode,
    dyslexicFont,
    soundFeedback,
    keyboardNavigationVisible,
    
    // وظائف تغيير الإعدادات
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setReadingGuide,
    setColorBlindMode,
    setDyslexicFont,
    setSoundFeedback,
    setKeyboardNavigationVisible,
    
    // وظائف مساعدة
    announce,
    playNotificationSound,
  };
}
