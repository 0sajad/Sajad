
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface RTLOptions {
  enforceRTL?: boolean;
  enforceSpecificLanguages?: string[];
}

/**
 * خطاف لدعم اللغات التي تكتب من اليمين إلى اليسار مثل العربية
 */
export function useRTLSupport(options: RTLOptions = {}) {
  const { enforceRTL = false, enforceSpecificLanguages = ['ar', 'ar-iq', 'he', 'ur', 'fa'] } = options;
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(false);
  
  // تحديث اتجاه المستند عند تغيير اللغة
  useEffect(() => {
    // التأكد من أن اللغة الحالية موجودة قبل استخدامها
    const currentLang = i18n.language || 'en';
    
    // تحديد ما إذا كانت اللغة الحالية هي RTL
    const rtlLanguages = enforceSpecificLanguages;
    const shouldBeRTL = enforceRTL || rtlLanguages.some(lang => 
      currentLang === lang || (currentLang && currentLang.startsWith(`${lang}-`))
    );
    
    // تطبيق الاتجاه على المستند
    if (shouldBeRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-active');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl-active');
    }
    
    // تحديث الحالة
    setIsRTL(shouldBeRTL);
    
    // إضافة معلومات RTL إلى النافذة العالمية للاستخدام في المكونات الأخرى
    if (typeof window !== 'undefined') {
      (window as any).RTLSupport = (window as any).RTLSupport || {};
      (window as any).RTLSupport.isRTL = shouldBeRTL;
    }
  }, [i18n.language, enforceRTL, enforceSpecificLanguages]);
  
  // اكتشاف اتجاه النص
  const detectRTL = () => {
    if (typeof window !== 'undefined') {
      const currentLang = i18n.language || 'en';
      const rtlLanguages = ['ar', 'ar-iq', 'he', 'ur', 'fa'];
      return rtlLanguages.some(lang => 
        currentLang === lang || currentLang.startsWith(`${lang}-`)
      );
    }
    return false;
  };
  
  // الحصول على الاتجاه بناءً على محتوى النص
  const getDirectionByContent = (text: string): "ltr" | "rtl" => {
    if (!text) return 'ltr';
    
    // البحث عن أول حرف عربي / عبري / فارسي
    const rtlChars = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return rtlChars.test(text) ? 'rtl' : 'ltr';
  };
  
  // الحصول على الاتجاه المستجيب للشاشة
  const getResponsiveDirection = (screenWidth: number, breakpoint = 768): "ltr" | "rtl" => {
    return (screenWidth < breakpoint) ? 'ltr' : (isRTL ? 'rtl' : 'ltr');
  };
  
  // إضافة وظيفة applyRTLOrder لمعالجة الخطأ في NetworkToolsSection
  const applyRTLOrder = <T>(items: T[]): T[] => {
    return isRTL ? [...items].reverse() : items;
  };
  
  return {
    isRTL,
    direction: isRTL ? 'rtl' : 'ltr',
    detectRTL,
    getDirectionByContent,
    getResponsiveDirection,
    applyRTLOrder // إضافة الدالة المفقودة
  };
}
