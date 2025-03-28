
import { useState, useEffect } from 'react';

export type DeviceTier = 'low' | 'medium' | 'high';

/**
 * خطاف للكشف عن قدرات الجهاز وتصنيفه
 */
export function useDeviceDetection() {
  const [deviceTier, setDeviceTier] = useState<DeviceTier>('medium');
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  // التعرف على قدرات الجهاز
  useEffect(() => {
    const detectDeviceCapabilities = async () => {
      // سلسلة من الاختبارات لتحديد مستوى أداء الجهاز
      let tier: DeviceTier = 'medium';
      
      // 1. فحص إذا كان وضع توفير البطارية مفعلاً (إذا كان متاحًا)
      const isBatteryOptimized = 'getBattery' in navigator && 
        await (navigator as any).getBattery?.().then((battery: any) => battery.charging === false && battery.level < 0.15);
      
      // 2. فحص عدد النوى المنطقية للمعالج (إذا كان متاحًا)
      const cpuCores = navigator.hardwareConcurrency || 0;
      
      // 3. فحص نوع الجهاز (موبايل، تابلت، سطح مكتب)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // 4. فحص حجم الذاكرة (إذا كان متاحًا)
      const hasLimitedMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
      
      // 5. اختبار أساسي للأداء
      const performanceTestStart = performance.now();
      let counter = 0;
      for (let i = 0; i < 1000000; i++) {
        counter++;
      }
      const performanceTestDuration = performance.now() - performanceTestStart;
      
      // تحديد مستوى الجهاز بناءً على المعايير
      if (
        (isMobile && (hasLimitedMemory || cpuCores <= 4)) || 
        isBatteryOptimized || 
        performanceTestDuration > 50 || 
        (navigator as any).connection?.saveData
      ) {
        tier = 'low';
      } else if (
        cpuCores >= 8 && 
        !isMobile && 
        performanceTestDuration < 15
      ) {
        tier = 'high';
      }
      
      // تعيين مستوى الجهاز في الحالة
      setDeviceTier(tier);
      setIsLowEndDevice(tier === 'low');
      
      // حفظ نتيجة الاختبار في التخزين المحلي لتجنب تكرار الاختبار
      localStorage.setItem('device-tier', tier);
      localStorage.setItem('device-benchmark-date', new Date().toISOString());
      
      return tier;
    };
    
    // التحقق مما إذا كان هناك اختبار سابق وما إذا كان لا يزال صالحًا
    const storedTier = localStorage.getItem('device-tier') as DeviceTier | null;
    const benchmarkDate = localStorage.getItem('device-benchmark-date');
    const benchmarkAge = benchmarkDate 
      ? (new Date().getTime() - new Date(benchmarkDate).getTime()) / (1000 * 60 * 60 * 24)
      : 9999;
    
    // إعادة الاختبار كل 7 أيام أو إذا لم يكن هناك اختبار سابق
    if (!storedTier || benchmarkAge > 7) {
      detectDeviceCapabilities();
    } else {
      // استخدام القيمة المخزنة
      setDeviceTier(storedTier);
      setIsLowEndDevice(storedTier === 'low');
    }
  }, []);
  
  return {
    deviceTier,
    isLowEndDevice,
    isHighEndDevice: deviceTier === 'high'
  };
}
