
/**
 * خطافات الشبكة
 * سيتم استيراد جميع خطافات الشبكة من هنا
 */

import { useState, useEffect, useCallback } from 'react';
import { checkNetworkConnection, estimateConnectionSpeed, detectNetworkType } from '../utils';

// خطاف للتحقق من حالة الاتصال بالشبكة
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  
  const checkConnection = useCallback(async () => {
    const status = await checkNetworkConnection();
    setIsOnline(status);
    setLastChecked(new Date());
    return status;
  }, []);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // تحقق من الاتصال عند التحميل
    checkConnection();
    
    // تحقق دوري من الاتصال كل 30 ثانية
    const interval = setInterval(checkConnection, 30000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [checkConnection]);
  
  return { isOnline, lastChecked, checkConnection };
};

// خطاف لقياس سرعة الشبكة
export const useNetworkSpeed = () => {
  const [speed, setSpeed] = useState<number>(0);
  const [quality, setQuality] = useState<string>('جاري القياس...');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const measureSpeed = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await estimateConnectionSpeed();
      setSpeed(result.speed);
      setQuality(result.quality);
    } catch (error) {
      console.error('خطأ في قياس السرعة:', error);
      setQuality('غير متوفر');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  useEffect(() => {
    // قياس السرعة عند التحميل
    measureSpeed();
  }, [measureSpeed]);
  
  return { speed, quality, isLoading, measureSpeed };
};

// خطاف للحصول على معلومات الشبكة
export const useNetworkInfo = () => {
  const [networkType, setNetworkType] = useState<string>(detectNetworkType());
  const { isOnline } = useNetworkStatus();
  const { speed, quality } = useNetworkSpeed();
  
  useEffect(() => {
    // تحديث نوع الشبكة عند تغير حالة الاتصال
    if (isOnline) {
      setNetworkType(detectNetworkType());
    } else {
      setNetworkType('غير متصل');
    }
  }, [isOnline]);
  
  return {
    networkType,
    isOnline,
    speed,
    quality
  };
};

export default {
  useNetworkStatus,
  useNetworkSpeed,
  useNetworkInfo
};
