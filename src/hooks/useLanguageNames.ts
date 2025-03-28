
import { useMemo } from 'react';

interface LanguageName {
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageNames {
  [key: string]: LanguageName;
}

export function useLanguageNames() {
  const languageNames: LanguageNames = useMemo(() => ({
    'ar': {
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦'
    },
    'ar-iq': {
      name: 'Iraqi Arabic',
      nativeName: 'العراقية',
      flag: '🇮🇶'
    },
    'en': {
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸'
    },
    'fr': {
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷'
    },
    'ja': {
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵'
    },
    'zh': {
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳'
    }
  }), []);
  
  // Safe implementation of getGroupedLanguages
  const getGroupedLanguages = () => {
    if (!languageNames) return [];
    return Object.keys(languageNames);
  };
  
  // Safe language name getter
  const getLanguageName = (code: string | undefined): LanguageName | undefined => {
    if (!code || !languageNames) return undefined;
    return languageNames[code];
  };
  
  return { languageNames, getGroupedLanguages, getLanguageName };
}
