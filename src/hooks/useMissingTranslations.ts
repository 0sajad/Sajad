
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * هوك لتتبع مفاتيح الترجمة المفقودة في التطبيق
 */
export const useMissingTranslations = () => {
  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const handleMissingKey = (key: string) => {
      setMissingKeys(prev => {
        if (prev.includes(key)) {
          return prev;
        }
        return [...prev, key];
      });
    };

    // إضافة مستمع لحدث مفتاح الترجمة المفقود
    const originalMissingKeyHandler = i18n.options.missingKeyHandler;
    
    i18n.options.missingKeyHandler = (lng, ns, key) => {
      handleMissingKey(`${ns}:${key}`);
      if (originalMissingKeyHandler) {
        originalMissingKeyHandler(lng, ns, key);
      }
    };

    return () => {
      // إعادة المعالج الأصلي عند تفكيك الهوك
      i18n.options.missingKeyHandler = originalMissingKeyHandler;
    };
  }, [i18n]);

  const clearMissingKeys = () => {
    setMissingKeys([]);
  };

  const generateTranslationTemplate = () => {
    const template: Record<string, string> = {};
    
    missingKeys.forEach(fullKey => {
      const [namespace, key] = fullKey.split(':');
      
      if (!template[namespace]) {
        template[namespace] = {};
      }
      
      template[namespace][key] = '';
    });
    
    return JSON.stringify(template, null, 2);
  };

  return {
    missingKeys,
    clearMissingKeys,
    generateTranslationTemplate,
    hasErrors: missingKeys.length > 0
  };
};

export default useMissingTranslations;
