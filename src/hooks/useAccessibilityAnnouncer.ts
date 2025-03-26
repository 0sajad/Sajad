
import { useCallback } from "react";
import { useA11y } from "@/hooks/useA11y";
import { useTranslation } from "react-i18next";

type AnnouncementLevel = "info" | "success" | "warning" | "error" | "polite" | "assertive";

interface UseAccessibilityAnnouncerOptions {
  announcerSelector?: string;
}

export function useAccessibilityAnnouncer(options: UseAccessibilityAnnouncerOptions = {}) {
  const { announcerSelector = "#liveAnnouncer" } = options;
  const { soundFeedback, playNotificationSound } = useA11y();
  const { i18n } = useTranslation();
  
  const announce = useCallback(
    (message: string, level: AnnouncementLevel = "polite") => {
      // اختيار اللغة المناسبة للإعلان
      const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
      
      try {
        // استخدام window.announce إذا كان متاحاً
        if (typeof window !== "undefined" && (window as any).announce) {
          const politeness = level === "warning" || level === "error" || level === "assertive"
            ? "assertive"
            : "polite";
          
          (window as any).announce(message, politeness);
        } else {
          // استخدام المُعلن البديل إذا كان متاحاً
          const announcer = document.querySelector(announcerSelector);
          if (announcer) {
            const politeness = level === "warning" || level === "error" || level === "assertive"
              ? "assertive"
              : "polite";
            
            // تعيين اتجاه النص بناءً على اللغة
            announcer.setAttribute("dir", isRTL ? "rtl" : "ltr");
            announcer.setAttribute("lang", i18n.language);
            announcer.setAttribute("aria-live", politeness);
            announcer.textContent = message;
            
            // مسح النص بعد فترة
            setTimeout(() => {
              if (announcer.textContent === message) {
                announcer.textContent = "";
              }
            }, 5000);
          } else {
            console.warn(`عنصر المعلن غير موجود: ${announcerSelector}`);
            
            // إنشاء عنصر معلن مؤقت إذا لم يتم العثور على العنصر الرئيسي
            const tempAnnouncer = document.createElement("div");
            tempAnnouncer.id = "tempAnnouncer";
            tempAnnouncer.className = "sr-only";
            tempAnnouncer.setAttribute("aria-live", level === "warning" || level === "error" || level === "assertive" ? "assertive" : "polite");
            tempAnnouncer.setAttribute("dir", isRTL ? "rtl" : "ltr");
            tempAnnouncer.setAttribute("lang", i18n.language);
            document.body.appendChild(tempAnnouncer);
            
            tempAnnouncer.textContent = message;
            
            setTimeout(() => {
              document.body.removeChild(tempAnnouncer);
            }, 5000);
          }
        }
        
        // تشغيل تنبيه صوتي إذا كان مفعلاً
        if (soundFeedback && playNotificationSound) {
          if (level === "success") {
            playNotificationSound("success");
          } else if (level === "warning" || level === "error") {
            playNotificationSound("error");
          } else {
            playNotificationSound("info");
          }
        }
      } catch (error) {
        console.error("خطأ في إطلاق الإعلان:", error);
      }
    },
    [announcerSelector, soundFeedback, playNotificationSound, i18n.language]
  );
  
  return { announce };
}
