
import React, { useEffect, useRef } from "react";

interface ScreenReaderAnnouncerProps {
  politeness?: "polite" | "assertive";
  children?: React.ReactNode;
}

/**
 * مكون يسمح بالإعلان عن رسائل لقارئات الشاشة
 */
export function ScreenReaderAnnouncer({ 
  politeness = "polite", 
  children = null 
}: ScreenReaderAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);
  
  // إعلان رسالة جديدة عندما يتغير محتوى المكون
  useEffect(() => {
    if (announcerRef.current && children) {
      const content = typeof children === 'string' 
        ? children 
        : announcerRef.current.textContent;
      
      // إعادة تعيين المحتوى ثم إضافته من جديد لضمان قراءته
      announcerRef.current.textContent = '';
      
      // تأخير قصير لضمان قراءة النص الجديد
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = content;
        }
      }, 50);
    }
  }, [children]);
  
  // إضافة وظيفة الإعلان العامة
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.announce = (message: string, level: "polite" | "assertive" = politeness) => {
        if (announcerRef.current) {
          announcerRef.current.setAttribute("aria-live", level);
          
          // إعادة تعيين النص ثم إضافته لضمان قراءته
          announcerRef.current.textContent = '';
          
          setTimeout(() => {
            if (announcerRef.current) {
              announcerRef.current.textContent = message;
            }
          }, 50);
        }
      };
    }
    
    return () => {
      if (typeof window !== 'undefined') {
        window.announce = () => {};
      }
    };
  }, [politeness]);
  
  return (
    <div 
      ref={announcerRef} 
      aria-live={politeness}
      aria-atomic="true"
      aria-relevant="additions text"
      className="sr-only"
    >
      {typeof children === 'string' ? children : null}
    </div>
  );
}

// تصدير وظيفة مساعدة للإعلان
export function useScreenReaderAnnouncer() {
  const announce = (message: string, politeness: "polite" | "assertive" = "polite") => {
    if (typeof window !== 'undefined' && window.announce) {
      window.announce(message, politeness);
    }
  };
  
  return { announce };
}

// تعريف النوع للوظيفة العامة
declare global {
  interface Window {
    announce(message: string, level?: "polite" | "assertive"): void;
  }
}
