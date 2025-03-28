
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
  
  const getGroupedLanguages = () => {
    return Object.keys(languageNames);
  };
  
  return { languageNames, getGroupedLanguages };
}
