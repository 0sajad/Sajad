
import React, { useEffect, useRef } from "react";

interface LiveAnnouncerProps {
  politeness?: "polite" | "assertive";
}

export function LiveAnnouncer({ politeness = "polite" }: LiveAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // تعريف وظيفة الإعلان العامة
    window.announce = (message: string, level: "polite" | "assertive" = "polite") => {
      if (announcerRef.current) {
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
      }
    };
  }, []);
  
  return (
    <div 
      ref={announcerRef} 
      className="live-announcer" 
      aria-live={politeness}
      aria-atomic="true"
      aria-relevant="additions"
    />
  );
}

// إضافة تعريف الأنواع لوظيفة الإعلان العالمية
declare global {
  interface Window {
    announce(message: string, level?: "polite" | "assertive"): void;
  }
}
