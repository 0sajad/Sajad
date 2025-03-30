
import React from 'react';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { useA11y } from '@/hooks/useA11y';

type NotificationToastProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  duration?: number;
};

/**
 * نظام إشعارات محسن يدعم إمكانية الوصول وردود الصوت
 */
export function useNotificationToast() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { soundFeedback, playNotificationSound, announce } = useA11y();
  
  const showToast = ({
    title,
    description,
    action,
    type = 'default',
    duration = 5000,
  }: NotificationToastProps) => {
    // إعلان للقراء الشاشة
    announce(`${title}. ${description || ''}`, 'polite');
    
    // تشغيل صوت إشعار إذا كان مفعلاً
    if (soundFeedback) {
      // Map the type to match the expected sound types
      const soundType = type === 'default' ? 'notification' : type;
      playNotificationSound(soundType as 'success' | 'error' | 'warning' | 'info' | 'notification');
    }
    
    // عرض الإشعار المرئي
    toast({
      title: title,
      description: description,
      action: action
        ? <ToastAction altText={action.label} onClick={action.onClick}>
            {action.label}
          </ToastAction>
        : undefined,
      variant: type === 'error' ? 'destructive' : 'default',
      duration: duration,
    });
  };
  
  // واجهات مختصرة لأنواع مختلفة من الإشعارات
  return {
    showToast,
    success: (props: Omit<NotificationToastProps, 'type'>) => showToast({ ...props, type: 'success' }),
    warning: (props: Omit<NotificationToastProps, 'type'>) => showToast({ ...props, type: 'warning' }),
    error: (props: Omit<NotificationToastProps, 'type'>) => showToast({ ...props, type: 'error' }),
    info: (props: Omit<NotificationToastProps, 'type'>) => showToast({ ...props, type: 'info' }),
  };
}
