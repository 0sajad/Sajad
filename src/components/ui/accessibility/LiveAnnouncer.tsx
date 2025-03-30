
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function LiveAnnouncer() {
  const politeAnnouncerRef = useRef<HTMLDivElement>(null);
  const assertiveAnnouncerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  
  // تنسيق رسالة الإعلان حسب اللغة
  const formatAnnouncementForLang = (message: string): string => {
    const currentLang = i18n.language || 'en';
    
    // إضافة نقطة في نهاية الجملة إذا لم تكن موجودة بالفعل
    if (!message.endsWith('.') && !message.endsWith('!') && !message.endsWith('?')) {
      message = `${message}.`;
    }
    
    // تنسيق الرسالة حسب اللغة
    if (currentLang.startsWith('ar')) {
      // للغة العربية، نتأكد من اتجاه النص من اليمين إلى اليسار
      return message;
    } else if (currentLang === 'fr') {
      // للغة الفرنسية، نضيف مسافة قبل علامات الترقيم الثنائية
      return message.replace(/([!?])/, ' $1');
    } else if (currentLang === 'ja' || currentLang === 'zh') {
      // للغات الآسيوية، لا نضيف مسافات إضافية
      return message;
    }
    
    return message;
  };
  
  useEffect(() => {
    // إضافة وظيفة announce كوظيفة عالمية
    window.announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
      if (!message) return;
      
      const announcer = politeness === 'assertive' 
        ? assertiveAnnouncerRef.current 
        : politeAnnouncerRef.current;
        
      if (announcer) {
        try {
          // تنسيق الرسالة حسب اللغة
          const formattedMessage = formatAnnouncementForLang(message);
          
          // ضبط محتوى النص فارغًا أولاً لإجبار قارئات الشاشة
          // على التعرف على التغيير حتى لو كان النص هو نفسه
          announcer.textContent = '';
          
          // استخدام setTimeout لضمان التقاط قارئات الشاشة للتغيير
          setTimeout(() => {
            if (announcer) {
              announcer.textContent = formattedMessage;
            }
          }, 10);
        } catch (error) {
          console.error('Error announcing message:', error);
        }
      }
    };
    
    // تنظيف
    return () => {
      // استبدال وظيفة announce بوظيفة لا تفعل شيئًا بدلاً من حذفها
      // لتجنب الأخطاء من المكونات التي قد تحاول استخدامها أثناء التنظيف
      window.announce = () => {};
    };
  }, [i18n.language]); // إضافة اللغة كتبعية لتحديث المعلن عندما تتغير اللغة
  
  return (
    <>
      <div 
        ref={politeAnnouncerRef} 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        lang={i18n.language}
        dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'}
      />
      <div 
        ref={assertiveAnnouncerRef} 
        aria-live="assertive" 
        aria-atomic="true" 
        className="sr-only"
        lang={i18n.language}
        dir={i18n.language.startsWith('ar') ? 'rtl' : 'ltr'}
      />
    </>
  );
}
