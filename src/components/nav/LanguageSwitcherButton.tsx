
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArabicTextEnhancer } from '@/components/text/ArabicTextEnhancer';

interface LanguageSwitcherButtonProps {
  /** علم اللغة الحالية */
  currentLanguageFlag?: string;
  /** اسم اللغة الحالية بلغتها الأصلية */
  currentLanguageNativeName?: string;
  /** ما إذا كان يتم الانتقال حاليًا بين اللغات */
  isTransitioning: boolean;
  /** ما إذا كان يجب تقليل الحركة */
  reducedMotion?: boolean;
  /** ما إذا كان الاتجاه من اليمين إلى اليسار */
  isRTL?: boolean;
  /** الدالة التي يتم استدعاؤها عند النقر على الزر */
  onClick: () => void;
  /** نص تلميح الأداة */
  tooltipText?: string;
  /** فئات CSS إضافية */
  className?: string;
  /** نوع العرض: أيقونة فقط أو عرض كامل مع نص */
  variant?: "icon" | "full";
}

export function LanguageSwitcherButton({
  currentLanguageFlag = "🌐",
  currentLanguageNativeName,
  isTransitioning,
  reducedMotion = false,
  isRTL = false,
  onClick,
  tooltipText,
  className,
  variant = "icon"
}: LanguageSwitcherButtonProps) {
  // تأثير دوران العلم أثناء التحميل
  const flagAnimation = isTransitioning && !reducedMotion
    ? {
        animate: {
          rotateY: [0, 180, 360],
          transition: { duration: 1.2, ease: "easeInOut" }
        }
      }
    : {};

  return (
    <Button
      variant="outline"
      size={variant === "full" ? "default" : "icon"}
      className={cn(
        "relative overflow-hidden rounded-full transition-colors border-0 bg-gray-100/50 dark:bg-gray-800/50",
        isRTL && "direction-rtl",
        variant === "full" && "min-w-[100px]",
        className
      )}
      onClick={onClick}
      aria-label={tooltipText}
    >
      <div className="flex items-center justify-center gap-2">
        <motion.span
          className="text-xl"
          {...flagAnimation}
        >
          {currentLanguageFlag}
        </motion.span>
        
        {variant === "full" && currentLanguageNativeName && (
          <span className="hidden md:inline">
            <ArabicTextEnhancer fontType="tajawal">
              {currentLanguageNativeName}
            </ArabicTextEnhancer>
          </span>
        )}
        
        {isTransitioning && (
          <span className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full border-2 border-t-transparent animate-spin" />
          </span>
        )}
      </div>
    </Button>
  );
}
