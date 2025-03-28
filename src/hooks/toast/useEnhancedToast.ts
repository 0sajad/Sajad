
import { useCallback } from 'react';
import { ToastManager } from '@/components/notifications/ToastManager';
import { useA11y } from '@/hooks/useA11y';
import { useRTLSupport } from '@/hooks/useRTLSupport';

interface ToastOptions {
  title?: string;
  description?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  className?: string;
  showIcon?: boolean;
  onClose?: () => void;
}

/**
 * خطاف محسن لإدارة الإشعارات مع دعم إمكانية الوصول
 */
export function useEnhancedToast() {
  const { announce, soundFeedback, playNotificationSound } = useA11y();
  const { isRTL } = useRTLSupport();
  
  // إظهار إشعار مع اختيار نوعه ودعم إمكانية الوصول
  const showToast = useCallback((options: ToastOptions) => {
    const { title, description, type = "info" } = options;
    
    // الإعلان لقارئات الشاشة
    if (title || description) {
      const message = [title, description].filter(Boolean).join(': ');
      announce(message, type === "error" ? "assertive" : "polite");
    }
    
    // تشغيل صوت الإشعار إذا كانت الميزة مفعلة
    if (soundFeedback) {
      const soundType = type === "success" 
        ? "success" 
        : type === "error" 
          ? "error" 
          : type === "warning" 
            ? "warning" 
            : "info";
            
      playNotificationSound(soundType);
    }
    
    // تعديل موضع الإشعار بناءً على اتجاه اللغة
    const position = options.position || (isRTL ? "top-left" : "top-right");
    
    // إظهار الإشعار
    return ToastManager.show({
      ...options,
      position,
    });
  }, [announce, soundFeedback, playNotificationSound, isRTL]);
  
  // وظائف مختصرة لأنواع الإشعارات المختلفة
  const success = useCallback((options: Omit<ToastOptions, "type">) => {
    return showToast({ ...options, type: "success" });
  }, [showToast]);
  
  const error = useCallback((options: Omit<ToastOptions, "type">) => {
    return showToast({ ...options, type: "error" });
  }, [showToast]);
  
  const warning = useCallback((options: Omit<ToastOptions, "type">) => {
    return showToast({ ...options, type: "warning" });
  }, [showToast]);
  
  const info = useCallback((options: Omit<ToastOptions, "type">) => {
    return showToast({ ...options, type: "info" });
  }, [showToast]);
  
  return {
    toast: {
      show: showToast,
      success,
      error,
      warning,
      info,
    },
  };
}
