export interface AppState {
  networkStatus: NetworkStatus;
  preferences: AppPreferences;
  dataLoading: DataLoadingState;
}

export interface NetworkStatus {
  isConnected: boolean;
  isOnline: boolean;
  lastCheck: Date | null;
}

export interface AppPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
  soundEffects: boolean;
  animations: boolean;
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  focusMode: boolean;
  arabicNumerals: boolean;
  autoSave: boolean;
}

export interface DataLoadingState {
  isLoading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}
