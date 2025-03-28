
import React, { useState, useEffect } from "react";
import { Info, AlertCircle, CheckCircle, XCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cva } from "class-variance-authority";
import { useA11y } from "@/hooks/useA11y";
import { useTranslation } from "react-i18next";

type StatusType = "info" | "success" | "warning" | "error";

interface StatusMessageProps {
  type?: StatusType;
  message: string;
  description?: string;
  onClose?: () => void;
  autoHideDuration?: number;
  className?: string;
  showIcon?: boolean;
}

const statusVariants = cva(
  "relative rounded-lg shadow-md border p-4 pr-10 flex items-start",
  {
    variants: {
      type: {
        info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300",
        success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:border-yellow-700 dark:text-yellow-300",
        error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-700 dark:text-red-300",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

export function StatusMessage({
  type = "info",
  message,
  description,
  onClose,
  autoHideDuration = 0,
  className = "",
  showIcon = true,
}: StatusMessageProps) {
  const [visible, setVisible] = useState(true);
  const { announce, reducedMotion } = useA11y();
  const { t, i18n } = useTranslation();
  
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertCircle,
    error: XCircle,
  };
  
  const Icon = icons[type];
  
  // إنشاء نص الإعلان حسب اللغة
  const getAnnouncementText = () => {
    const currentLang = i18n.language || 'en';
    let typeText = '';
    
    // تحديد نص النوع حسب اللغة
    if (currentLang === "ar-iq") {
      typeText = type === "error" ? t("error.title", "صار خطأ") : 
                type === "success" ? "تم بنجاح" : 
                type === "warning" ? "تحذير" : "معلومة";
    } else if (currentLang.startsWith("ar")) {
      typeText = type === "error" ? t("error.title", "حدث خطأ") : 
                type === "success" ? "تم بنجاح" : 
                type === "warning" ? "تحذير" : "معلومة";
    } else if (currentLang === "fr") {
      typeText = type === "error" ? "Erreur" : 
                type === "success" ? "Succès" : 
                type === "warning" ? "Avertissement" : "Information";
    } else if (currentLang === "ja") {
      typeText = type === "error" ? "エラー" : 
                type === "success" ? "成功" : 
                type === "warning" ? "警告" : "情報";
    } else if (currentLang === "zh") {
      typeText = type === "error" ? "错误" : 
                type === "success" ? "成功" : 
                type === "warning" ? "警告" : "信息";
    } else {
      typeText = type === "error" ? "Error" : 
                type === "success" ? "Success" : 
                type === "warning" ? "Warning" : "Information";
    }
    
    return `${typeText}: ${message}${description ? `. ${description}` : ''}`;
  };
  
  useEffect(() => {
    // تجنب الأخطاء إذا لم يتم تعريف announce
    if (typeof announce === 'function') {
      // إعلان الرسالة للقارئات الشاشية
      announce(getAnnouncementText(), type === "error" ? "assertive" : "polite");
    } else {
      // إذا لم يكن announce متاحًا، استخدم API Window.announce إذا كان موجودًا
      if (window.announce) {
        window.announce(getAnnouncementText(), type === "error" ? "assertive" : "polite");
      }
    }
    
    // إخفاء الرسالة تلقائياً إذا تم تحديد المدة
    if (autoHideDuration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          setTimeout(onClose, reducedMotion ? 0 : 300); // إنتظار إنتهاء الرسوم المتحركة
        }
      }, autoHideDuration);
      
      return () => clearTimeout(timer);
    }
  }, [autoHideDuration, onClose, message, description, type, announce]);
  
  // التعامل مع الإغلاق
  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      setTimeout(onClose, reducedMotion ? 0 : 300);
    }
  };
  
  // تحديد القيمة aria-live بناءً على نوع الرسالة
  const ariaLive = type === "error" ? "assertive" : "polite";
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
          className={`${statusVariants({ type })} ${className}`}
          role={type === "error" ? "alert" : "status"}
          aria-live={ariaLive}
        >
          {showIcon && (
            <Icon className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
          )}
          
          <div className="flex-1">
            <div className="font-medium">{message}</div>
            {description && (
              <div className="mt-1 text-sm opacity-80">{description}</div>
            )}
          </div>
          
          {onClose && (
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-primary rounded-full"
              onClick={handleClose}
              aria-label={i18n.language === "ar-iq" ? "إغلاق الرسالة" : t("close", "Close")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
