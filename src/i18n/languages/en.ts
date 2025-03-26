
// استيراد ملفات الإنجليزية
import enCommon from '../../locales/en/common.json';
import enLicense from '../../locales/en/license.json';
import enAccess from '../../locales/en/access.json';

export function loadEnglishResources() {
  return {
    common: enCommon,
    license: enLicense,
    access: enAccess
  };
}
