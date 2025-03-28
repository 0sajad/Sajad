
import { create } from 'zustand';

type DeviceTier = 'high' | 'medium' | 'low';

interface StoreState {
  deviceTier: DeviceTier | null;
  setDeviceTier: (tier: DeviceTier) => void;
}

export const useStore = create<StoreState>((set) => ({
  deviceTier: null,
  setDeviceTier: (tier) => set({ deviceTier: tier }),
}));
