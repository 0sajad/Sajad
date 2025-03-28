
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
  
  /**
   * إضافة خاصية التدفق النصي المعكوس إلى عناصر المفاتيح-القيم
   * مثل: { name: 'اسم', value: 'قيمة' } => { name: 'اسم', value: 'قيمة', textFlow: 'rtl' }
   */
  const addRTLTextFlow = <T extends Record<string, any>>(
    items: T[],
    textProperties: (keyof T)[] = ['label', 'title', 'text', 'name', 'description']
  ): (T & { textFlow?: 'rtl' | 'ltr' })[] => {
    if (!isRTL) return items as (T & { textFlow?: 'rtl' | 'ltr' })[];
    
    return items.map(item => {
      // التحقق مما إذا كانت أي من خصائص النص تحتوي على نص باللغة العربية
      const hasArabicText = textProperties.some(prop => {
        const value = item[prop];
        return typeof value === 'string' && /[\u0600-\u06FF]/.test(value);
      });
      
      // إضافة خاصية textFlow إذا كان النص عربيًا
      return hasArabicText ? { ...item, textFlow: 'rtl' as const } : { ...item, textFlow: 'ltr' as const };
    });
  };
  
  /**
   * عكس ترتيب المصفوفة إذا كان الاتجاه من اليمين إلى اليسار
   */
  const applyRTLOrder = <T>(items: T[]): T[] => {
    return isRTL ? [...items].reverse() : items;
  };
  
  return {
    isRTL,
    addRTLTextFlow,
    applyRTLOrder,
  };
}
