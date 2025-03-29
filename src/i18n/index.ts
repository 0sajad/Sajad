
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nConfig } from './config';
import type { ResourceKey, TranslationResources } from './resources';

// Initialize i18n with config
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init(i18nConfig);
}

// Export changeLanguage properly as a function
const changeLanguage = (language: string): Promise<any> => {
  return i18n.changeLanguage(language);
};

export { i18n, changeLanguage };
export type { ResourceKey, TranslationResources };
