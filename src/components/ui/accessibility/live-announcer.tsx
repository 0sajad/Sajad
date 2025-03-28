
import React, { useEffect, useRef } from "react";

interface LiveAnnouncerProps {
  politeness?: "polite" | "assertive";
}

export function LiveAnnouncer({ politeness = "polite" }: LiveAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);
  
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
              }
            }, 50);
          } catch (error) {
            console.error("Error while announcing:", error);
          }
        }
      };
    }
    
    // التنظيف: تفريغ عنصر الإعلان عند إزالة المكون
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
  }, []);
  
  // تأكد من تشغيل هذا المكون عند تحميل التطبيق
  useEffect(() => {
    // التحقق من وجود وظيفة الإعلان
    if (typeof window !== 'undefined' && window.announce) {
      // إعلان أولي للتأكد من عمل النظام
      window.announce("تم تحميل نظام الإعلانات للوصول", "polite");
    }
  }, []);
  
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
    />
  );
}
