
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useA11y } from './useA11y';

/**
 * هوك يضيف اختصارات لوحة المفاتيح للتطبيق
 * يتضمن اختصارات للوصول والتنقل وتبديل الميزات
 */
export function useKeyboardShortcuts() {
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    readingGuide, setReadingGuide,
    soundFeedback, setSoundFeedback
  } = useA11y();

  const { t, i18n } = useTranslation();

  // تبديل ميزة مع إضافة الإعلان الصوتي
  const toggleFeature = (
    feature: boolean,
    setFeature: (val: boolean) => void,
    featureName: string
  ) => {
    const newState = !feature;
    setFeature(newState);

    if (typeof window !== 'undefined' && window.announce) {
      const state = newState 
        ? t('accessibility.enabled', 'مفعّل') 
        : t('accessibility.disabled', 'معطّل');
      
      const announcement = t('accessibility.announcementFeaturesToggled', {
        feature: featureName,
        state: state,
        defaultValue: `ميزة {{feature}} الآن {{state}}`
      });
      
      window.announce(announcement, 'polite');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // لا تعمل الاختصارات داخل حقول الإدخال
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // تبديل ميزة التباين العالي - Alt+C
      if (e.altKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        toggleFeature(
          highContrast, 
          setHighContrast, 
          t('accessibility.highContrast', 'التباين العالي')
        );
      }

      // تبديل ميزة النص الكبير - Alt+T
      if (e.altKey && (e.key === 't' || e.key === 'T')) {
        e.preventDefault();
        toggleFeature(
          largeText, 
          setLargeText, 
          t('accessibility.largeText', 'النص الكبير')
        );
      }

      // تبديل ميزة تقليل الحركة - Alt+M
      if (e.altKey && (e.key === 'm' || e.key === 'M')) {
        e.preventDefault();
        toggleFeature(
          reducedMotion, 
          setReducedMotion, 
          t('accessibility.reducedMotion', 'تقليل الحركة')
        );
      }

      // تبديل ميزة وضع التركيز - Alt+F
      if (e.altKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        toggleFeature(
          focusMode, 
          setFocusMode, 
          t('accessibility.focusMode', 'وضع التركيز')
        );
      }

      // تبديل دليل القراءة - Alt+G
      if (e.altKey && (e.key === 'g' || e.key === 'G')) {
        e.preventDefault();
        toggleFeature(
          readingGuide, 
          setReadingGuide, 
          t('accessibility.readingGuide', 'دليل القراءة')
        );
      }

      // تبديل الإشعارات الصوتية - Alt+S
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        toggleFeature(
          soundFeedback, 
          setSoundFeedback, 
          t('accessibility.soundFeedback', 'التنبيهات الصوتية')
        );
      }

      // تبديل اللغة - Alt+L
      if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        // الانتقال بين اللغات المدعومة
        const supportedLanguages = ['ar', 'en', 'fr', 'ar-iq', 'ja', 'zh'];
        const currentIndex = supportedLanguages.indexOf(i18n.language);
        const nextIndex = (currentIndex + 1) % supportedLanguages.length;
        const nextLanguage = supportedLanguages[nextIndex];
        
        i18n.changeLanguage(nextLanguage).then(() => {
          if (typeof window !== 'undefined' && window.announce) {
            const langName = getLanguageName(nextLanguage);
            
            const announcement = t('accessibility.languageChanged', {
              language: langName,
              defaultValue: `تم تغيير اللغة إلى {{language}}`
            });
            
            window.announce(announcement, 'polite');
          }
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    readingGuide, setReadingGuide,
    soundFeedback, setSoundFeedback, 
    t, i18n
  ]);

  // الحصول على اسم اللغة
  const getLanguageName = (lang: string): string => {
    switch (lang) {
      case 'ar': return 'العربية';
      case 'ar-iq': return 'العراقية';
      case 'en': return 'English';
      case 'fr': return 'Français';
      case 'ja': return '日本語';
      case 'zh': return '中文';
      default: return lang;
    }
  };
}
