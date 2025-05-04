
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
import { useA11y } from "@/hooks/useA11y";
import { useRTLSupport } from "@/hooks/useRTLSupport";
import { LanguageSwitcherButton } from "./LanguageSwitcherButton";
import { LanguageOption } from "./LanguageOption";

// تعريف قائمة اللغات المدعومة
const SUPPORTED_LANGUAGES = [
  { code: "ar", name: "العربية", nativeName: "العربية", flag: "🇸🇦" },
  { code: "ar-iq", name: "Iraqi Arabic", nativeName: "العراقية", flag: "🇮🇶" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" }
];

interface LanguageSwitcherProps {
  /** نوع العرض: أيقونة فقط أو عرض كامل مع نص */
  variant?: "icon" | "full";
  /** فئات CSS إضافية */
  className?: string;
}

/**
 * مكون مبدّل اللغة - الإصدار الموحد
 */
export function LanguageSwitcher({ variant = "icon", className = "" }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const { isTransitioning, changeLanguage } = useLanguageTransition();
  const [mounted, setMounted] = useState(false);
  const { reducedMotion, announce } = useA11y?.() || { reducedMotion: false, announce: () => {} };
  const { isRTL } = useRTLSupport?.() || { isRTL: false };
  
  // تأكد من أن مكون اللغة يعمل فقط على جانب العميل
  useEffect(() => {
    setMounted(true);
    
    // تطبيق الاتجاه المناسب بناءً على اللغة الحالية
    const currentLang = i18n?.language || 'en';
    const isRightToLeft = currentLang === 'ar' || currentLang === 'ar-iq';
    
    if (isRightToLeft) {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl-active');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl-active');
    }
  }, [i18n?.language]);

  /**
   * معالج تغيير اللغة - يعلن قارئ الشاشة بالتغيير
   */
  const handleLanguageChange = (langCode: string) => {
    if (!langCode) return;
    
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode);
    const newLanguageName = language?.nativeName || langCode;
    
    // إعلان مخصص حسب اللغة الحالية
    const currentLang = i18n?.language || 'en';
    let message = '';
    
    if (currentLang === 'ar-iq') {
      message = `راح نغير اللغة لـ ${newLanguageName}`;
    } else if (currentLang.startsWith('ar')) {
      message = `جاري التغيير إلى اللغة ${newLanguageName}`;
    } else if (currentLang === 'fr') {
      message = `Changement de langue vers ${newLanguageName}`;
    } else if (currentLang === 'ja') {
      message = `言語を${newLanguageName}に変更しています`;
    } else if (currentLang === 'zh') {
      message = `正在将语言更改为 ${newLanguageName}`;
    } else {
      message = `Changing language to ${newLanguageName}`;
    }
      
    // إعلان التغيير لقارئات الشاشة
    if (announce) {
      announce(message, "polite");
    }
    
    // تغيير اللغة
    if (changeLanguage) {
      changeLanguage(langCode);
    } else {
      i18n?.changeLanguage?.(langCode);
    }
  };

  /**
   * الحصول على نص تلميح الأداة المناسب للغة الحالية
   */
  const getTooltipText = () => {
    const currentLang = i18n?.language || 'en';
    if (currentLang === 'ar-iq') {
      return 'غير اللغة';
    }
    return t('common.selectLanguage', 'تغيير اللغة');
  };

  // تأكد من أن المكون جاهز قبل العرض
  if (!mounted) {
    return null;
  }

  // الحصول على معلومات اللغة الحالية
  const currentLang = i18n?.language || 'en';
  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLang) || 
                         SUPPORTED_LANGUAGES.find(lang => lang.code === 'en') || 
                         SUPPORTED_LANGUAGES[0];

  return (
    <TooltipProvider>
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <div> {/* استخدام div كحاوية لتجنب مشاكل التركيز */}
                <LanguageSwitcherButton 
                  currentLanguageFlag={currentLanguage?.flag || "🌐"}
                  isTransitioning={isTransitioning || false}
                  isRTL={isRTL}
                  reducedMotion={reducedMotion || false}
                  onClick={() => {}}
                  tooltipText={getTooltipText()}
                  className={className}
                  variant={variant}
                  currentLanguageNativeName={variant === "full" ? currentLanguage?.nativeName : undefined}
                />
              </div>
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
          
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = i18n?.language === lang.code;
            const isIraqiArabic = lang.code === 'ar-iq';
            
            return (
              <LanguageOption 
                key={lang.code}
                langCode={lang.code}
                languageName={lang.nativeName}
                flag={lang.flag}
                isActive={isActive}
                isIraqiArabic={isIraqiArabic}
                onClick={handleLanguageChange}
                reducedMotion={reducedMotion || false}
              />
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </TooltipProvider>
  );
}

// تصدير افتراضي للتوافق مع React.lazy()
export default LanguageSwitcher;
