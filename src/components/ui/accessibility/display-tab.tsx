
import React from "react";
import { Type, MousePointer2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { AccessibilityToggle } from "./accessibility-toggle";

export function DisplayTab() {
  const { t } = useTranslation();
  const { 
    largeText, setLargeText,
    focusMode, setFocusMode,
    dyslexicFont, setDyslexicFont
  } = useA11y();

  // Announce changes to screen readers
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
    
    // Remove announcement after it's read
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 3000);
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
    <>
      <AccessibilityToggle
        id="a11y-large-text"
        label={t('accessibility.largeText')}
        icon={Type}
        checked={largeText}
        onChange={handleToggleLargeText}
        shortcutKey="Alt+T"
        descriptionId="large-text-desc"
      />
      <p id="large-text-desc" className="sr-only">{t('accessibility.largeTextDescription')}</p>
      
      <AccessibilityToggle
        id="a11y-focus-mode"
        label={t('accessibility.focusMode')}
        icon={MousePointer2}
        checked={focusMode}
        onChange={handleToggleFocusMode}
        shortcutKey="Alt+F"
        descriptionId="focus-mode-desc"
      />
      <p id="focus-mode-desc" className="sr-only">{t('accessibility.focusModeDescription')}</p>
      
      <AccessibilityToggle
        id="a11y-dyslexic-font"
        label={t('accessibility.dyslexicFont')}
        icon={Type}
        checked={dyslexicFont}
        onChange={handleToggleDyslexicFont}
        shortcutKey="Alt+D"
        descriptionId="dyslexic-font-desc"
      />
      <p id="dyslexic-font-desc" className="sr-only">{t('accessibility.dyslexicFontDescription')}</p>
    </>
  );
}
