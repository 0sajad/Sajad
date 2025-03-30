
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LanguageDropdownContent } from "./LanguageDropdownContent";
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { useA11y } from "@/hooks/useA11y";
import { LanguageSwitcherButton } from "./LanguageSwitcherButton";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const { isTransitioning, handleLanguageChange } = useLanguageTransition();
  const { reducedMotion } = useA11y() || { reducedMotion: false };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Available languages with flags
  const languages = [
    { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
    { code: "ar-iq", name: "Iraqi Arabic", nativeName: "اللهجة العراقية", flag: "🇮🇶" },
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
    { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" }
  ];
  
  // Find current language
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];
  
  const handleToggleLanguage = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleSelectLanguage = (langCode: string) => {
    handleLanguageChange(langCode);
    setDropdownOpen(false);
  };
  
  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <div className={cn("inline-block", className)}>
          <LanguageSwitcherButton
            currentLanguageFlag={currentLanguage.flag}
            currentLanguageNativeName={currentLanguage.nativeName}
            isTransitioning={isTransitioning}
            reducedMotion={reducedMotion}
            onClick={handleToggleLanguage}
            tooltipText="تغيير اللغة"
            variant="icon" 
          />
        </div>
      </DropdownMenuTrigger>
      
      <LanguageDropdownContent
        languages={languages}
        currentLanguage={i18n.language}
        onChangeLanguage={handleSelectLanguage}
      />
    </DropdownMenu>
  );
}
