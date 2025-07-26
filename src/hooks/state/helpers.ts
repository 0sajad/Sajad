import { useAppState } from './use-app-state';

export const useNetworkStatus = () => {
  const { 
    isConnected, 
    isOnline, 
    lastCheck, 
    networkStatus, 
    checkNetworkStatus,
    setNetworkStatus,
    handleOfflineStatus,
    handleOnlineStatus
  } = useAppState();

  return {
    isConnected,
    isOnline,
    lastCheck,
    networkStatus,
    checkNetworkStatus,
    setNetworkStatus,
    handleOfflineStatus,
    handleOnlineStatus
  };
};

export const useAppPreferences = () => {
  const { preferences, setPreference, resetPreferences } = useAppState();

  return {
    preferences,
    setPreference,
    resetPreferences
  };
};

export const useDataLoading = () => {
  const { dataLoading } = useAppState();

  return {
    ...dataLoading,
    setLoading: (loading: boolean) => {},
    setError: (error: Error | null) => {},
    setLastUpdated: (date: Date | null) => {}
  };
};

export const useAccessibilityState = () => {
  const {
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    colorBlindMode,
    dyslexicFont,
    soundFeedback,
    keyboardNavigationVisible,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setReadingGuide,
    setColorBlindMode,
    setDyslexicFont,
    setSoundFeedback,
    setKeyboardNavigationVisible
  } = useAppState();

  return {
    highContrast,
    largeText,
    reducedMotion,
    focusMode,
    readingGuide,
    colorBlindMode,
    dyslexicFont,
    soundFeedback,
    keyboardNavigationVisible,
    setHighContrast,
    setLargeText,
    setReducedMotion,
    setFocusMode,
    setReadingGuide,
    setColorBlindMode,
    setDyslexicFont,
    setSoundFeedback,
    setKeyboardNavigationVisible
  };
};

export const usePerformanceState = () => {
  const {
    deviceTier,
    isLowEndDevice,
    setDeviceTier,
    optimizeForLowEndDevice,
    restoreDefaultPerformance
  } = useAppState();

  return {
    deviceTier,
    isLowEndDevice,
    setDeviceTier,
    optimizeForLowEndDevice,
    restoreDefaultPerformance
  };
};