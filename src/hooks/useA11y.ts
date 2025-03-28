
import { useState, useEffect } from 'react';
import { useDyslexiaFeatures, useTextSpacingFeatures, useLinkFeatures } from './accessibility/useA11yFeatures';
import { useA11yCore } from './accessibility/useA11yCore';
import { useA11yText } from './accessibility/useA11yText';
import { useA11yColor, ColorBlindMode } from './accessibility/useA11yColor';
import { useCursorFeatures, useColorInversionFeatures, useMonochromeFeatures } from './accessibility/useA11yVisualEffects';

/**
 * دالة لإدارة جميع ميزات إمكانية الوصول
 */
export function useA11y() {
  // ميزات إمكانية الوصول الأساسية
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11yCore();
  
  // ميزات متعلقة بالنص
  const {
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide
  } = useA11yText();
  
  // ميزات متعلقة بالألوان
  const { colorBlindMode, setColorBlindMode } = useA11yColor();
  
  // ميزات التأثيرات المرئية
  const { customCursor, setCustomCursor } = useCursorFeatures();
  const { invertColors, setInvertColors } = useColorInversionFeatures();
  const { monochrome, setMonochrome } = useMonochromeFeatures();
  
  // تباعد النص وميزات الروابط
  const { dyslexiaFont, setDyslexiaFont } = useDyslexiaFeatures();
  const { textSpacing, setTextSpacing } = useTextSpacingFeatures();
  const { underlineLinks, setUnderlineLinks } = useLinkFeatures();
  
  // إضافة حالة ردود الصوت
  const [soundFeedback, setSoundFeedback] = useState<boolean>(false);
  
  // إضافة حالة التنقل بلوحة المفاتيح
  const [keyboardNavigationVisible, setKeyboardNavigationVisible] = useState<boolean>(false);
  
  // وظيفة إعلان قارئ الشاشة
  const announce = (message: string, politeness: "polite" | "assertive" = "polite") => {
    if (typeof window !== 'undefined' && (window as any).announce) {
      (window as any).announce(message, politeness);
    } else {
      console.log(`إعلان قارئ الشاشة (${politeness}): ${message}`);
    }
  };
  
  // وظيفة تشغيل أصوات الإشعارات
  const playNotificationSound = (type: "success" | "error" | "warning" | "info" | "notification" = "notification") => {
    if (!soundFeedback) return;
    
    try {
      const soundMap = {
        success: '/sounds/success.mp3',
        error: '/sounds/error.mp3',
        warning: '/sounds/warning.mp3',
        info: '/sounds/info.mp3',
        notification: '/sounds/notification.mp3'
      };
      
      const audio = new Audio(soundMap[type] || soundMap.notification);
      audio.volume = 0.2;
      audio.play().catch(err => console.error('خطأ في تشغيل الصوت:', err));
    } catch (error) {
      console.error('خطأ في تشغيل صوت الإشعار:', error);
    }
  };
  
  // تحميل تفضيل ردود الصوت من localStorage
  useEffect(() => {
    const storedSoundFeedback = localStorage.getItem('a11y-soundFeedback');
    if (storedSoundFeedback === 'true') setSoundFeedback(true);
  }, []);
  
  // حفظ تفضيل ردود الصوت في localStorage
  useEffect(() => {
    localStorage.setItem('a11y-soundFeedback', String(soundFeedback));
  }, [soundFeedback]);
  
  return {
    // الميزات الأساسية
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    
    // ميزات النص
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    
    // ميزات الألوان
    colorBlindMode, setColorBlindMode,
    
    // التأثيرات المرئية
    customCursor, setCustomCursor,
    invertColors, setInvertColors,
    monochrome, setMonochrome,
    
    // تنسيق النص
    dyslexiaFont, setDyslexiaFont,
    textSpacing, setTextSpacing,
    underlineLinks, setUnderlineLinks,
    
    // ردود الصوت
    soundFeedback, setSoundFeedback,
    
    // التنقل بلوحة المفاتيح
    keyboardNavigationVisible, setKeyboardNavigationVisible,
    
    // وظائف مساعدة
    announce,
    playNotificationSound
  };
}
