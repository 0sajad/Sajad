
import { useState, useEffect } from 'react';

interface A11ySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  colorBlindMode: string | null;
  dyslexicFont: boolean;
  readingGuide: boolean;
  soundFeedback: boolean;
}

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
  
  const [colorBlindMode, setColorBlindMode] = useState<string | null>(
    localStorage.getItem('colorBlindMode')
  );
  
  const [dyslexicFont, setDyslexicFont] = useState(
    localStorage.getItem('dyslexicFont') === 'true'
  );
  
  const [readingGuide, setReadingGuide] = useState(
    localStorage.getItem('readingGuide') === 'true'
  );
  
  const [soundFeedback, setSoundFeedback] = useState(
    localStorage.getItem('soundFeedback') === 'true'
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
  
  // تطبيق وضع عمى الألوان
  useEffect(() => {
    // إزالة جميع أوضاع عمى الألوان أولاً
    document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    
    if (colorBlindMode) {
      document.body.classList.add(colorBlindMode);
      localStorage.setItem('colorBlindMode', colorBlindMode);
    } else {
      localStorage.removeItem('colorBlindMode');
    }
  }, [colorBlindMode]);
  
  // تطبيق خط مساعد لذوي عسر القراءة
  useEffect(() => {
    if (dyslexicFont) {
      document.body.classList.add('dyslexic-font');
    } else {
      document.body.classList.remove('dyslexic-font');
    }
    
    localStorage.setItem('dyslexicFont', dyslexicFont.toString());
  }, [dyslexicFont]);
  
  // تطبيق دليل القراءة
  useEffect(() => {
    if (readingGuide) {
      document.body.classList.add('reading-guide');
      
      // إنشاء دليل القراءة إذا لم يكن موجودًا
      if (!document.getElementById('reading-guide-element')) {
        const guide = document.createElement('div');
        guide.id = 'reading-guide-element';
        guide.className = 'reading-guide-element';
        document.body.appendChild(guide);
        
        // تتبع مؤشر الماوس لتحريك دليل القراءة
        const handleMouseMove = (e: MouseEvent) => {
          guide.style.top = `${e.clientY}px`;
        };
        
        document.addEventListener('mousemove', handleMouseMove);
      }
    } else {
      document.body.classList.remove('reading-guide');
      
      // إزالة دليل القراءة
      const guide = document.getElementById('reading-guide-element');
      if (guide) {
        document.body.removeChild(guide);
        document.removeEventListener('mousemove', () => {});
      }
    }
    
    localStorage.setItem('readingGuide', readingGuide.toString());
  }, [readingGuide]);
  
  // تطبيق التعليقات الصوتية
  useEffect(() => {
    localStorage.setItem('soundFeedback', soundFeedback.toString());
    
    // المنطق الخاص بتفعيل/تعطيل التعليقات الصوتية
    if (soundFeedback) {
      // يمكن إضافة المزيد من المنطق هنا للتعليقات الصوتية
    }
  }, [soundFeedback]);
  
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
      
      // Alt + D لتبديل وضع خط عسر القراءة
      if (e.altKey && e.key === 'd') {
        setDyslexicFont(prev => !prev);
      }
      
      // Alt + R لتبديل وضع دليل القراءة
      if (e.altKey && e.key === 'r') {
        setReadingGuide(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // حفظ واستيراد إعدادات إمكانية الوصول
  const saveA11yProfile = (profileName: string) => {
    const profile: A11ySettings = {
      highContrast,
      largeText,
      reducedMotion,
      focusMode,
      colorBlindMode,
      dyslexicFont,
      readingGuide,
      soundFeedback
    };
    
    const profiles = JSON.parse(localStorage.getItem('a11yProfiles') || '{}');
    profiles[profileName] = profile;
    localStorage.setItem('a11yProfiles', JSON.stringify(profiles));
    
    return profileName;
  };
  
  const loadA11yProfile = (profileName: string) => {
    const profiles = JSON.parse(localStorage.getItem('a11yProfiles') || '{}');
    const profile = profiles[profileName];
    
    if (profile) {
      setHighContrast(profile.highContrast);
      setLargeText(profile.largeText);
      setReducedMotion(profile.reducedMotion);
      setFocusMode(profile.focusMode);
      setColorBlindMode(profile.colorBlindMode);
      setDyslexicFont(profile.dyslexicFont);
      setReadingGuide(profile.readingGuide);
      setSoundFeedback(profile.soundFeedback);
      
      return true;
    }
    
    return false;
  };
  
  const getA11yProfiles = () => {
    return JSON.parse(localStorage.getItem('a11yProfiles') || '{}');
  };
  
  const exportA11ySettings = () => {
    const settings: A11ySettings = {
      highContrast,
      largeText,
      reducedMotion,
      focusMode,
      colorBlindMode,
      dyslexicFont,
      readingGuide,
      soundFeedback
    };
    
    const blob = new Blob([JSON.stringify(settings)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'a11y-settings.json';
    a.click();
    
    URL.revokeObjectURL(url);
  };
  
  const importA11ySettings = (file: File): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const settings: A11ySettings = JSON.parse(event.target?.result as string);
          
          setHighContrast(settings.highContrast);
          setLargeText(settings.largeText);
          setReducedMotion(settings.reducedMotion);
          setFocusMode(settings.focusMode);
          setColorBlindMode(settings.colorBlindMode);
          setDyslexicFont(settings.dyslexicFont);
          setReadingGuide(settings.readingGuide || false);
          setSoundFeedback(settings.soundFeedback || false);
          
          resolve(true);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('فشل قراءة الملف'));
      
      reader.readAsText(file);
    });
  };
  
  return {
    // الإعدادات الحالية
    highContrast,
    setHighContrast,
    largeText,
    setLargeText,
    reducedMotion,
    setReducedMotion,
    focusMode,
    setFocusMode,
    colorBlindMode,
    setColorBlindMode,
    dyslexicFont,
    setDyslexicFont,
    readingGuide,
    setReadingGuide,
    soundFeedback,
    setSoundFeedback,
    
    // وظائف إدارة الملف الشخصي
    saveA11yProfile,
    loadA11yProfile,
    getA11yProfiles,
    exportA11ySettings,
    importA11ySettings
  };
}
