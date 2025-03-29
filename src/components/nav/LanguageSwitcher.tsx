
import React, { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { LanguageSwitcherButton } from "../language/LanguageSwitcherButton";
import { LanguageDropdownContent } from "../language/LanguageDropdownContent";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useA11y } from "@/hooks/useA11y";
import { useRTLSupport } from "@/hooks/useRTLSupport";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const { isTransitioning, changeLanguage } = useLanguageTransition();
  const [mounted, setMounted] = useState(false);
  const { reducedMotion } = useA11y?.() || { reducedMotion: false };
  const { isRTL } = useRTLSupport();
  
  const languages = [
    { code: "ar", name: "العربية", nativeName: "العربية", flag: "🇸🇦" },
    { code: "ar-iq", name: "Iraqi Arabic", nativeName: "العراقية", flag: "🇮🇶" },
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" }
  ];

  // Make sure to apply correct direction to page on load
  useEffect(() => {
    setMounted(true);
    // Make sure we have a valid language before checking
    const currentLang = i18n.language || 'en';
    const isRTL = currentLang === "ar" || currentLang === "ar-iq";
    
    if (isRTL) {
      document.documentElement.setAttribute("dir", "rtl");
      document.body.classList.add('rtl-active');
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.body.classList.remove('rtl-active');
    }
    
    // Make sure language is properly applied
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && savedLanguage !== currentLang) {
      // Use the changeLanguage function from useLanguageTransition instead
      changeLanguage(savedLanguage);
    }
  }, [i18n.language, i18n, changeLanguage]);

  // Find current language - ensure we have a default
  const currentLanguage = i18n.language || 'en';
  const currentLanguageObj = languages.find(lang => lang.code === currentLanguage) || languages.find(lang => lang.code === 'en') || languages[0];
  const currentLanguageFlag = currentLanguageObj?.flag || "🌐";

  // Get tooltip text based on current language
  const getTooltipText = () => {
    if (currentLanguage === 'ar-iq') {
      return 'غير اللغة';
    }
    return t('common.selectLanguage', 'تغيير اللغة');
  };

  if (!mounted) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <div>
                <LanguageSwitcherButton 
                  className={className} 
                  onClick={() => {}} 
                  isTransitioning={isTransitioning}
                  currentLanguageFlag={currentLanguageFlag}
                  isRTL={isRTL}
                  reducedMotion={reducedMotion}
                  tooltipText={getTooltipText()}
                />
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white border-0">
            <p>Change Language</p>
          </TooltipContent>
          <LanguageDropdownContent 
            languages={languages}
            currentLanguage={currentLanguage}
            onChangeLanguage={changeLanguage}
          />
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
}
