
import { useState, useEffect } from 'react';

/**
 * خطاف لتتبع ظهور الأقسام في العرض
 * يستخدم Intersection Observer API لتحسين الأداء
 */
export function useSectionVisibility() {
  const [sectionsVisible, setSectionsVisible] = useState<Record<string, boolean>>({});
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // تحقق من اكتمال تحميل الصفحة
  useEffect(() => {
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  
  // إعداد مراقب تقاطع العناصر لتحسين أداء التحميل البطيء
  useEffect(() => {
    if (!pageLoaded) return;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setSectionsVisible(prev => ({...prev, [sectionId]: true}));
          
          // إلغاء مراقبة القسم بعد ظهوره لتحسين الأداء
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // إضافة معرّفات للأقسام ومراقبتها
    const sections = document.querySelectorAll('.observe-section');
    sections.forEach(section => {
      if (!section.id) {
        section.id = `section-${Math.random().toString(36).substr(2, 9)}`;
      }
      sectionObserver.observe(section);
    });
    
    return () => sectionObserver.disconnect();
  }, [pageLoaded]);
  
  return { sectionsVisible, pageLoaded, setPageLoaded };
}
