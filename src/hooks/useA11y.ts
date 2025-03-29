
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from './state/use-app-state';

interface AnnounceOptions {
  politeness?: 'polite' | 'assertive';
  timeout?: number;
}

/**
 * خطاف لإدارة ميزات إمكانية الوصول
 * يوفر وظائف للإعلان عن التغييرات وتشغيل التعليقات الصوتية
 */
export function useA11y() {
  const { t } = useTranslation();
  const [ariaAnnouncer, setAriaAnnouncer] = useState<HTMLDivElement | null>(null);
  const [ariaLiveRegion, setAriaLiveRegion] = useState<HTMLDivElement | null>(null);
  
  const {
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    dyslexicFont,
    colorBlindMode,
    soundFeedback
  } = useAppState(state => state);
  
  // إنشاء عناصر live region لقارئات الشاشة
  useEffect(() => {
    // التحقق من وجود العناصر مسبقًا
    const existingAnnouncer = document.getElementById('a11y-announcer') as HTMLDivElement;
    const existingLiveRegion = document.getElementById('a11y-live') as HTMLDivElement;
    
    if (existingAnnouncer) {
      setAriaAnnouncer(existingAnnouncer);
    } else {
      const newAnnouncer = document.createElement('div');
      newAnnouncer.id = 'a11y-announcer';
      newAnnouncer.setAttribute('aria-live', 'assertive');
      newAnnouncer.setAttribute('aria-atomic', 'true');
      newAnnouncer.className = 'sr-only';
      document.body.appendChild(newAnnouncer);
      setAriaAnnouncer(newAnnouncer);
    }
    
    if (existingLiveRegion) {
      setAriaLiveRegion(existingLiveRegion);
    } else {
      const newLiveRegion = document.createElement('div');
      newLiveRegion.id = 'a11y-live';
      newLiveRegion.setAttribute('aria-live', 'polite');
      newLiveRegion.setAttribute('aria-atomic', 'true');
      newLiveRegion.className = 'sr-only';
      document.body.appendChild(newLiveRegion);
      setAriaLiveRegion(newLiveRegion);
    }
    
    return () => {
      // عدم إزالة العناصر عند التنظيف، قد تكون مستخدمة من مكونات أخرى
    };
  }, []);
  
  // إعلان سهولة الوصول لقارئات الشاشة
  const announce = useCallback((message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (!message) return;
    
    const target = politeness === 'assertive' ? ariaAnnouncer : ariaLiveRegion;
    
    if (target) {
      // مسح الإعلان السابق (إذا وجد)
      target.textContent = '';
      
      // إضافة تأخير صغير لضمان ملاحظة التغيير
      setTimeout(() => {
        target.textContent = message;
      }, 50);
    }
  }, [ariaAnnouncer, ariaLiveRegion]);
  
  // تشغيل صوت للتعليقات
  const playSound = useCallback((soundType: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    // تشغيل الأصوات فقط إذا كان التعليق الصوتي مفعلاً
    if (!soundFeedback) return;
    
    // إنشاء أصوات مختلفة بناءً على النوع
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    
    oscillator.connect(gain);
    gain.connect(context.destination);
    
    switch (soundType) {
      case 'success':
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, context.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.3);
        break;
      
      case 'error':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(400, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, context.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.3);
        break;
      
      case 'warning':
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(300, context.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, context.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(300, context.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.3);
        break;
      
      case 'info':
      default:
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, context.currentTime);
        gain.gain.setValueAtTime(0.03, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.2);
        oscillator.start(context.currentTime);
        oscillator.stop(context.currentTime + 0.2);
        break;
    }
  }, [soundFeedback]);
  
  // تشغيل صوت تنبيه للإشعارات
  const playNotificationSound = useCallback((type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    if (!soundFeedback) return;
    
    playSound(type);
  }, [soundFeedback, playSound]);
  
  // تطبيق ميزات سهولة الوصول على مستوى المستند
  useEffect(() => {
    // التباين العالي
    document.body.classList.toggle('high-contrast-mode', highContrast);
    
    // النص الكبير
    document.body.classList.toggle('large-text-mode', largeText);
    
    // تقليل الحركة
    document.body.classList.toggle('reduced-motion', reducedMotion);
    
    // وضع التركيز
    document.body.classList.toggle('focus-mode', focusMode);
    
    // دليل القراءة
    document.body.classList.toggle('reading-guide', readingGuide);
    
    // خط ديسلكسيا
    document.body.classList.toggle('dyslexic-font', dyslexicFont);
    
    // وضع عمى الألوان
    document.body.classList.remove(
      'color-blind-protanopia',
      'color-blind-deuteranopia',
      'color-blind-tritanopia',
      'color-blind-achromatopsia'
    );
    
    if (colorBlindMode && colorBlindMode !== 'none') {
      document.body.classList.add(`color-blind-${colorBlindMode}`);
    }
    
    // تطبيق reducedMotion على مستوى الـ CSS
    if (reducedMotion) {
      document.documentElement.style.setProperty('--reduce-motion', 'reduce');
    } else {
      document.documentElement.style.removeProperty('--reduce-motion');
    }
  }, [
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    dyslexicFont,
    colorBlindMode
  ]);
  
  // تسجيل اختصارات لوحة المفاتيح لميزات إمكانية الوصول
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Alt+H للتباين العالي
      if (event.altKey && event.key === 'h') {
        useAppState.setState({ highContrast: !highContrast });
        announce(
          highContrast 
            ? t('accessibility.highContrastDisabled', 'تم تعطيل التباين العالي') 
            : t('accessibility.highContrastEnabled', 'تم تفعيل التباين العالي'),
          'polite'
        );
      }
      
      // Alt+T للنص الكبير
      if (event.altKey && event.key === 't') {
        useAppState.setState({ largeText: !largeText });
        announce(
          largeText 
            ? t('accessibility.largeTextDisabled', 'تم تعطيل النص الكبير') 
            : t('accessibility.largeTextEnabled', 'تم تفعيل النص الكبير'),
          'polite'
        );
      }
      
      // Alt+M لتقليل الحركة
      if (event.altKey && event.key === 'm') {
        useAppState.setState({ reducedMotion: !reducedMotion });
        announce(
          reducedMotion 
            ? t('accessibility.reducedMotionDisabled', 'تم تعطيل تقليل الحركة') 
            : t('accessibility.reducedMotionEnabled', 'تم تفعيل تقليل الحركة'),
          'polite'
        );
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [highContrast, largeText, reducedMotion, t, announce]);
  
  return {
    announce,
    playSound,
    playNotificationSound,
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    dyslexicFont,
    colorBlindMode,
    soundFeedback
  };
}

// إنشاء سياق إمكانية الوصول
import { createContext, useContext } from 'react';

// تحديد نوع السياق
export interface A11yContextType {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  playSound: (soundType: 'success' | 'error' | 'warning' | 'info') => void;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  readingGuide: boolean;
  dyslexicFont: boolean;
  colorBlindMode: string;
  soundFeedback: boolean;
}

// إنشاء السياق بقيم افتراضية
export const A11yContext = createContext<A11yContextType | null>(null);

// خطاف لاستخدام سياق إمكانية الوصول
export const useA11yContext = () => useContext(A11yContext);
