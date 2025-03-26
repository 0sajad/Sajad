
// استيراد ملفات الصينية المقسمة
import zhCommon from '../../locales/zh/common.json';
import zhAi from '../../locales/zh/ai.json';
import zhAiAssistant from '../../locales/zh/aiAssistant.json';
import zhConfig from '../../locales/zh/config.json';

export function loadChineseResources() {
  // دمج ملفات الصينية في كائن واحد
  const zhCombined = {
    ...zhCommon,
    ai: zhAi,
    aiAssistant: zhAiAssistant,
    ...zhConfig
  };

  return {
    common: zhCombined
  };
}
