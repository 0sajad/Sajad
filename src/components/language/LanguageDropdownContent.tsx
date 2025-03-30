
import React from 'react';
import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageDropdownContentProps {
  languages: Language[];
  currentLanguage: string;
  onChangeLanguage: (langCode: string) => void;
}

export function LanguageDropdownContent({
  languages,
  currentLanguage,
  onChangeLanguage
}: LanguageDropdownContentProps) {
  return (
    <DropdownMenuContent 
      align="end" 
      className="min-w-[240px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl rounded-lg"
    >
      {languages.map((lang) => (
        <DropdownMenuItem
          key={lang.code}
          className="flex items-center justify-between py-2 px-4 cursor-pointer"
          onClick={() => onChangeLanguage(lang.code)}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm">{lang.nativeName}</span>
          </div>
          {currentLanguage === lang.code && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  );
}
