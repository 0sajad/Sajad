
import { useEffect } from 'react';
import { useA11y } from './useA11y';

export function usePreferenceSync() {
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11y();

  // مزامنة مع تخزين المتصفح والتفضيلات النظام
  useEffect(() => {
    // تحميل القيم الأولية من التخزين المحلي
    const loadInitialPreferences = () => {
      const savedHighContrast = localStorage.getItem('a11y-highContrast');
      const savedLargeText = localStorage.getItem('a11y-largeText');
      const savedReducedMotion = localStorage.getItem('a11y-reducedMotion');
      const savedFocusMode = localStorage.getItem('a11y-focusMode');
      
      if (savedHighContrast === 'true') setHighContrast(true);
      if (savedLargeText === 'true') setLargeText(true);
      if (savedReducedMotion === 'true') setReducedMotion(true);
      if (savedFocusMode === 'true') setFocusMode(true);
      
      // التحقق من تفضيلات تقليل الحركة في النظام
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches && savedReducedMotion === null) {
        setReducedMotion(true);
      }
      
      // التحقق من تفضيلات مخطط الألوان لتباين محتمل أعلى
      const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
      const prefersDarkWithContrast = window.matchMedia('(prefers-contrast: more)');
      if (prefersColorScheme.matches && prefersDarkWithContrast.matches && savedHighContrast === null) {
        setHighContrast(true);
      }
      
      // التحقق من تفضيلات حجم النص في النظام
      const prefersLargerText = window.matchMedia('(prefers-reduced-transparency: reduce)'); // ليس مثاليًا، ولكنه مؤشر ممكن
      if (prefersLargerText.matches && savedLargeText === null) {
        setLargeText(true);
      }
    };
    
    loadInitialPreferences();
    
    // إعلان الإعدادات النشطة للمستخدم
    const announceInitialSettings = () => {
      // إذا كانت هناك ميزات نشطة، قم بإنشاء عنصر إعلان لقارئات الشاشة
      const activeFeatures = [];
      if (highContrast) activeFeatures.push('high contrast');
      if (largeText) activeFeatures.push('large text');
      if (reducedMotion) activeFeatures.push('reduced motion');
      if (focusMode) activeFeatures.push('focus mode');
      
      if (activeFeatures.length > 0) {
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.className = 'sr-only';
        announcer.textContent = `Active accessibility features: ${activeFeatures.join(', ')}`;
        document.body.appendChild(announcer);
        
        // إزالة الإعلان بعد قراءته
        setTimeout(() => {
          if (document.body.contains(announcer)) {
            document.body.removeChild(announcer);
          }
        }, 3000);
      }
    };
    
    // تأخير الإعلان للسماح للمستخدم بتحميل الصفحة أولاً
    const timer = setTimeout(announceInitialSettings, 2000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [setHighContrast, setLargeText, setReducedMotion, setFocusMode]);
  
  // حفظ التفضيلات عند تغييرها
  useEffect(() => {
    localStorage.setItem('a11y-highContrast', highContrast.toString());
  }, [highContrast]);
  
  useEffect(() => {
    localStorage.setItem('a11y-largeText', largeText.toString());
  }, [largeText]);
  
  useEffect(() => {
    localStorage.setItem('a11y-reducedMotion', reducedMotion.toString());
  }, [reducedMotion]);
  
  useEffect(() => {
    localStorage.setItem('a11y-focusMode', focusMode.toString());
  }, [focusMode]);
  
  // الاستماع لتغييرات تفضيلات النظام
  useEffect(() => {
    // مراقبة تغييرات تفضيلات تقليل الحركة
    const prefersReducedMotionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      // التحديث فقط إذا لم يقم المستخدم بتعيين تفضيل صريح
      if (localStorage.getItem('a11y-reducedMotion') === null) {
        setReducedMotion(e.matches);
      }
    };
    
    // مراقبة تغييرات تفضيلات التباين
    const prefersContrastMediaQuery = window.matchMedia('(prefers-contrast: more)');
    const handleContrastChange = (e: MediaQueryListEvent) => {
      // التحديث فقط إذا لم يقم المستخدم بتعيين تفضيل صريح
      if (localStorage.getItem('a11y-highContrast') === null) {
        setHighContrast(e.matches);
      }
    };
    
    // مراقبة تغيرات الوضع الخفيف/الداكن
    const prefersColorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleColorSchemeChange = () => {
      // لا تغيير مباشر، ولكن قد نحتاج إلى تعديل سلوك التباين العالي
      const isDarkMode = prefersColorSchemeMediaQuery.matches;
      const prefersMoreContrast = prefersContrastMediaQuery.matches;
      
      if (isDarkMode && prefersMoreContrast && localStorage.getItem('a11y-highContrast') === null) {
        setHighContrast(true);
      }
    };
    
    prefersReducedMotionMediaQuery.addEventListener('change', handleReducedMotionChange);
    prefersContrastMediaQuery.addEventListener('change', handleContrastChange);
    prefersColorSchemeMediaQuery.addEventListener('change', handleColorSchemeChange);
    
    return () => {
      prefersReducedMotionMediaQuery.removeEventListener('change', handleReducedMotionChange);
      prefersContrastMediaQuery.removeEventListener('change', handleContrastChange);
      prefersColorSchemeMediaQuery.removeEventListener('change', handleColorSchemeChange);
    };
  }, [setReducedMotion, setHighContrast]);

  return null;
}
