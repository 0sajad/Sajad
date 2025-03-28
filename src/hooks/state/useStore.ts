
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

// إضافة نسخة متوافقة مع واجهة البرمجة المستخدمة في الخطافات الأخرى
export const useAppState = () => {
  const { deviceTier, setDeviceTier } = useStore();
  return { deviceTier, setDeviceTier };
};
