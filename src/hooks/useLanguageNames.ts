
import { useMemo } from 'react';

export interface LanguageName {
  name: string;
  nativeName: string;
  flag: string;
}

export type LanguageNames = Record<string, LanguageName>;

/**
 * هذا الـhook يوفر أسماء اللغات المدعومة وأعلامها
 */
export function useLanguageNames() {
  const languageNames: LanguageNames = useMemo(() => {
    return {
      'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
      'ar': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
      'ar-iq': { name: 'Iraqi Arabic', nativeName: 'العراقية', flag: '🇮🇶' },
      'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
      'ja': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
      'zh': { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
    };
  }, []);

  /**
   * الحصول على اللغات المصنفة للعرض
   */
  const getGroupedLanguages = (): Array<keyof LanguageNames> => {
    const arabicLanguages: Array<keyof LanguageNames> = ['ar', 'ar-iq'];
    const otherLanguages: Array<keyof LanguageNames> = ['en', 'fr', 'ja', 'zh'];
    
    // ترتيب اللغات مع إعطاء الأولوية للغات العربية
    return [...arabicLanguages, ...otherLanguages];
  };

  return {
    languageNames,
    getGroupedLanguages
  };
}
