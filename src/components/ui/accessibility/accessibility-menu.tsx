
import React, { useRef, useEffect } from "react";
import { useA11y } from "@/hooks/useA11y";
import { useTranslation } from "react-i18next";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { AccessibilityTabs } from "./accessibility-tabs";
import { DisplayTab } from "./display-tab";
import { MotionTab } from "./motion-tab";
import { ColorTab } from "./color-tab";
import { ShortcutsSection } from "./shortcuts-section";
import { cn } from "@/lib/utils";

interface AccessibilityMenuProps {
  className?: string;
}

/**
 * قائمة إمكانية الوصول الشاملة مع تبويبات لمختلف فئات الميزات
 */
export function AccessibilityMenu({ className }: AccessibilityMenuProps) {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    highContrast,
    largeText,
    reducedMotion,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    announce
  } = useA11y();
  
  // إعلان للقراء الشاشة عند فتح القائمة
  useEffect(() => {
    announce(t('accessibility.menuOpened', 'تم فتح قائمة إمكانية الوصول'), 'polite');
    
    // إعادة التركيز للقائمة
    if (menuRef.current) {
      menuRef.current.focus();
    }
  }, [announce, t]);
  
  return (
    <div
      ref={menuRef}
      className={cn(
        "absolute top-full mt-2 right-0 rtl:right-auto rtl:left-0 w-[280px] sm:w-[350px] rounded-lg border bg-background shadow-lg z-50",
        highContrast && "high-contrast",
        largeText && "large-text",
        className
      )}
      role="dialog"
      aria-label={t('accessibility.menuTitle', 'قائمة إمكانية الوصول')}
      tabIndex={-1}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          {t('accessibility.menuTitle', 'إمكانية الوصول')}
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          {t('accessibility.menuDescription', 'اضبط التفضيلات لتحسين تجربتك مع الموقع')}
        </p>
        
        <AccessibilityTabs>
          <DisplayTab
            highContrast={highContrast}
            largeText={largeText}
            setHighContrast={setHighContrast}
            setLargeText={setLargeText}
          />
          
          <MotionTab
            reducedMotion={reducedMotion}
            setReducedMotion={setReducedMotion}
          />
          
          <ColorTab />
        </AccessibilityTabs>
        
        <ShortcutsSection className="mt-4" />
      </div>
    </div>
  );
}
