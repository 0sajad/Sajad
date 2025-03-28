
import React, { useEffect, useRef } from "react";
import { Toast, ToastProps } from "@/components/ui/toast";
import { useA11y } from "@/hooks/useA11y";
import { Check, X, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Fix the interface to not extend ToastProps directly since the variant types conflict
interface EnhancedToastProps {
  className?: string;
  variant?: "default" | "destructive" | "success" | "warning" | "info";
  showIcon?: boolean;
  onDismiss?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  // Add other toast props we might need, but exclude 'variant' from original ToastProps
  duration?: number;
  action?: React.ReactNode;
}

/**
 * مكون إشعار محسّن مع دعم أفضل لإمكانية الوصول
 * يدعم الإعلانات الصوتية والتنبيهات المرئية المحسنة
 */
export function EnhancedToast({
  className,
  variant = "default",
  showIcon = true,
  title,
  description,
  onDismiss,
  ...props
}: EnhancedToastProps) {
  const { announce, soundFeedback, playNotificationSound, reducedMotion } = useA11y();
  const toastRef = useRef<HTMLDivElement>(null);
  
  // تشغيل صوت الإشعار وإعلان قارئ الشاشة
  useEffect(() => {
    if (title || description) {
      // الإعلان لقارئ الشاشة
      const message = [title, description].filter(Boolean).join(': ');
      announce(message, variant === "destructive" ? "assertive" : "polite");
      
      // تشغيل صوت الإشعار إذا كانت الميزة مفعلة
      if (soundFeedback) {
        const soundType = variant === "success" 
          ? "success" 
          : variant === "destructive" 
            ? "error" 
            : variant === "warning" 
              ? "warning" 
              : "info";
              
        playNotificationSound(soundType);
      }
    }
    
    // إضافة دعم لوحة المفاتيح للإغلاق
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && onDismiss) {
        onDismiss();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [title, description, variant, announce, soundFeedback, playNotificationSound, onDismiss]);
  
  // تحديد الأيقونة المناسبة للإشعار
  const getIcon = () => {
    if (!showIcon) return null;
    
    switch (variant) {
      case "success":
        return <Check className="h-4 w-4" />;
      case "destructive":
        return <X className="h-4 w-4" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4" />;
      case "info":
        return <Info className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // تخصيص تأثيرات حركية حسب وضع تقليل الحركة
  const animations = reducedMotion
    ? { animation: "none", transition: "none" }
    : {};
  
  // Fixed: don't pass the ref directly to Toast since types don't match
  return (
    <Toast
      // Don't pass the ref directly since it's a div ref and Toast expects an li ref
      className={cn(
        "flex items-start gap-3",
        variant === "success" && "bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-50 border-green-200 dark:border-green-800/50",
        variant === "destructive" && "bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-50 border-red-200 dark:border-red-800/50",
        variant === "warning" && "bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-50 border-amber-200 dark:border-amber-800/50",
        variant === "info" && "bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-50 border-blue-200 dark:border-blue-800/50",
        className
      )}
      role="status"
      aria-live={variant === "destructive" ? "assertive" : "polite"}
      style={animations}
      // Map our custom variant to the allowed Toast variants
      variant={variant === "destructive" ? "destructive" : "default"}
      {...props}
    >
      {showIcon && (
        <div className={cn(
          "flex items-center justify-center h-5 w-5 rounded-full shrink-0",
          variant === "success" && "bg-green-100 text-green-600 dark:bg-green-800/30 dark:text-green-400",
          variant === "destructive" && "bg-red-100 text-red-600 dark:bg-red-800/30 dark:text-red-400",
          variant === "warning" && "bg-amber-100 text-amber-600 dark:bg-amber-800/30 dark:text-amber-400",
          variant === "info" && "bg-blue-100 text-blue-600 dark:bg-blue-800/30 dark:text-blue-400",
        )}>
          {getIcon()}
        </div>
      )}
      
      <div className="grid gap-1">
        {title && <div className="font-medium">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
    </Toast>
  );
}
