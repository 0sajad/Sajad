
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
    
    // تصحيح نوع المعاملات للتوافق مع i18next
    i18n.options.missingKeyHandler = (languages: string[], namespace: string, key: string, res: string, options: any, updateMissing: boolean) => {
      handleMissingKey(`${namespace}:${key}`);
      if (originalMissingKeyHandler) {
        originalMissingKeyHandler(languages, namespace, key, res, options, updateMissing);
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
    const template: Record<string, Record<string, string>> = {};
    
    missingKeys.forEach(fullKey => {
      const [namespace, key] = fullKey.split(':');
      
      if (!template[namespace]) {
        template[namespace] = {};
      }
      
      template[namespace][key] = '';
    });
    
    return JSON.stringify(template, null, 2);
  };

  // إضافة وظيفة فحص الصفحة بحثًا عن ترجمات مفقودة
  const scanPageForMissingTranslations = () => {
    const results = {
      hardcodedTexts: [] as Array<{text: string, element: HTMLElement}>
    };
    
    // استبعاد بعض العناصر من الفحص (مثل السكريبت، الأنماط، إلخ)
    const excludedTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE'];
    
    // الوظيفة التي تفحص العقدة وأبنائها
    const scanNode = (node: Node) => {
      // تخطي العقد النصية الفارغة أو التي تحتوي على مسافات فقط
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent?.trim();
        if (textContent && textContent.length > 3) {
          const parentElement = node.parentElement;
          
          if (parentElement && 
              !excludedTags.includes(parentElement.tagName) && 
              !parentElement.hasAttribute('data-i18n-ignore')) {
            
            results.hardcodedTexts.push({
              text: textContent,
              element: parentElement
            });
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // تخطي العناصر المستبعدة
        const element = node as HTMLElement;
        if (excludedTags.includes(element.tagName)) {
          return;
        }
        
        // فحص العقد الفرعية
        node.childNodes.forEach(scanNode);
      }
    };
    
    // بدء الفحص من جسم المستند
    scanNode(document.body);
    
    return results;
  };

  return {
    missingKeys,
    clearMissingKeys,
    generateTranslationTemplate,
    scanPageForMissingTranslations,
    hasErrors: missingKeys.length > 0
  };
};

export default useMissingTranslations;
