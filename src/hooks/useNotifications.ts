
import { useState, useCallback, useEffect } from 'react';
import { toast, Toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { useA11y } from './useA11y';
import { useAppState } from './state/use-app-state';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface NotificationOptions {
  duration?: number;
  position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
  important?: boolean;
  withSound?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  closeButton?: boolean;
  id?: string;
}

/**
 * خطاف لإدارة إشعارات المستخدم بشكل موحد مع دعم إمكانية الوصول
 */
export function useNotifications() {
  const { t } = useTranslation();
  const { announce, soundFeedback } = useA11y();
  const [activeToasts, setActiveToasts] = useState<string[]>([]);
  const [areNotificationsVisible, setAreNotificationsVisible] = useState(true);
  const { getPreference } = useAppState();
  
  // التحقق من تفضيلات المستخدم للإشعارات
  useEffect(() => {
    const showNotifications = getPreference('notifications', true);
    setAreNotificationsVisible(showNotifications);
  }, [getPreference]);
  
  // تشغيل صوت للإشعار
  const playNotificationSound = useCallback((type: NotificationType) => {
    if (!soundFeedback) return;
    
    // استخدام Web Audio API لتشغيل الأصوات
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // تعيين نوع الموجة والتردد بناءً على نوع الإشعار
      oscillator.type = 'sine';
      
      switch (type) {
        case 'info':
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          break;
        case 'success':
          oscillator.frequency.setValueAtTime(784.0, audioContext.currentTime); // G5
          break;
        case 'warning':
          oscillator.frequency.setValueAtTime(349.23, audioContext.currentTime); // F4
          break;
        case 'error':
          oscillator.frequency.setValueAtTime(277.18, audioContext.currentTime); // C#4
          break;
      }
      
      // تعيين مستوى الصوت ومدته
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      // توصيل العقد
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // تشغيل الصوت
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.error('فشل تشغيل صوت الإشعار:', e);
    }
  }, [soundFeedback]);
  
  // إعلان الإشعار لقارئات الشاشة
  const announceNotification = useCallback((message: string, type: NotificationType) => {
    if (!announce) return;
    
    let prefix = '';
    switch (type) {
      case 'info':
        prefix = t('notifications.info', 'معلومات: ');
        break;
      case 'success':
        prefix = t('notifications.success', 'نجاح: ');
        break;
      case 'warning':
        prefix = t('notifications.warning', 'تحذير: ');
        break;
      case 'error':
        prefix = t('notifications.error', 'خطأ: ');
        break;
    }
    
    announce(`${prefix}${message}`, type === 'error' ? 'assertive' : 'polite');
  }, [announce, t]);
  
  // إظهار إشعار مع دعم إمكانية الوصول
  const showNotification = useCallback((
    message: string,
    description?: string,
    type: NotificationType = 'info',
    options: NotificationOptions = {}
  ) => {
    if (!areNotificationsVisible && !options.important) {
      return;
    }
    
    // تهيئة الخيارات الافتراضية
    const {
      duration = 5000,
      position = 'top-right',
      withSound = true,
      action,
      closeButton = true,
      id = `toast-${Date.now()}`
    } = options;
    
    // تحديد الدالة المناسبة بناءً على نوع الإشعار
    let toastFn;
    switch (type) {
      case 'success':
        toastFn = toast.success;
        break;
      case 'warning':
        toastFn = toast.warning;
        break;
      case 'error':
        toastFn = toast.error;
        break;
      default:
        toastFn = toast;
    }
    
    // إضافة الإشعار النشط إلى القائمة
    setActiveToasts(prev => [...prev, id]);
    
    // تشغيل صوت الإشعار إذا كان مطلوبًا
    if (withSound) {
      playNotificationSound(type);
    }
    
    // إعلان الإشعار لقارئات الشاشة
    announceNotification(message, type);
    
    // إظهار الإشعار
    toastFn(message, {
      description,
      duration,
      position: position as any,
      id,
      action: action ? {
        label: action.label,
        onClick: () => {
          action.onClick();
          setActiveToasts(prev => prev.filter(toastId => toastId !== id));
        }
      } : undefined,
      closeButton,
      onDismiss: () => {
        setActiveToasts(prev => prev.filter(toastId => toastId !== id));
      }
    });
    
    return id;
  }, [playNotificationSound, announceNotification, areNotificationsVisible]);
  
  // إزالة إشعار بواسطة المعرف
  const dismissNotification = useCallback((id: string) => {
    toast.dismiss(id);
    setActiveToasts(prev => prev.filter(toastId => toastId !== id));
  }, []);
  
  // إزالة جميع الإشعارات النشطة
  const dismissAllNotifications = useCallback(() => {
    toast.dismiss();
    setActiveToasts([]);
  }, []);
  
  return {
    showNotification,
    dismissNotification,
    dismissAllNotifications,
    activeToasts,
    
    // توفير وظائف مختصرة لأنواع الإشعارات
    info: (message: string, description?: string, options?: NotificationOptions) => 
      showNotification(message, description, 'info', options),
    success: (message: string, description?: string, options?: NotificationOptions) => 
      showNotification(message, description, 'success', options),
    warning: (message: string, description?: string, options?: NotificationOptions) => 
      showNotification(message, description, 'warning', options),
    error: (message: string, description?: string, options?: NotificationOptions) => 
      showNotification(message, description, 'error', options)
  };
}
