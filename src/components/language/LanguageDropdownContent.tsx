
import React from "react";
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ArabicTextEnhancer } from "../text/ArabicTextEnhancer";
import { LanguageOption } from "./LanguageOption";
import { useA11y } from "@/hooks/useA11y";
import { useRTLSupport } from "@/hooks/useRTLSupport";

interface LanguageDropdownContentProps {
  /** قائمة اللغات المتاحة */
  languages: {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
  }[];
  /** اللغة الحالية */
  currentLanguage: string;
  /** دالة تغيير اللغة */
  onChangeLanguage: (lang: string) => void;
  /** موقع العرض بالنسبة للزر */
  align?: "start" | "center" | "end";
}

export function LanguageDropdownContent({
  languages,
  currentLanguage,
  onChangeLanguage,
  align = "end"
}: LanguageDropdownContentProps) {
  const { t } = useTranslation();
  const { reducedMotion } = useA11y?.() || { reducedMotion: false };
  const { isRTL } = useRTLSupport();
  
  // تنظيم اللغات في مجموعات
  const arabicLanguages = languages.filter(lang => lang.code.startsWith('ar'));
  const otherLanguages = languages.filter(lang => !lang.code.startsWith('ar'));
  
  return (
    <DropdownMenuContent 
      align={align} 
      className={cn(
        "min-w-[240px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md",
        "border border-white/20 dark:border-gray-700/30 shadow-xl rounded-lg z-50",
        "animate-in fade-in-80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        isRTL && "rtl"
      )}
    >
      <DropdownMenuLabel className="text-center font-medium">
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          <ArabicTextEnhancer fontType="cairo">
            {t('common.language', 'اللغة')}
          </ArabicTextEnhancer>
        </span>
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30" />
      
      {/* اللغات العربية */}
      {arabicLanguages.length > 0 && (
        <div className="py-1">
          <div className="px-2 py-1 text-xs text-muted-foreground">
            <ArabicTextEnhancer forceEnhance>اللغة العربية</ArabicTextEnhancer>
          </div>
          {arabicLanguages.map(lang => (
            <LanguageOption 
              key={lang.code}
              langCode={lang.code}
              languageName={lang.nativeName}
              flag={lang.flag}
              isActive={currentLanguage === lang.code}
              isIraqiArabic={lang.code === 'ar-iq'}
              reducedMotion={reducedMotion}
              onClick={onChangeLanguage}
            />
          ))}
        </div>
      )}
      
      {/* فاصل بين المجموعات */}
      {arabicLanguages.length > 0 && otherLanguages.length > 0 && (
        <DropdownMenuSeparator />
      )}
      
      {/* لغات أخرى */}
      {otherLanguages.length > 0 && (
        <div className="py-1">
          <div className="px-2 py-1 text-xs text-muted-foreground">
            <ArabicTextEnhancer>{t('languages.other', 'لغات أخرى')}</ArabicTextEnhancer>
          </div>
          {otherLanguages.map(lang => (
            <LanguageOption 
              key={lang.code}
              langCode={lang.code}
              languageName={lang.nativeName}
              flag={lang.flag}
              isActive={currentLanguage === lang.code}
              reducedMotion={reducedMotion}
              onClick={onChangeLanguage}
            />
          ))}
        </div>
      )}
    </DropdownMenuContent>
  );
}
