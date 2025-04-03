
import { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useA11y } from "./useA11y";
import { changeLanguage as i18nChangeLanguage } from "../i18n";
import { useAppState } from "./state/use-app-state";

/**
 * Hook to manage language switching with transition effects
 */
export function useLanguageTransition() {
  const { i18n, t } = useTranslation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { announce, playNotificationSound } = useA11y?.() || { 
    announce: undefined, 
    playNotificationSound: undefined 
  };
  const pendingLanguageRef = useRef<string | null>(null);
  const setPreference = useAppState((state) => state.setPreference); // استخدام setPreference بدلاً من setPreferences

  /**
   * Change language with transition effect
   * @param langCode Target language code
   */
  const changeLanguage = useCallback(
    async (langCode: string) => {
      // Prevent changing if it's the same language or if a transition is already in progress
      if (langCode === i18n.language || isTransitioning) {
        return;
      }

      // Store the requested language
      pendingLanguageRef.current = langCode;
      setIsTransitioning(true);

      try {
        // Apply appropriate direction based on language
        const isRTL = langCode === "ar" || langCode === "ar-iq";
        document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
        
        if (isRTL) {
          document.body.classList.add("rtl-active");
        } else {
          document.body.classList.remove("rtl-active");
        }

        // Change language using the correctly imported function
        await i18nChangeLanguage(langCode);
        
        // Store language in local storage
        localStorage.setItem("language", langCode);
        
        // حفظ اللغة في التفضيلات أيضا
        setPreference("language", langCode);
        
        // Language names for different languages
        const languageNames: { [key: string]: string } = {
          "ar": "العربية",
          "ar-iq": "العربية العراقية",
          "en": "English",
          "fr": "Français",
          "ja": "日本語",
          "zh": "中文"
        };

        let message = "";
        
        // Custom message for Iraqi Arabic
        if (langCode === 'ar-iq') {
          message = "تم تغيير اللغة لـ" + " " + languageNames[langCode];
        } else {
          message = t("common.languageChanged", "تم تغيير اللغة إلى") + " " + languageNames[langCode];
        }
        
        toast.success(message);
        
        // Announce for screen readers
        if (announce) {
          announce(message, "polite");
        }
        
        // Play success sound
        if (playNotificationSound) {
          playNotificationSound("success");
        }
        
        // Dispatch a custom event for other components to react to language change
        const event = new CustomEvent('languageChanged', { detail: { language: langCode } });
        document.dispatchEvent(event);
        
      } catch (error) {
        console.error("Error changing language:", error);
        
        // Custom error message for Iraqi Arabic
        let errorMessage = "";
        if (i18n.language === 'ar-iq') {
          errorMessage = "صار خطأ بتغيير اللغة";
        } else {
          errorMessage = t("common.errorChangingLanguage", "خطأ في تغيير اللغة");
        }
        
        toast.error(errorMessage);
        
        if (announce) {
          announce(errorMessage, "assertive");
        }
        
        if (playNotificationSound) {
          playNotificationSound("error");
        }
        
        // Reset the pending language
        pendingLanguageRef.current = null;
      } finally {
        // Add a small delay before resetting the transition state
        setTimeout(() => {
          setIsTransitioning(false);
          
          // If the language change was successful, dispatch a fully changed event
          if (pendingLanguageRef.current === i18n.language) {
            const event = new CustomEvent('languageFullyChanged', { 
              detail: { language: i18n.language } 
            });
            document.dispatchEvent(event);
          }
          
          pendingLanguageRef.current = null;
        }, 300);
      }
    },
    [i18n, isTransitioning, t, announce, playNotificationSound, setPreference]
  );

  return { isTransitioning, changeLanguage, currentLanguage: i18n.language };
}
