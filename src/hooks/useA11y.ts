
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
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return {
    highContrast,
    setHighContrast,
    largeText,
    setLargeText
  };
}
