
import { useCallback, useEffect, useState } from 'react';
import { ColorBlindMode } from './accessibility/useA11yColor';

// واجهة الخيارات المتعلقة بإمكانية الوصول
interface A11yOptions {
  soundFeedback?: boolean;
  highContrast?: boolean;
  reducedMotion?: boolean;
  largeText?: boolean;
  focusMode?: boolean;
  readingGuide?: boolean;
  dyslexicFont?: boolean;
  colorBlindMode?: ColorBlindMode;
  keyboardNavigationVisible?: boolean;
}

/**
 * خطاف موحد لإمكانية الوصول - تم إعادة تصميمه لتجنب حلقات التحديث
 */
export function useA11y(options?: A11yOptions) {
  // الإعدادات الافتراضية
  const [highContrast, _setHighContrast] = useState(options?.highContrast || false);
  const [largeText, _setLargeText] = useState(options?.largeText || false);
  const [soundFeedback, _setSoundFeedback] = useState(options?.soundFeedback || false);
  const [focusMode, _setFocusMode] = useState(options?.focusMode || false);
  const [readingGuide, _setReadingGuide] = useState(options?.readingGuide || false);
  const [dyslexicFont, _setDyslexicFont] = useState(options?.dyslexicFont || false);
  const [colorBlindMode, _setColorBlindMode] = useState<ColorBlindMode>(options?.colorBlindMode || 'none');
  const [keyboardNavigationVisible, _setKeyboardNavigationVisible] = useState(options?.keyboardNavigationVisible || false);
  
  // التحقق من reducedMotion من النظام
  const [reducedMotion, _setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches || options?.reducedMotion || false;
    }
    return options?.reducedMotion || false;
  });

  // وظائف مستقرة لتعيين الحالة لمنع إعادة التصيير غير الضرورية
  const setHighContrast = useCallback((value: boolean) => {
    _setHighContrast(value);
  }, []);

  const setLargeText = useCallback((value: boolean) => {
    _setLargeText(value);
  }, []);

  const setReducedMotion = useCallback((value: boolean) => {
    _setReducedMotion(value);
  }, []);

  const setFocusMode = useCallback((value: boolean) => {
    _setFocusMode(value);
  }, []);

  const setReadingGuide = useCallback((value: boolean) => {
    _setReadingGuide(value);
  }, []);

  const setDyslexicFont = useCallback((value: boolean) => {
    _setDyslexicFont(value);
  }, []);

  const setColorBlindMode = useCallback((value: ColorBlindMode) => {
    _setColorBlindMode(value);
  }, []);

  const setSoundFeedback = useCallback((value: boolean) => {
    _setSoundFeedback(value);
  }, []);

  const setKeyboardNavigationVisible = useCallback((value: boolean) => {
    _setKeyboardNavigationVisible(value);
  }, []);

  // مراقبة تغييرات prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      _setReducedMotion(e.matches);
    };
    
    // استمع للتغييرات
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // دعم القديم
      mediaQuery.addListener(handleChange);
    }
    
    // تنظيف
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // دعم القديم
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // وظيفة آمنة للإعلان - تجنب عمليات التحديث المتكررة
  const announce = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (typeof window !== 'undefined' && typeof window.announce === 'function') {
      window.announce(message, politeness);
    }
  }, []);

  // تشغيل أصوات الإشعارات
  const playNotificationSound = useCallback((type: 'success' | 'error' | 'warning' | 'info' | 'notification') => {
    if (!soundFeedback || typeof window === 'undefined') return;
    
    // محاكاة تشغيل الصوت
    const audio = new Audio();
    
    switch (type) {
      case 'success':
        audio.src = '/sounds/success.mp3';
        break;
      case 'error':
        audio.src = '/sounds/error.mp3';
        break;
      case 'warning':
        audio.src = '/sounds/warning.mp3';
        break;
      case 'info':
      case 'notification':
      default:
        audio.src = '/sounds/notification.mp3';
        break;
    }
    
    // تشغيل الصوت
    audio.play().catch(err => {
      // من الشائع أن تفشل هذه العملية بسبب تفاعل المستخدم
      console.log('Could not play sound', err);
    });
  }, [soundFeedback]);

  // تبديل التباين العالي
  const toggleHighContrast = useCallback(() => {
    _setHighContrast(prev => !prev);
  }, []);

  // تبديل ردود الصوت
  const toggleSoundFeedback = useCallback(() => {
    _setSoundFeedback(prev => !prev);
  }, []);

  return {
    // الحالة
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    soundFeedback,
    readingGuide,
    dyslexicFont,
    colorBlindMode,
    keyboardNavigationVisible,
    
    // وظائف تعديل الحالة
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setSoundFeedback,
    setReadingGuide,
    setDyslexicFont,
    setColorBlindMode,
    setKeyboardNavigationVisible,
    
    // وظائف الأعلان و الصوت
    announce,
    playNotificationSound,
    
    // وظائف التبديل
    toggleHighContrast,
    toggleSoundFeedback,
  };
}
