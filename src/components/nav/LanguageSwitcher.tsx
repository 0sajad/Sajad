
import React, { useEffect, useState } from "react";
import { Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const { isTransitioning, changeLanguage } = useLanguageTransition();
  const [mounted, setMounted] = useState(false);
  
  const languages = [
    { code: "ar", name: "العربية", nativeName: "العربية" },
    { code: "ar-iq", name: "Iraqi Arabic", nativeName: "العراقية" },
    { code: "en", name: "English", nativeName: "English" },
    { code: "fr", name: "French", nativeName: "Français" },
    { code: "ja", name: "Japanese", nativeName: "日本語" },
    { code: "zh", name: "Chinese", nativeName: "中文" }
  ];

  // التأكد من تطبيق الاتجاه الصحيح حسب اللغة عند التحميل
  useEffect(() => {
    setMounted(true);
    const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
    if (isRTL) {
      document.documentElement.setAttribute("dir", "rtl");
      document.body.classList.add('rtl-active');
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.body.classList.remove('rtl-active');
    }
    
    // التأكد من أن اللغة مطبقة بشكل صحيح
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n.language, i18n]);

  // العثور على اللغة الحالية
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  if (!mounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={`relative ${className} ${isTransitioning ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600`}
                aria-label={t('common.selectLanguage', 'تغيير اللغة')}
                data-testid="language-switcher"
              >
                <Globe className="h-4 w-4 text-blue-500 dark:text-blue-300" />
                <span className="sr-only">{t('common.language', 'اللغة')}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white border-0 shadow-lg">
            <p>{t('common.selectLanguage', 'تغيير اللغة')}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="z-50 min-w-[180px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl rounded-lg">
          <DropdownMenuLabel className="text-center font-medium gradient-text">
            {t('common.language', 'اللغة')}
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30" />
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              className={`flex items-center justify-between px-4 py-2 cursor-pointer transform hover:translate-y-[-1px] transition-transform ${
                i18n.language === lang.code ? 'bg-blue-50 dark:bg-blue-900/30' : ''
              }`}
              onClick={() => changeLanguage(lang.code)}
              data-testid={`language-option-${lang.code}`}
            >
              <span>{lang.nativeName}</span>
              {i18n.language === lang.code && (
                <Check className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 text-blue-500" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
