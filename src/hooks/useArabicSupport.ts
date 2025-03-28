
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * خطاف لتحسين دعم اللغة العربية والخطوط العربية
 */
export function useArabicSupport() {
  const { i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);
  const [isIraqiArabic, setIsIraqiArabic] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  
  // تحديد ما إذا كانت اللغة الحالية عربية
  useEffect(() => {
    const currentLang = i18n.language;
    setIsArabic(currentLang === 'ar' || currentLang === 'ar-iq');
    setIsIraqiArabic(currentLang === 'ar-iq');
    
    // إضافة السمات المناسبة لعناصر HTML
    if (currentLang === 'ar' || currentLang === 'ar-iq') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', currentLang);
      document.body.classList.add('font-arabic');
      document.body.classList.add('rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', currentLang);
      document.body.classList.remove('font-arabic');
      document.body.classList.remove('rtl');
    }
  }, [i18n.language]);
  
  // تحميل الخط العربي المناسب إذا كانت اللغة عربية
  useEffect(() => {
    if (isArabic && !fontLoaded) {
      // تحميل الخط العربي
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = isIraqiArabic
        ? 'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;700&display=swap'
        : 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
      
      document.head.appendChild(fontLink);
      
      // إضافة نمط لتطبيق الخط العربي
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .font-arabic {
          font-family: ${isIraqiArabic ? "'Cairo'" : "'Tajawal'"}, sans-serif;
        }
        
        /* تحسين عرض النصوص العربية */
        .rtl {
          text-align: right;
        }
        
        /* تحسين التباعد بين النصوص العربية */
        .rtl p, .rtl h1, .rtl h2, .rtl h3, .rtl h4, .rtl h5, .rtl h6, .rtl div {
          letter-spacing: 0;
          line-height: 1.6;
        }
        
        /* تطبيق ميزة kashida للنصوص العربية */
        .enable-kashida .rtl {
          text-justify: kashida;
        }
      `;
      
      document.head.appendChild(styleElement);
      setFontLoaded(true);
    }
  }, [isArabic, isIraqiArabic, fontLoaded]);
  
  // تطبيق كتابة الأرقام بالطريقة العربية الهندية إذا كان مفعلاً
  const formatNumber = (num: number, useArabicNumerals = false): string => {
    if (!isArabic || !useArabicNumerals) return num.toString();
    
    // تحويل الأرقام العربية إلى الأرقام الهندية
    const arabicNumerals: Record<string, string> = {
      '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
      '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
    };
    
    return num.toString().replace(/[0-9]/g, match => arabicNumerals[match]);
  };
  
  return {
    isArabic,
    isIraqiArabic,
    formatNumber,
    
    // وظيفة للمساعدة في وضع الكلمات حسب اتجاه اللغة
    reorderElements: isArabic,
    
    // وظيفة للحصول على الاتجاه الحالي
    direction: isArabic ? 'rtl' : 'ltr'
  };
}
