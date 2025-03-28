
import React from "react";
import { Eye, Type, MousePointer2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { AccessibilityToggle } from "./accessibility-toggle";

export function DisplayTab() {
  const { t } = useTranslation();
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    focusMode, setFocusMode,
    dyslexicFont, setDyslexicFont
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
  
  const handleToggleLargeText = (checked: boolean) => {
    setLargeText(checked);
    announceChange('largeText', checked);
  };
  
  const handleToggleFocusMode = (checked: boolean) => {
    setFocusMode(checked);
    announceChange('focusMode', checked);
  };
  
  const handleToggleDyslexicFont = (checked: boolean) => {
    setDyslexicFont(checked);
    announceChange('dyslexicFont', checked);
  };

  return (
    <div className="space-y-4">
      <AccessibilityToggle
        id="a11y-high-contrast"
        label={t('accessibility.highContrast')}
        icon={Eye}
        checked={highContrast}
        onChange={handleToggleHighContrast}
        shortcutKey="Alt+C"
        description={t('accessibility.highContrastDescription')}
      />
      
      <AccessibilityToggle
        id="a11y-large-text"
        label={t('accessibility.largeText')}
        icon={Type}
        checked={largeText}
        onChange={handleToggleLargeText}
        shortcutKey="Alt+T"
        description={t('accessibility.largeTextDescription')}
      />
      
      <AccessibilityToggle
        id="a11y-focus-mode"
        label={t('accessibility.focusMode')}
        icon={MousePointer2}
        checked={focusMode}
        onChange={handleToggleFocusMode}
        shortcutKey="Alt+F"
        description={t('accessibility.focusModeDescription')}
      />
      
      <AccessibilityToggle
        id="a11y-dyslexic-font"
        label={t('accessibility.dyslexicFont')}
        icon={Type}
        checked={dyslexicFont}
        onChange={handleToggleDyslexicFont}
        shortcutKey="Alt+D"
        description={t('accessibility.dyslexicFontDescription')}
      />
      
      <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground">
        <p>{t('accessibility.displayFeatureHint')}</p>
      </div>
    </div>
  );
}
