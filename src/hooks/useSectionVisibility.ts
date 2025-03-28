
import { useCallback, useEffect, useState } from 'react';

export interface SectionVisibilityState {
  [key: string]: boolean; // Add index signature
  'hero-section': boolean;
  'animated-cards-section': boolean;
  'ai-features-section': boolean;
  'network-dashboard-section': boolean;
  'network-tools-section': boolean;
  'settings-section': boolean;
  'cta-section': boolean;
}

export function useSectionVisibility() {
  const [sectionsVisible, setSectionsVisible] = useState<SectionVisibilityState>({
    'hero-section': true,
    'animated-cards-section': false,
    'ai-features-section': false,
    'network-dashboard-section': false,
    'network-tools-section': false,
    'settings-section': false,
    'cta-section': false,
  });
  
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // تحديث حالة الرؤية عند التمرير
  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll('.observe-section');
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const inView = (
        rect.top <= window.innerHeight * 0.75 &&
        rect.bottom >= window.innerHeight * 0.25
      );
      
      const id = section.id;
      if (id) {
        setSectionsVisible(prev => ({
          ...prev,
          [id]: inView
        }));
      }
    });
  }, []);
  
  useEffect(() => {
    // تعيين كافة القطاعات كمرئية بعد التحميل
    const allSectionsVisible = Object.keys(sectionsVisible).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as SectionVisibilityState);
    
    const timer = setTimeout(() => {
      setSectionsVisible(allSectionsVisible);
      setPageLoaded(true);
    }, 1000);
    
    // إضافة مستمع للتمرير
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // تحقق من الرؤية عند التحميل الأولي
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  return {
    sectionsVisible,
    pageLoaded,
    setPageLoaded
  };
}
