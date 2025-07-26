
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Feature {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
}

interface ModeContextType {
  mode: 'light' | 'dark';
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  isDeveloperMode: boolean;
  features: Feature[];
  applyConfiguration: () => void;
  isSyncing: boolean;
  lastSyncTime: Date | null;
  checkForUpdates: () => Promise<void>;
  updateFeature: (id: string, enabled: boolean) => void;
  toggleFeature: (id: string) => void;
  changeLanguage: (lang: string) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [features, setFeatures] = useState<Feature[]>([
    { id: 'networkScanner', name: 'Network Scanner', enabled: true },
    { id: 'networkMonitoring', name: 'Network Monitoring', enabled: true },
    { id: 'aiAssistant', name: 'AI Assistant', enabled: true },
    { id: 'simulation', name: 'Simulation', enabled: true },
    { id: 'realTimeMonitor', name: 'Real-time Monitor', enabled: true },
    { id: 'dnsOptimization', name: 'DNS Optimization', enabled: true },
    { id: 'advancedSecurity', name: 'Advanced Security', enabled: true },
    { id: 'invisibleMode', name: 'Invisible Mode', enabled: false },
    { id: 'darkWebProtection', name: 'Dark Web Protection', enabled: false },
    { id: 'networkIsolation', name: 'Network Isolation', enabled: false }
  ]);

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  const applyConfiguration = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime(new Date());
    }, 2000);
  };

  const checkForUpdates = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSyncing(false);
  };

  const updateFeature = (id: string, enabled: boolean) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled } : f));
  };

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };

  const changeLanguage = (lang: string) => {
    // تنفيذ تغيير اللغة
  };

  const value = {
    mode,
    toggleMode,
    setMode,
    isDeveloperMode,
    features,
    applyConfiguration,
    isSyncing,
    lastSyncTime,
    checkForUpdates,
    updateFeature,
    toggleFeature,
    changeLanguage
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
