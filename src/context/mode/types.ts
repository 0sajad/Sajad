
export type ModeType = "client" | "developer";

export interface ModeFeatures {
  [key: string]: boolean;
}

export interface ModeContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  isDeveloperMode: boolean;
  features: ModeFeatures;
  toggleFeature: (featureId: string) => void;
  updateFeature: (featureId: string, enabled: boolean) => void;
  applyConfiguration: () => void;
  isSyncing: boolean;
  lastSyncTime: Date | null;
  checkForUpdates: () => Promise<boolean>;
}

export interface FeatureValidationResult {
  valid: boolean;
  message: string;
}
