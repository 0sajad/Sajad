
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
        // تحديد عدد النوى
        const cpuCores = navigator.hardwareConcurrency || 4;
        
        // محاولة تحديد ذاكرة الجهاز (متاحة فقط في بعض المتصفحات)
        const memory = (navigator as any).deviceMemory || null;
        
        // تحديد ما إذا كانت الشبكة بطيئة
        const isSlowConnection = !!(navigator.connection && 
          ((navigator.connection as any).effectiveType === '2g' || 
           (navigator.connection as any).effectiveType === 'slow-2g' ||
           (navigator.connection as any).saveData));
        
        // تحديد ما إذا كان جهاز لمس
        const isTouch = (('ontouchstart' in window) || 
                        (navigator.maxTouchPoints > 0) || 
                        ((navigator as any).msMaxTouchPoints > 0));
        
        // تحديد ما إذا كان جهاز متنقل
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
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
        const connection = (navigator as any).connection;
        if (connection) {
          connection.addEventListener('change', detectDeviceCapabilities);
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
        const connection = (navigator as any).connection;
        if (connection) {
          connection.removeEventListener('change', detectDeviceCapabilities);
        }
      } catch (e) {
        // تجاهل الأخطاء عند التنظيف
      }
    };
  }, []);

  return deviceInfo;
}
