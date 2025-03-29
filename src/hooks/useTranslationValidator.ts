
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { i18n } from '../i18n';
import { useAppState } from './state/use-app-state';

/**
 * خطاف للتحقق من مفاتيح الترجمة المفقودة والإبلاغ عنها
 * يساعد في اكتشاف المفاتيح غير المترجمة أثناء التطوير
 */
export function useTranslationValidator() {
  const { i18n } = useTranslation();
  const [missingKeys, setMissingKeys] = useState<Record<string, string[]>>({});
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);
  
  // فقط تفعيل هذه الوظيفة في وضع المطور
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    const originalT = i18n.t.bind(i18n);
    const trackedMissingKeys: Record<string, string[]> = {};
    
    // إنشاء دالة t معدلة للكشف عن المفاتيح المفقودة
    i18n.t = function(key: any, options?: any) {
      const result = originalT(key, options);
      
      // إذا كانت النتيجة هي المفتاح نفسه، فهذا يعني أن الترجمة مفقودة
      if (typeof key === 'string' && result === key) {
        const language = i18n.language || 'unknown';
        
        if (!trackedMissingKeys[language]) {
          trackedMissingKeys[language] = [];
        }
        
        if (!trackedMissingKeys[language].includes(key)) {
          trackedMissingKeys[language].push(key);
          setMissingKeys({ ...trackedMissingKeys });
          
          // لوج في وحدة التحكم للمطورين
          console.warn(`Missing translation for key [${key}] in language [${language}]`);
        }
      }
      
      return result;
    };
    
    // ترجع الدالة t الأصلية عند تفكيك المكون
    return () => {
      i18n.t = originalT;
    };
  }, [i18n, isDeveloperMode]);
  
  /**
   * يحصل على جميع المفاتيح من كائن الترجمة بشكل تكراري
   */
  const extractAllTranslationKeys = (obj: any, prefix = ''): string[] => {
    let keys: string[] = [];
    
    for (const key in obj) {
      const currentKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        keys = [...keys, ...extractAllTranslationKeys(obj[key], currentKey)];
      } else {
        keys.push(currentKey);
      }
    }
    
    return keys;
  };
  
  /**
   * مقارنة مفاتيح الترجمة بين لغتين
   */
  const compareLanguageKeys = (sourceLanguage: string, targetLanguage: string): string[] => {
    try {
      const allResources = i18n.options.resources || {};
      const sourceKeys = extractAllTranslationKeys(allResources[sourceLanguage]);
      const targetKeys = extractAllTranslationKeys(allResources[targetLanguage]);
      
      // إيجاد المفاتيح الموجودة في sourceLanguage ولكن مفقودة في targetLanguage
      return sourceKeys.filter(key => !targetKeys.includes(key));
    } catch (error) {
      console.error('Error comparing language keys:', error);
      return [];
    }
  };
  
  /**
   * تصدير ملف JSON للمفاتيح المفقودة (فقط للتطوير)
   */
  const exportMissingKeys = () => {
    if (!isDeveloperMode) return;
    
    const missingKeysBlob = new Blob(
      [JSON.stringify(missingKeys, null, 2)], 
      { type: 'application/json' }
    );
    
    const url = URL.createObjectURL(missingKeysBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'missing_translation_keys.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return {
    missingKeys,
    compareLanguageKeys,
    exportMissingKeys
  };
}
