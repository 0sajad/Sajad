
import React, { useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface LiveAnnouncerProps {
  politeness?: "polite" | "assertive";
}

export function LiveAnnouncer({ politeness = "polite" }: LiveAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  
  // استخدام useMemo لحساب القيم التي لا تتغير كثيرًا
  const isRTL = useMemo(() => {
    return i18n.language === "ar" || i18n.language === "ar-iq";
  }, [i18n.language]);
  
  useEffect(() => {
    // إنشاء وظيفة الإعلان العالمية - تم تحسينها للأداء
    if (typeof window !== 'undefined') {
      // تحسين وظيفة الإعلان لتكون أسرع وأكثر كفاءة
      window.announce = (message: string, level: "polite" | "assertive" = "polite") => {
        if (announcerRef.current) {
          try {
            // استخدام تأخير أقل للحصول على استجابة أسرع
            announcerRef.current.textContent = "";
            announcerRef.current.setAttribute("aria-live", level);
            
            // تقليل التأخير لزيادة السرعة
            requestAnimationFrame(() => {
              if (announcerRef.current) {
                announcerRef.current.textContent = message;
                announcerRef.current.setAttribute("lang", i18n.language);
                announcerRef.current.setAttribute("dir", isRTL ? "rtl" : "ltr");
              }
            });
            
            if (process.env.NODE_ENV === 'development') {
              console.log(`[LiveAnnouncer] ${level}: ${message}`);
            }
          } catch (error) {
            console.error("Error while announcing:", error);
          }
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
          // دالة فارغة للتنظيف
        };
      }
    };
  }, [i18n.language, isRTL]);
  
  // تحسين الوظائف الأولية
  useEffect(() => {
    // التحقق من وجود وظيفة الإعلان
    if (typeof window !== 'undefined' && window.announce) {
      // إعلان أولي للتأكد من عمل النظام
      const initialMessage = isRTL 
        ? "تم تحميل نظام الإعلانات للوصول" 
        : "Accessibility announcements system loaded";
      
      // استخدام setTimeout بتأخير أقل
      setTimeout(() => {
        window.announce(initialMessage, "polite");
      }, 100); // تقليل التأخير من 500 إلى 100 مللي ثانية
    }
  }, [isRTL]);
  
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
      dir={isRTL ? "rtl" : "ltr"}
    />
  );
}

// إضافة تعريف الأنواع لوظيفة الإعلان العالمية
declare global {
  interface Window {
    announce(message: string, level?: "polite" | "assertive"): void;
  }
}
