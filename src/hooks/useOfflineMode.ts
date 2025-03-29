
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';

interface NetworkInfo {
  connectionType?: string;
  effectiveType?: string; 
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
  latency?: number;
}

interface UseOfflineModeReturn {
  isOffline: boolean;
  isOnline: boolean;
  isChecking: boolean;
  lastCheck: Date | null;
  networkInfo: NetworkInfo;
  checkConnection: () => Promise<boolean>;
}

/**
 * خطاف لإدارة حالة الاتصال بالإنترنت وتوفير معلومات عن الشبكة
 */
export function useOfflineMode(): UseOfflineModeReturn {
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({});
  
  // فحص الاتصال بالإنترنت
  const checkConnection = useCallback(async () => {
    setIsChecking(true);
    
    try {
      // محاولة طلب لفحص الاتصال
      const startTime = Date.now();
      const response = await fetch('/api/ping', { 
        method: 'HEAD',
        cache: 'no-cache',
        mode: 'no-cors',
        headers: { 'Cache-Control': 'no-cache' }
      });
      
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      // تحديث معلومات الشبكة
      setNetworkInfo(prev => ({
        ...prev,
        latency
      }));
      
      // تحديث حالة الاتصال والوقت
      setIsOffline(!response.ok);
      setLastCheck(new Date());
      setIsChecking(false);
      
      return response.ok;
    } catch (error) {
      // فشل الاتصال
      setIsOffline(true);
      setLastCheck(new Date());
      setIsChecking(false);
      return false;
    }
  }, []);
  
  // الحصول على معلومات الاتصال إذا كانت متوفرة
  useEffect(() => {
    const updateConnectionInfo = () => {
      if (navigator && 'connection' in navigator) {
        const connection = (navigator as any).connection;
        
        if (connection) {
          setNetworkInfo({
            connectionType: connection.type,
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData
          });
        }
      }
    };
    
    // تحديث معلومات الاتصال عند تغيير الاتصال
    const handleOnline = () => {
      setIsOffline(false);
      updateConnectionInfo();
      toast({
        title: t('network.reconnected', 'تم استعادة الاتصال'),
        description: t('network.deviceOnline', 'جهازك متصل بالإنترنت الآن')
      });
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      toast({
        title: t('network.disconnected', 'انقطع الاتصال'),
        description: t('network.deviceOffline', 'جهازك غير متصل بالإنترنت'),
        variant: 'destructive'
      });
    };
    
    // إضافة مستمعي الأحداث
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // فحص الاتصال مبدئياً
    updateConnectionInfo();
    checkConnection();
    
    // إزالة مستمعي الأحداث عند التنظيف
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [checkConnection, t, toast]);
  
  return {
    isOffline,
    isOnline: !isOffline,
    isChecking,
    lastCheck,
    networkInfo,
    checkConnection
  };
}
