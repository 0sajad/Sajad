
// استيراد ملفات الفرنسية المقسمة
import frCommon from '../../locales/fr/common.json';
import frAi from '../../locales/fr/ai.json';
import frAiAssistant from '../../locales/fr/aiAssistant.json';
import frConfig from '../../locales/fr/config.json';

export function loadFrenchResources() {
  // دمج ملفات الفرنسية في كائن واحد
  const frCombined = {
    ...frCommon,
    ai: frAi,
    aiAssistant: frAiAssistant,
    ...frConfig
  };

  return {
    common: frCombined
  };
}
