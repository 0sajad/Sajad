
import { useEffect, useState } from 'react';
import { useAppState } from './state/use-app-state';
import { useToast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

/**
 * خطاف للتعامل مع وضع عدم الاتصال بالإنترنت
 * يوفر معلومات عن حالة الاتصال والوظائف ذات الصلة
 */
export function useOfflineMode() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const isOnline = useAppState(state => state.isOnline);
  const setIsOnline = useAppState(state => (online: boolean) => state.isOnline = online);
  const [isInitialCheck, setIsInitialCheck] = useState(true);
  const [enableOfflineNotifications, setEnableOfflineNotifications] = useState(() => {
    // استرجاع الإعداد من التخزين المحلي
    const saved = localStorage.getItem('enableOfflineNotifications');
    return saved !== null ? saved === 'true' : true;
  });
  
  // حفظ إعداد الإشعارات في التخزين المحلي
  useEffect(() => {
    localStorage.setItem('enableOfflineNotifications', String(enableOfflineNotifications));
  }, [enableOfflineNotifications]);
  
  // وظيفة لمراقبة اتصال الإنترنت
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (!isInitialCheck && enableOfflineNotifications) {
        toast({
          title: t('network.backOnline', 'تم استعادة الاتصال'),
          description: t('network.backOnlineMessage', 'تم استعادة اتصالك بالإنترنت'),
          variant: 'default',
        });
      }
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      if (!isInitialCheck && enableOfflineNotifications) {
        toast({
          title: t('network.offline', 'انقطع الاتصال'),
          description: t('network.offlineMessage', 'انقطع اتصالك بالإنترنت، بعض الميزات قد لا تعمل'),
          variant: 'destructive',
          duration: 5000,
        });
      }
    };
    
    // التحقق من حالة الاتصال الحالية
    setIsOnline(navigator.onLine);
    setIsInitialCheck(false);
    
    // إضافة مستمعي الأحداث
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // إزالة مستمعي الأحداث عند تفكيك المكون
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [enableOfflineNotifications, isInitialCheck, setIsOnline, t, toast]);
  
  /**
   * محاولة إعادة الاتصال بالإنترنت (يظهر نافذة منبثقة للمستخدم)
   */
  const attemptReconnect = () => {
    if (!isOnline) {
      toast({
        title: t('network.reconnectAttempt', 'جاري محاولة إعادة الاتصال'),
        description: t('network.reconnectMessage', 'يرجى التحقق من اتصالك بالإنترنت'),
        variant: 'default',
      });
      
      // محاولة إعادة التحقق من الاتصال
      fetch('https://www.google.com/generate_204', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-store',
      })
        .then(() => {
          setIsOnline(true);
          toast({
            title: t('network.reconnectSuccess', 'تم إعادة الاتصال'),
            description: t('network.reconnectSuccessMessage', 'تم استعادة اتصالك بالإنترنت'),
            variant: 'default',
          });
        })
        .catch(() => {
          toast({
            title: t('network.stillOffline', 'ما زلت غير متصل'),
            description: t('network.stillOfflineMessage', 'تأكد من اتصالك بالإنترنت وحاول مرة أخرى'),
            variant: 'destructive',
          });
        });
    }
  };
  
  return {
    isOnline,
    enableOfflineNotifications,
    setEnableOfflineNotifications,
    attemptReconnect,
  };
}
