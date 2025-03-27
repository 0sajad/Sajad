
import { useState, useEffect, useCallback } from 'react';
import { useA11y } from './useA11y';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export interface UseLanguageTransitionReturnType {
  isTransitioning: boolean;
  changeLanguage: (language: string) => void;
  supportedLanguages: Array<{code: string, name: string, nativeName: string, flag: string}>;
}

export function useLanguageTransition(): UseLanguageTransitionReturnType {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playNotificationSound, soundFeedback, announce } = useA11y();
  const { i18n, t } = useTranslation();

  // Supported languages
  const supportedLanguages = [
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'ar-iq', name: 'Iraqi Arabic', nativeName: 'العراقية', flag: '🇮🇶' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  ];

  // Function to change the language with transition effects
  const changeLanguage = useCallback((language: string) => {
    // التحقق مما إذا كانت اللغة الجديدة هي نفس اللغة الحالية
    if (i18n.language === language) return;
    
    // بدء الانتقال
    setIsTransitioning(true);
    
    // تأخير قصير للسماح بتأثير الانتقال
    setTimeout(() => {
      // تغيير اللغة
      i18n.changeLanguage(language).then(() => {
        // حفظ اللغة في التخزين المحلي
        localStorage.setItem('language', language);
        
        // تعديل اتجاه الصفحة بناءً على اللغة
        const isRTL = language === 'ar' || language === 'ar-iq';
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.body.className = isRTL ? 'rtl-active' : '';
        
        // إطلاق حدث تغيير اللغة بالكامل
        const event = new CustomEvent('languageFullyChanged', { 
          detail: { language } 
        });
        document.dispatchEvent(event);
        
        // إشعار تغيير اللغة
        const languageName = getLanguageName(language);
        toast.success(t('common.languageChanged', { language: languageName }));
        
        // Announce language change for screen readers
        announce(t('common.languageChanged', { language: languageName }), 'polite');
        
        // تشغيل صوت إشعار (إذا كان مفعلاً)
        if (soundFeedback && playNotificationSound) {
          playNotificationSound('language');
        }
        
        // إنهاء الانتقال بعد فترة
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }).catch(() => {
        // إشعار خطأ في حالة فشل تغيير اللغة
        toast.error(t('common.languageChangeError'));
        setIsTransitioning(false);
        
        // Announce error for screen readers
        announce(t('common.languageChangeError'), 'assertive');
        
        // تشغيل صوت خطأ (إذا كان مفعلاً)
        if (soundFeedback && playNotificationSound) {
          playNotificationSound('error');
        }
      });
    }, 300);
  }, [i18n, t, playNotificationSound, soundFeedback, announce]);
  
  // Helper function to get language name
  const getLanguageName = (code: string): string => {
    const language = supportedLanguages.find(lang => lang.code === code);
    return language ? language.nativeName : code;
  };

  return { isTransitioning, changeLanguage, supportedLanguages };
}
