
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface LiveAnnouncerProps {
  politeness?: "polite" | "assertive";
}

export function LiveAnnouncer({ politeness = "polite" }: LiveAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // تعريف وظيفة الإعلان العامة
    if (typeof window !== 'undefined') {
      window.announce = (message: string, level: "polite" | "assertive" = "polite") => {
        if (announcerRef.current) {
          try {
            // إعادة تعيين المحتوى أولاً لضمان قراءة الإعلان الجديد
            announcerRef.current.textContent = "";
            
            // تعيين مستوى الإلحاح
            announcerRef.current.setAttribute("aria-live", level);
            
            // إضافة محتوى الإعلان بعد فترة قصيرة للتأكد من قراءته
            setTimeout(() => {
              if (announcerRef.current) {
                announcerRef.current.textContent = message;
                
                // إضافة سمة اللغة للإعلان
                announcerRef.current.setAttribute("lang", i18n.language);
                
                // التأكد من اتجاه النص الصحيح
                const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
                announcerRef.current.setAttribute("dir", isRTL ? "rtl" : "ltr");
              }
            }, 50);
            
            // سجل الإعلان في وحدة التحكم للتصحيح
            console.log(`[LiveAnnouncer] ${level}: ${message}`);
          } catch (error) {
            console.error("Error while announcing:", error);
          }
        } else {
          console.warn("[LiveAnnouncer] Announcer element not found in DOM");
        }
      };
    }
    
    // للتنظيف: تفريغ عنصر الإعلان عند إزالة المكون
    return () => {
      if (announcerRef.current) {
        announcerRef.current.textContent = "";
      }
      
      // إعادة إنشاء دالة announce كدالة فارغة للسلامة
      if (typeof window !== 'undefined') {
        window.announce = (message: string) => {
          console.log("LiveAnnouncer unmounted, but announce was called with:", message);
        };
      }
    };
  }, [i18n.language]);
  
  // تأكد من تشغيل هذا المكون عند تحميل التطبيق
  useEffect(() => {
    // التحقق من وجود وظيفة الإعلان
    if (typeof window !== 'undefined' && window.announce) {
      // إعلان أولي للتأكد من عمل النظام
      const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
      const initialMessage = isRTL 
        ? "تم تحميل نظام الإعلانات للوصول" 
        : "Accessibility announcements system loaded";
      
      window.announce(initialMessage, "polite");
    }
  }, [i18n.language]);
  
  // تنسيق CSS للتأكد من إخفاء العنصر بصريًا مع السماح لقارئات الشاشة بقراءته
  const announcerStyle: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0'
  };
  
  return (
    <div 
      ref={announcerRef} 
      className="live-announcer sr-only" 
      aria-live={politeness}
      aria-atomic="true"
      aria-relevant="additions"
      style={announcerStyle}
      lang={i18n.language}
      dir={i18n.language === "ar" || i18n.language === "ar-iq" ? "rtl" : "ltr"}
    />
  );
}

// إضافة تعريف الأنواع لوظيفة الإعلان العالمية
declare global {
  interface Window {
    announce(message: string, level?: "polite" | "assertive"): void;
  }
}
