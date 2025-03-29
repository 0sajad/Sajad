
import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ArabicTextEnhancer } from "../text/ArabicTextEnhancer";

interface LanguageOptionProps {
  /** رمز اللغة */
  langCode: string;
  /** اسم اللغة */
  languageName: string;
  /** علم اللغة */
  flag: string;
  /** ما إذا كانت هذه اللغة هي اللغة النشطة حاليًا */
  isActive: boolean;
  /** ما إذا كانت هذه هي اللهجة العراقية */
  isIraqiArabic?: boolean;
  /** ما إذا كان يجب تقليل الحركة */
  reducedMotion?: boolean;
  /** دالة النقر */
  onClick: (langCode: string) => void;
}

export function LanguageOption({
  langCode,
  languageName,
  flag,
  isActive,
  isIraqiArabic = false,
  reducedMotion = false,
  onClick
}: LanguageOptionProps) {
  return (
    <DropdownMenuItem 
      key={langCode}
      disabled={isActive}
      className={cn(
        "flex items-center justify-between rounded-md text-sm cursor-pointer",
        isActive && "bg-primary/10 text-primary font-medium"
      )}
      onClick={() => onClick(langCode)}
    >
      <div className="flex items-center gap-2">
        <span className="text-base">{flag}</span>
        <ArabicTextEnhancer
          className={cn(
            "transition-colors duration-200", 
            isActive && "font-medium",
            isIraqiArabic && "font-feature-settings: 'ss01'"
          )}
          forceEnhance={langCode.startsWith('ar')}
        >
          {languageName}
        </ArabicTextEnhancer>
        
        {isIraqiArabic && (
          <span 
            className={cn(
              "relative bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 px-1.5 py-0.5 rounded-md font-medium text-[0.6rem]",
              isActive && "bg-amber-200 text-amber-900"
            )}
          >
            <ArabicTextEnhancer forceEnhance={true}>لهجة</ArabicTextEnhancer>
          </span>
        )}
      </div>
      
      {isActive && (
        <motion.div 
          initial={reducedMotion ? { scale: 1 } : { scale: 0.8 }} 
          animate={reducedMotion ? { scale: 1 } : { scale: 1 }} 
          transition={{ duration: 0.2 }}
        >
          <Check className="h-4 w-4" />
        </motion.div>
      )}
    </DropdownMenuItem>
  );
}
