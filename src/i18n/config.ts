
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// تعريف ملفات الترجمة المتاحة
const resources = {
  en: {
    common: require('@/locales/en/common.json'),
    securityDashboard: require('@/locales/en/securityDashboard.json'),
    networkTools: require('@/locales/en/networkTools.json'),
    ai: require('@/locales/en/ai.json'),
    aiAssistant: require('@/locales/en/aiAssistant.json'),
    cta: require('@/locales/en/cta.json'),
    access: require('@/locales/en/access.json'),
    license: require('@/locales/en/license.json'),
    dashboard: require('@/locales/en/dashboard.json'),
    deviceManager: require('@/locales/en/deviceManager.json'),
    settings: require('@/locales/en/settings.json'),
    systemMonitor: require('@/locales/en/systemMonitor.json')
  },
  ar: {
    common: require('@/locales/ar/common.json'),
    securityDashboard: require('@/locales/ar/securityDashboard.json') || {},
    networkTools: require('@/locales/ar/networkTools.json'),
    ai: require('@/locales/ar/ai.json'),
    aiAssistant: require('@/locales/ar/aiAssistant.json'),
    cta: require('@/locales/ar/cta.json'),
    access: require('@/locales/ar/access.json'),
    license: require('@/locales/ar/license.json'),
    aiFeatures: require('@/locales/ar/aiFeatures.json')
  },
  'ar-iq': {
    common: require('@/locales/ar-iq/common.json') || {},
    securityDashboard: require('@/locales/ar-iq/securityDashboard.json'),
    networkTools: require('@/locales/ar-iq/networkTools.json'),
    ai: require('@/locales/ar-iq/ai.json'),
    aiAssistant: require('@/locales/ar-iq/aiAssistant.json'),
    cta: require('@/locales/ar-iq/cta.json'),
    access: require('@/locales/ar-iq/access.json'),
    dashboard: require('@/locales/ar-iq/dashboard.json'),
    deviceManager: require('@/locales/ar-iq/deviceManager.json'),
    securityStatus: require('@/locales/ar-iq/securityStatus.json'),
    aiFeatures: require('@/locales/ar-iq/aiFeatures.json'),
    helpCenter: require('@/locales/ar-iq/helpCenter.json'),
    license: require('@/locales/ar-iq/license.json'),
    systemMonitor: require('@/locales/ar-iq/systemMonitor.json'),
    settings: require('@/locales/ar-iq/settings.json')
  },
  ja: {
    common: require('@/locales/ja/common.json'),
    securityDashboard: require('@/locales/ja/securityDashboard.json') || {},
    networkTools: require('@/locales/ja/networkTools.json'),
    ai: require('@/locales/ja/ai.json'),
    aiAssistant: require('@/locales/ja/aiAssistant.json'),
    cta: require('@/locales/ja/cta.json'),
    footer: require('@/locales/ja/footer.json'),
    hero: require('@/locales/ja/hero.json'),
    securityStatus: require('@/locales/ja/securityStatus.json'),
    aiFeatures: require('@/locales/ja/aiFeatures.json'),
    settings: require('@/locales/ja/settings.json'),
    helpCenter: require('@/locales/ja/helpCenter.json')
  },
  fr: {
    cta: require('@/locales/fr/cta.json'),
    networkTools: require('@/locales/fr/networkTools.json'),
    ai: require('@/locales/fr/ai.json'),
    aiAssistant: require('@/locales/fr/aiAssistant.json'),
    settings: require('@/locales/fr/settings.json')
  },
  zh: {
    ai: require('@/locales/zh/ai.json'),
    cta: require('@/locales/zh/cta.json'),
    networkTools: require('@/locales/zh/networkTools.json'),
    aiAssistant: require('@/locales/zh/aiAssistant.json')
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
    supportedLngs: SUPPORTED_LANGUAGES, // استخدام supportedLngs بدلاً من whitelist
    interpolation: {
      escapeValue: false, // لا حاجة لـ React لأنه يهرب القيم افتراضياً
    },
    // التأكد من استخدام اللغة الافتراضية لترجمة النصوص
    ns: ['common', 'securityDashboard', 'networkTools', 'ai', 'aiAssistant', 'cta'],
    defaultNS: 'common',
  });

export const changeLanguage = (lng: string) => {
  i18next.changeLanguage(lng);
};
