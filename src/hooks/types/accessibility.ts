
// Define accessibility-related types

export type ColorBlindMode = "none" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";

export interface AccessibilityProfile {
  id: string;
  name: string;
  settings: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
    dyslexicFont: boolean;
    soundFeedback: boolean;
    colorBlindMode: ColorBlindMode;
    focusMode: boolean;
    readingGuide: boolean;
    keyboardNavigationVisible: boolean;
  };
}

export interface AccessibilityState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  dyslexicFont: boolean;
  focusMode: boolean;
  readingGuide: boolean;
  soundFeedback: boolean;
  colorBlindMode: ColorBlindMode;
  keyboardNavigationVisible: boolean;
  profiles: AccessibilityProfile[];
  activeProfileId: string | null;
}

export interface A11ySettings {
  highContrast?: boolean;
  largeText?: boolean;
  reducedMotion?: boolean;
  focusMode?: boolean;
  colorBlindMode?: ColorBlindMode;
  dyslexicFont?: boolean;
  readingGuide?: boolean;
  soundFeedback?: boolean;
  fontFamily?: string;
  lineHeight?: number;
  letterSpacing?: number;
  kashidaEnabled?: boolean;
  updatedAt?: string;
  version?: number;
}
