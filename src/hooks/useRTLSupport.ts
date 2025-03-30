
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from './state';

interface RTLSupportOptions {
  enforceRTL?: boolean;
  enforceSpecificLanguages?: string[];
  defaultDirection?: 'rtl' | 'ltr';
}

/**
 * خطاف مخصص لدعم اللغات ذات الاتجاه من اليمين إلى اليسار (RTL)
 * يوفر وظائف لتحديد اتجاه اللغة ودعم RTL بشكل متقدم
 */
export const useRTLSupport = (options: RTLSupportOptions = {}) => {
  const { i18n } = useTranslation();
  const { 
    enforceRTL = false, 
    enforceSpecificLanguages = ['ar', 'ar-iq', 'he', 'ur', 'fa'], 
    defaultDirection = 'ltr' 
  } = options;
  
  const preferences = useAppState(state => state.preferences || {});
  const [direction, setDirection] = useState<string>(defaultDirection);
  const [isRTL, setIsRTL] = useState<boolean>(false);
  
  /**
   * اكتشاف ما إذا كانت اللغة الحالية تستخدم اتجاه RTL
   */
  const detectRTL = useCallback(() => {
    // قائمة اللغات التي تستخدم RTL
    const rtlLanguages = enforceSpecificLanguages;
    
    // الحصول على اللغة الحالية
    const currentLang = i18n.language || 'en';
    
    // التحقق مما إذا كانت اللغة الحالية في قائمة لغات RTL
    const isRTLLanguage = rtlLanguages.some(lang => 
      currentLang === lang || currentLang.startsWith(`${lang}-`)
    );
    
    // تحديد الاتجاه بناءً على: تفضيل المستخدم أو الإجبار أو اللغة
    const shouldUseRTL = preferences.forceRTL || enforceRTL || isRTLLanguage;
    
    setIsRTL(shouldUseRTL);
    setDirection(shouldUseRTL ? 'rtl' : 'ltr');
    
    return shouldUseRTL;
  }, [i18n.language, preferences.forceRTL, enforceRTL, enforceSpecificLanguages]);
  
  /**
   * تحديد اتجاه محتوى نصي بناءً على أول حرف ذي معنى
   */
  const getDirectionByContent = useCallback((text: string): 'rtl' | 'ltr' => {
    if (!text) return direction as 'rtl' | 'ltr';
    
    // نمط التعبير المنتظم للأحرف العربية والعبرية
    const rtlPattern = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    
    // نمط التعبير المنتظم للأحرف اللاتينية
    const ltrPattern = /[A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/;
    
    // فحص النص لتحديد الاتجاه
    if (rtlPattern.test(text.charAt(0))) {
      return 'rtl';
    } else if (ltrPattern.test(text.charAt(0))) {
      return 'ltr';
    }
    
    // الرجوع إلى الاتجاه الافتراضي
    return isRTL ? 'rtl' : 'ltr';
  }, [direction, isRTL]);
  
  /**
   * تحويل اتجاه التخطيط بناءً على العرض وخيارات المستجيب
   */
  const getResponsiveDirection = useCallback(
    (screenWidth: number, breakpoint = 768): 'rtl' | 'ltr' => {
      // في بعض الحالات، قد نرغب في تجاوز اتجاه RTL على الشاشات الصغيرة
      // يمكن استخدامها في حالات خاصة حيث يكون التصميم مشكلة على الشاشات الصغيرة
      const shouldOverrideRTL = preferences.overrideRTLOnMobile && screenWidth < breakpoint;
      
      if (shouldOverrideRTL) {
        return 'ltr';
      }
      
      return isRTL ? 'rtl' : 'ltr';
    },
    [isRTL, preferences.overrideRTLOnMobile]
  );
  
  // إعادة اكتشاف RTL عند تغير اللغة
  useEffect(() => {
    detectRTL();
  }, [i18n.language, detectRTL, preferences.forceRTL]);

  // تطبيق الاتجاه على مستوى المستند
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
      
      if (isRTL) {
        document.body.classList.add('rtl-active');
      } else {
        document.body.classList.remove('rtl-active');
      }
    }
  }, [isRTL]);
  
  return {
    isRTL,
    direction,
    detectRTL,
    getDirectionByContent,
    getResponsiveDirection,
  };
};

export default useRTLSupport;
