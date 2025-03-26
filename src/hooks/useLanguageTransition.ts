
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from "@/components/ui/use-toast";
import { useAccessibilityAnnouncer } from "@/hooks/useAccessibilityAnnouncer";

/**
 * هوك مخصص لإدارة الانتقالات السلسة عند تغيير اللغة
 */
export function useLanguageTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { i18n, t } = useTranslation();
  const { announce } = useAccessibilityAnnouncer();
  
  useEffect(() => {
    // تحديث عنوان الصفحة عند تغيير اللغة
    const updatePageTitle = () => {
      const baseTitle = "OCTA-GRAM";
      document.title = i18n.language === "ar" || i18n.language === "ar-iq" 
        ? `${baseTitle} - منصة إدارة الشبكات المتطورة`
        : `${baseTitle} - Advanced Network Management Platform`;
    };
    
    updatePageTitle();
    
    // إضافة مستمع للحدث المخصص languageChanged
    const handleLanguageChange = () => {
      // تطبيق تأثير انتقالي عند تغيير اللغة
      setIsTransitioning(true);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      
      // تحديث عنوان الصفحة
      updatePageTitle();
    };
    
    // إضافة مستمع للحدث المخصص languageFullyChanged
    const handleLanguageFullyChanged = () => {
      // تأكيد اكتمال تغيير اللغة بشكل كامل
      setIsTransitioning(false);
      
      // إعادة تطبيق اتجاه الصفحة بناءً على اللغة
      const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
      document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
      document.documentElement.setAttribute("lang", i18n.language);
      
      // تطبيق CSS للغات RTL
      if (isRTL) {
        document.body.classList.add('rtl-active');
      } else {
        document.body.classList.remove('rtl-active');
      }
      
      // تحديث عنوان الصفحة
      updatePageTitle();
    };
    
    document.addEventListener('languageChanged', handleLanguageChange);
    document.addEventListener('languageFullyChanged', handleLanguageFullyChanged);
    
    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange);
      document.removeEventListener('languageFullyChanged', handleLanguageFullyChanged);
    };
  }, [i18n.language]);
  
  // التأكد من أن اللغة المخزنة مطبقة عند بدء التشغيل
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      setTimeout(() => {
        i18n.changeLanguage(savedLanguage);
      }, 100);
    }
  }, []);

  const changeLanguage = (language: string) => {
    // لا تقم بتغيير اللغة إذا كانت هي نفس اللغة الحالية
    if (i18n.language === language) {
      return;
    }
    
    // تطبيق تأثير انتقالي قبل تغيير اللغة
    setIsTransitioning(true);
    
    try {
      setTimeout(() => {
        localStorage.setItem("language", language);
        i18n.changeLanguage(language).then(() => {
          // إظهار إشعار بتغيير اللغة بناءً على اللغة الجديدة
          toast({
            title: getLanguageChangeTitle(language),
            description: getLanguageChangeDescription(language),
            duration: 3000
          });
          
          // الإعلان عن تغيير اللغة لقارئات الشاشة
          announce(getLanguageChangeDescription(language), "info");
          
          // التأكد من تطبيق اتجاه اللغة الصحيح
          const isRTL = language === "ar" || language === "ar-iq";
          document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
          document.documentElement.setAttribute("lang", language);
          
          if (isRTL) {
            document.body.classList.add('rtl-active');
          } else {
            document.body.classList.remove('rtl-active');
          }
          
          // إعادة تطبيق الترجمة على العناصر المخصصة
          if (document.querySelectorAll('[data-i18n-key]').length > 0) {
            const elementsWithTranslationKeys = document.querySelectorAll('[data-i18n-key]');
            elementsWithTranslationKeys.forEach(el => {
              const key = el.getAttribute('data-i18n-key');
              if (key) {
                (el as HTMLElement).innerText = i18n.t(key);
              }
            });
          }
          
          // تحديث عنوان الصفحة بناءً على اللغة الجديدة
          const baseTitle = "OCTA-GRAM";
          document.title = isRTL
            ? `${baseTitle} - منصة إدارة الشبكات المتطورة`
            : `${baseTitle} - Advanced Network Management Platform`;
          
          // إطلاق حدث لتحديث كافة مكونات الصفحة
          document.dispatchEvent(new CustomEvent('languageFullyChanged', { detail: { language } }));
        }).catch((error) => {
          console.error("خطأ في تغيير اللغة:", error);
          // إظهار إشعار بفشل تغيير اللغة
          toast({
            title: t('common.error', 'خطأ'),
            description: t('common.languageChangeError', 'فشل في تغيير اللغة'),
            variant: "destructive",
            duration: 3000
          });
          setIsTransitioning(false);
        });
        
        // إعادة تفعيل المحتوى بعد انتهاء الانتقال
        setTimeout(() => {
          setIsTransitioning(false);
          // تطبيق تأثير إعادة التحميل
          document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
        }, 300);
      }, 150);
    } catch (error) {
      console.error("خطأ غير متوقع في تغيير اللغة:", error);
      setIsTransitioning(false);
    }
  };

  // دالة مساعدة للحصول على عنوان إشعار تغيير اللغة
  const getLanguageChangeTitle = (language: string): string => {
    switch (language) {
      case "ar":
        return "تم تغيير اللغة";
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
