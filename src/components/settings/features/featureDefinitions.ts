
import { 
  Shield, 
  Zap, 
  Cpu, 
  Server, 
  BrainCircuit, 
  Globe, 
  Network, 
  Wifi,
  ThermometerSun,
  WifiOff,
  ShieldOff,
  RefreshCcw
} from "lucide-react";
import React from "react";

export interface Feature {
  id: keyof FeatureState;
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  comingSoon?: boolean;
  info?: string;
  previewComponent?: React.ComponentType;
}

export interface FeatureState {
  zeroPower: boolean;
  holographicUI: boolean;
  networkIsolation: boolean;
  dnsOptimization: boolean;
  latencyHeatmap: boolean;
  trafficShaping: boolean;
  invisibleMode: boolean;
  networkCloning: boolean;
  multiNetwork: boolean;
  autoHealing: boolean;
  aiAssistant: boolean;
  signalBooster: boolean;
  darkWebProtection: boolean;
  deviceHeat: boolean;
}

export const createInitialFeatureState = (): FeatureState => ({
  zeroPower: false,
  holographicUI: false,
  networkIsolation: false,
  dnsOptimization: false,
  latencyHeatmap: false,
  trafficShaping: false,
  invisibleMode: false,
  networkCloning: false,
  multiNetwork: false,
  autoHealing: false,
  aiAssistant: false,
  signalBooster: false,
  darkWebProtection: false,
  deviceHeat: false
});
