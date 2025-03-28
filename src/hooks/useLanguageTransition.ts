
import { useState, useEffect, useCallback } from 'react';
import { useA11ySound } from './useA11ySound';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export interface UseLanguageTransitionReturnType {
  isTransitioning: boolean;
  changeLanguage: (language: string) => void;
  supportedLanguages: Array<{code: string, name: string, nativeName: string, flag: string}>;
}

export function useLanguageTransition(): UseLanguageTransitionReturnType {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { playSound } = useA11ySound();
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

  // إعداد حدث مخصص للإشعار بإكمال عملية تغيير اللغة
  useEffect(() => {
    const handleLanguageFullChange = (event: CustomEvent) => {
      // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
      console.log("Language fully changed to:", event.detail.language);
    };

    // إضافة مستمع الحدث
    document.addEventListener('languageFullyChanged', handleLanguageFullChange as EventListener);
    
    return () => {
      // إزالة المستمع عند تفكيك المكون
      document.removeEventListener('languageFullyChanged', handleLanguageFullChange as EventListener);
    };
  }, []);

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
        
        if (isRTL) {
          document.body.classList.add('rtl-active');
        } else {
          document.body.classList.remove('rtl-active');
        }
        
        // إطلاق حدث تغيير اللغة بالكامل
        const event = new CustomEvent('languageFullyChanged', { 
          detail: { language } 
        });
        document.dispatchEvent(event);
        
        // إشعار تغيير اللغة
        const languageName = getLanguageName(language);
        const successMessage = getTranslatedMessage(language, 'تم تغيير اللغة إلى', 'Language changed to');
        toast.success(`${successMessage} ${languageName}`);
        
        // تشغيل صوت إشعار (إذا كان مفعلاً)
        playSound('notification');
        
        // إنهاء الانتقال بعد فترة
        setTimeout(() => {
          setIsTransitioning(false);
        }, 500);
      }).catch((error) => {
        // إشعار خطأ في حالة فشل تغيير اللغة
        console.error("Language change error:", error);
        const errorMessage = i18n.language.startsWith('ar')
          ? 'فشل في تغيير اللغة'
          : 'Failed to change language';
        toast.error(errorMessage);
        setIsTransitioning(false);
        
        // تشغيل صوت خطأ (إذا كان مفعلاً)
        playSound('error');
      });
    }, 300);
  }, [i18n, playSound]);
  
  // Helper function to get translated message
  const getTranslatedMessage = (langCode: string, arMessage: string, enMessage: string): string => {
    return langCode.startsWith('ar') ? arMessage : enMessage;
  };
  
  // Helper function to get language name
  const getLanguageName = (code: string): string => {
    const language = supportedLanguages.find(lang => lang.code === code);
    return language ? language.nativeName : code;
  };

  return { isTransitioning, changeLanguage, supportedLanguages };
}
