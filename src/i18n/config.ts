
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language loaders
import { loadEnglishResources } from './languages/en';
import { loadArabicResources } from './languages/ar';
import { loadIraqiArabicResources } from './languages/ar-iq';
import { loadJapaneseResources } from './languages/ja';
import { loadFrenchResources } from './languages/fr';
import { loadChineseResources } from './languages/zh';

const SUPPORTED_LANGUAGES = ['en', 'ar', 'ar-iq', 'ja', 'fr', 'zh'];
const FALLBACK_LANGUAGES: { [key: string]: string } = {
  'ar-iq': 'ar',
};
const DEFAULT_LANGUAGE = 'en';

const normalizeLanguage = (code: string) => code.split('-')[0];

// Load all resources using the language loader functions
const resources = {
  en: loadEnglishResources(),
  ar: loadArabicResources(),
  'ar-iq': loadIraqiArabicResources(),
  ja: loadJapaneseResources(),
  fr: loadFrenchResources(),
  zh: loadChineseResources()
};

export const i18n = i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: (code) => {
      if (!code) return DEFAULT_LANGUAGE;
      
      // Convert array to string if needed
      if (Array.isArray(code)) {
        return code[0] as string;
      }
      
      const language = normalizeLanguage(code);
      return FALLBACK_LANGUAGES[language] || DEFAULT_LANGUAGE;
    },
    debug: process.env.NODE_ENV === 'development',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },
    // Enhanced with error namespace
    ns: ['common', 'securityDashboard', 'networkTools', 'ai', 'aiAssistant', 'cta', 'error'],
    defaultNS: 'common',
  });

export const changeLanguage = (lng: string) => {
  i18next.changeLanguage(lng);
};
