import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '@/locales/en/translation.json';
import enAIAssistant from '@/locales/en/aiAssistant.json';
import enDashboard from '@/locales/en/dashboard.json';
import enDeveloper from '@/locales/en/developer.json';
import enSecurityDashboard from '@/locales/en/securityDashboard.json';
import enSecurityStatus from '@/locales/en/securityStatus.json';
import enSettings from '@/locales/en/settings.json';
import enHelpCenter from '@/locales/en/helpCenter.json';

import ar from '@/locales/ar/translation.json';
import arAIAssistant from '@/locales/ar/aiAssistant.json';
import arDashboard from '@/locales/ar/dashboard.json';
import arDeveloper from '@/locales/ar/developer.json';
import arSecurityDashboard from '@/locales/ar/securityDashboard.json';
import arSecurityStatus from '@/locales/ar/securityStatus.json';
import arSettings from '@/locales/ar/settings.json';
import arHelpCenter from '@/locales/ar/helpCenter.json';

import arIQ from '@/locales/ar-iq/translation.json';
import arIQAIAssistant from '@/locales/ar-iq/aiAssistant.json';
import arIQDashboard from '@/locales/ar-iq/dashboard.json';
import arIQDeveloper from '@/locales/ar-iq/developer.json';
import arIQSecurityDashboard from '@/locales/ar-iq/securityDashboard.json';
import arIQSecurityStatus from '@/locales/ar-iq/securityStatus.json';
import arIQSettings from '@/locales/ar-iq/settings.json';
import arIQHelpCenter from '@/locales/ar-iq/helpCenter.json';

import ja from '@/locales/ja/translation.json';
import jaAIAssistant from '@/locales/ja/aiAssistant.json';
import jaDashboard from '@/locales/ja/dashboard.json';
import jaDeveloper from '@/locales/ja/developer.json';
import jaSecurityDashboard from '@/locales/ja/securityDashboard.json';
import jaSecurityStatus from '@/locales/ja/securityStatus.json';
import jaSettings from '@/locales/ja/settings.json';
import jaHelpCenter from '@/locales/ja/helpCenter.json';

const resources = {
  en: {
    translation: en,
    aiAssistant: enAIAssistant,
    dashboard: enDashboard,
    developer: enDeveloper,
    securityDashboard: enSecurityDashboard,
    securityStatus: enSecurityStatus,
    settings: enSettings,
    helpCenter: enHelpCenter,
  },
  ar: {
    translation: ar,
    aiAssistant: arAIAssistant,
    dashboard: arDashboard,
    developer: arDeveloper,
    securityDashboard: arSecurityDashboard,
    securityStatus: arSecurityStatus,
    settings: arSettings,
    helpCenter: arHelpCenter,
  },
    'ar-iq': {
    translation: arIQ,
    aiAssistant: arIQAIAssistant,
    dashboard: arIQDashboard,
    developer: arIQDeveloper,
    securityDashboard: arIQSecurityDashboard,
    securityStatus: arIQSecurityStatus,
    settings: arIQSettings,
    helpCenter: arIQHelpCenter,
  },
  ja: {
    translation: ja,
    aiAssistant: jaAIAssistant,
    dashboard: jaDashboard,
    developer: jaDeveloper,
    securityDashboard: jaSecurityDashboard,
    securityStatus: jaSecurityStatus,
    settings: jaSettings,
    helpCenter: jaHelpCenter,
  },
};

const SUPPORTED_LANGUAGES = ['en', 'ar', 'ar-iq', 'ja'];
const FALLBACK_LANGUAGES: { [key: string]: string } = {
  'ar-iq': 'ar',
};
const DEFAULT_LANGUAGE = 'en';

const normalizeLanguage = (code: string) => code.split('-')[0];

export const i18n = i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: (code) => {
      if (!code) return DEFAULT_LANGUAGE;
      
      // Fix type error by explicitly converting array to string
      if (Array.isArray(code)) {
        return code[0] as string;
      }
      
      const language = normalizeLanguage(code);
      return FALLBACK_LANGUAGES[language] || DEFAULT_LANGUAGE;
    },
    debug: process.env.NODE_ENV === 'development',
    whitelist: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export const changeLanguage = (lng: string) => {
  i18next.changeLanguage(lng);
};
