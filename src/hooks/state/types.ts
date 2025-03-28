
export interface AppState {
  // Network status
  networkStatus: NetworkStatus;
  isOnline: boolean;
  
  // UI state
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isSearchOpen: boolean;
  activeSection: string | null;
  lastVisitedPage: string;
  
  // User state
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  userSettings: Record<string, any>;
  
  // Loading and errors
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  dataLoading: DataLoadingState;
  
  // Preferences
  preferences: AppPreferences;
  
  // Functions - UI
  toggleSidebar: () => void;
  toggleSettings: () => void;
  toggleSearch: () => void;
  setActiveSection: (section: string | null) => void;
  
  // Functions - User
  login: (userId: string, role: string) => void;
  logout: () => void;
  updateUserSettings: (settings: Record<string, any>) => void;
  
  // Functions - App status
  setIsLoading: (key: string, value: boolean) => void;
  setError: (key: string, value: string | null) => void;
  clearAllErrors: () => void;
  
  // Functions - Preferences
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
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
  telemetry: boolean;
  fullWidthLayout: boolean;
  compactMode: boolean;
}

export interface DataLoadingState {
  isLoading: boolean;
  lastUpdated: Date | null;
  error: string | null;
}

// Additional type definitions to support state slices
export interface UIState {
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  isSearchOpen: boolean;
  activeSection: string | null;
  lastVisitedPage: string;
  toggleSidebar: () => void;
  toggleSettings: () => void;
  toggleSearch: () => void;
  setActiveSection: (section: string | null) => void;
}

export interface UserState {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  userSettings: Record<string, any>;
  login: (userId: string, role: string) => void;
  logout: () => void;
  updateUserSettings: (settings: Record<string, any>) => void;
}

export interface AppStatusState {
  isOnline: boolean;
  isLoading: Record<string, boolean>;
  errors: Record<string, string | null>;
  setIsLoading: (key: string, value: boolean) => void;
  setError: (key: string, value: string | null) => void;
  clearAllErrors: () => void;
}

export interface PreferencesState {
  preferences: AppPreferences;
  setPreference: <K extends keyof AppPreferences>(key: K, value: AppPreferences[K]) => void;
}
