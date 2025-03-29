
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook for RTL support and helpers
 */
export function useRTLSupport() {
  const { i18n } = useTranslation();
  const [didMount, setDidMount] = useState(false);
  
  // Check if current language is RTL
  const isRTL = useMemo(() => {
    return i18n.language?.startsWith('ar') || i18n.language?.startsWith('he') || false;
  }, [i18n.language]);
  
  // Apply RTL/LTR direction to text
  const formatTextDirection = useCallback((text: string, forceRTL = false, forceLTR = false) => {
    if (!text) return '';
    
    if (forceRTL) {
      return `\u202B${text}\u202C`; // RLE + text + PDF
    } else if (forceLTR) {
      return `\u202A${text}\u202C`; // LRE + text + PDF
    } else if (isRTL) {
      // If in RTL mode and text starts with LTR characters, wrap in LRE
      const startsWithLTR = /^[A-Za-z0-9]/.test(text);
      if (startsWithLTR) {
        return `\u202A${text}\u202C`;
      }
    }
    
    return text;
  }, [isRTL]);
  
  // Reverse array items if in RTL mode
  const reverseIfRTL = useCallback(<T,>(array: T[]): T[] => {
    if (!isRTL) return [...array];
    return [...array].reverse();
  }, [isRTL]);
  
  // Apply either RTL or LTR value based on current direction
  const applyDirectionalValue = useCallback(<T,>(rtlValue: T, ltrValue: T): T => {
    return isRTL ? rtlValue : ltrValue;
  }, [isRTL]);
  
  // Apply RTL order to array of objects (useful for tab lists, menu items, etc.)
  const applyRTLOrder = useCallback(<T,>(array: T[]): T[] => {
    if (!isRTL) return array;
    return [...array].reverse();
  }, [isRTL]);
  
  // Set page direction on mount
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    setDidMount(true);
  }, [isRTL]);
  
  return {
    isRTL,
    didMount,
    formatTextDirection,
    reverseIfRTL,
    applyDirectionalValue,
    applyRTLOrder
  };
}
