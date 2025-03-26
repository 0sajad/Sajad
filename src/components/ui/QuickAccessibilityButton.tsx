
import React from "react";
import { Button } from "@/components/ui/button";
import { AccessibilityMenu } from "@/components/ui/accessibility-menu";
import { useA11y } from "@/hooks/useA11y";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accessibility } from "lucide-react";
import { useTranslation } from "react-i18next";

export function QuickAccessibilityButton() {
  const { highContrast, largeText } = useA11y();
  const { t } = useTranslation();
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative shadow-md hover:shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600"
              aria-label={t('accessibility.a11ySettings', 'إعدادات إمكانية الوصول')}
            >
              <Accessibility className="h-4 w-4" />
              {(highContrast || largeText) && (
                <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary rounded-full animate-pulse" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{t('accessibility.a11ySettings', 'إعدادات إمكانية الوصول')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AccessibilityMenu />
    </div>
  );
}
