
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
