
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * خطاف لإدارة وتطبيق اتجاه الكتابة من اليمين إلى اليسار
 */
export function useRTLSupport() {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [didMount, setDidMount] = useState<boolean>(false);

  // إعداد اتجاه الكتابة بناءً على اللغة
  useEffect(() => {
    setDidMount(true);
    
    // التحقق من اللغة الحالية
    const currentLang = i18n.language || 'en';
    
    // قائمة اللغات التي تستخدم اتجاه الكتابة من اليمين إلى اليسار
    const rtlLanguages = ['ar', 'ar-iq', 'he', 'fa', 'ur'];
    
    // التحقق مما إذا كانت اللغة الحالية تستخدم RTL
    const shouldBeRTL = rtlLanguages.some(lang => 
      currentLang === lang || currentLang.startsWith(`${lang}-`)
    );
    
    // تطبيق اتجاه RTL
    if (shouldBeRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-active');
      setIsRTL(true);
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl-active');
      setIsRTL(false);
    }
    
    // إضافة فئة CSS لمساعدة التنسيق
    document.documentElement.classList.toggle('rtl', shouldBeRTL);
    
  }, [i18n.language]);
  
  /**
   * تنسيق النصوص لاستخدام اتجاه الكتابة الصحيح
   * @param text النص الذي سيتم تنسيقه
   * @param forceRTL إجبار استخدام RTL
   * @param forceLTR إجبار استخدام LTR
   */
  const formatTextDirection = (text: string, forceRTL = false, forceLTR = false): string => {
    if (!text) return text;
    
    if (forceRTL) {
      return `\u202B${text}\u202C`; // RLE: Right-to-Left Embedding
    } else if (forceLTR) {
      return `\u202A${text}\u202C`; // LRE: Left-to-Right Embedding
    }
    
    // استخدام اتجاه الكتابة التلقائي
    return text;
  };
  
  /**
   * عكس مصفوفة في حالة RTL
   * مفيد للقوائم التي يجب أن تظهر بترتيب معكوس في RTL
   * @param array المصفوفة التي سيتم عكسها
   */
  const reverseIfRTL = <T,>(array: T[]): T[] => {
    if (isRTL) {
      return [...array].reverse();
    }
    return array;
  };
  
  /**
   * تطبيق قيم CSS مختلفة بناءً على اتجاه الكتابة
   * @param rtlValue القيمة في حالة RTL
   * @param ltrValue القيمة في حالة LTR
   */
  const applyDirectionalValue = <T,>(rtlValue: T, ltrValue: T): T => {
    return isRTL ? rtlValue : ltrValue;
  };

  return {
    isRTL,
    didMount,
    formatTextDirection,
    reverseIfRTL,
    applyDirectionalValue
  };
}
