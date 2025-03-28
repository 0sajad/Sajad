
import { useState, useEffect } from 'react';

interface ConfigOptions {
  showKeyboardHelp: boolean;
  enableAdvancedFeatures: boolean;
  enableDeveloperTools: boolean;
  enableExperimentalFeatures: boolean;
}

export function useConfig() {
  const [config, setConfig] = useState<ConfigOptions>(() => {
    try {
      const savedConfig = localStorage.getItem('app-config');
      return savedConfig ? JSON.parse(savedConfig) : {
        showKeyboardHelp: true,
        enableAdvancedFeatures: false,
        enableDeveloperTools: false,
        enableExperimentalFeatures: false
      };
    } catch (e) {
      console.error('Error loading configuration:', e);
      return {
        showKeyboardHelp: true,
        enableAdvancedFeatures: false,
        enableDeveloperTools: false,
        enableExperimentalFeatures: false
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('app-config', JSON.stringify(config));
    } catch (e) {
      console.error('Error saving configuration:', e);
    }
  }, [config]);

  const updateConfig = (updates: Partial<ConfigOptions>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return {
    config,
    updateConfig
  };
}
