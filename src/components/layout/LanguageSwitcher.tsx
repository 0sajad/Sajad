
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { useLanguageNames } from "@/hooks/useLanguageNames";
import { useA11y } from "@/hooks/useA11y";
import { useRTLSupport } from "@/hooks/useRTLSupport";
import { LanguageSwitcherButton } from "@/components/language/LanguageSwitcherButton";
import { LanguageOption } from "@/components/language/LanguageOption";

interface LanguageSwitcherProps {
  /** نوع العرض: أيقونة فقط أو عرض كامل مع نص */
  variant?: "icon" | "full";
  /** فئات CSS إضافية */
  className?: string;
}

/**
 * مكون مبدّل اللغة - مقسم إلى مكونات أصغر للتنظيم
 */
export function LanguageSwitcher({ variant = "icon", className = "" }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const { isTransitioning, changeLanguage } = useLanguageTransition();
  const [mounted, setMounted] = useState(false);
  const { reducedMotion, announce } = useA11y();
  const { isRTL } = useRTLSupport();
  const { languageNames, getGroupedLanguages } = useLanguageNames();

  // تأكد من أن مكون اللغة يعمل فقط على جانب العميل
  useEffect(() => {
    setMounted(true);
    
    // Make sure we have a valid language before checking
    const currentLang = i18n.language || 'en';
    // تطبيق اتجاه RTL للغة العربية عند التركيب
    const isRTL = currentLang === 'ar' || currentLang === 'ar-iq';
    
    if (isRTL) {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl-active');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl-active');
    }
  }, [i18n.language]);

  /**
   * معالج تغيير اللغة - يعلن قارئ الشاشة بالتغيير
   */
  const handleLanguageChange = (langCode: string) => {
    if (!langCode) return; // Prevent operations on undefined or empty language code
    
    const newLanguageName = languageNames && langCode in languageNames 
      ? languageNames[langCode as keyof typeof languageNames]?.nativeName 
      : langCode;
    
    // إعلان مخصص حسب اللغة الحالية
    const currentLang = i18n.language || 'en';
    let message = '';
    if (currentLang === 'ar-iq') {
      message = `راح نغير اللغة لـ ${newLanguageName}`;
    } else if (currentLang.startsWith('ar')) {
      message = `جاري التغيير إلى اللغة ${newLanguageName}`;
    } else {
      message = `Changing language to ${newLanguageName}`;
    }
      
    // إعلان التغيير لقارئات الشاشة
    if (announce) {
      announce(message, "polite");
    }
    
    // تغيير اللغة
    changeLanguage(langCode);
  };

  /**
   * الحصول على نص تلميح الأداة المناسب للغة الحالية
   */
  const getTooltipText = () => {
    const currentLang = i18n.language || 'en';
    if (currentLang === 'ar-iq') {
      return 'غير اللغة';
    }
    return t('common.selectLanguage', 'تغيير اللغة');
  };

  // تأكد من أن المكون جاهز قبل العرض
  if (!mounted) {
    return null;
  }

  // Safeguard against languageNames being undefined
  if (!languageNames) {
    return null;
  }

  // الحصول على معلومات اللغة الحالية
  const currentLang = i18n.language || 'en';
  const currentLanguage = languageNames[currentLang as keyof typeof languageNames] || languageNames['en'];

  // Safeguard against getGroupedLanguages being undefined
  const groupedLanguages = getGroupedLanguages ? getGroupedLanguages() : ['en'];

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <LanguageSwitcherButton 
                currentLanguageFlag={currentLanguage.flag}
                isTransitioning={isTransitioning}
                isRTL={isRTL}
                reducedMotion={reducedMotion}
                onClick={() => {}}
                tooltipText={getTooltipText()}
                className={className}
                variant={variant}
                currentLanguageNativeName={variant === "full" ? currentLanguage.nativeName : undefined}
              />
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white border-0 z-50">
            <p>{getTooltipText()}</p>
          </TooltipContent>
        </Tooltip>
        
        <DropdownMenuContent 
          align="end" 
          className="min-w-[240px] bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-xl rounded-lg z-50"
        >
          <DropdownMenuLabel className="text-center font-medium">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('common.language', 'اللغة')}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800/30 dark:to-purple-800/30" />
          
          {groupedLanguages.map((langCode) => {
            const isActive = i18n.language === langCode;
            if (!languageNames[langCode as keyof typeof languageNames]) return null;
            
            const lang = languageNames[langCode as keyof typeof languageNames];
            const isIraqiArabic = langCode === 'ar-iq';
            
            return (
              <LanguageOption 
                key={langCode}
                langCode={langCode}
                languageName={lang.nativeName}
                flag={lang.flag}
                isActive={isActive}
                isIraqiArabic={isIraqiArabic}
                onClick={handleLanguageChange}
                reducedMotion={reducedMotion}
              />
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}
