
import React, { useState, useEffect } from "react";
import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LanguageSwitcherProps {
  variant?: "icon" | "full";
  className?: string;
}

export function LanguageSwitcher({ variant = "icon", className = "" }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const { isTransitioning, changeLanguage, supportedLanguages } = useLanguageTransition();
  const [mounted, setMounted] = useState(false);

  // تأكد من أن مكون اللغة يعمل فقط على جانب العميل
  useEffect(() => {
    setMounted(true);
  }, []);

  // توصيف اللغات المدعومة (باللغة المحلية)
  const languageNames: Record<string, { name: string, nativeName: string, flag: string }> = {
    'en': { name: 'English', nativeName: 'English', flag: '🇺🇸' },
    'ar': { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
    'ar-iq': { name: 'Iraqi Arabic', nativeName: 'العراقية', flag: '🇮🇶' },
    'fr': { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    'ja': { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
    'zh': { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' }
  };

  // تأكد من أن المكون جاهز قبل العرض (لتجنب اختلاف الواجهة بين الخادم والعميل)
  if (!mounted) {
    return null;
  }

  // الحصول على معلومات اللغة الحالية
  const currentLanguage = languageNames[i18n.language] || languageNames['en'];

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size={variant === "icon" ? "icon" : "default"}
                className={`relative ${className} ${isTransitioning ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
                aria-label={t('common.selectLanguage', 'Change language')}
              >
                {variant === "icon" ? (
                  <Globe className="h-4 w-4" />
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="mr-1">{currentLanguage.flag}</span>
                    <span>{currentLanguage.nativeName}</span>
                    <Globe className="h-4 w-4 ml-2" />
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t('common.selectLanguage', 'Change language')}</p>
          </TooltipContent>
        </Tooltip>
        
        <DropdownMenuContent align="end" className="min-w-[180px]">
          <DropdownMenuLabel>
            {t('common.language', 'Language')}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {Object.keys(languageNames).map((langCode) => (
            <DropdownMenuItem
              key={langCode}
              className="flex items-center justify-between cursor-pointer"
              onClick={() => changeLanguage(langCode)}
            >
              <div className="flex items-center">
                <span className="mr-2">{languageNames[langCode].flag}</span>
                <span>{languageNames[langCode].nativeName}</span>
              </div>
              {i18n.language === langCode && (
                <Check className="h-4 w-4 text-green-500" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
