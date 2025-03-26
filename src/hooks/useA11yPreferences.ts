
import { useState, useEffect } from 'react';
import { useA11y } from './useA11y';

export type AccessibilityProfile = {
  name: string;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  dyslexiaFont: boolean;
  textSpacing: boolean;
  underlineLinks: boolean;
  customCursor: boolean;
  invertColors: boolean;
  monochrome: boolean;
};

export function useA11yPreferences() {
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode 
  } = useA11y();
  
  const [dyslexiaFont, setDyslexiaFont] = useState(
    localStorage.getItem('dyslexiaFont') === 'true'
  );
  
  const [textSpacing, setTextSpacing] = useState(
    localStorage.getItem('textSpacing') === 'true'
  );
  
  const [underlineLinks, setUnderlineLinks] = useState(
    localStorage.getItem('underlineLinks') === 'true'
  );
  
  const [customCursor, setCustomCursor] = useState(
    localStorage.getItem('customCursor') === 'true'
  );
  
  const [invertColors, setInvertColors] = useState(
    localStorage.getItem('invertColors') === 'true'
  );
  
  const [monochrome, setMonochrome] = useState(
    localStorage.getItem('monochrome') === 'true'
  );
  
  const [savedProfiles, setSavedProfiles] = useState<AccessibilityProfile[]>([]);
  
  // تطبيق خط لمساعدة ذوي عسر القراءة
  useEffect(() => {
    if (dyslexiaFont) {
      document.body.classList.add('dyslexia-font');
    } else {
      document.body.classList.remove('dyslexia-font');
    }
    
    localStorage.setItem('dyslexiaFont', dyslexiaFont.toString());
  }, [dyslexiaFont]);
  
  // تطبيق تباعد النص المحسن
  useEffect(() => {
    if (textSpacing) {
      document.body.classList.add('text-spacing');
    } else {
      document.body.classList.remove('text-spacing');
    }
    
    localStorage.setItem('textSpacing', textSpacing.toString());
  }, [textSpacing]);
  
  // تطبيق تسطير الروابط
  useEffect(() => {
    if (underlineLinks) {
      document.body.classList.add('underline-links');
    } else {
      document.body.classList.remove('underline-links');
    }
    
    localStorage.setItem('underlineLinks', underlineLinks.toString());
  }, [underlineLinks]);
  
  // تطبيق المؤشر المخصص
  useEffect(() => {
    if (customCursor) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }
    
    localStorage.setItem('customCursor', customCursor.toString());
  }, [customCursor]);
  
  // تطبيق عكس الألوان
  useEffect(() => {
    if (invertColors) {
      document.body.classList.add('invert-colors');
    } else {
      document.body.classList.remove('invert-colors');
    }
    
    localStorage.setItem('invertColors', invertColors.toString());
  }, [invertColors]);
  
  // تطبيق وضع أحادي اللون
  useEffect(() => {
    if (monochrome) {
      document.body.classList.add('monochrome');
    } else {
      document.body.classList.remove('monochrome');
    }
    
    localStorage.setItem('monochrome', monochrome.toString());
  }, [monochrome]);
  
  // تحميل الملفات الشخصية المحفوظة
  useEffect(() => {
    const savedProfilesJson = localStorage.getItem('a11yProfiles');
    if (savedProfilesJson) {
      try {
        const profiles = JSON.parse(savedProfilesJson);
        setSavedProfiles(profiles);
      } catch (error) {
        console.error('Failed to parse saved accessibility profiles:', error);
      }
    }
  }, []);
  
  // حفظ الملف الشخصي الحالي
  const saveCurrentProfile = (name: string) => {
    const newProfile: AccessibilityProfile = {
      name,
      highContrast,
      largeText,
      reducedMotion,
      focusMode,
      dyslexiaFont,
      textSpacing,
      underlineLinks,
      customCursor,
      invertColors,
      monochrome
    };
    
    const updatedProfiles = [...savedProfiles.filter(p => p.name !== name), newProfile];
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('a11yProfiles', JSON.stringify(updatedProfiles));
    
    return newProfile;
  };
  
  // تطبيق ملف شخصي محفوظ
  const applyProfile = (profile: AccessibilityProfile) => {
    setHighContrast(profile.highContrast);
    setLargeText(profile.largeText);
    setReducedMotion(profile.reducedMotion);
    setFocusMode(profile.focusMode);
    setDyslexiaFont(profile.dyslexiaFont);
    setTextSpacing(profile.textSpacing);
    setUnderlineLinks(profile.underlineLinks);
    setCustomCursor(profile.customCursor);
    setInvertColors(profile.invertColors);
    setMonochrome(profile.monochrome);
  };
  
  // حذف ملف شخصي محفوظ
  const deleteProfile = (name: string) => {
    const updatedProfiles = savedProfiles.filter(p => p.name !== name);
    setSavedProfiles(updatedProfiles);
    localStorage.setItem('a11yProfiles', JSON.stringify(updatedProfiles));
  };
  
  // إعادة تعيين جميع الإعدادات
  const resetAllSettings = () => {
    setHighContrast(false);
    setLargeText(false);
    setReducedMotion(false);
    setFocusMode(false);
    setDyslexiaFont(false);
    setTextSpacing(false);
    setUnderlineLinks(false);
    setCustomCursor(false);
    setInvertColors(false);
    setMonochrome(false);
  };

  return {
    // الإعدادات الأساسية من useA11y
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    
    // الإعدادات المتقدمة الإضافية
    dyslexiaFont, setDyslexiaFont,
    textSpacing, setTextSpacing,
    underlineLinks, setUnderlineLinks,
    customCursor, setCustomCursor,
    invertColors, setInvertColors,
    monochrome, setMonochrome,
    
    // وظائف إدارة الملفات الشخصية
    savedProfiles,
    saveCurrentProfile,
    applyProfile,
    deleteProfile,
    resetAllSettings
  };
}
