
import { useState, useEffect } from 'react';
import { useDyslexiaFeatures, useTextSpacingFeatures, useLinkFeatures } from './accessibility/useA11yFeatures';
import { useA11yCore } from './accessibility/useA11yCore';
import { useA11yText } from './accessibility/useA11yText';
import { useA11yColor } from './accessibility/useA11yColor';
import { useCursorFeatures, useColorInversionFeatures, useMonochromeFeatures } from './accessibility/useA11yVisualEffects';

/**
 * Hook to manage all accessibility features
 */
export function useA11y() {
  // Core accessibility features
  const {
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11yCore();
  
  // Text-related features
  const {
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide
  } = useA11yText();
  
  // Color-related features
  const { colorBlindMode, setColorBlindMode } = useA11yColor();
  
  // Visual effects features
  const { customCursor, setCustomCursor } = useCursorFeatures();
  const { invertColors, setInvertColors } = useColorInversionFeatures();
  const { monochrome, setMonochrome } = useMonochromeFeatures();
  
  // Text spacing & link features
  const { dyslexiaFont, setDyslexiaFont } = useDyslexiaFeatures();
  const { textSpacing, setTextSpacing } = useTextSpacingFeatures();
  const { underlineLinks, setUnderlineLinks } = useLinkFeatures();
  
  return {
    // Core features
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode,
    
    // Text features
    dyslexicFont, setDyslexicFont,
    readingGuide, setReadingGuide,
    
    // Color features
    colorBlindMode, setColorBlindMode,
    
    // Visual effects
    customCursor, setCustomCursor,
    invertColors, setInvertColors,
    monochrome, setMonochrome,
    
    // Text formatting
    dyslexiaFont, setDyslexiaFont,
    textSpacing, setTextSpacing,
    underlineLinks, setUnderlineLinks
  };
}
