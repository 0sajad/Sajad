
export const i18nConfig = {
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  resources: {
    en: {
      translation: require('../locales/en/common.json')
    },
    ar: {
      translation: require('../locales/ar/common.json')
    },
    'ar-iq': {
      translation: require('../locales/ar-iq/common.json')
    },
    fr: {
      translation: require('../locales/fr/common.json')
    },
    ja: {
      translation: require('../locales/ja/common.json')
    },
    zh: {
      translation: require('../locales/zh/common.json')
    }
  }
};
