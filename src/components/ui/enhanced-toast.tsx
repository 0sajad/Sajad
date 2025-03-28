
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
    const { announce } = useA11yHelpers();
    
    // إعلان لقارئات الشاشة
    if (typeof announce === 'function') {
      announce(`${title}. ${description || ''}`, important ? 'assertive' : 'polite');
    }
    
    // إظهار النخب المرئي
    return sonnerToast.custom(
      (id) => (
        <div className="toast-content">
          <div className="toast-title">{title}</div>
          {description && <div className="toast-description">{description}</div>}
          {action}
        </div>
      ),
      {
        duration,
        id: `toast-${Date.now()}`,
      }
    );
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
  // Remove the direct useState causing infinite loops
  // Instead, safely access announcement function
  const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (typeof window !== 'undefined' && typeof window.announce === 'function') {
      window.announce(message, politeness);
    }
  };
  
  return {
    announce
  };
}
