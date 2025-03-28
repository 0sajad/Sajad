
import { useCallback, useEffect, useState } from 'react';

// واجهة الخيارات المتعلقة بإمكانية الوصول
interface A11yOptions {
  soundFeedback?: boolean;
  highContrast?: boolean;
  reducedMotion?: boolean;
}

/**
 * خطاف موحد لإمكانية الوصول - تم إعادة تصميمه لتجنب حلقات التحديث
 */
export function useA11y(options?: A11yOptions) {
  // الإعدادات الافتراضية
  const [highContrast, setHighContrast] = useState(options?.highContrast || false);
  const [soundFeedback, setSoundFeedback] = useState(options?.soundFeedback || false);
  
  // التحقق من reducedMotion من النظام
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches || options?.reducedMotion || false;
    }
    return options?.reducedMotion || false;
  });

  // مراقبة تغييرات prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
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
    
    // قد تكون هنا منطق لتشغيل أصوات مختلفة بناءً على النوع
    console.log(`Playing ${type} sound`);
    
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
    setHighContrast(prev => !prev);
  }, []);

  // تبديل ردود الصوت
  const toggleSoundFeedback = useCallback(() => {
    setSoundFeedback(prev => !prev);
  }, []);

  return {
    highContrast,
    reducedMotion,
    soundFeedback,
    announce,
    playNotificationSound,
    toggleHighContrast,
    toggleSoundFeedback,
  };
}
