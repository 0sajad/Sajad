
import { useCallback } from 'react';
import { useRTLSupport } from './useRTLSupport';
import { useTranslation } from 'react-i18next';

interface ArabicSupportOptions {
  useArabicNumerals?: boolean;
  enhanceTypography?: boolean;
  improveKashida?: boolean;
}

/**
 * خطاف مخصص للتعامل مع الدعم المتقدم للغة العربية
 * يتضمن تحسينات لعرض الأرقام والتنسيق والكاشيدة
 */
export const useArabicSupport = (options: ArabicSupportOptions = {}) => {
  const { i18n } = useTranslation();
  const { isRTL, direction, getDirectionByContent } = useRTLSupport();
  
  const { 
    useArabicNumerals = true,
    enhanceTypography = true,
    improveKashida = false
  } = options;
  
  // التحقق من أن اللغة الحالية هي العربية
  const isArabic = useCallback(() => {
    const currentLang = i18n.language || '';
    return currentLang.startsWith('ar');
  }, [i18n.language]);
  
  // تحويل الأرقام الإنجليزية إلى أرقام عربية
  const formatNumber = useCallback((num: number, useArabicDigits = useArabicNumerals): string => {
    if (!useArabicDigits || !isArabic()) {
      return num.toString();
    }
    
    // تحويل الأرقام إلى أرقام عربية
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
      .toString()
      .split('')
      .map(digit => {
        return isNaN(parseInt(digit)) ? digit : arabicDigits[parseInt(digit)];
      })
      .join('');
  }, [isArabic, useArabicNumerals]);
  
  // تحسين تنسيق النص العربي
  const formatArabicText = useCallback((text: string): string => {
    if (!enhanceTypography || !isArabic() || !text) {
      return text;
    }
    
    // تحسين علامات الترقيم في النص العربي
    let formattedText = text
      .replace(/\?/g, '؟')
      .replace(/,/g, '،')
      .replace(/;/g, '؛')
      .replace(/%/g, '٪');
    
    // تصحيح مسافات العلامات الخاصة بالعربية
    formattedText = formattedText
      .replace(/ ؟/g, '؟')
      .replace(/ ،/g, '،')
      .replace(/ \./g, '.')
      .replace(/ :/g, ':');
    
    // تحسين الكاشيدة إذا كان مطلوبًا
    if (improveKashida) {
      // إضافة الكاشيدة بعد الأحرف المناسبة في الكلمات الطويلة
      formattedText = formattedText.replace(/([ابتثجحخدذرزسشصضطظعغفقكلمنهويء])([ابتثجحخدذرزسشصضطظعغفقكلمنهويء]{2,})/g, '$1\u0640$2');
    }
    
    return formattedText;
  }, [isArabic, enhanceTypography, improveKashida]);
  
  // تكييف تنسيق التاريخ للغة العربية
  const formatArabicDate = useCallback((date: Date): string => {
    if (!isArabic()) {
      return date.toLocaleDateString();
    }
    
    // أسماء الأشهر العربية
    const arabicMonths = [
      'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
      'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    
    // أيام الأسبوع بالعربية
    const arabicDays = [
      'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
    ];
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dayOfWeek = date.getDay();
    
    // تنسيق التاريخ بالعربية: يوم الأسبوع، اليوم الشهر السنة
    return `${arabicDays[dayOfWeek]}، ${useArabicNumerals ? formatNumber(day) : day} ${arabicMonths[month]} ${useArabicNumerals ? formatNumber(year) : year}`;
  }, [isArabic, formatNumber, useArabicNumerals]);
  
  // تحسين محاذاة العناصر في RTL
  const getRTLFlexDirection = useCallback((defaultDirection: string = 'row'): string => {
    if (!isRTL) return defaultDirection;
    
    // عكس الاتجاهات في RTL
    if (defaultDirection === 'row') return 'row-reverse';
    if (defaultDirection === 'row-reverse') return 'row';
    
    return defaultDirection;
  }, [isRTL]);
  
  return {
    isArabic: isArabic(),
    isRTL,
    direction,
    formatNumber,
    formatArabicText,
    formatArabicDate,
    getDirectionByContent,
    getRTLFlexDirection,
  };
};

export default useArabicSupport;
