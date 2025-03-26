
import { useA11y } from './useA11y';
import { useDyslexiaFeatures, useTextSpacingFeatures, useLinkFeatures } from './accessibility/useA11yFeatures';
import { useCursorFeatures, useColorInversionFeatures, useMonochromeFeatures } from './accessibility/useA11yVisualEffects';
import { useAccessibilityProfiles } from './accessibility/useA11yProfiles';
import { AccessibilityProfile } from './types/accessibility';

export function useA11yPreferences() {
  // Core accessibility features from useA11y
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode 
  } = useA11y();
  
  // Text-specific features
  const { dyslexiaFont, setDyslexiaFont } = useDyslexiaFeatures();
  const { textSpacing, setTextSpacing } = useTextSpacingFeatures();
  const { underlineLinks, setUnderlineLinks } = useLinkFeatures();
  
  // Visual effects features
  const { customCursor, setCustomCursor } = useCursorFeatures();
  const { invertColors, setInvertColors } = useColorInversionFeatures();
  const { monochrome, setMonochrome } = useMonochromeFeatures();
  
  // Profile management
  const { savedProfiles, saveProfile, deleteProfile } = useAccessibilityProfiles();
  
  // Save current profile
  const saveCurrentProfile = (name: string) => {
    const newProfile = saveProfile(name, {
      highContrast,
      largeText,
      reducedMotion,
      focusMode,
      dyslexiaFont,
      textSpacing,
      underlineLinks,
      customCursor,
      invertColors,
      monochrome
    });
    
    return newProfile;
  };
  
  // Apply a saved profile
  const applyProfile = (profile: AccessibilityProfile) => {
    setHighContrast(profile.highContrast);
    setLargeText(profile.largeText);
    setReducedMotion(profile.reducedMotion);
    setFocusMode(profile.focusMode);
    setDyslexiaFont(profile.dyslexiaFont);
    setTextSpacing(profile.textSpacing);
    setUnderlineLinks(profile.underlineLinks);
    setCustomCursor(profile.customCursor);
    setInvertColors(profile.invertColors);
    setMonochrome(profile.monochrome);
  };
  
  // Reset all settings
  const resetAllSettings = () => {
    setHighContrast(false);
    setLargeText(false);
    setReducedMotion(false);
    setFocusMode(false);
    setDyslexiaFont(false);
    setTextSpacing(false);
    setUnderlineLinks(false);
    setCustomCursor(false);
    setInvertColors(false);
    setMonochrome(false);
  };

  return {
    // Core settings from useA11y
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    
    // Text-specific features
    dyslexiaFont, setDyslexiaFont,
    textSpacing, setTextSpacing,
    underlineLinks, setUnderlineLinks,
    
    // Visual effects features
    customCursor, setCustomCursor,
    invertColors, setInvertColors,
    monochrome, setMonochrome,
    
    // Profile management
    savedProfiles,
    saveCurrentProfile,
    applyProfile,
    deleteProfile,
    resetAllSettings
  };
}
