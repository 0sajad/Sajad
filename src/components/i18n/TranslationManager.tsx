
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppState } from '@/hooks/state/use-app-state';
import { MissingTranslationDetector } from '@/utils/i18n/MissingTranslationDetector';

/**
 * مدير الترجمات - يقوم بتهيئة ومراقبة ترجمات التطبيق
 * يتم استخدامه داخل DevelopmentTools
 */
export function TranslationManager() {
  const { i18n } = useTranslation();
  const isDeveloperMode = useAppState(state => state.preferences?.developerMode);
  
  // تهيئة كاشف الترجمات المفقودة
  useEffect(() => {
    if (isDeveloperMode) {
      MissingTranslationDetector.init();
    }
  }, [isDeveloperMode]);

  // تسجيل الترجمات المفقودة
  useEffect(() => {
    if (!isDeveloperMode) return;

    const handleMissingKey = (lng: string, ns: string, key: string) => {
      MissingTranslationDetector.addMissingKey(lng, key);
      console.debug(`[i18n] Missing translation: ${lng}:${ns}:${key}`);
    };

    i18n.on('missingKey', handleMissingKey);
    
    return () => {
      i18n.off('missingKey', handleMissingKey);
    };
  }, [i18n, isDeveloperMode]);

  // هذا المكون لا يرسم أي شيء، فهو مكون منطقي فقط
  return null;
}
