
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useA11y } from "@/hooks/useA11y";
import { Slider } from "@/components/ui/slider";

export function MotionTab() {
  const { t } = useTranslation();
  const { 
    reducedMotion, setReducedMotion,
    soundFeedback, 
    announce,
    playSound 
  } = useA11y();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="reduced-motion" className="text-base">
              {t('accessibility.reducedMotion')}
            </Label>
            <p className="text-sm text-muted-foreground">
              {t('accessibility.reducedMotionDescription')}
            </p>
          </div>
          <Switch
            id="reduced-motion"
            checked={reducedMotion}
            onCheckedChange={(checked) => {
              setReducedMotion(checked);
              announce(
                checked 
                  ? t('accessibility.reducedMotionEnabled') 
                  : t('accessibility.reducedMotionDisabled')
              );
              if (soundFeedback) {
                playSound(checked ? "success" : "info");
              }
            }}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label className="text-base">
          {t('accessibility.animationSpeed')}
        </Label>
        <p className="text-sm text-muted-foreground mb-6">
          {t('accessibility.animationSpeedDescription')}
        </p>
        <div className="px-1">
          <Slider
            defaultValue={[50]}
            min={0}
            max={100}
            step={10}
            disabled={reducedMotion}
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{t('accessibility.slower')}</span>
            <span>{t('accessibility.faster')}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
