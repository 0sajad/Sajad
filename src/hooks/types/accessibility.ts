
export interface AccessibilityProfile {
  name: string;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  dyslexiaFont: boolean;
  textSpacing: boolean;
  underlineLinks: boolean;
  customCursor: boolean;
  invertColors: boolean;
  monochrome: boolean;
}

export interface A11yPreferencesState {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  dyslexiaFont: boolean;
  textSpacing: boolean;
  underlineLinks: boolean;
  customCursor: boolean;
  invertColors: boolean;
  monochrome: boolean;
}

// Add the A11ySettings interface needed by profile-related hooks
export interface A11ySettings {
  highContrast?: boolean;
  largeText?: boolean;
  reducedMotion?: boolean;
  focusMode?: boolean;
  colorBlindMode?: string | null;
  dyslexicFont?: boolean;
  readingGuide?: boolean;
  soundFeedback?: boolean;
  fontFamily?: string;
  lineHeight?: number;
  letterSpacing?: number;
  kashidaEnabled?: boolean;
  dyslexiaFont?: boolean;
  textSpacing?: boolean;
  underlineLinks?: boolean;
  customCursor?: boolean;
  invertColors?: boolean;
  monochrome?: boolean;
}
