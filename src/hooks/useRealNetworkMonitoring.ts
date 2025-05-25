
import { useState, useEffect, useCallback } from 'react';
import { measureRealSpeed, detectConnectionType, setupConnectionMonitoring, scanNetworkDevices } from '@/utils/realNetworkAPI';
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
 * خطاف مراقبة الشبكة الفعلي
 * يتفاعل مع الشبكة الحقيقية
 */
export function useRealNetworkMonitoring() {
  const { t } = useTranslation();
  const [networkState, setNetworkState] = useState<NetworkState>({
    isOnline: navigator.onLine,
    connectionType: detectConnectionType(),
    speed: { download: 0, upload: 0, ping: 0 },
    devices: [],
    lastUpdate: new Date(),
    isLoading: false
  });

  // قياس السرعة الفعلية
  const measureSpeed = useCallback(async () => {
    setNetworkState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const speedResult = await measureRealSpeed();
      
      setNetworkState(prev => ({
        ...prev,
        speed: speedResult,
        lastUpdate: new Date(),
        isLoading: false
      }));
      
      // إشعار المستخدم بالنتيجة
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

  // فحص الأجهزة المتصلة
  const scanDevices = useCallback(async () => {
    try {
      const devices = await scanNetworkDevices();
      setNetworkState(prev => ({
        ...prev,
        devices,
        lastUpdate: new Date()
      }));
      
      toast.info(`تم العثور على ${devices.length} أجهزة متصلة`);
    } catch (error) {
      toast.error('فشل في فحص الأجهزة');
    }
  }, []);

  // مراقبة تغييرات الاتصال
  useEffect(() => {
    const cleanup = setupConnectionMonitoring((status) => {
      setNetworkState(prev => {
        // إشعار المستخدم بتغيير حالة الاتصال
        if (status.isOnline !== prev.isOnline) {
          if (status.isOnline) {
            toast.success('تم استعادة الاتصال بالإنترنت');
            // قياس السرعة تلقائياً عند الاتصال
            setTimeout(measureSpeed, 2000);
          } else {
            toast.warning('تم قطع الاتصال بالإنترنت');
          }
        }
        
        // إشعار بتغيير نوع الاتصال
        if (status.connectionType !== prev.connectionType) {
          toast.info(`تم تغيير نوع الاتصال إلى: ${status.connectionType}`);
        }

        return {
          ...prev,
          isOnline: status.isOnline,
          connectionType: status.connectionType,
          lastUpdate: new Date()
        };
      });
    });
    
    // قياس أولي للسرعة
    setTimeout(measureSpeed, 1000);
    
    return cleanup;
  }, [measureSpeed]);

  return {
    ...networkState,
    measureSpeed,
    scanDevices,
    // حالات إضافية للواجهة
    isConnected: networkState.isOnline,
    qualityScore: networkState.speed.download > 50 ? 'ممتاز' : 
                 networkState.speed.download > 25 ? 'جيد' : 
                 networkState.speed.download > 10 ? 'متوسط' : 'ضعيف'
  };
}
