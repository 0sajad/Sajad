
import { useState, useEffect } from 'react';

/**
 * هوك مساعد لتحسين إمكانية الوصول في التطبيق
 */
export function useA11y() {
  const [highContrast, setHighContrast] = useState(
    localStorage.getItem('highContrast') === 'true'
  );
  
  const [largeText, setLargeText] = useState(
    localStorage.getItem('largeText') === 'true'
  );
  
  const [reducedMotion, setReducedMotion] = useState(
    localStorage.getItem('reducedMotion') === 'true' || 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  
  const [focusMode, setFocusMode] = useState(
    localStorage.getItem('focusMode') === 'true'
  );
  
  // تطبيق تباين عالٍ إذا كان مفعلاً
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);
  
  // تطبيق نص كبير إذا كان مفعلاً
  useEffect(() => {
    if (largeText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }
    
    localStorage.setItem('largeText', largeText.toString());
  }, [largeText]);
  
  // تطبيق تقليل الحركة
  useEffect(() => {
    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
    
    localStorage.setItem('reducedMotion', reducedMotion.toString());
  }, [reducedMotion]);
  
  // تطبيق وضع التركيز
  useEffect(() => {
    if (focusMode) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    
    localStorage.setItem('focusMode', focusMode.toString());
  }, [focusMode]);
  
  // مراقبة تفضيلات النظام للحركة المخفضة
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setReducedMotion(true);
      }
    };
    
    prefersReducedMotion.addEventListener('change', handleMotionPreferenceChange);
    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);
  
  // إضافة مفاتيح اختصار للوصول
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + C لتبديل وضع التباين العالي
      if (e.altKey && e.key === 'c') {
        setHighContrast(prev => !prev);
      }
      
      // Alt + T لتبديل وضع النص الكبير
      if (e.altKey && e.key === 't') {
        setLargeText(prev => !prev);
      }
      
      // Alt + M لتبديل وضع تقليل الحركة
      if (e.altKey && e.key === 'm') {
        setReducedMotion(prev => !prev);
      }
      
      // Alt + F لتبديل وضع التركيز
      if (e.altKey && e.key === 'f') {
        setFocusMode(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return {
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    reducedMotion,
    setReducedMotion,
    focusMode,
    setFocusMode
  };
}
