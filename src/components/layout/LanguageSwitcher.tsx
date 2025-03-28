
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
import { motion } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";

interface LanguageSwitcherProps {
  variant?: "icon" | "full";
  className?: string;
}

export function LanguageSwitcher({ variant = "icon", className = "" }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const { isTransitioning, changeLanguage } = useLanguageTransition();
  const [mounted, setMounted] = useState(false);
  const { announce, soundFeedback } = useA11y();

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

  // دالة للتعامل مع تغيير اللغة مع إمكانية الوصول
  const handleLanguageChange = (langCode: string) => {
    const newLanguageName = languageNames[langCode]?.nativeName || langCode;
    
    // إعلان للقارئات الشاشية
    const message = i18n.language.startsWith('ar')
      ? `جاري التغيير إلى اللغة ${newLanguageName}`
      : `Changing language to ${newLanguageName}`;
      
    announce(message);
    
    // تغيير اللغة
    changeLanguage(langCode);
  };

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size={variant === "icon" ? "icon" : "default"}
                className={`relative ${className} ${isTransitioning ? 'opacity-50' : 'opacity-100'} transition-all duration-300 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600`}
                aria-label={t('common.selectLanguage', 'Change language')}
              >
                {variant === "icon" ? (
                  <div className="relative">
                    <Globe className="h-4 w-4" />
                    <motion.div 
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center border border-white dark:border-gray-700 shadow-md"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <span className="text-[10px]">{currentLanguage.flag}</span>
                    </motion.div>
                  </div>
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
          <TooltipContent side="bottom" className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white border-0">
            <p>{t('common.selectLanguage', 'Change language')}</p>
          </TooltipContent>
        </Tooltip>
        
        <DropdownMenuContent 
          align="end" 
          className="min-w-[240px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl rounded-lg z-50"
        >
          <DropdownMenuLabel className="text-center font-medium">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('common.language', 'Language')}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30" />
          
          {Object.keys(languageNames).map((langCode) => {
            const isActive = i18n.language === langCode;
            
            return (
              <DropdownMenuItem
                key={langCode}
                className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 font-medium' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:translate-y-[-1px]'
                }`}
                onClick={() => handleLanguageChange(langCode)}
                data-testid={`language-option-${langCode}`}
              >
                <div className="flex items-center">
                  <span className="text-lg mr-3 rtl:ml-3 rtl:mr-0" aria-hidden="true">
                    {languageNames[langCode].flag}
                  </span>
                  <span>{languageNames[langCode].nativeName}</span>
                </div>
                
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-5 h-5 shadow-md"
                  >
                    <Check className="h-3 w-3" aria-hidden="true" />
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
