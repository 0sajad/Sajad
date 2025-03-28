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
  
  // إضافة وظيفة الإعلان العامة (Using window.announce that is defined in LiveAnnouncer)
  useEffect(() => {
    // We'll use the global announce function defined in LiveAnnouncer
    // No need to redefine it here to avoid conflicts
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

// Type definition moved to window.d.ts
