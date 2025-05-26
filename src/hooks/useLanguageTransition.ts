
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../i18n';

export function useLanguageTransition() {
  const { i18n } = useTranslation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLanguageChange = async (langCode: string) => {
    if (langCode === i18n.language) return;
    
    setIsTransitioning(true);
    
    try {
      await changeLanguage(langCode);
      setTimeout(() => setIsTransitioning(false), 500);
    } catch (error) {
      console.error('Error changing language:', error);
      setIsTransitioning(false);
    }
  };

  return {
    isTransitioning,
    handleLanguageChange
  };
}
