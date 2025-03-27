
import { useState, useEffect, useCallback } from 'react';
import { useA11ySound } from './useA11ySound';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export interface UseLanguageTransitionReturnType {
  isTransitioning: boolean;
  changeLanguage: (language: string) => void;
  supportedLanguages: Array<{code: string, name: string, nativeName: string}>;
}

export function useLanguageTransition(): UseLanguageTransitionReturnType {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playSound } = useA11ySound();
  const { i18n, t } = useTranslation();

  // Supported languages
  const supportedLanguages = [
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'ar-iq', name: 'Iraqi Arabic', nativeName: 'العراقية' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
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
        
        // تشغيل صوت إشعار (إذا كان مفعلاً)
        playSound('language');
        
        // إنهاء الانتقال بعد فترة
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }).catch(() => {
        // إشعار خطأ في حالة فشل تغيير اللغة
        toast.error(t('common.languageChangeError'));
        setIsTransitioning(false);
        
        // تشغيل صوت خطأ (إذا كان مفعلاً)
        playSound('error');
      });
    }, 300);
  }, [i18n, t, playSound]);
  
  // Helper function to get language name
  const getLanguageName = (code: string): string => {
    switch (code) {
      case 'ar':
        return 'العربية';
      case 'ar-iq':
        return 'العربية (العراق)';
      case 'en':
        return 'English';
      case 'fr':
        return 'Français';
      case 'ja':
        return '日本語';
      case 'zh':
        return '中文';
      default:
        return code;
    }
  };

  return { isTransitioning, changeLanguage, supportedLanguages };
}
