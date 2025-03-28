
// استيراد ملفات العربية
import arCommon from '../../locales/ar/common.json';
import arLicense from '../../locales/ar/license.json';
import arAccess from '../../locales/ar/access.json';
import arAi from '../../locales/ar/ai.json';
import arAiAssistant from '../../locales/ar/aiAssistant.json';
import arConfig from '../../locales/ar/config.json';
import arCta from '../../locales/ar/cta.json';
import arNetworkTools from '../../locales/ar/networkTools.json';
import arError from '../../locales/ar/error.json';

export function loadArabicResources() {
  // دمج ملفات العربية في كائن واحد
  const arCombined = {
    ...arCommon,
    ai: arAi,
    aiAssistant: arAiAssistant,
    cta: arCta,
    networkTools: arNetworkTools,
    ...arConfig,
    error: arError
  };

  return {
    common: arCombined,
    license: arLicense,
    access: arAccess
  };
}
