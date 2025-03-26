
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
  }, [i18n.language]);

  // العثور على اللغة الحالية
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`relative ${className} ${isTransitioning ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300`}
          aria-label={t('common.selectLanguage', 'Select Language')}
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t('common.language', 'Language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-center">
          {t('common.language', 'Language')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="flex items-center justify-between"
            onClick={() => changeLanguage(lang.code)}
          >
            <span>{lang.nativeName}</span>
            {i18n.language === lang.code && <Check className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
