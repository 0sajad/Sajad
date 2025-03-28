
import { useState, useEffect } from 'react';

// Update the interface to include an index signature for dynamic access
export interface SectionVisibilityState {
  header: boolean;
  hero: boolean;
  features: boolean;
  testimonials: boolean;
  pricing: boolean;
  faq: boolean;
  cta: boolean;
  footer: boolean;
  pageLoaded: boolean;
  [key: string]: boolean; // Add index signature
}

/**
 * خطاف لإدارة مرئية الأقسام والتحميل التدريجي
 */
export function useSectionVisibility() {
  const [sectionsVisible, setSectionsVisible] = useState<SectionVisibilityState>({
    header: false,
    hero: false,
    features: false,
    testimonials: false,
    pricing: false,
    faq: false,
    cta: false,
    footer: false,
    pageLoaded: false
  });
  
  // حالة تحميل الصفحة
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  
  // تعيين مرئية الأقسام بناءً على التمرير والتحميل
  useEffect(() => {
    // تمكين الرأس والبطل فورًا
    setSectionsVisible(prev => ({
      ...prev,
      header: true,
      hero: true
    }));
    
    // وظيفة لفحص مرئية العناصر
    const checkVisibility = () => {
      const sections = [
        { id: 'features', selector: '[data-section="features"]' },
        { id: 'testimonials', selector: '[data-section="testimonials"]' },
        { id: 'pricing', selector: '[data-section="pricing"]' },
        { id: 'faq', selector: '[data-section="faq"]' },
        { id: 'cta', selector: '[data-section="cta"]' },
        { id: 'footer', selector: 'footer' }
      ];

      sections.forEach(({ id, selector }) => {
        const element = document.querySelector(selector);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top <= window.innerHeight * 1.1;
          
          if (isVisible) {
            setSectionsVisible(prev => ({
              ...prev,
              [id]: true
            }));
          }
        }
      });
    };
    
    // التحقق أول مرة بعد تحميل الصفحة
    setTimeout(checkVisibility, 100);
    
    // تتبع مرئية الأقسام مع التمرير
    window.addEventListener('scroll', checkVisibility, { passive: true });
    
    // تعيين حالة تحميل الصفحة بعد تأخير
    const loadTimeout = setTimeout(() => {
      setPageLoaded(true);
      setSectionsVisible(prev => ({
        ...prev,
        pageLoaded: true
      }));
      
      // بعد تحميل الصفحة بالكامل، قم بتمكين جميع الأقسام
      setTimeout(() => {
        setSectionsVisible({
          header: true,
          hero: true,
          features: true,
          testimonials: true,
          pricing: true,
          faq: true,
          cta: true,
          footer: true,
          pageLoaded: true
        });
      }, 1000);
    }, 800);
    
    // التنظيف
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      clearTimeout(loadTimeout);
    };
  }, []);
  
  return {
    sectionsVisible,
    pageLoaded,
    setPageLoaded
  };
}
