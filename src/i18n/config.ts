import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { resources } from './resources';

const getLanguageDirection = (language: string) => {
  return ['ar', 'ar-iq'].includes(language) ? 'rtl' : 'ltr';
};

const getIraqiArabicFallbacks = () => {
  const result: Record<string, string> = {};
  
  if (resources && resources['ar-iq'] && resources.ar) {
    const iraqiTranslations = resources['ar-iq'].translation;
    const standardArabicTranslations = resources.ar.translation;
    
    if (iraqiTranslations && standardArabicTranslations) {
      Object.keys(standardArabicTranslations).forEach(key => {
        if (!iraqiTranslations[key]) {
          result[key] = standardArabicTranslations[key];
        }
      });
    }
  }
  
  return result;
};

const getDefaultNamespace = () => {
  return 'translation';
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'customDetector',
  lookup: () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      return savedLanguage;
    }
    
    const browserLanguage = navigator.language;
    if (browserLanguage.startsWith('ar')) {
      if (browserLanguage.includes('iq')) {
        return 'ar-iq';
      }
      return 'ar';
    }
    
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
    ns: ['translation', 'common', 'network', 'dashboard', 'ai', 'aiAssistant', 'aiFeatures', 'helpCenter', 'communicationTools'],
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
  
  const namespaces = i18n.options.ns;
  if (namespaces) {
    if (Array.isArray(namespaces)) {
      namespaces.forEach((ns) => {
        const namespace = String(ns);
        
        if (language === 'ar-iq') {
          const fallbacks = getIraqiArabicFallbacks();
          Object.keys(fallbacks).forEach(key => {
            const keyPath = `${namespace}:${key}`;
            if (!i18n.exists(keyPath, { lng: 'ar-iq' })) {
              const fallbackValue = i18n.t(keyPath, { lng: 'ar' });
              i18n.addResource('ar-iq', namespace, key, fallbackValue);
            }
          });
        }
      });
    } else {
      const namespace = String(namespaces);
      if (language === 'ar-iq') {
        const fallbacks = getIraqiArabicFallbacks();
        Object.keys(fallbacks).forEach(key => {
          const keyPath = `${namespace}:${key}`;
          if (!i18n.exists(keyPath, { lng: 'ar-iq' })) {
            const fallbackValue = i18n.t(keyPath, { lng: 'ar' });
            i18n.addResource('ar-iq', namespace, key, fallbackValue);
          }
        });
      }
    }
  }
  
  document.dispatchEvent(new CustomEvent('languageFullyChanged', { 
    detail: { language }
  }));
});

export default i18n;
