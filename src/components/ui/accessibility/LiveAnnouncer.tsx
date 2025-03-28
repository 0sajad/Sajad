
import React, { useEffect, useRef } from 'react';

// نضيف تعريف لواجهة Window لتضمين خاصية announce
declare global {
  interface Window {
    announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  }
}

export function LiveAnnouncer() {
  const politeAnnouncerRef = useRef<HTMLDivElement>(null);
  const assertiveAnnouncerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // إضافة وظيفة announce كوظيفة عالمية
    window.announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
      if (!message) return;
      
      const announcer = politeness === 'assertive' 
        ? assertiveAnnouncerRef.current 
        : politeAnnouncerRef.current;
        
      if (announcer) {
        // إنشاء عنصر جديد للإعلان
        const oldText = announcer.textContent;
        
        // الإعلان فقط إذا كانت الرسالة مختلفة
        if (oldText !== message) {
          try {
            // ضبط محتوى النص فارغًا أولاً لإجبار قارئات الشاشة
            // على التعرف على التغيير حتى لو كان النص هو نفسه
            announcer.textContent = '';
            
            // استخدام setTimeout لضمان التقاط قارئات الشاشة للتغيير
            setTimeout(() => {
              if (announcer) {
                announcer.textContent = message;
              }
            }, 10);
          } catch (error) {
            console.error('Error announcing message:', error);
          }
        }
      }
    };
    
    // تنظيف
    return () => {
      // استبدال وظيفة announce بوظيفة لا تفعل شيئًا بدلاً من حذفها
      // لتجنب الأخطاء من المكونات التي قد تحاول استخدامها أثناء التنظيف
      window.announce = () => {};
    };
  }, []);
  
  return (
    <>
      <div 
        ref={politeAnnouncerRef} 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
      />
      <div 
        ref={assertiveAnnouncerRef} 
        aria-live="assertive" 
        aria-atomic="true" 
        className="sr-only"
      />
    </>
  );
}
