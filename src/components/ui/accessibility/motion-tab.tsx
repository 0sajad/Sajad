
import React from "react";
import { ZoomIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { AccessibilityToggle } from "./accessibility-toggle";

export function MotionTab() {
  const { t } = useTranslation();
  const { reducedMotion, setReducedMotion } = useA11y();

  // إعلان التغييرات لقارئات الشاشة
  const announceChange = (feature: string, state: boolean) => {
    const featureName = t(`accessibility.${feature}`);
    const stateText = state ? t('accessibility.enabled') : t('accessibility.disabled');
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = t('accessibility.ariaLiveAnnouncement', { 
      feature: featureName, 
      state: stateText 
    });
    document.body.appendChild(announcement);
    
    // إزالة الإعلان بعد قراءته
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 3000);
  };

  const handleToggleReducedMotion = (checked: boolean) => {
    setReducedMotion(checked);
    announceChange('reducedMotion', checked);
  };

  return (
    <>
      <AccessibilityToggle
        id="a11y-reduced-motion"
        label={t('accessibility.reducedMotion')}
        icon={ZoomIn}
        checked={reducedMotion}
        onChange={handleToggleReducedMotion}
        shortcutKey="Alt+M"
        description={t('accessibility.reducedMotionDescription')}
      />
      
      <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
        <p>{t('accessibility.reducedMotionHint')}</p>
      </div>
    </>
  );
}
