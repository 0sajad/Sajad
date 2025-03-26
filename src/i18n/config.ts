
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import * as enTranslation from '../locales/en/translation.json';
import * as enCommon from '../locales/en/common.json';
import * as enNetwork from '../locales/en/network.json';
import * as enDashboard from '../locales/en/dashboard.json';
import * as enAi from '../locales/en/ai.json';
import * as enAiAssistant from '../locales/en/aiAssistant.json';
import * as enAiFeatures from '../locales/en/aiFeatures.json';
import * as enHelpCenter from '../locales/en/helpCenter.json';
import * as enCommunicationTools from '../locales/en/communicationTools.json';
import * as arTranslation from '../locales/ar/translation.json';
import * as arCommon from '../locales/ar/common.json';
import * as arNetwork from '../locales/ar/network.json';
import * as arDashboard from '../locales/ar/dashboard.json';
import * as arAi from '../locales/ar/ai.json';
import * as arAiAssistant from '../locales/ar/aiAssistant.json';
import * as arAiFeatures from '../locales/ar/aiFeatures.json';
import * as arHelpCenter from '../locales/ar/helpCenter.json';
import * as arCommunicationTools from '../locales/ar/communicationTools.json';
import * as arIqTranslation from '../locales/ar-iq/translation.json';
import * as arIqCommon from '../locales/ar-iq/common.json';
import * as arIqNetwork from '../locales/ar-iq/network.json';
import * as arIqDashboard from '../locales/ar-iq/dashboard.json';
import * as arIqAi from '../locales/ar-iq/ai.json';
import * as arIqAiAssistant from '../locales/ar-iq/aiAssistant.json';
import * as arIqAiFeatures from '../locales/ar-iq/aiFeatures.json';
import * as arIqHelpCenter from '../locales/ar-iq/helpCenter.json';
import * as arIqCommunicationTools from '../locales/ar-iq/communicationTools.json';

export const resources = {
  en: {
    translation: enTranslation,
    common: enCommon,
    network: enNetwork,
    dashboard: enDashboard,
    ai: enAi,
    aiAssistant: enAiAssistant,
    aiFeatures: enAiFeatures,
    helpCenter: enHelpCenter,
    communicationTools: enCommunicationTools
  },
  ar: {
    translation: arTranslation,
    common: arCommon,
    network: arNetwork,
    dashboard: arDashboard,
    ai: arAi,
    aiAssistant: arAiAssistant,
    aiFeatures: arAiFeatures,
    helpCenter: arHelpCenter,
    communicationTools: arCommunicationTools
  },
  'ar-iq': {
    translation: arIqTranslation,
    common: arIqCommon,
    network: arIqNetwork,
    dashboard: arIqDashboard,
    ai: arIqAi,
    aiAssistant: arIqAiAssistant,
    aiFeatures: arIqAiFeatures,
    helpCenter: arIqHelpCenter,
    communicationTools: arIqCommunicationTools
  }
};

const getLanguageDirection = (language: string) => {
  return ['ar', 'ar-iq'].includes(language) ? 'rtl' : 'ltr';
};

const getIraqiArabicFallbacks = () => {
  const result: Record<string, string> = {};
  
  Object.keys(arIqTranslation).forEach(key => {
    if (!arIqTranslation[key as keyof typeof arIqTranslation]) {
      result[key] = arTranslation[key as keyof typeof arTranslation];
    }
  });
  
  return result;
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
  
  // Fix for the TypeScript error: Properly handle the namespaces array
  const namespaces = i18n.options.ns;
  if (namespaces) {
    if (Array.isArray(namespaces)) {
      // Handle each namespace individually
      namespaces.forEach((ns) => {
        // Convert to string explicitly to fix TypeScript error
        const namespace = String(ns);
        
        if (language === 'ar-iq') {
          const fallbacks = getIraqiArabicFallbacks();
          Object.keys(fallbacks).forEach(key => {
            const keyPath = `${namespace}:${key}`;
            // Check if the key exists in ar-iq
            if (!i18n.exists(keyPath, { lng: 'ar-iq' })) {
              // Get the value from standard Arabic as fallback
              const fallbackValue = i18n.t(keyPath, { lng: 'ar' });
              // Add it to ar-iq resources
              i18n.addResource('ar-iq', namespace, key, fallbackValue);
            }
          });
        }
      });
    } else {
      // Handle if namespaces is a single string
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
  
  // Trigger a custom event once language is fully changed and applied
  document.dispatchEvent(new CustomEvent('languageFullyChanged', { 
    detail: { language }
  }));
});

export default i18n;
