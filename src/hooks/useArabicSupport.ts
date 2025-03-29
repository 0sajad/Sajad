
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppState } from './state/use-app-state';

/**
 * خطاف لدعم اللغة العربية وخصائصها
 * يوفر وظائف لتنسيق الأرقام وتحسين عرض النص العربي
 */
export function useArabicSupport() {
  const { i18n } = useTranslation();
  const [isArabic, setIsArabic] = useState(false);
  const [isIraqiArabic, setIsIraqiArabic] = useState(false);
  const useArabicNumerals = useAppState(state => state.preferences.arabicNumerals);
  
  // تحديث حالة اللغة العربية عند تغيير اللغة
  useEffect(() => {
    const currentLang = i18n.language || 'en';
    setIsArabic(currentLang === 'ar' || currentLang === 'ar-iq');
    setIsIraqiArabic(currentLang === 'ar-iq');
  }, [i18n.language]);
  
  /**
   * تنسيق الرقم باستخدام الأرقام العربية أو الهندية حسب الإعدادات
   */
  const formatNumber = (num: number, forceArabicNumerals?: boolean): string => {
    const shouldUseArabicNumerals = forceArabicNumerals !== undefined 
      ? forceArabicNumerals 
      : (isArabic && useArabicNumerals);
    
    if (shouldUseArabicNumerals) {
      // استبدال الأرقام الإنجليزية بالأرقام العربية
      return num.toString().replace(/\d/g, d => {
        return ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'][parseInt(d)];
      });
    }
    
    return num.toString();
  };
  
  /**
   * تنسيق التاريخ بأسلوب عربي
   */
  const formatDate = (date: Date): string => {
    if (!isArabic) {
      return date.toLocaleDateString();
    }
    
    // التنسيق بالعربية
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  /**
   * تنسيق النص العربي لعرض أفضل
   */
  const formatArabicText = (text: string): string => {
    if (!isArabic || !text) return text;
    
    // تحسين النص العربي
    return text
      .replace(/\s([،؛؟:])/g, '$1') // إزالة المسافات قبل علامات الترقيم
      .replace(/([\u0600-\u06FF])\s([\u0600-\u06FF])/g, '$1\u200C$2'); // إضافة واصل غير مرئي
  };
  
  /**
   * تحويل الاتجاه بناءً على محتوى النص
   */
  const getDirectionByContent = (text: string): 'rtl' | 'ltr' => {
    if (!text) return 'ltr';
    
    // فحص أول حرف عربي في النص
    const hasArabicChar = /[\u0600-\u06FF]/.test(text);
    return hasArabicChar ? 'rtl' : 'ltr';
  };
  
  /**
   * الحصول على قيمة خاصية الاتجاه بناءً على اللغة الحالية
   */
  const direction = isArabic ? 'rtl' : 'ltr';
  
  return {
    isArabic,
    isIraqiArabic,
    formatNumber,
    formatDate,
    formatArabicText,
    direction,
    getDirectionByContent
  };
}
