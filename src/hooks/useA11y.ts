
import { useContext, useCallback } from "react";
import { AccessibilityContext } from "@/context/AccessibilityContext";

/**
 * Hook مخصص لإدارة ميزات إمكانية الوصول
 * يوفر وظائف للتحكم في ميزات إمكانية الوصول وإعلان الشاشة
 */
export function useA11y() {
  const a11yContext = useContext(AccessibilityContext);

  if (!a11yContext) {
    throw new Error("useA11y must be used within an AccessibilityProvider");
  }

  // وظيفة لإعلان نص للقارئات الشاشة
  const announce = useCallback((message: string, politeness: "assertive" | "polite" = "polite") => {
    if (a11yContext.screenReaderAnnouncements) {
      const announcer = document.getElementById(
        politeness === "assertive" ? "assertive-announcer" : "polite-announcer"
      );
      
      if (announcer) {
        announcer.textContent = message;
      }
    }
  }, [a11yContext.screenReaderAnnouncements]);

  // وظيفة لتشغيل ملاحظات صوتية
  const playNotificationSound = useCallback((soundType?: "success" | "error" | "warning" | "info") => {
    if (a11yContext.soundFeedback && a11yContext.soundNotifications) {
      a11yContext.soundNotifications.playSound(soundType || "notification");
    }
  }, [a11yContext.soundFeedback, a11yContext.soundNotifications]);

  return {
    ...a11yContext,
    announce,
    playNotificationSound
  };
}
