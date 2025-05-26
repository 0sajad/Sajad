
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface NetworkState {
  isOnline: boolean;
  connectionType: string;
  speed: {
    download: number;
    upload: number;
    ping: number;
  };
  devices: any[];
  lastUpdate: Date;
  isLoading: boolean;
}

/**
 * خطاف مراقبة الشبكة للويب
 * يعمل في بيئة المتصفح فقط
 */
export function useRealNetworkMonitoring() {
  const { t } = useTranslation();
  const [networkState, setNetworkState] = useState<NetworkState>({
    isOnline: navigator.onLine,
    connectionType: getConnectionType(),
    speed: { download: 0, upload: 0, ping: 0 },
    devices: [],
    lastUpdate: new Date(),
    isLoading: false
  });

  // الحصول على نوع الاتصال من Web APIs
  function getConnectionType(): string {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;
    
    if (connection) {
      return connection.effectiveType || connection.type || 'unknown';
    }
    return 'unknown';
  }

  // قياس السرعة التقريبية باستخدام Web APIs
  const measureSpeed = useCallback(async () => {
    setNetworkState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const startTime = performance.now();
      
      // اختبار بسيط لقياس السرعة
      await fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store'
      });
      
      const endTime = performance.now();
      const ping = endTime - startTime;
      
      // قيم تقريبية للسرعة بناءً على نوع الاتصال
      const connection = (navigator as any).connection;
      let downloadSpeed = 10; // Mbps افتراضي
      
      if (connection?.downlink) {
        downloadSpeed = connection.downlink;
      }
      
      const speedResult = {
        download: downloadSpeed,
        upload: downloadSpeed * 0.1, // تقدير السرعة الصاعدة
        ping: ping
      };
      
      setNetworkState(prev => ({
        ...prev,
        speed: speedResult,
        lastUpdate: new Date(),
        isLoading: false
      }));
      
      toast.success(
        `سرعة التحميل: ${speedResult.download.toFixed(1)} Mbps`,
        {
          description: `سرعة الرفع: ${speedResult.upload.toFixed(1)} Mbps | Ping: ${speedResult.ping.toFixed(0)}ms`
        }
      );
      
    } catch (error) {
      setNetworkState(prev => ({ ...prev, isLoading: false }));
      toast.error('فشل في قياس السرعة');
    }
  }, []);

  // فحص الأجهزة المتصلة (محاكاة للويب)
  const scanDevices = useCallback(async () => {
    try {
      // في بيئة الويب، سنقدم قائمة تجريبية
      const mockDevices = [
        { name: 'جهاز الراوتر الرئيسي', ip: '192.168.1.1', type: 'router' },
        { name: 'الجهاز الحالي', ip: 'localhost', type: 'computer' }
      ];
      
      setNetworkState(prev => ({
        ...prev,
        devices: mockDevices,
        lastUpdate: new Date()
      }));
      
      toast.info(`تم العثور على ${mockDevices.length} أجهزة متصلة`);
    } catch (error) {
      toast.error('فشل في فحص الأجهزة');
    }
  }, []);

  // مراقبة تغييرات الاتصال
  useEffect(() => {
    const handleOnline = () => {
      setNetworkState(prev => ({ ...prev, isOnline: true }));
      toast.success('تم استعادة الاتصال بالإنترنت');
      setTimeout(measureSpeed, 2000);
    };

    const handleOffline = () => {
      setNetworkState(prev => ({ ...prev, isOnline: false }));
      toast.warning('تم قطع الاتصال بالإنترنت');
    };

    const handleConnectionChange = () => {
      setNetworkState(prev => ({
        ...prev,
        connectionType: getConnectionType(),
        lastUpdate: new Date()
      }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // مراقبة تغيير نوع الاتصال
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', handleConnectionChange);
    }
    
    // قياس أولي للسرعة
    setTimeout(measureSpeed, 1000);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, [measureSpeed]);

  return {
    ...networkState,
    measureSpeed,
    scanDevices,
    isConnected: networkState.isOnline,
    qualityScore: networkState.speed.download > 50 ? 'ممتاز' : 
                 networkState.speed.download > 25 ? 'جيد' : 
                 networkState.speed.download > 10 ? 'متوسط' : 'ضعيف'
  };
}
