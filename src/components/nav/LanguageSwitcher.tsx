
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { LanguageSwitcherButton } from "./LanguageSwitcherButton";
import { LanguageDropdownContent } from "./LanguageDropdownContent";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const { isTransitioning, changeLanguage } = useLanguageTransition();
  const [mounted, setMounted] = useState(false);
  
  const languages = [
    { code: "ar", name: "العربية", nativeName: "العربية", flag: "🇸🇦" },
    { code: "ar-iq", name: "Iraqi Arabic", nativeName: "العراقية", flag: "🇮🇶" },
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" }
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          <LanguageSwitcherButton 
            className={className} 
            onClick={() => {}} 
            isTransitioning={isTransitioning}
            currentLanguageFlag={currentLanguage.flag}
          />
        </div>
      </DropdownMenuTrigger>
      <LanguageDropdownContent 
        languages={languages}
        currentLanguage={currentLanguage}
        onChangeLanguage={changeLanguage}
      />
    </DropdownMenu>
  );
}
