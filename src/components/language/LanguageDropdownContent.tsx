
import React from "react";
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { LanguageOption } from "./LanguageOption";
import { useA11y } from "@/hooks/useA11y";

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
  const { t } = useTranslation();
  const { reducedMotion } = useA11y();
  
  return (
    <DropdownMenuContent 
      align="end" 
      className="z-50 min-w-[240px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl rounded-lg"
    >
      <DropdownMenuLabel className="text-center font-medium">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('common.language', 'اللغة')}
        </span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30" />
      
      {languages.map((lang) => (
        <LanguageOption
          key={lang.code}
          langCode={lang.code}
          languageName={lang.nativeName}
          flag={lang.flag}
          isActive={currentLanguage === lang.code}
          isIraqiArabic={lang.code === 'ar-iq'}
          onClick={onChangeLanguage}
          reducedMotion={reducedMotion}
        />
      ))}
    </DropdownMenuContent>
  );
}
