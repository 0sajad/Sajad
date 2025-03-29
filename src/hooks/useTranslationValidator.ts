
import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from './state/use-app-state';
import { MissingTranslationDetector } from '@/utils/i18n/MissingTranslationDetector';

/**
 * خطاف للتحقق من الترجمات المفقودة وتوفير أدوات لإدارتها
 */
export function useTranslationValidator() {
  const { i18n, t } = useTranslation();
  const isDeveloperMode = useAppState(state => state.preferences.developerMode);
  const [missingKeys, setMissingKeys] = useState<Record<string, string[]>>({});
  
  // تهيئة كاشف الترجمات المفقودة
  useEffect(() => {
    if (isDeveloperMode) {
      MissingTranslationDetector.init();
    }
  }, [isDeveloperMode]);
  
  // جلب المفاتيح المفقودة من الكاشف
  const updateMissingKeys = useCallback(() => {
    if (!isDeveloperMode) return;
    setMissingKeys(MissingTranslationDetector.getMissingKeys());
  }, [isDeveloperMode]);
  
  // مراقبة الترجمات المفقودة
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    // تسجيل المفاتيح المفقودة
    const onMissingKey = (lng: string, ns: string, key: string) => {
      updateMissingKeys();
      console.debug(`[i18n] Missing translation: ${lng}:${ns}:${key}`);
    };
    
    i18n.on('missingKey', onMissingKey);
    
    // تنظيف عند تفكيك المكون
    return () => {
      i18n.off('missingKey', onMissingKey);
    };
  }, [i18n, isDeveloperMode, updateMissingKeys]);
  
  // تحديث المفاتيح المفقودة دوريًا
  useEffect(() => {
    if (!isDeveloperMode) return;
    
    // التحديث الأولي
    updateMissingKeys();
    
    // تحديث دوري
    const interval = setInterval(updateMissingKeys, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, [isDeveloperMode, updateMissingKeys]);
  
  // مسح المفاتيح المفقودة
  const clearMissingKeys = () => {
    MissingTranslationDetector.clearMissingKeys();
    setMissingKeys({});
  };
  
  // فحص الصفحة للمفاتيح المفقودة
  const scanPageForMissingTranslations = () => {
    return MissingTranslationDetector.scanPageForUntranslated();
  };
  
  // تصدير المفاتيح المفقودة
  const exportMissingKeys = () => {
    const exportedData = MissingTranslationDetector.exportMissingKeys();
    
    // إنشاء ملف للتنزيل
    const blob = new Blob([exportedData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'missing-translations.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return {
    missingKeys,
    clearMissingKeys,
    scanPageForMissingTranslations,
    exportMissingKeys
  };
}
