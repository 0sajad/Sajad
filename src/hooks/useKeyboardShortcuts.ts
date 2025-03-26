
import { useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useA11y } from './useA11y';

/**
 * هوك محسن يضيف اختصارات لوحة المفاتيح للتطبيق
 * يتضمن اختصارات للوصول والتنقل وتبديل الميزات
 */
export function useKeyboardShortcuts() {
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    readingGuide, setReadingGuide,
    soundFeedback, setSoundFeedback,
    playNotificationSound
  } = useA11y();

  const { t, i18n } = useTranslation();
  
  // استخدام مراجع للقيم لتجنب إعادة إنشاء الدوال
  const stateRef = useRef({
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    soundFeedback
  });
  
  // تحديث المراجع عند تغير القيم
  useEffect(() => {
    stateRef.current = {
      highContrast,
      largeText,
      reducedMotion,
      focusMode,
      readingGuide,
      soundFeedback
    };
  }, [highContrast, largeText, reducedMotion, focusMode, readingGuide, soundFeedback]);

  // تبديل ميزة مع إضافة الإعلان الصوتي - تم تحسينه باستخدام useCallback
  const toggleFeature = useCallback((
    feature: boolean,
    setFeature: (val: boolean) => void,
    featureName: string
  ) => {
    const newState = !feature;
    setFeature(newState);

    if (typeof window !== 'undefined' && window.announce && stateRef.current.soundFeedback) {
      const state = newState 
        ? t('accessibility.enabled', 'مفعّل') 
        : t('accessibility.disabled', 'معطّل');
      
      const announcement = t('accessibility.announcementFeaturesToggled', {
        feature: featureName,
        state: state,
        defaultValue: `ميزة {{feature}} الآن {{state}}`
      });
      
      window.announce(announcement, 'polite');
      
      // تشغيل صوت لتأكيد التبديل
      if (newState) {
        playNotificationSound('success');
      } else {
        playNotificationSound('info');
      }
    }
  }, [t, playNotificationSound]);

  // تعامل مع ضغطات المفاتيح - تم تحسينه للأداء
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // لا تعمل الاختصارات داخل حقول الإدخال
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) {
      return;
    }

    // تحسين الأداء باستخدام شجرة القرارات بدلاً من if المتتالية
    if (e.altKey) {
      switch (e.key.toLowerCase()) {
        case 'c':
          e.preventDefault();
          toggleFeature(
            stateRef.current.highContrast, 
            setHighContrast, 
            t('accessibility.highContrast', 'التباين العالي')
          );
          break;
          
        case 't':
          e.preventDefault();
          toggleFeature(
            stateRef.current.largeText, 
            setLargeText, 
            t('accessibility.largeText', 'النص الكبير')
          );
          break;
          
        case 'm':
          e.preventDefault();
          toggleFeature(
            stateRef.current.reducedMotion, 
            setReducedMotion, 
            t('accessibility.reducedMotion', 'تقليل الحركة')
          );
          break;
          
        case 'f':
          e.preventDefault();
          toggleFeature(
            stateRef.current.focusMode, 
            setFocusMode, 
            t('accessibility.focusMode', 'وضع التركيز')
          );
          break;
          
        case 'g':
          e.preventDefault();
          toggleFeature(
            stateRef.current.readingGuide, 
            setReadingGuide, 
            t('accessibility.readingGuide', 'دليل القراءة')
          );
          break;
          
        case 's':
          e.preventDefault();
          toggleFeature(
            stateRef.current.soundFeedback, 
            setSoundFeedback, 
            t('accessibility.soundFeedback', 'التنبيهات الصوتية')
          );
          break;
          
        case 'l':
          e.preventDefault();
          // تحسين تبديل اللغة باستخدام مصفوفة مرجعية
          const supportedLanguages = ['ar', 'en', 'fr', 'ar-iq', 'ja', 'zh'];
          const currentIndex = supportedLanguages.indexOf(i18n.language);
          const nextIndex = (currentIndex + 1) % supportedLanguages.length;
          const nextLanguage = supportedLanguages[nextIndex];
          
          // تغيير اللغة
          i18n.changeLanguage(nextLanguage).then(() => {
            if (typeof window !== 'undefined' && window.announce && stateRef.current.soundFeedback) {
              const langName = getLanguageName(nextLanguage);
              
              const announcement = t('accessibility.languageChanged', {
                language: langName,
                defaultValue: `تم تغيير اللغة إلى {{language}}`
              });
              
              window.announce(announcement, 'polite');
              playNotificationSound('success');
            }
          });
          break;
      }
    }
  }, [
    t, i18n, 
    toggleFeature,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setReadingGuide,
    setSoundFeedback,
    playNotificationSound
  ]);

  useEffect(() => {
    // تسجيل معالج الحدث باستخدام خيار passive:true لتحسين الأداء
    document.addEventListener('keydown', handleKeyDown, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // الحصول على اسم اللغة - تم تحسينه باستخدام كائن بدلاً من switch
  const getLanguageName = (lang: string): string => {
    const languageNames: Record<string, string> = {
      'ar': 'العربية',
      'ar-iq': 'العراقية',
      'en': 'English',
      'fr': 'Français',
      'ja': '日本語',
      'zh': '中文'
    };
    
    return languageNames[lang] || lang;
  };
}
