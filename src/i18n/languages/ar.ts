
// استيراد ملفات العربية
import arCommon from '../../locales/ar/common.json';
import arLicense from '../../locales/ar/license.json';
import arAccess from '../../locales/ar/access.json';
import arAi from '../../locales/ar/ai.json';
import arAiAssistant from '../../locales/ar/aiAssistant.json';
import arConfig from '../../locales/ar/config.json';
import arCta from '../../locales/ar/cta.json';

export function loadArabicResources() {
  // دمج ملفات العربية في كائن واحد
  const arCombined = {
    ...arCommon,
    ai: arAi,
    aiAssistant: arAiAssistant,
    cta: arCta,
    ...arConfig
  };

  return {
    common: arCombined,
    license: arLicense,
    access: arAccess
  };
}
