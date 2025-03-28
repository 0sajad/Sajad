
import { useCallback } from 'react';

/**
 * خطاف للتعامل مع إعلانات قارئات الشاشة
 */
export function useScreenReaderAnnouncements() {
  // تأكد من استدعاء announce بطريقة آمنة
  const announce = useCallback((message: string, type: "polite" | "assertive" | "success" | "error" | "warning" | "info" = "polite") => {
    if (typeof window === 'undefined' || typeof window.announce !== 'function') return;
    
    // تحويل النوع إلى politeness في حالة استخدام أنواع الإشعارات
    let politeness: "polite" | "assertive" = "polite";
    
    if (type === "error") {
      politeness = "assertive"; // الأخطاء تكون أكثر إلحاحًا
    } else if (type === "polite" || type === "assertive") {
      politeness = type;
    }
    
    window.announce(message, politeness);
  }, []);
  
  // كائن لإدارة إعلانات مختلفة
  const announcements = {
    success: (message: string) => announce(message, "success"),
    error: (message: string) => announce(message, "error"),
    warning: (message: string) => announce(message, "warning"),
    info: (message: string) => announce(message, "info"),
    polite: (message: string) => announce(message, "polite"),
    assertive: (message: string) => announce(message, "assertive"),
  };
  
  return { announce, announcements };
}
