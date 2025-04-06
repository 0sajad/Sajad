
import { useState, useEffect } from 'react';

interface DeviceInfo {
  deviceTier: 'low' | 'medium' | 'high';
  isLowEndDevice: boolean;
  isHighEndDevice: boolean;
  cpuCores: number;
  memory: number | null;
  isSlowConnection: boolean;
  isTouch: boolean;
  isMobile: boolean;
}

// Extend Navigator interface to include connection property
interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string;
    saveData?: boolean;
    addEventListener: (type: string, listener: EventListener) => void;
    removeEventListener: (type: string, listener: EventListener) => void;
  };
  deviceMemory?: number;
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceTier: 'medium',
    isLowEndDevice: false,
    isHighEndDevice: false,
    cpuCores: navigator.hardwareConcurrency || 4,
    memory: null,
    isSlowConnection: false,
    isTouch: false,
    isMobile: false
  });

  useEffect(() => {
    // تحديد القدرة الحوسبية
    const detectDeviceCapabilities = () => {
      try {
        // Cast navigator to our extended interface
        const nav = navigator as NavigatorWithConnection;
        
        // تحديد عدد النوى
        const cpuCores = nav.hardwareConcurrency || 4;
        
        // محاولة تحديد ذاكرة الجهاز (متاحة فقط في بعض المتصفحات)
        const memory = nav.deviceMemory || null;
        
        // تحديد ما إذا كانت الشبكة بطيئة
        const isSlowConnection = !!(nav.connection && 
          (nav.connection.effectiveType === '2g' || 
           nav.connection.effectiveType === 'slow-2g' ||
           nav.connection.saveData));
        
        // تحديد ما إذا كان جهاز لمس
        const isTouch = (('ontouchstart' in window) || 
                        (nav.maxTouchPoints > 0) || 
                        ((nav as any).msMaxTouchPoints > 0));
        
        // تحديد ما إذا كان جهاز متنقل
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nav.userAgent);
        
        // تحديد مستوى الجهاز
        let deviceTier: 'low' | 'medium' | 'high' = 'medium';
        let isLowEndDevice = false;
        let isHighEndDevice = false;
        
        if (cpuCores <= 2 || memory && memory <= 2 || isSlowConnection) {
          deviceTier = 'low';
          isLowEndDevice = true;
        } else if (cpuCores >= 8 && memory && memory >= 8) {
          deviceTier = 'high';
          isHighEndDevice = true;
        }
        
        // الاستماع لتغييرات اتصال الشبكة إن أمكن
        if (nav.connection) {
          nav.connection.addEventListener('change', detectDeviceCapabilities);
        }
        
        setDeviceInfo({
          deviceTier,
          isLowEndDevice,
          isHighEndDevice,
          cpuCores,
          memory,
          isSlowConnection,
          isTouch,
          isMobile
        });
      } catch (error) {
        console.error('فشل اكتشاف قدرات الجهاز:', error);
        setDeviceInfo({
          deviceTier: 'medium',
          isLowEndDevice: false,
          isHighEndDevice: false,
          cpuCores: navigator.hardwareConcurrency || 4,
          memory: null,
          isSlowConnection: false,
          isTouch: false,
          isMobile: false
        });
      }
    };
    
    detectDeviceCapabilities();
    
    // تنظيف مستمعي الأحداث عند تفكيك المكون
    return () => {
      try {
        const nav = navigator as NavigatorWithConnection;
        if (nav.connection) {
          nav.connection.removeEventListener('change', detectDeviceCapabilities);
        }
      } catch (e) {
        // تجاهل الأخطاء عند التنظيف
      }
    };
  }, []);

  return deviceInfo;
}
