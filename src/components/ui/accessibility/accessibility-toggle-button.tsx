
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonProps } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { Accessibility } from "lucide-react";
import { motion } from "framer-motion";

export interface AccessibilityToggleButtonProps extends ButtonProps {
  onClick: () => void;
}

export function AccessibilityToggleButton({ onClick, className, ...props }: AccessibilityToggleButtonProps) {
  const { t } = useTranslation();
  const { 
    highContrast, 
    largeText, 
    reducedMotion, 
    focusMode,
    soundFeedback,
    dyslexicFont,
    readingGuide,
    colorBlindMode
  } = useA11y();
  
  // Count active accessibility features
  const activeFeatures = [
    highContrast, 
    largeText, 
    reducedMotion, 
    focusMode,
    soundFeedback,
    dyslexicFont,
    readingGuide,
    colorBlindMode !== 'none'
  ].filter(Boolean).length;
  
  // Get descriptive text for screen readers
  const getAccessibilityDescription = () => {
    if (activeFeatures === 0) {
      return t('accessibility.noFeaturesActive', 'لا توجد ميزات إمكانية وصول مفعّلة');
    }
    
    const features = [];
    if (highContrast) features.push(t('accessibility.highContrast', 'وضع التباين العالي'));
    if (largeText) features.push(t('accessibility.largeText', 'النص الكبير'));
    if (reducedMotion) features.push(t('accessibility.reducedMotion', 'تقليل الحركة'));
    if (focusMode) features.push(t('accessibility.focusMode', 'وضع التركيز'));
    if (dyslexicFont) features.push(t('accessibility.dyslexicFont', 'خط عسر القراءة'));
    if (readingGuide) features.push(t('accessibility.readingGuide', 'دليل القراءة'));
    if (colorBlindMode !== 'none') features.push(t('accessibility.colorAdjustment', 'تعديل الألوان'));
    if (soundFeedback) features.push(t('accessibility.soundFeedback', 'ردود الصوت'));
    
    return t('accessibility.activeFeatures', 'ميزات مفعّلة: ') + features.join('، ');
  };
  
  return (
    <Button
      variant="outline"
      size="sm"
      className={`relative ${className}`}
      onClick={onClick}
      aria-label={t('accessibility.toggleSettings', 'إعدادات إمكانية الوصول')}
      aria-describedby="a11y-features-description"
      {...props}
    >
      <span className="sr-only" id="a11y-features-description">
        {getAccessibilityDescription()}
      </span>
      
      <Accessibility className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">
        {t('accessibility.settings', 'إمكانية الوصول')}
      </span>
      
      {activeFeatures > 0 && (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2"
        >
          <Badge 
            variant="default" 
            className="bg-primary text-primary-foreground h-5 min-w-5 flex items-center justify-center p-0 text-xs"
          >
            {activeFeatures}
          </Badge>
        </motion.div>
      )}
    </Button>
  );
}
