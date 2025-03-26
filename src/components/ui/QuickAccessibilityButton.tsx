
import React from "react";
import { Button } from "@/components/ui/button";
import { AccessibilityMenu } from "@/components/ui/accessibility-menu";
import { useA11y } from "@/hooks/useA11y";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accessibility } from "lucide-react";
import { useTranslation } from "react-i18next";

export function QuickAccessibilityButton() {
  const { highContrast, largeText, reducedMotion, focusMode } = useA11y();
  const { t } = useTranslation();
  
  // حساب عدد ميزات إمكانية الوصول المفعلة
  const activeFeatures = [highContrast, largeText, reducedMotion, focusMode].filter(Boolean).length;
  
  // الحصول على قائمة الميزات النشطة لقارئات الشاشة
  const getActiveFeaturesText = () => {
    const features = [];
    if (highContrast) features.push(t('accessibility.highContrast'));
    if (largeText) features.push(t('accessibility.largeText'));
    if (reducedMotion) features.push(t('accessibility.reducedMotion'));
    if (focusMode) features.push(t('accessibility.focusMode'));
    
    if (features.length === 0) return t('accessibility.noFeaturesActive', 'No accessibility features are active');
    return t('accessibility.activeFeatures', 'Active features: ') + features.join(', ');
  };
  
  return (
    <div 
      className="fixed bottom-4 left-4 z-50 md:bottom-6 md:left-6"
      role="region"
      aria-label={t('accessibility.a11ySettings')}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="relative shadow-md hover:shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 transition-all duration-300"
              aria-label={t('accessibility.a11ySettings')}
              aria-haspopup="menu"
              aria-expanded="false"
              aria-describedby="a11y-settings-desc"
            >
              <Accessibility className="h-4 w-4" />
              {activeFeatures > 0 && (
                <div 
                  className="absolute -top-2 -right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center" 
                  aria-hidden="true"
                >
                  <span className="text-xs text-white">{activeFeatures}</span>
                </div>
              )}
              <span id="a11y-settings-desc" className="sr-only">{getActiveFeaturesText()}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{t('accessibility.a11ySettings')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AccessibilityMenu />
    </div>
  );
}
