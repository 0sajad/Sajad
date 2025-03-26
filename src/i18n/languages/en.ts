
// استيراد ملفات الإنجليزية
import enCommon from '../../locales/en/common.json';
import enLicense from '../../locales/en/license.json';
import enAccess from '../../locales/en/access.json';
import enNetworkTools from '../../locales/en/networkTools.json';

export function loadEnglishResources() {
  return {
    common: {
      ...enCommon,
      networkTools: enNetworkTools
    },
    license: enLicense,
    access: enAccess
  };
}
