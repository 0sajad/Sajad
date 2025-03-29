
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MissingTranslationDetector } from '@/utils/i18n/MissingTranslationDetector';
import { useAppState } from './state/use-app-state';

/**
 * خطاف للتحقق من صحة الترجمات وتسجيل المفاتيح المفقودة
 * يستخدم في وضع التطوير فقط
 */
export function useTranslationValidator() {
  const { i18n } = useTranslation();
  const isDeveloperMode = useAppState(state => state.preferences?.developerMode);
  
  // تهيئة كاشف الترجمات المفقودة
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    MissingTranslationDetector.init();
    
    // تسجيل الترجمات المفقودة
    const handleMissingKey = (lng: string, ns: string, key: string) => {
      MissingTranslationDetector.addMissingKey(lng, key);
      console.debug(`[i18n] Missing translation detected: ${lng}:${ns}:${key}`);
    };
    
    // إضافة مستمع للتقاط المفاتيح المفقودة
    i18n.on('missingKey', handleMissingKey);
    
    return () => {
      i18n.off('missingKey', handleMissingKey);
    };
  }, [i18n, isDeveloperMode]);
  
  /**
   * التحقق من وجود ترجمة لمفتاح معين
   * @param key مفتاح الترجمة
   * @param fallback النص الاحتياطي إذا لم يتم العثور على الترجمة
   */
  const validateKey = (key: string, fallback?: string): boolean => {
    if (!i18n.exists(key)) {
      const currentLanguage = i18n.language;
      if (isDeveloperMode && currentLanguage) {
        MissingTranslationDetector.addMissingKey(currentLanguage, key);
      }
      return false;
    }
    return true;
  };
  
  /**
   * مسح جميع المفاتيح المفقودة المسجلة
   */
  const clearMissingKeys = () => {
    if (isDeveloperMode) {
      MissingTranslationDetector.clearMissingKeys();
    }
  };
  
  return {
    validateKey,
    clearMissingKeys,
    getMissingKeys: MissingTranslationDetector.getMissingKeys,
    exportMissingKeys: MissingTranslationDetector.exportMissingKeys
  };
}
