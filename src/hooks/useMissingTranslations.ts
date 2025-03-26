
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

/**
 * هوك لتتبع مفاتيح الترجمة المفقودة
 */
export function useMissingTranslations() {
  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // إضافة مستمع للترجمات المفقودة
    const handleMissingKey = (lng: string, ns: string, key: string) => {
      setMissingKeys(prev => {
        if (!prev.includes(key)) {
          return [...prev, key];
        }
        return prev;
      });
    };
    
    i18n.on('missingKey', handleMissingKey);
    
    return () => {
      i18n.off('missingKey', handleMissingKey);
    };
  }, [i18n]);
  
  return {
    missingKeys,
    clearMissingKeys: () => setMissingKeys([])
  };
}
