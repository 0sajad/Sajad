
import React from "react";
import { toast as sonnerToast } from "sonner";
import { X, Check, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// أنواع الإشعارات المدعومة
export type ToastType = "success" | "error" | "warning" | "info" | "default";

// واجهة خيارات الإشعارات المحسنة
export interface EnhancedToastProps {
  title?: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  className?: string;
  showIcon?: boolean;
  onClose?: () => void;
}

/**
 * الإعلان لقارئات الشاشة بطريقة آمنة
 */
const announceToScreenReader = (message: string, politeness: "polite" | "assertive" = "polite") => {
  if (typeof window !== 'undefined' && typeof window.announce === 'function') {
    window.announce(message, politeness);
  }
};

/**
 * الحصول على أيقونة الإشعار حسب النوع
 */
const getToastIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <Check className="h-4 w-4" />;
    case "error":
      return <X className="h-4 w-4" />;
    case "warning":
      return <AlertCircle className="h-4 w-4" />;
    case "info":
    default:
      return <Info className="h-4 w-4" />;
  }
};

/**
 * الحصول على أنماط الإشعار حسب النوع
 */
const getToastStyles = (type: ToastType) => {
  const styles = {
    success: "bg-green-100 dark:bg-green-900 border-green-500 text-green-700 dark:text-green-100",
    error: "bg-red-100 dark:bg-red-900 border-red-500 text-red-700 dark:text-red-100",
    warning: "bg-yellow-100 dark:bg-yellow-900 border-yellow-500 text-yellow-700 dark:text-yellow-100",
    info: "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-100",
    default: "bg-gray-100 dark:bg-gray-900 border-gray-500 text-gray-700 dark:text-gray-100"
  };

  const iconStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
    default: "bg-gray-500 text-white"
  };

  return {
    toast: styles[type],
    icon: iconStyles[type]
  };
};

/**
 * تنفيذ وظائف الإشعارات المحسنة كدوال عادية وليس كمكونات React
 */
export const enhancedToast = {
  // الوظيفة الأساسية لعرض الإشعارات
  show: (props: EnhancedToastProps) => {
    const {
      title,
      description,
      type = "info",
      duration = 5000,
      position = document.documentElement.dir === 'rtl' ? "top-left" : "top-right",
      className,
      showIcon = true,
      onClose
    } = props;

    // ترجمة أنواع الإشعارات للعربية للإعلان
    const typeTranslations: Record<ToastType, string> = {
      success: "نجاح",
      error: "خطأ",
      warning: "تحذير",
      info: "معلومات",
      default: "إشعار"
    };

    // تجهيز رسالة الإعلان لقارئ الشاشة
    const fullMessage = [title, description].filter(Boolean).join(": ");
    if (fullMessage) {
      const messageWithType = `${typeTranslations[type] || typeTranslations.default}: ${fullMessage}`;
      announceToScreenReader(
        messageWithType,
        type === "error" ? "assertive" : "polite"
      );
    }

    // تحديد ما إذا كان RTL نشطًا
    const isRTL = document.documentElement.dir === 'rtl';
    const styles = getToastStyles(type);

    // إظهار الإشعار
    return sonnerToast.custom(
      (id) => (
        <div
          className={cn(
            "flex w-full rounded-lg border p-4 shadow-lg",
            styles.toast,
            isRTL ? "flex-row-reverse text-right" : "text-left",
            className
          )}
          role="alert"
          aria-live="assertive"
        >
          {showIcon && (
            <div className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
              styles.icon,
              isRTL ? 'ml-4' : 'mr-4'
            )}>
              {getToastIcon(type)}
            </div>
          )}
          
          <div className="flex-1">
            {title && (
              <h3 className="font-medium">{title}</h3>
            )}
            {description && (
              <p className={title ? "mt-1 text-sm opacity-90" : ""}>{description}</p>
            )}
          </div>
          
          <button
            onClick={() => {
              sonnerToast.dismiss(id);
              if (onClose) onClose();
            }}
            className={cn(
              "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-opacity-10 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
              isRTL ? 'mr-2' : 'ml-2'
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">إغلاق</span>
          </button>
        </div>
      ),
      {
        duration,
        position,
        id: `toast-${Date.now()}`,
        onAutoClose: onClose
      }
    );
  },

  // وظائف مختصرة لأنواع الإشعارات المختلفة
  success: (props: Omit<EnhancedToastProps, "type">) => {
    return enhancedToast.show({ ...props, type: "success" });
  },

  error: (props: Omit<EnhancedToastProps, "type">) => {
    return enhancedToast.show({ ...props, type: "error" });
  },

  warning: (props: Omit<EnhancedToastProps, "type">) => {
    return enhancedToast.show({ ...props, type: "warning" });
  },

  info: (props: Omit<EnhancedToastProps, "type">) => {
    return enhancedToast.show({ ...props, type: "info" });
  }
};
