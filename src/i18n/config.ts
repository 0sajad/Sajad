
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files using import statements
import enCommon from '@/locales/en/common.json';
import enSecurityDashboard from '@/locales/en/securityDashboard.json';
import enNetworkTools from '@/locales/en/networkTools.json';
import enAi from '@/locales/en/ai.json';
import enAiAssistant from '@/locales/en/aiAssistant.json';
import enCta from '@/locales/en/cta.json';
import enAccess from '@/locales/en/access.json';
import enLicense from '@/locales/en/license.json';
import enDashboard from '@/locales/en/dashboard.json';
import enDeviceManager from '@/locales/en/deviceManager.json';
import enSettings from '@/locales/en/settings.json';
import enSystemMonitor from '@/locales/en/systemMonitor.json';
import enHelpCenter from '@/locales/en/helpCenter.json';
import enError from '@/locales/en/error.json';

import arCommon from '@/locales/ar/common.json';
import arSecurityDashboard from '@/locales/ar/securityDashboard.json';
import arNetworkTools from '@/locales/ar/networkTools.json';
import arAi from '@/locales/ar/ai.json';
import arAiAssistant from '@/locales/ar/aiAssistant.json';
import arCta from '@/locales/ar/cta.json';
import arAccess from '@/locales/ar/access.json';
import arLicense from '@/locales/ar/license.json';
import arAiFeatures from '@/locales/ar/aiFeatures.json';
import arError from '@/locales/ar/error.json';

import arIqCommon from '@/locales/ar-iq/common.json';
import arIqSecurityDashboard from '@/locales/ar-iq/securityDashboard.json';
import arIqNetworkTools from '@/locales/ar-iq/networkTools.json';
import arIqAi from '@/locales/ar-iq/ai.json';
import arIqAiAssistant from '@/locales/ar-iq/aiAssistant.json';
import arIqCta from '@/locales/ar-iq/cta.json';
import arIqAccess from '@/locales/ar-iq/access.json';
import arIqDashboard from '@/locales/ar-iq/dashboard.json';
import arIqDeviceManager from '@/locales/ar-iq/deviceManager.json';
import arIqSecurityStatus from '@/locales/ar-iq/securityStatus.json';
import arIqAiFeatures from '@/locales/ar-iq/aiFeatures.json';
import arIqHelpCenter from '@/locales/ar-iq/helpCenter.json';
import arIqLicense from '@/locales/ar-iq/license.json';
import arIqSystemMonitor from '@/locales/ar-iq/systemMonitor.json';
import arIqSettings from '@/locales/ar-iq/settings.json';
import arIqFooter from '@/locales/ar-iq/footer.json';
import arIqHero from '@/locales/ar-iq/hero.json';
import arIqHeader from '@/locales/ar-iq/header.json';
import arIqMobileMenu from '@/locales/ar-iq/mobileMenu.json';
import arIqError from '@/locales/ar-iq/error.json';

import jaCommon from '@/locales/ja/common.json';
import jaSecurityDashboard from '@/locales/ja/securityDashboard.json';
import jaNetworkTools from '@/locales/ja/networkTools.json';
import jaAi from '@/locales/ja/ai.json';
import jaAiAssistant from '@/locales/ja/aiAssistant.json';
import jaCta from '@/locales/ja/cta.json';
import jaFooter from '@/locales/ja/footer.json';
import jaHero from '@/locales/ja/hero.json';
import jaSecurityStatus from '@/locales/ja/securityStatus.json';
import jaAiFeatures from '@/locales/ja/aiFeatures.json';
import jaSettings from '@/locales/ja/settings.json';
import jaHelpCenter from '@/locales/ja/helpCenter.json';
import jaHeader from '@/locales/ja/header.json';
import jaMobileMenu from '@/locales/ja/mobileMenu.json';
import jaError from '@/locales/ja/error.json';

import frCta from '@/locales/fr/cta.json';
import frNetworkTools from '@/locales/fr/networkTools.json';
import frAi from '@/locales/fr/ai.json';
import frAiAssistant from '@/locales/fr/aiAssistant.json';
import frSettings from '@/locales/fr/settings.json';
import frCommon from '@/locales/fr/common.json';
import frError from '@/locales/fr/error.json';

import zhAi from '@/locales/zh/ai.json';
import zhCta from '@/locales/zh/cta.json';
import zhNetworkTools from '@/locales/zh/networkTools.json';
import zhAiAssistant from '@/locales/zh/aiAssistant.json';
import zhCommon from '@/locales/zh/common.json';
import zhError from '@/locales/zh/error.json';

// Define resources using imported JSON files
const resources = {
  en: {
    common: enCommon,
    securityDashboard: enSecurityDashboard,
    networkTools: enNetworkTools,
    ai: enAi,
    aiAssistant: enAiAssistant,
    cta: enCta,
    access: enAccess,
    license: enLicense,
    dashboard: enDashboard,
    deviceManager: enDeviceManager,
    settings: enSettings,
    systemMonitor: enSystemMonitor,
    helpCenter: enHelpCenter,
    error: enError
  },
  ar: {
    common: arCommon,
    securityDashboard: arSecurityDashboard,
    networkTools: arNetworkTools,
    ai: arAi,
    aiAssistant: arAiAssistant,
    cta: arCta,
    access: arAccess,
    license: arLicense,
    aiFeatures: arAiFeatures,
    error: arError
  },
  'ar-iq': {
    common: arIqCommon,
    securityDashboard: arIqSecurityDashboard,
    networkTools: arIqNetworkTools,
    ai: arIqAi,
    aiAssistant: arIqAiAssistant,
    cta: arIqCta,
    access: arIqAccess,
    dashboard: arIqDashboard,
    deviceManager: arIqDeviceManager,
    securityStatus: arIqSecurityStatus,
    aiFeatures: arIqAiFeatures,
    helpCenter: arIqHelpCenter,
    license: arIqLicense,
    systemMonitor: arIqSystemMonitor,
    settings: arIqSettings,
    footer: arIqFooter,
    hero: arIqHero,
    header: arIqHeader,
    mobileMenu: arIqMobileMenu,
    error: arIqError
  },
  ja: {
    common: jaCommon,
    securityDashboard: jaSecurityDashboard,
    networkTools: jaNetworkTools,
    ai: jaAi,
    aiAssistant: jaAiAssistant,
    cta: jaCta,
    footer: jaFooter,
    hero: jaHero,
    securityStatus: jaSecurityStatus,
    aiFeatures: jaAiFeatures,
    settings: jaSettings,
    helpCenter: jaHelpCenter,
    header: jaHeader,
    mobileMenu: jaMobileMenu,
    error: jaError
  },
  fr: {
    common: frCommon,
    cta: frCta,
    networkTools: frNetworkTools,
    ai: frAi,
    aiAssistant: frAiAssistant,
    settings: frSettings,
    error: frError
  },
  zh: {
    common: zhCommon,
    ai: zhAi,
    cta: zhCta,
    networkTools: zhNetworkTools,
    aiAssistant: zhAiAssistant,
    error: zhError
  }
};

const SUPPORTED_LANGUAGES = ['en', 'ar', 'ar-iq', 'ja', 'fr', 'zh'];
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
      
      // تحويل المصفوفة إلى سلسلة إذا لزم الأمر
      if (Array.isArray(code)) {
        return code[0] as string;
      }
      
      const language = normalizeLanguage(code);
      return FALLBACK_LANGUAGES[language] || DEFAULT_LANGUAGE;
    },
    debug: process.env.NODE_ENV === 'development',
    supportedLngs: SUPPORTED_LANGUAGES,
    interpolation: {
      escapeValue: false, // لا حاجة لـ React لأنه يهرب القيم افتراضياً
    },
    // تحسين مع إضافة namespace للأخطاء
    ns: ['common', 'securityDashboard', 'networkTools', 'ai', 'aiAssistant', 'cta', 'error'],
    defaultNS: 'common',
  });

export const changeLanguage = (lng: string) => {
  i18next.changeLanguage(lng);
};
