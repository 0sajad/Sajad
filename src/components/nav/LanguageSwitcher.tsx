
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
import { motion } from "framer-motion";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
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
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={`relative ${className} ${isTransitioning ? 'opacity-50' : 'opacity-100'} transition-opacity duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 group overflow-hidden`}
                aria-label={t('common.selectLanguage', 'تغيير اللغة')}
                data-testid="language-switcher"
              >
                <div className="relative z-10 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-blue-500 dark:text-blue-300 group-hover:scale-110 transition-transform" />
                  
                  {/* إظهار العلم الصغير للغة الحالية */}
                  <span className="absolute -top-2 -right-2 text-[10px] bg-blue-500 text-white rounded-full w-4 h-4 flex items-center justify-center border border-white dark:border-gray-700">
                    {currentLanguage.flag}
                  </span>
                </div>
                
                {/* تأثير متحرك عند التحويم */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ 
                    background: ["linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1))", 
                                "linear-gradient(to right, rgba(124, 58, 237, 0.1), rgba(59, 130, 246, 0.1))"]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <span className="sr-only">{t('common.language', 'اللغة')}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white border-0 shadow-lg">
            <p>{t('common.selectLanguage', 'تغيير اللغة')}</p>
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end" className="z-50 min-w-[240px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl rounded-lg">
          <DropdownMenuLabel className="text-center font-medium">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('common.language', 'اللغة')}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30" />
          {languages.map((lang) => {
            const isActive = i18n.language === lang.code;
            
            return (
              <DropdownMenuItem
                key={lang.code}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 font-medium' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:translate-y-[-1px]'
                }`}
                onClick={() => changeLanguage(lang.code)}
                data-testid={`language-option-${lang.code}`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3 rtl:ml-3 rtl:mr-0">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center bg-blue-500 text-white rounded-full w-5 h-5"
                  >
                    <Check className="h-3 w-3" />
                  </motion.div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
