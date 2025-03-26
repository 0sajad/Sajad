
import { useCallback } from "react";
import { useA11y } from "@/hooks/useA11y";

type AnnouncementLevel = "info" | "success" | "warning" | "error" | "polite" | "assertive";

interface UseAccessibilityAnnouncerOptions {
  announcerSelector?: string;
}

export function useAccessibilityAnnouncer(options: UseAccessibilityAnnouncerOptions = {}) {
  const { announcerSelector = "#liveAnnouncer" } = options;
  const { soundFeedback, playNotificationSound } = useA11y();
  
  const announce = useCallback(
    (message: string, level: AnnouncementLevel = "polite") => {
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
          
          announcer.setAttribute("aria-live", politeness);
          announcer.textContent = message;
          
          // مسح النص بعد فترة
          setTimeout(() => {
            if (announcer.textContent === message) {
              announcer.textContent = "";
            }
          }, 5000);
        } else {
          console.warn(`Announcer element not found: ${announcerSelector}`);
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
    },
    [announcerSelector, soundFeedback, playNotificationSound]
  );
  
  return { announce };
}
