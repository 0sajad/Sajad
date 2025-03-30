
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { MissingTranslationDetector } from '@/utils/i18n/MissingTranslationDetector';

export function useTranslationValidator() {
  const { i18n } = useTranslation();
  const [missingKeys, setMissingKeys] = useState<Record<string, string[]>>({});
  
  // Initialize the detector
  useEffect(() => {
    MissingTranslationDetector.init();
  }, []);
  
  // Get missing keys
  const getMissingTranslations = useCallback(() => {
    const keys = MissingTranslationDetector.getMissingKeys();
    setMissingKeys(keys);
    return keys;
  }, []);
  
  // Clear missing keys
  const clearMissingTranslations = useCallback(() => {
    MissingTranslationDetector.clearMissingKeys();
    setMissingKeys({});
  }, []);
  
  // Scan the page for potential untranslated texts
  const scanPageForUntranslated = useCallback(() => {
    return MissingTranslationDetector.scanPageForUntranslated();
  }, []);
  
  // Export missing keys as JSON
  const exportMissingKeys = useCallback(() => {
    return MissingTranslationDetector.exportMissingKeys();
  }, []);
  
  return {
    missingKeys,
    getMissingTranslations,
    clearMissingTranslations,
    scanPageForUntranslated,
    exportMissingKeys,
    currentLanguage: i18n.language
  };
}
