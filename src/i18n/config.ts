
import en from '../locales/en/common.json';
import ar from '../locales/ar/common.json';
import arIq from '../locales/ar-iq/common.json';
import fr from '../locales/fr/common.json';
import ja from '../locales/ja/common.json';
import zh from '../locales/zh/common.json';

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
      translation: en
    },
    ar: {
      translation: ar
    },
    'ar-iq': {
      translation: arIq
    },
    fr: {
      translation: fr
    },
    ja: {
      translation: ja
    },
    zh: {
      translation: zh
    }
  }
};
