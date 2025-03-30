
import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";

export function DisplayTab() {
  const { t } = useTranslation();
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    dyslexicFont, setDyslexicFont,
    reducedMotion,
    soundFeedback,
    announce,
    playNotificationSound
  } = useA11y();
  
  // المساعدة في الإعلان عن تغييرات إمكانية الوصول
  const announceChange = (feature: string, state: boolean) => {
    const featureName = t(`accessibility.${feature}`);
    const stateText = state ? t('accessibility.enabled') : t('accessibility.disabled');
    
    announce(`${featureName} ${stateText}`, "polite");
    
    if (soundFeedback) {
      playNotificationSound(state ? "success" : "info");
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Label htmlFor="high-contrast" className="font-medium">
            {t('accessibility.highContrast')}
          </Label>
          <span className="text-xs text-muted-foreground">
            {t('accessibility.highContrastDescription')}
          </span>
        </div>
        <Switch
          id="high-contrast"
          checked={highContrast}
          onCheckedChange={(checked) => {
            setHighContrast(checked);
            announceChange('highContrast', checked);
          }}
          aria-label={t('accessibility.highContrast')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Label htmlFor="large-text" className="font-medium">
            {t('accessibility.largeText')}
          </Label>
          <span className="text-xs text-muted-foreground">
            {t('accessibility.largeTextDescription')}
          </span>
        </div>
        <Switch
          id="large-text"
          checked={largeText}
          onCheckedChange={(checked) => {
            setLargeText(checked);
            announceChange('largeText', checked);
          }}
          aria-label={t('accessibility.largeText')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Label htmlFor="dyslexic-font" className="font-medium">
            {t('accessibility.dyslexicFont')}
          </Label>
          <span className="text-xs text-muted-foreground">
            {t('accessibility.dyslexicFontDescription')}
          </span>
        </div>
        <Switch
          id="dyslexic-font"
          checked={dyslexicFont}
          onCheckedChange={(checked) => {
            setDyslexicFont(checked);
            announceChange('dyslexicFont', checked);
          }}
          aria-label={t('accessibility.dyslexicFont')}
        />
      </div>
    </motion.div>
  );
}
