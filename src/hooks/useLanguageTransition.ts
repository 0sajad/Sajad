
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from "@/components/ui/use-toast";

/**
 * Hook مخصص لإدارة الانتقالات السلسة عند تغيير اللغة
 */
export function useLanguageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // إضافة مستمع للحدث المخصص languageChanged
    const handleLanguageChange = () => {
      // تطبيق تأثير انتقالي عند تغيير اللغة
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    };
    
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const changeLanguage = (language: string) => {
    // تطبيق تأثير انتقالي قبل تغيير اللغة
    setIsTransitioning(true);
    
    setTimeout(() => {
      localStorage.setItem("language", language);
      i18n.changeLanguage(language);
      
      // إظهار إشعار بتغيير اللغة
      toast({
        title: getLanguageChangeTitle(language),
        description: getLanguageChangeDescription(language)
      });
      
      // إعادة تفعيل المحتوى بعد انتهاء الانتقال
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  };

  // دالة مساعدة للحصول على عنوان إشعار تغيير اللغة
  const getLanguageChangeTitle = (language: string): string => {
    switch (language) {
      case "ar":
      case "ar-iq":
        return "تم تغيير اللغة";
      case "ja":
        return "言語が変更されました";
      case "zh":
        return "语言已更改";
      case "fr":
        return "Langue modifiée";
      default:
        return "Language Changed";
    }
  };

  // دالة مساعدة للحصول على وصف إشعار تغيير اللغة
  const getLanguageChangeDescription = (language: string): string => {
    switch (language) {
      case "ar":
        return "تم التحويل إلى اللغة العربية";
      case "ar-iq":
        return "تم التحويل إلى اللهجة العراقية";
      case "en":
        return "Switched to English language";
      case "ja":
        return "日本語に切り替えました";
      case "zh":
        return "切换到中文";
      case "fr":
        return "Passé à la langue française";
      default:
        return `Switched to ${language}`;
    }
  };

  return {
    isTransitioning,
    changeLanguage
  };
}
