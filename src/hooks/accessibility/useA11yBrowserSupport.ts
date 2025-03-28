
import { useState, useEffect } from 'react';
import { useA11y } from '@/hooks/useA11y';

export interface BrowserA11ySupport {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  prefersLightScheme: boolean;
  prefersDarkScheme: boolean;
  isRTL: boolean;
  supportsVoiceOver: boolean;
  supportsScreenReader: boolean;
  supportsKeyboardNavigation: boolean;
  browserName: string;
  browserVersion: string;
  osName: string;
}

/**
 * Hook لاكتشاف ميزات المستعرض المتعلقة بإمكانية الوصول
 */
export function useA11yBrowserSupport(): BrowserA11ySupport {
  const { announce } = useA11y();
  const [support, setSupport] = useState<BrowserA11ySupport>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    prefersLightScheme: true,
    prefersDarkScheme: false,
    isRTL: false,
    supportsVoiceOver: false,
    supportsScreenReader: false,
    supportsKeyboardNavigation: true,
    browserName: '',
    browserVersion: '',
    osName: ''
  });
  
  useEffect(() => {
    const detectBrowserSupport = () => {
      try {
        // اكتشاف تفضيلات المستخدم
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches || 
                                   window.matchMedia('(-ms-high-contrast: active)').matches;
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        // اكتشاف اتجاه النص
        const isRTL = document.documentElement.dir === 'rtl' || 
                     window.getComputedStyle(document.body).direction === 'rtl';
        
        // اكتشاف دعم قارئ الشاشة (طريقة تقريبية)
        const possibleScreenReader = 'speechSynthesis' in window || 
                                   'webkitSpeechRecognition' in window || 
                                   document.documentElement.getAttribute('aria-hidden') !== null;
        
        // اكتشاف نوع المستعرض
        const userAgent = navigator.userAgent;
        let browserName = 'Unknown';
        let browserVersion = '';
        let osName = 'Unknown';
        
        // اكتشاف نوع المستعرض
        if (userAgent.indexOf('Firefox') > -1) {
          browserName = 'Firefox';
        } else if (userAgent.indexOf('SamsungBrowser') > -1) {
          browserName = 'Samsung Browser';
        } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
          browserName = 'Opera';
        } else if (userAgent.indexOf('Edge') > -1) {
          browserName = 'Edge';
        } else if (userAgent.indexOf('Chrome') > -1) {
          browserName = 'Chrome';
        } else if (userAgent.indexOf('Safari') > -1) {
          browserName = 'Safari';
        }
        
        // اكتشاف نظام التشغيل
        if (userAgent.indexOf('Win') > -1) {
          osName = 'Windows';
        } else if (userAgent.indexOf('Mac') > -1) {
          osName = 'MacOS';
        } else if (userAgent.indexOf('Linux') > -1) {
          osName = 'Linux';
        } else if (userAgent.indexOf('Android') > -1) {
          osName = 'Android';
        } else if (userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
          osName = 'iOS';
        }
        
        // اكتشاف نسخة المتصفح
        const matches = userAgent.match(/(firefox|chrome|safari|opr|opera|edge|msie|trident|SamsungBrowser)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (matches && matches.length >= 3) {
          browserVersion = matches[2];
        }
        
        // اكتشاف دعم VoiceOver على أجهزة Mac و iOS
        const supportsVoiceOver = osName === 'MacOS' || osName === 'iOS';
        
        // تحديث حالة الدعم
        setSupport({
          prefersReducedMotion,
          prefersHighContrast,
          prefersLightScheme,
          prefersDarkScheme,
          isRTL,
          supportsVoiceOver,
          supportsScreenReader: possibleScreenReader,
          supportsKeyboardNavigation: true,
          browserName,
          browserVersion,
          osName
        });
        
        // إذا كانت هناك ميزات مهمة للوصول، إعلام المستخدم
        if (prefersReducedMotion || prefersHighContrast) {
          const message = 'تم اكتشاف تفضيلات إمكانية الوصول في نظامك وتم تطبيقها';
          announce(message, 'polite');
        }
      } catch (error) {
        console.error('Error detecting browser accessibility support:', error);
      }
    };
    
    detectBrowserSupport();
    
    // استماع للتغييرات في تفضيلات المستخدم
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    
    const handleReducedMotionChange = () => detectBrowserSupport();
    const handleColorSchemeChange = () => detectBrowserSupport();
    const handleContrastChange = () => detectBrowserSupport();
    
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    colorSchemeQuery.addEventListener('change', handleColorSchemeChange);
    contrastQuery.addEventListener('change', handleContrastChange);
    
    return () => {
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      colorSchemeQuery.removeEventListener('change', handleColorSchemeChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
    };
  }, [announce]);
  
  return support;
}
