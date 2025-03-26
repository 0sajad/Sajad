
// استيراد ملفات الترجمة
import { loadArabicResources } from './languages/ar';
import { loadEnglishResources } from './languages/en';
import { loadIraqiArabicResources } from './languages/ar-iq';
import { loadJapaneseResources } from './languages/ja';
import { loadChineseResources } from './languages/zh';
import { loadFrenchResources } from './languages/fr';

// تجميع جميع الموارد
export const resources = {
  ar: loadArabicResources(),
  en: loadEnglishResources(),
  'ar-iq': loadIraqiArabicResources(),
  ja: loadJapaneseResources(),
  zh: loadChineseResources(),
  fr: loadFrenchResources()
};
