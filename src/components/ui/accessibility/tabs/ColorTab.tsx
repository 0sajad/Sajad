
import React from "react";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { ColorBlindFilter } from "../color-blind-filter";

export function ColorTab() {
  const { t } = useTranslation();
  const { 
    reducedMotion,
    colorBlindMode, setColorBlindMode,
    soundFeedback, setSoundFeedback,
    announce,
    playNotificationSound
  } = useA11y();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label className="font-medium">
          {t('accessibility.colorBlindMode')}
        </Label>
        <ColorBlindFilter
          value={colorBlindMode}
          onChange={(value) => {
            setColorBlindMode(value);
            const modeTranslationKey = value === 'none' ? 'normalVision' : value;
            announce(t(`accessibility.${modeTranslationKey}`), "polite");
            if (soundFeedback) {
              playNotificationSound("info");
            }
          }}
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Label htmlFor="sound-feedback" className="font-medium">
            {t('accessibility.soundFeedback')}
          </Label>
          <span className="text-xs text-muted-foreground">
            {t('accessibility.soundFeedbackDescription')}
          </span>
        </div>
        <Switch
          id="sound-feedback"
          checked={soundFeedback}
          onCheckedChange={(checked) => {
            setSoundFeedback(checked);
            const featureName = t('accessibility.soundFeedback');
            const stateText = checked ? t('accessibility.enabled') : t('accessibility.disabled');
            
            announce(`${featureName} ${stateText}`, "polite");
            if (checked) {
              playNotificationSound("success");
            }
          }}
          aria-label={t('accessibility.soundFeedback')}
        />
      </div>
    </motion.div>
  );
}
