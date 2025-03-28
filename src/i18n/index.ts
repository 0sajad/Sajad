
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nConfig } from './config';
import type { ResourceKey, TranslationResources } from './resources';

// Initialize i18n with config
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init(i18nConfig);
}

const changeLanguage = i18n.changeLanguage.bind(i18n);

export { i18n, changeLanguage };
export type { ResourceKey, TranslationResources };
