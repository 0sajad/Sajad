
import { useEffect } from 'react';
import { useA11y } from '@/hooks/useA11y';

/**
 * هوك لمزامنة تفضيلات المستخدم مع تفضيلات النظام
 */
export function usePreferenceSync() {
  const { 
    setReducedMotion, 
    setHighContrast,
    largeText, setLargeText,
    dyslexicFont, setDyslexicFont,
    reducedMotion,
    highContrast
  } = useA11y();
  
  // مراقبة تفضيلات النظام وتحديث الإعدادات وفقًا لذلك
  useEffect(() => {
    // تفضيل تقليل الحركة
    const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleReducedMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // تحديث الإعداد فقط إذا كان المستخدم لم يعين تفضيلًا صريحًا
      const hasExplicitSetting = localStorage.getItem('reducedMotion') !== null;
      
      if (!hasExplicitSetting && e.matches !== reducedMotion) {
        setReducedMotion(e.matches);
      }
    };
    
    // تفضيل التباين العالي
    const prefersContrastQuery = window.matchMedia('(prefers-contrast: more)');
    
    const handleContrastChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // تحديث الإعداد فقط إذا كان المستخدم لم يعين تفضيلًا صريحًا
      const hasExplicitSetting = localStorage.getItem('highContrast') !== null;
      
      if (!hasExplicitSetting && e.matches !== highContrast) {
        setHighContrast(e.matches);
      }
    };
    
    // إعداد الخطوط الكبيرة / الحجم
    const prefersLargeTextQuery = window.matchMedia('(prefers-reduced-transparency: reduce)');
    
    const handleLargeTextChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // استخدام تفضيل الشفافية المنخفضة كمؤشر على تفضيل النص الكبير
      // (لا يوجد استعلام مباشر للنص الكبير في CSS)
      const hasExplicitSetting = localStorage.getItem('largeText') !== null;
      
      if (!hasExplicitSetting && e.matches !== largeText) {
        setLargeText(e.matches);
      }
    };
    
    // تفضيل قراءة الشاشة (يمكن أن يشير إلى تفضيل خط عسر القراءة)
    const prefersReaderMediaQuery = window.matchMedia('(prefers-reduced-transparency: reduce), (prefers-contrast: more)');
    
    const handleReaderChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // استخدام تفضيلات القابلية للقراءة كمؤشر على احتمال الحاجة لخط عسر القراءة
      const hasExplicitSetting = localStorage.getItem('dyslexicFont') !== null;
      
      if (!hasExplicitSetting && e.matches !== dyslexicFont) {
        setDyslexicFont(e.matches);
      }
    };
    
    // تطبيق التفضيلات الأولية
    handleReducedMotionChange(prefersReducedMotionQuery);
    handleContrastChange(prefersContrastQuery);
    handleLargeTextChange(prefersLargeTextQuery);
    handleReaderChange(prefersReaderMediaQuery);
    
    // الاستماع للتغييرات
    prefersReducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    prefersContrastQuery.addEventListener('change', handleContrastChange);
    prefersLargeTextQuery.addEventListener('change', handleLargeTextChange);
    prefersReaderMediaQuery.addEventListener('change', handleReaderChange);
    
    return () => {
      prefersReducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      prefersContrastQuery.removeEventListener('change', handleContrastChange);
      prefersLargeTextQuery.removeEventListener('change', handleLargeTextChange);
      prefersReaderMediaQuery.removeEventListener('change', handleReaderChange);
    };
  }, [
    setReducedMotion, 
    setHighContrast, 
    setLargeText, 
    setDyslexicFont, 
    reducedMotion,
    highContrast,
    largeText,
    dyslexicFont
  ]);
  
  return null; // هذا الهوك ليس له قيمة إرجاع
}
