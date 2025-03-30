
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAppState } from '@/hooks/state';
import { useArabicSupport } from '@/hooks/useArabicSupport';

interface ArabicTextContextType {
  isArabic: boolean;
  formatNumber: (num: number, useArabicNumerals?: boolean) => string;
  fontFamily: string;
  lineHeight: number;
  letterSpacing: number;
  kashidaEnabled: boolean;
  direction: 'rtl' | 'ltr';
  setFontFamily: (family: string) => void;
  setLineHeight: (height: number) => void;
  setLetterSpacing: (spacing: number) => void;
  setKashidaEnabled: (enabled: boolean) => void;
}

const ArabicTextContext = createContext<ArabicTextContextType | null>(null);

export const useArabicText = () => {
  const context = useContext(ArabicTextContext);
  if (!context) {
    throw new Error('useArabicText must be used within an ArabicTextProvider');
  }
  return context;
};

interface ArabicTextProviderProps {
  children: ReactNode;
}

export function ArabicTextProvider({ children }: ArabicTextProviderProps) {
  const { isArabic, formatNumber, direction } = useArabicSupport();
  const preferences = useAppState(state => state.preferences || {});
  
  // إعدادات النص العربي
  const [fontFamily, setFontFamily] = useState<string>(localStorage.getItem('arabic_font_family') || 'default');
  const [lineHeight, setLineHeight] = useState<number>(parseFloat(localStorage.getItem('arabic_line_height') || '1.6'));
  const [letterSpacing, setLetterSpacing] = useState<number>(parseFloat(localStorage.getItem('arabic_letter_spacing') || '0.5'));
  const [kashidaEnabled, setKashidaEnabled] = useState<boolean>(localStorage.getItem('arabic_kashida_enabled') === 'true');

  // حفظ الإعدادات في التخزين المحلي عند تغييرها
  useEffect(() => {
    localStorage.setItem('arabic_font_family', fontFamily);
    localStorage.setItem('arabic_line_height', lineHeight.toString());
    localStorage.setItem('arabic_letter_spacing', letterSpacing.toString());
    localStorage.setItem('arabic_kashida_enabled', kashidaEnabled.toString());
  }, [fontFamily, lineHeight, letterSpacing, kashidaEnabled]);

  // تطبيق الإعدادات على مستوى المستند عندما تكون اللغة العربية نشطة
  useEffect(() => {
    if (isArabic) {
      let fontFamilyValue = '';
      switch (fontFamily) {
        case 'traditional':
          fontFamilyValue = "'Amiri', 'Scheherazade New', serif";
          break;
        case 'modern':
          fontFamilyValue = "'Tajawal', 'IBM Plex Sans Arabic', sans-serif";
          break;
        case 'simplified':
          fontFamilyValue = "'Noto Sans Arabic', 'Cairo', sans-serif";
          break;
        default:
          fontFamilyValue = "'Tajawal', sans-serif";
      }

      // إنشاء عنصر <style> لتطبيق الإعدادات
      const styleElement = document.createElement('style');
      styleElement.id = 'arabic-text-settings';
      styleElement.textContent = `
        :root {
          --arabic-font-family: ${fontFamilyValue};
          --arabic-line-height: ${lineHeight};
          --arabic-letter-spacing: ${letterSpacing}px;
        }
        
        [dir="rtl"] {
          font-family: var(--arabic-font-family);
          line-height: var(--arabic-line-height);
          letter-spacing: var(--arabic-letter-spacing);
        }
        
        ${kashidaEnabled ? `
        [dir="rtl"] p, 
        [dir="rtl"] .text-justify {
          text-align: justify;
          text-justify: kashida;
        }` : ''}
      `;

      document.head.appendChild(styleElement);

      return () => {
        const existingStyle = document.getElementById('arabic-text-settings');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, [isArabic, fontFamily, lineHeight, letterSpacing, kashidaEnabled]);

  const value: ArabicTextContextType = {
    isArabic,
    formatNumber,
    fontFamily,
    lineHeight,
    letterSpacing,
    kashidaEnabled,
    direction: direction as 'rtl' | 'ltr',
    setFontFamily,
    setLineHeight,
    setLetterSpacing,
    setKashidaEnabled
  };

  return (
    <ArabicTextContext.Provider value={value}>
      {children}
    </ArabicTextContext.Provider>
  );
}
