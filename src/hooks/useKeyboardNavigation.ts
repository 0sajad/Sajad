
import { useState, useEffect, useCallback } from 'react';
import { useA11y } from './useA11y';

/**
 * خطاف لتحسين التنقل بلوحة المفاتيح وإضافة اختصارات مخصصة
 */
export function useKeyboardNavigation() {
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);
  const [recentKeys, setRecentKeys] = useState<string[]>([]);
  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = useState(false);
  const { announce, keyboardNavigationVisible, setKeyboardNavigationVisible } = useA11y();
  
  // رصد التنقل بلوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // تحديث قائمة المفاتيح الأخيرة
      setRecentKeys(prev => [...prev.slice(-4), e.key]);
      
      // تعيين حالة التنقل بلوحة المفاتيح
      if (e.key === 'Tab') {
        setIsNavigatingWithKeyboard(true);
        
        // حفظ العنصر المركز عليه حاليًا
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement?.id) {
          setFocusedElementId(activeElement.id);
        }
      }
      
      // التحقق من اختصارات لوحة المفاتيح
      // Alt + / لفتح قائمة اختصارات لوحة المفاتيح
      if (e.altKey && e.key === '/') {
        e.preventDefault();
        setKeyboardNavigationVisible(!keyboardNavigationVisible);
        announce('تم فتح قائمة اختصارات لوحة المفاتيح', 'polite');
      }
      
      // Alt + H للانتقال إلى الصفحة الرئيسية
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        window.location.href = '/';
        announce('جاري الانتقال إلى الصفحة الرئيسية', 'polite');
      }
      
      // Alt + S للتركيز على شريط البحث
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const searchInput = document.querySelector('#search-input') as HTMLElement;
        if (searchInput) {
          searchInput.focus();
          announce('تم التركيز على حقل البحث', 'polite');
        }
      }
      
      // Alt + J للتخطي إلى المحتوى الرئيسي
      if (e.altKey && e.key === 'j') {
        e.preventDefault();
        const mainContent = document.querySelector('#main-content') as HTMLElement;
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
          announce('تم الانتقال إلى المحتوى الرئيسي', 'polite');
        }
      }
      
      // Alt + N للانتقال إلى القسم التالي
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        navigateToNextSection();
      }
      
      // Alt + P للانتقال إلى القسم السابق
      if (e.altKey && e.key === 'p') {
        e.preventDefault();
        navigateToPreviousSection();
      }
    };
    
    // إعادة تعيين حالة التنقل بلوحة المفاتيح عند استخدام الماوس
    const handleMouseDown = () => {
      setIsNavigatingWithKeyboard(false);
    };
    
    // إضافة مستمعي الأحداث
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [keyboardNavigationVisible, announce, setKeyboardNavigationVisible]);
  
  // الانتقال إلى القسم التالي
  const navigateToNextSection = useCallback(() => {
    const sections = Array.from(document.querySelectorAll('section, [role="region"], [role="main"]'));
    const currentSection = document.activeElement?.closest('section, [role="region"], [role="main"]');
    let nextSectionIndex = 0;
    
    if (currentSection) {
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex >= 0 && currentIndex < sections.length - 1) {
        nextSectionIndex = currentIndex + 1;
      }
    }
    
    const nextSection = sections[nextSectionIndex] as HTMLElement;
    if (nextSection) {
      nextSection.focus();
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // إعلان اسم القسم الجديد
      const sectionHeading = nextSection.querySelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
      if (sectionHeading) {
        announce(`تم الانتقال إلى: ${sectionHeading.textContent}`, 'polite');
      } else {
        announce('تم الانتقال إلى القسم التالي', 'polite');
      }
    }
  }, [announce]);
  
  // الانتقال إلى القسم السابق
  const navigateToPreviousSection = useCallback(() => {
    const sections = Array.from(document.querySelectorAll('section, [role="region"], [role="main"]'));
    const currentSection = document.activeElement?.closest('section, [role="region"], [role="main"]');
    let prevSectionIndex = sections.length - 1;
    
    if (currentSection) {
      const currentIndex = sections.indexOf(currentSection);
      if (currentIndex > 0) {
        prevSectionIndex = currentIndex - 1;
      }
    }
    
    const prevSection = sections[prevSectionIndex] as HTMLElement;
    if (prevSection) {
      prevSection.focus();
      prevSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // إعلان اسم القسم الجديد
      const sectionHeading = prevSection.querySelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
      if (sectionHeading) {
        announce(`تم الانتقال إلى: ${sectionHeading.textContent}`, 'polite');
      } else {
        announce('تم الانتقال إلى القسم السابق', 'polite');
      }
    }
  }, [announce]);
  
  // المساعدة في التنقل ضمن عناصر الواجهة
  const setupFocusTrap = useCallback((containerId: string) => {
    const container = document.getElementById(containerId);
    if (!container) return { start: () => {}, stop: () => {} };
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    const start = () => {
      document.addEventListener('keydown', handleFocusTrap);
      if (firstElement) {
        setTimeout(() => firstElement.focus(), 100);
      }
    };
    
    const stop = () => {
      document.removeEventListener('keydown', handleFocusTrap);
    };
    
    return { start, stop };
  }, []);
  
  return {
    focusedElementId,
    isNavigatingWithKeyboard,
    recentKeys,
    navigateToNextSection,
    navigateToPreviousSection,
    setupFocusTrap,
    toggleKeyboardNavigationMenu: () => setKeyboardNavigationVisible(!keyboardNavigationVisible)
  };
}
