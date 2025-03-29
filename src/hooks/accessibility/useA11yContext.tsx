
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useA11y } from '../useA11y';
import { useAppState } from '../state/use-app-state';

interface A11yContextType {
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  playSound: (sound: 'success' | 'error' | 'warning' | 'info' | 'notification') => void;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  dyslexicFont: boolean;
  colorBlindMode: string;
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setDyslexicFont: (value: boolean) => void;
  setColorBlindMode: (value: string) => void;
}

const A11yContext = createContext<A11yContextType | null>(null);

/**
 * استخدام سياق إمكانية الوصول في المكونات
 */
export const useA11yContext = () => {
  const context = useContext(A11yContext);
  if (!context) {
    throw new Error('useA11yContext must be used within an A11yProvider');
  }
  return context;
};

interface A11yProviderProps {
  children: ReactNode;
}

/**
 * مزود سياق إمكانية الوصول - يوفر وظائف وحالة إمكانية الوصول لكافة المكونات
 */
export const A11yProvider: React.FC<A11yProviderProps> = ({ children }) => {
  const a11y = useA11y();
  const {
    highContrast,
    largeText,
    reducedMotion,
    dyslexicFont,
    colorBlindMode,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setDyslexicFont,
    setColorBlindMode
  } = useAppState(state => ({
    highContrast: state.highContrast,
    largeText: state.largeText,
    reducedMotion: state.reducedMotion,
    dyslexicFont: state.dyslexicFont,
    colorBlindMode: state.colorBlindMode,
    setHighContrast: state.setHighContrast,
    setLargeText: state.setLargeText,
    setReducedMotion: state.setReducedMotion,
    setDyslexicFont: state.setDyslexicFont,
    setColorBlindMode: state.setColorBlindMode
  }));
  
  // إعلانات متاحة عالميًا للقارئات الشاشية
  const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (a11y?.announce) {
      a11y.announce(message, politeness);
    } else if (typeof window !== 'undefined' && typeof window.announce === 'function') {
      window.announce(message, politeness);
    } else {
      console.log(`${politeness.toUpperCase()} ANNOUNCEMENT: ${message}`);
    }
  };
  
  // تشغيل أصوات الإخطارات
  const playSound = (sound: 'success' | 'error' | 'warning' | 'info' | 'notification') => {
    if (a11y?.playNotificationSound) {
      a11y.playNotificationSound(sound);
    }
  };
  
  // تطبيق تأثيرات إمكانية الوصول على المستند
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    document.documentElement.classList.toggle('large-text', largeText);
    document.documentElement.classList.toggle('reduced-motion', reducedMotion);
    document.documentElement.classList.toggle('dyslexic-font', dyslexicFont);
    
    // إزالة جميع أنماط المرشح الحالية
    document.documentElement.classList.remove(
      'protanopia',
      'deuteranopia',
      'tritanopia',
      'achromatopsia'
    );
    
    // تطبيق فلتر عمى الألوان المحدد
    if (colorBlindMode !== 'none') {
      document.documentElement.classList.add(colorBlindMode);
    }
    
    return () => {
      // تنظيف الفئات عند تفكيك المكون
      document.documentElement.classList.remove(
        'high-contrast',
        'large-text',
        'reduced-motion',
        'dyslexic-font',
        'protanopia',
        'deuteranopia',
        'tritanopia',
        'achromatopsia'
      );
    };
  }, [highContrast, largeText, reducedMotion, dyslexicFont, colorBlindMode]);
  
  const value = {
    announce,
    playSound,
    highContrast,
    largeText,
    reducedMotion,
    dyslexicFont,
    colorBlindMode,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setDyslexicFont,
    setColorBlindMode
  };
  
  return (
    <A11yContext.Provider value={value}>
      {children}
    </A11yContext.Provider>
  );
};
