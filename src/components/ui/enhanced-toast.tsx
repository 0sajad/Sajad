import React, { forwardRef } from "react";
import { toast as sonnerToast } from "sonner";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";
import { useRTLSupport } from "@/hooks/useRTLSupport";
import { X, Check, AlertTriangle, Info, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

// Import ToastActionElement type
import type { ToastActionElement } from "@/components/ui/toast";

// أنواع الرسائل المدعومة
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

// واجهة خيارات رسالة التنبيه المحسنة
export interface EnhancedToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  action?: ToastActionElement;
  duration?: number;
  important?: boolean;
}

/**
 * مكون النخب المحسن مع دعم إمكانية الوصول وردود الصوت
 */
export const EnhancedToast = {
  show: (options: EnhancedToastOptions) => {
    const { 
      title, 
      description, 
      type = 'default', 
      action, 
      duration = 5000, 
      important = false 
    } = options;
    
    // للاستخدام داخل استدعاءات واجهة برمجة التطبيقات
    const { announce, playNotificationSound } = useA11yHelpers();
    
    // إعلان لقارئات الشاشة
    announce(`${title}. ${description || ''}`, important ? 'assertive' : 'polite');
    
    // تشغيل صوت الإشعار بناءً على النوع
    playNotificationSound(type);
    
    // إظهار النخب المرئي
    const { toast } = useToast();
    return toast({
      title,
      description,
      action,
      duration,
      variant: type === 'default' ? 'default' : 
               type === 'error' ? 'destructive' : 
               'default',
    });
  },
  
  // وظائف مختصرة لأنواع رسائل مختلفة
  success: (options: Omit<EnhancedToastOptions, 'type'>) => 
    EnhancedToast.show({ ...options, type: 'success' }),
    
  error: (options: Omit<EnhancedToastOptions, 'type'>) => 
    EnhancedToast.show({ ...options, type: 'error', important: options.important ?? true }),
    
  warning: (options: Omit<EnhancedToastOptions, 'type'>) => 
    EnhancedToast.show({ ...options, type: 'warning' }),
    
  info: (options: Omit<EnhancedToastOptions, 'type'>) => 
    EnhancedToast.show({ ...options, type: 'info' }),
};

// خطاف مساعد للوصول إلى وظائف إمكانية الوصول
function useA11yHelpers() {
  const { announce, soundFeedback, playNotificationSound: playSound } = useA11y();
  const { t } = useTranslation();
  
  // تشغيل الصوت المناسب بناءً على نوع الرسالة
  const playNotificationSound = (type: ToastType) => {
    if (!soundFeedback) return;
    
    switch (type) {
      case 'success':
        playSound('success');
        break;
      case 'error':
        playSound('error');
        break;
      case 'warning':
        playSound('warning');
        break;
      case 'info':
      case 'default':
        playSound('notification');
        break;
    }
  };
  
  return {
    announce,
    playNotificationSound,
  };
}
