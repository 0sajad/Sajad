
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from './useAppState';

/**
 * خطاف (hook) لتحسين دعم الاتجاه من اليمين إلى اليسار (RTL)
 * يقوم بإدارة تغييرات الاتجاه وتطبيق التنسيقات المناسبة عند تغيير اللغة
 */
export function useRTLSupport() {
  const { i18n } = useTranslation();
  const { preferences } = useAppState();
  
  // تطبيق الاتجاه المناسب عند تغيير اللغة
  useEffect(() => {
    const isRTL = i18n.language === 'ar' || i18n.language === 'ar-iq';
    
    // تطبيق الاتجاه على عنصر HTML الجذر
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    
    // إضافة فئة RTL للجسم للاستخدام في التنسيقات
    if (isRTL) {
      document.body.classList.add('rtl-enabled');
      document.body.classList.remove('ltr-enabled');
    } else {
      document.body.classList.add('ltr-enabled');
      document.body.classList.remove('rtl-enabled');
    }
    
    // تطبيق تنسيقات RTL محددة
    applyRTLSpecificStyles(isRTL);
    
    // إضافة سمة البيانات لاستخدامها في استعلامات CSS
    document.documentElement.setAttribute('data-direction', isRTL ? 'rtl' : 'ltr');
    
    // تطبيق تنسيقات خاصة للأرقام في اللغة العربية
    if (isRTL && preferences.arabicNumerals) {
      document.documentElement.classList.add('arabic-numerals');
    } else {
      document.documentElement.classList.remove('arabic-numerals');
    }
    
    // الاستماع لتغييرات اللغة من مكونات أخرى
    const handleLanguageChange = (event: CustomEvent) => {
      const { language } = event.detail;
      i18n.changeLanguage(language);
    };
    
    window.addEventListener('app:languageChange', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('app:languageChange', handleLanguageChange as EventListener);
    };
  }, [i18n.language, preferences.arabicNumerals]);
  
  // تحديد ما إذا كانت اللغة الحالية هي RTL
  const isRTL = i18n.language === 'ar' || i18n.language === 'ar-iq';
  
  // تطبيق تنسيقات محددة لـ RTL
  const applyRTLSpecificStyles = (isRTL: boolean) => {
    // تعديل نمط الشريط الجانبي
    const sidebar = document.querySelector('.app-sidebar');
    if (sidebar) {
      if (isRTL) {
        sidebar.classList.add('rtl-sidebar');
      } else {
        sidebar.classList.remove('rtl-sidebar');
      }
    }
    
    // تعديل اتجاه الرسوم البيانية
    const charts = document.querySelectorAll('.recharts-wrapper');
    charts.forEach(chart => {
      if (isRTL) {
        chart.classList.add('rtl-chart');
      } else {
        chart.classList.remove('rtl-chart');
      }
    });
    
    // تعديل اتجاه القوائم المنسدلة
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
      if (isRTL) {
        dropdown.classList.add('rtl-dropdown');
      } else {
        dropdown.classList.remove('rtl-dropdown');
      }
    });
  };
  
  return {
    isRTL,
    // دالة مساعدة لعكس مصفوفة في حالة RTL
    reverseIfRTL: <T>(array: T[]): T[] => {
      return isRTL ? [...array].reverse() : array;
    },
    // دالة مساعدة للحصول على قيمة حسب الاتجاه
    getDirectionalValue: <T>(ltrValue: T, rtlValue: T): T => {
      return isRTL ? rtlValue : ltrValue;
    }
  };
}
