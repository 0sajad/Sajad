
import React from "react";
import { Eye, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { AccessibilityToggle } from "./accessibility-toggle";
import { cn } from "@/lib/utils";
import { ColorBlindMode } from "@/hooks/accessibility/useA11yColor";

export function ColorTab() {
  const { t } = useTranslation();
  const { 
    highContrast, setHighContrast,
    colorBlindMode, setColorBlindMode
  } = useA11y();

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

  const handleToggleHighContrast = (checked: boolean) => {
    setHighContrast(checked);
    announceChange('highContrast', checked);
  };
  
  const handleToggleColorBlindMode = (mode: ColorBlindMode) => {
    setColorBlindMode(mode);
    announceChange('colorBlindMode', mode !== 'none');
  };

  return (
    <>
      <AccessibilityToggle
        id="a11y-high-contrast"
        label={t('accessibility.highContrast')}
        icon={Eye}
        checked={highContrast}
        onChange={handleToggleHighContrast}
        shortcutKey="Alt+C"
        description={t('accessibility.highContrastDescription')}
      />
      
      <div className="space-y-2">
        <Label className="text-sm">{t('accessibility.colorBlindMode')}</Label>
        <div className="grid grid-cols-2 gap-2">
          {(["none", "protanopia", "deuteranopia", "tritanopia"] as ColorBlindMode[]).map((mode) => (
            <Button
              key={mode}
              variant="outline"
              size="sm"
              className={cn(
                "flex items-center justify-between",
                colorBlindMode === mode && "border-primary"
              )}
              onClick={() => handleToggleColorBlindMode(mode)}
            >
              <span>
                {mode !== 'none' ? t(`accessibility.${mode}`) : t('accessibility.normalVision')}
              </span>
              {colorBlindMode === mode && <Check className="h-3 w-3 ml-2" />}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
