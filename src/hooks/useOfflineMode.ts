
import { useEffect, useState, useCallback } from 'react';
import { useAppState } from './state/use-app-state';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

interface NetworkStatus {
  isOnline: boolean;
  lastCheck: Date | null;
  latency: number | null;
  connectionType: string | null;
}

/**
 * خطاف لإدارة وضع عدم الاتصال
 * يوفر حالة الاتصال والوظائف المساعدة للتعامل مع حالات الاتصال وعدم الاتصال
 */
export function useOfflineMode() {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const { 
    isOnline: storeIsOnline, 
    networkStatus, 
    handleOfflineStatus, 
    handleOnlineStatus, 
    checkNetworkStatus 
  } = useAppState(state => state);
  
  // استخدام حالة محلية لتفادي مشاكل التزامن
  const [offlineMode, setOfflineMode] = useState(!storeIsOnline);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(networkStatus?.lastCheck || null);
  const [networkInfo, setNetworkInfo] = useState<NetworkStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    lastCheck: null,
    latency: null,
    connectionType: null
  });
  const [isChecking, setIsChecking] = useState(false);
  
  // مراقبة تغيرات حالة الاتصال
  useEffect(() => {
    const handleOnline = () => {
      handleOnlineStatus();
      setOfflineMode(false);
      setNetworkInfo(prev => ({
        ...prev,
        isOnline: true,
        lastCheck: new Date()
      }));
      console.log('[Network] Browser went online');
      toast({
        title: t('network.online', 'متصل بالإنترنت'),
        description: t('network.onlineDescription', 'تم استعادة الاتصال بالإنترنت'),
        duration: 3000
      });
    };
    
    const handleOffline = () => {
      handleOfflineStatus();
      setOfflineMode(true);
      setNetworkInfo(prev => ({
        ...prev,
        isOnline: false,
        lastCheck: new Date()
      }));
      console.log('[Network] Browser went offline');
      toast({
        title: t('network.offline', 'غير متصل بالإنترنت'),
        description: t('network.offlineDescription', 'تم فقدان الاتصال بالإنترنت'),
        variant: "destructive",
        duration: 5000
      });
    };
    
    // إضافة مستمعي الأحداث
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // تحديث معلومات الشبكة عند تغير وضع الاتصال
    updateConnectionInfo();
    
    // التحقق من حالة الاتصال عند التحميل
    checkNetworkStatus().then(isConnected => {
      setOfflineMode(!isConnected);
      setLastCheckTime(new Date());
      setNetworkInfo(prev => ({
        ...prev,
        isOnline: isConnected,
        lastCheck: new Date()
      }));
    });
    
    // إزالة مستمعي الأحداث عند التنظيف
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [handleOfflineStatus, handleOnlineStatus, checkNetworkStatus, t, toast]);
  
  // تحديث معلومات الاتصال
  const updateConnectionInfo = useCallback(() => {
    // الحصول على معلومات الاتصال إذا كانت متاحة
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      
      if (connection) {
        setNetworkInfo(prev => ({
          ...prev,
          connectionType: connection.effectiveType || connection.type || null
        }));
      }
    }
  }, []);
  
  // التحقق يدويًا من الاتصال مع قياس زمن الاستجابة
  const checkConnection = useCallback(async () => {
    if (isChecking) return false;
    
    setIsChecking(true);
    let startTime = Date.now();
    
    try {
      const isConnected = await checkNetworkStatus();
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      setOfflineMode(!isConnected);
      setLastCheckTime(new Date());
      setNetworkInfo({
        isOnline: isConnected,
        lastCheck: new Date(),
        latency: isConnected ? latency : null,
        connectionType: networkInfo.connectionType
      });
      
      if (isConnected && offlineMode) {
        toast({
          title: t('network.connectionRestored', 'تم استعادة الاتصال'),
          description: t('network.latency', 'زمن الاستجابة: {{latency}}ms', { latency }),
        });
      } else if (!isConnected) {
        toast({
          title: t('network.stillOffline', 'ما زلت غير متصل'),
          description: t('network.checkConnection', 'تأكد من اتصالك بالإنترنت'),
          variant: "destructive"
        });
      }
      
      return isConnected;
    } catch (error) {
      console.error('[Network] Error checking connection:', error);
      setOfflineMode(true);
      setNetworkInfo(prev => ({
        ...prev,
        isOnline: false,
        lastCheck: new Date(),
        latency: null
      }));
      
      toast({
        title: t('network.connectionError', 'خطأ في الاتصال'),
        description: t('network.connectionErrorDescription', 'فشل التحقق من حالة الاتصال'),
        variant: "destructive"
      });
      
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [isChecking, checkNetworkStatus, offlineMode, networkInfo.connectionType, t, toast]);
  
  // فحص دوري للاتصال في الخلفية (كل 30 ثانية في حالة عدم الاتصال)
  useEffect(() => {
    if (offlineMode) {
      const interval = setInterval(() => {
        checkConnection();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [offlineMode, checkConnection]);
  
  // التبديل اليدوي لوضع عدم الاتصال (مفيد للاختبار)
  const toggleOfflineMode = useCallback(() => {
    const newState = !offlineMode;
    setOfflineMode(newState);
    
    if (newState) {
      handleOfflineStatus();
      toast({
        title: t('network.manualOffline', 'تم تفعيل وضع عدم الاتصال يدوياً'),
        description: t('network.testingMode', 'وضع الاختبار: التطبيق يعمل كما لو كان غير متصل بالإنترنت'),
      });
    } else {
      handleOnlineStatus();
      toast({
        title: t('network.manualOnline', 'تم تعطيل وضع عدم الاتصال يدوياً'),
        description: t('network.normalMode', 'التطبيق يعمل في الوضع العادي'),
      });
    }
  }, [offlineMode, handleOfflineStatus, handleOnlineStatus, t, toast]);
  
  return {
    isOffline: offlineMode,
    isOnline: !offlineMode,
    lastCheck: lastCheckTime,
    networkInfo,
    isChecking,
    checkConnection,
    toggleOfflineMode,
  };
}
