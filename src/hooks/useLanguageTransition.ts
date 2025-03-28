
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useA11y } from "./useA11y";

type SoundType = "success" | "error" | "warning" | "info" | "notification";

/**
 * Hook لإدارة عملية تبديل اللغات مع تأثيرات انتقالية
 */
export function useLanguageTransition() {
  const { i18n, t } = useTranslation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { announce, playNotificationSound } = useA11y();

  /**
   * تغيير اللغة مع تأثير انتقالي
   * @param langCode كود اللغة المستهدفة
   */
  const changeLanguage = useCallback(
    async (langCode: string) => {
      // منع التغيير إذا كانت نفس اللغة الحالية أو إذا كان التحويل جارياً بالفعل
      if (langCode === i18n.language || isTransitioning) {
        return;
      }

      setIsTransitioning(true);

      try {
        // تطبيق الاتجاه المناسب حسب اللغة
        const isRTL = langCode === "ar" || langCode === "ar-iq";
        document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
        
        if (isRTL) {
          document.body.classList.add("rtl-active");
        } else {
          document.body.classList.remove("rtl-active");
        }

        // تغيير اللغة
        await i18n.changeLanguage(langCode);
        
        // حفظ اللغة في التخزين المحلي
        localStorage.setItem("language", langCode);
        
        // عرض رسالة نجاح
        const languageNames: { [key: string]: string } = {
          "ar": "العربية",
          "ar-iq": "العربية العراقية",
          "en": "English",
          "fr": "Français",
          "ja": "日本語",
          "zh": "中文"
        };

        const message = t("common.languageChanged", "تم تغيير اللغة إلى") + " " + languageNames[langCode];
        
        toast.success(message);
        
        // إعلان للقارئات الشاشة
        announce(message, "polite");
        
        // تشغيل صوت نجاح
        playNotificationSound("success");
        
      } catch (error) {
        console.error("Error changing language:", error);
        toast.error(t("common.errorChangingLanguage", "خطأ في تغيير اللغة"));
        announce(t("common.errorChangingLanguage", "خطأ في تغيير اللغة"), "assertive");
        playNotificationSound("error");
      } finally {
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }
    },
    [i18n, isTransitioning, t, announce, playNotificationSound]
  );

  return { isTransitioning, changeLanguage };
}
