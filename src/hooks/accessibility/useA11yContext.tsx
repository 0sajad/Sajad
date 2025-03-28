
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useA11y } from '../useA11y';
import { useAppState } from '../state/use-app-state';
import { ColorBlindMode } from './useA11yColor';

interface A11yContextProps {
  // حالة ميزات إمكانية الوصول
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  colorBlindMode: ColorBlindMode;
  dyslexicFont: boolean;
  readingGuide: boolean;
  soundFeedback: boolean;
  keyboardNavigationVisible: boolean;
  
  // وظائف التحكم
  setHighContrast: (value: boolean) => void;
  setLargeText: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setFocusMode: (value: boolean) => void;
  setColorBlindMode: (value: ColorBlindMode) => void;
  setDyslexicFont: (value: boolean) => void;
  setReadingGuide: (value: boolean) => void;
  setSoundFeedback: (value: boolean) => void;
  setKeyboardNavigationVisible: (value: boolean) => void;
  
  // وظائف المساعدة
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  playNotificationSound: (type: 'success' | 'error' | 'warning' | 'info' | 'notification') => void;
  
  // وظائف التبديل
  toggleHighContrast: () => void;
  toggleLargeText: () => void;
  toggleReducedMotion: () => void;
  toggleFocusMode: () => void;
  toggleDyslexicFont: () => void;
  toggleReadingGuide: () => void;
  toggleSoundFeedback: () => void;
}

// إنشاء السياق
const A11yContext = createContext<A11yContextProps | undefined>(undefined);

// خطاف لاستخدام السياق
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

// مزود السياق
export const A11yProvider: React.FC<A11yProviderProps> = ({ children }) => {
  const a11y = useA11y();
  const setPreference = useAppState(state => state.setPreference);
  
  // حفظ التغييرات في تخزين الحالة
  useEffect(() => {
    setPreference('highContrast', a11y.highContrast);
    setPreference('largeText', a11y.largeText);
    setPreference('reducedMotion', a11y.reducedMotion);
    setPreference('focusMode', a11y.focusMode);
    // لا نحفظ colorBlindMode هنا لأنه ليس boolean
    setPreference('dyslexicFont', a11y.dyslexicFont);
    setPreference('readingGuide', a11y.readingGuide);
    setPreference('soundFeedback', a11y.soundFeedback);
  }, [
    a11y.highContrast,
    a11y.largeText,
    a11y.reducedMotion,
    a11y.focusMode,
    a11y.dyslexicFont,
    a11y.readingGuide,
    a11y.soundFeedback,
    setPreference
  ]);
  
  // حفظ colorBlindMode عند تغييره
  useEffect(() => {
    setPreference('colorBlindMode', a11y.colorBlindMode);
  }, [a11y.colorBlindMode, setPreference]);
  
  // إضافة وظائف التبديل
  const toggleHighContrast = () => a11y.setHighContrast(!a11y.highContrast);
  const toggleLargeText = () => a11y.setLargeText(!a11y.largeText);
  const toggleReducedMotion = () => a11y.setReducedMotion(!a11y.reducedMotion);
  const toggleFocusMode = () => a11y.setFocusMode(!a11y.focusMode);
  const toggleDyslexicFont = () => a11y.setDyslexicFont(!a11y.dyslexicFont);
  const toggleReadingGuide = () => a11y.setReadingGuide(!a11y.readingGuide);
  const toggleSoundFeedback = () => a11y.setSoundFeedback(!a11y.soundFeedback);
  
  const value: A11yContextProps = {
    ...a11y,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleFocusMode,
    toggleDyslexicFont,
    toggleReadingGuide,
    toggleSoundFeedback
  };
  
  return (
    <A11yContext.Provider value={value}>
      {children}
    </A11yContext.Provider>
  );
};
