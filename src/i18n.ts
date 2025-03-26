import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './i18n/resources';

const getLanguageDirection = (language: string): 'rtl' | 'ltr' => {
  return ['ar', 'ar-iq'].includes(language) ? 'rtl' : 'ltr';
};

const getDefaultNamespace = () => {
  return 'translation';
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'customDetector',
  lookup: () => {
    // Check for manually set language first
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      return savedLanguage;
    }
    
    // Otherwise use browser language
    const browserLanguage = navigator.language;
    if (browserLanguage.startsWith('ar')) {
      // Check if it's Iraqi Arabic dialect
      if (browserLanguage.includes('iq')) {
        return 'ar-iq';
      }
      // Default to Standard Arabic
      return 'ar';
    }
    
    // Default to English
    return 'en';
  }
});

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'en',
    debug: false,
    ns: [
      'translation',
      'common',
      'network',
      'dashboard',
      'ai',
      'aiAssistant',
      'aiFeatures',
      'helpCenter',
      'communicationTools',
      'networkTools',
      'settings',
      'securityStatus'
    ],
    defaultNS: getDefaultNamespace(),
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true
    }
  });

i18n.on('languageChanged', (language) => {
  document.documentElement.setAttribute('dir', getLanguageDirection(language));
  document.documentElement.setAttribute('lang', language);

  // Trigger a custom event once language is fully changed and applied
  document.dispatchEvent(
    new CustomEvent('languageFullyChanged', {
      detail: { language }
    })
  );
});

export default i18n;
