
import { useState, useEffect } from 'react';

interface ConfigState {
  features: Record<string, boolean>;
}

export function useConfig() {
  const [config, setConfig] = useState<ConfigState>({
    features: {
      keyboardNavigation: true,
      aiAssistant: true,
      networkScanner: true,
      wifiAnalyzer: true,
      securityTools: true,
      performanceMonitoring: true,
      fiberOpticTools: true,
      developerMode: false
    }
  });

  useEffect(() => {
    // Load config from localStorage if available
    const savedConfig = localStorage.getItem('app-config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (e) {
        console.error('Failed to parse saved config', e);
      }
    }
  }, []);

  const updateConfig = (newConfig: Partial<ConfigState>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem('app-config', JSON.stringify(updated));
      return updated;
    });
  };

  const updateFeature = (featureId: string, enabled: boolean) => {
    setConfig(prev => {
      const updated = {
        ...prev,
        features: {
          ...prev.features,
          [featureId]: enabled
        }
      };
      localStorage.setItem('app-config', JSON.stringify(updated));
      return updated;
    });
  };

  const isFeatureEnabled = (featureId: string, defaultValue = false): boolean => {
    return config.features[featureId] ?? defaultValue;
  };

  return {
    config,
    updateConfig,
    updateFeature,
    isFeatureEnabled
  };
}
