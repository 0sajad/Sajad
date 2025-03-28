
import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  isSafari: boolean;
  isFirefox: boolean;
  isChrome: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isWindows: boolean;
  isMacOS: boolean;
  isLinux: boolean;
  browserName: string;
  osName: string;
  orientation: 'portrait' | 'landscape';
}

/**
 * خطاف للكشف عن معلومات الجهاز والمتصفح
 */
export function useDeviceDetector(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isTouch: false,
    isSafari: false,
    isFirefox: false,
    isChrome: false,
    isIOS: false,
    isAndroid: false,
    isWindows: false,
    isMacOS: false,
    isLinux: false,
    browserName: '',
    osName: '',
    orientation: 'portrait',
  });
  
  useEffect(() => {
    const detectDevice = () => {
      if (typeof window === 'undefined' || typeof navigator === 'undefined') {
        return;
      }
      
      const userAgent = navigator.userAgent.toLowerCase();
      
      // الكشف عن المتصفح
      const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent);
      const isFirefox = /firefox/.test(userAgent);
      const isChrome = /chrome/.test(userAgent) && !/edg/.test(userAgent);
      const isEdge = /edg/.test(userAgent);
      const isOpera = /opr/.test(userAgent) || /opera/.test(userAgent);
      
      // الكشف عن نظام التشغيل
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isAndroid = /android/.test(userAgent);
      const isWindows = /windows nt/.test(userAgent);
      const isMacOS = /macintosh|mac os x/.test(userAgent) && !isIOS;
      const isLinux = /linux/.test(userAgent) && !isAndroid;
      
      // تحديد اسم نظام التشغيل
      let osName = 'Unknown';
      if (isIOS) osName = 'iOS';
      else if (isAndroid) osName = 'Android';
      else if (isWindows) osName = 'Windows';
      else if (isMacOS) osName = 'macOS';
      else if (isLinux) osName = 'Linux';
      
      // تحديد اسم المتصفح
      let browserName = 'Unknown';
      if (isSafari) browserName = 'Safari';
      else if (isFirefox) browserName = 'Firefox';
      else if (isEdge) browserName = 'Edge';
      else if (isOpera) browserName = 'Opera';
      else if (isChrome) browserName = 'Chrome';
      
      // الكشف عن نوع الجهاز
      const isMobileDevice = /android|webos|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent);
      const isTabletDevice = /ipad|android(?!.*mobile)/.test(userAgent) || 
        (window.innerWidth >= 600 && window.innerWidth < 1200 && ('ontouchstart' in window));
      
      // تحديد اتجاه الشاشة
      const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      
      setDeviceInfo({
        isMobile: isMobileDevice && !isTabletDevice,
        isTablet: isTabletDevice,
        isDesktop: !isMobileDevice && !isTabletDevice,
        isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        isSafari,
        isFirefox,
        isChrome,
        isIOS,
        isAndroid,
        isWindows,
        isMacOS,
        isLinux,
        browserName,
        osName,
        orientation,
      });
    };
    
    // الكشف الأولي عن الجهاز
    detectDevice();
    
    // إعادة الكشف عند تغيير حجم النافذة لتحديث الاتجاه وحجم الشاشة
    const handleResize = () => {
      const newOrientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      setDeviceInfo(prev => ({
        ...prev,
        orientation: newOrientation,
      }));
    };
    
    window.addEventListener('resize', handleResize);
    
    // تنظيف المستمع عند إلغاء تحميل المكون
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return deviceInfo;
}
