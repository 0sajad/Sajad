
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
      
      if (content) {
        // استخدام الوظيفة العالمية للإعلان
        if (typeof window !== 'undefined' && typeof window.announce === 'function') {
          window.announce(content, politeness);
        }
      }
    }
  }, [children, politeness]);
  
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

// تصدير وظيفة مساعدة للإعلان - تستخدم الوظيفة العالمية بأمان
export function useScreenReaderAnnouncer() {
  const announce = (message: string, politeness: "polite" | "assertive" = "polite") => {
    if (typeof window !== 'undefined' && typeof window.announce === 'function') {
      window.announce(message, politeness);
    }
  };
  
  return { announce };
}
