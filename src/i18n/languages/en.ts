
// استيراد ملفات الإنجليزية
import enCommon from '../../locales/en/common.json';
import enLicense from '../../locales/en/license.json';
import enAccess from '../../locales/en/access.json';
import enNetworkTools from '../../locales/en/networkTools.json';
import enSettings from '../../locales/en/settings.json';
import enAi from '../../locales/en/ai.json';
import enAiAssistant from '../../locales/en/aiAssistant.json';
import enConfig from '../../locales/en/config.json';
import enCta from '../../locales/en/cta.json';
import enError from '../../locales/en/error.json';

export function loadEnglishResources() {
  return {
    common: {
      ...enCommon,
      ai: enAi,
      aiAssistant: enAiAssistant,
      cta: enCta,
      networkTools: enNetworkTools,
      ...enConfig,
      error: enError
    },
    license: enLicense,
    access: enAccess,
    settings: enSettings
  };
}
