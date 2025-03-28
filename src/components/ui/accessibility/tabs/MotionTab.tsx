
import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";

export function MotionTab() {
  const { t } = useTranslation();
  const { 
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    readingGuide, setReadingGuide,
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
          <Label htmlFor="reduced-motion" className="font-medium">
            {t('accessibility.reducedMotion')}
          </Label>
          <span className="text-xs text-muted-foreground">
            {t('accessibility.reducedMotionDescription')}
          </span>
        </div>
        <Switch
          id="reduced-motion"
          checked={reducedMotion}
          onCheckedChange={(checked) => {
            setReducedMotion(checked);
            announceChange('reducedMotion', checked);
          }}
          aria-label={t('accessibility.reducedMotion')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Label htmlFor="focus-mode" className="font-medium">
            {t('accessibility.focusMode')}
          </Label>
          <span className="text-xs text-muted-foreground">
            {t('accessibility.focusModeDescription')}
          </span>
        </div>
        <Switch
          id="focus-mode"
          checked={focusMode}
          onCheckedChange={(checked) => {
            setFocusMode(checked);
            announceChange('focusMode', checked);
          }}
          aria-label={t('accessibility.focusMode')}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Label htmlFor="reading-guide" className="font-medium">
            {t('accessibility.readingGuide')}
          </Label>
          <span className="text-xs text-muted-foreground">
            {t('accessibility.readingGuideDescription')}
          </span>
        </div>
        <Switch
          id="reading-guide"
          checked={readingGuide}
          onCheckedChange={(checked) => {
            setReadingGuide(checked);
            announceChange('readingGuide', checked);
          }}
          aria-label={t('accessibility.readingGuide')}
        />
      </div>
    </motion.div>
  );
}
