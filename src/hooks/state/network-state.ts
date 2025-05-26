
import { atom } from 'jotai';

export interface NetworkDevice {
  id: string;
  name: string;
  ip: string;
  mac: string;
  type: 'router' | 'computer' | 'phone' | 'tablet' | 'tv' | 'printer' | 'unknown';
  status: 'online' | 'offline';
  lastSeen: Date;
  manufacturer?: string;
  signal?: number;
}

export interface NetworkInfo {
  ssid: string;
  bssid: string;
  frequency: number;
  signal: number;
  security: string[];
  connected: boolean;
}

export interface NetworkStats {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  packetLoss: number;
  jitter: number;
}

// حالة الشبكة الأساسية
export const networkDevicesAtom = atom<NetworkDevice[]>([]);
export const networkInfoAtom = atom<NetworkInfo | null>(null);
export const networkStatsAtom = atom<NetworkStats | null>(null);
export const isOnlineAtom = atom<boolean>(true);

// حالة فحص الشبكة
export const isScanningAtom = atom<boolean>(false);
export const scanProgressAtom = atom<number>(0);

// استخدام Web APIs بدلاً من Electron
export const getNetworkInfoWeb = async (): Promise<NetworkInfo | null> => {
  try {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      return {
        ssid: 'Unknown',
        bssid: 'Unknown',
        frequency: 2400,
        signal: -50,
        security: ['WPA2'],
        connected: navigator.onLine
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting network info:', error);
    return null;
  }
};

export const scanNetworkDevicesWeb = async (): Promise<NetworkDevice[]> => {
  // في بيئة الويب، نعيد أجهزة وهمية للعرض
  return [
    {
      id: '1',
      name: 'Router',
      ip: '192.168.1.1',
      mac: '00:11:22:33:44:55',
      type: 'router',
      status: 'online',
      lastSeen: new Date(),
      manufacturer: 'Unknown'
    },
    {
      id: '2',
      name: 'Your Device',
      ip: '192.168.1.100',
      mac: '66:77:88:99:AA:BB',
      type: 'computer',
      status: 'online',
      lastSeen: new Date(),
      manufacturer: 'Unknown'
    }
  ];
};
