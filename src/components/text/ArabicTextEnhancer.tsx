
import React, { ReactNode, useMemo } from 'react';
import { useArabicSupport } from '@/hooks/useArabicSupport';
import { useArabicText } from './ArabicTextProvider';

interface ArabicTextEnhancerProps {
  children: ReactNode;
  className?: string;
  numerals?: boolean;
  enhanceFormat?: boolean;
  autoDirection?: boolean;
}

/**
 * مكون لتحسين عرض النص العربي
 * يقوم بتطبيق تنسيق أفضل وتحسين عرض الأرقام والاتجاه
 */
export function ArabicTextEnhancer({
  children,
  className = '',
  numerals = true,
  enhanceFormat = true,
  autoDirection = true
}: ArabicTextEnhancerProps) {
  const { isArabic, formatNumber, formatArabicText, getDirectionByContent } = useArabicSupport();
  const { fontFamily } = useArabicText?.() || { fontFamily: 'default' };
  
  // تحويل النص العربي بالأرقام والتنسيق المحسن
  const enhancedText = useMemo(() => {
    if (!isArabic || typeof children !== 'string') {
      return children;
    }
    
    let result = children;
    
    // تطبيق تنسيق الأرقام العربية
    if (numerals) {
      result = result.replace(/\d+/g, match => formatNumber(parseInt(match, 10)));
    }
    
    // تطبيق تحسينات تنسيق النص العربي
    if (enhanceFormat) {
      result = formatArabicText(result);
    }
    
    return result;
  }, [children, isArabic, numerals, enhanceFormat, formatNumber, formatArabicText]);
  
  // اكتشاف الاتجاه تلقائيًا
  const textDir = useMemo(() => {
    if (!autoDirection || typeof children !== 'string') {
      return undefined;
    }
    
    return getDirectionByContent(children);
  }, [children, autoDirection, getDirectionByContent]);
  
  // تطبيق الفئات CSS المناسبة
  const arabicClasses = useMemo(() => {
    if (!isArabic) return className;
    
    const fontClass = fontFamily === 'default' ? '' : `font-${fontFamily}`;
    return `${className} ${fontClass} arabic-text`.trim();
  }, [className, isArabic, fontFamily]);
  
  return (
    <span className={arabicClasses} dir={textDir}>
      {enhancedText}
    </span>
  );
}
