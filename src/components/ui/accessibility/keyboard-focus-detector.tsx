
import React, { useEffect } from "react";
import { useA11y } from "@/hooks/useA11y";

export function KeyboardFocusDetector() {
  const { soundFeedback } = useA11y();
  
  useEffect(() => {
    let hadKeyboardFocus = false;
    
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // إضافة صنف لإظهار مؤشرات التركيز عند استخدام لوحة المفاتيح
        document.body.classList.add('keyboard-user');
        hadKeyboardFocus = true;
        
        // تشغيل صوت تنبيه إذا كان التنبيه الصوتي مفعلاً
        if (soundFeedback) {
          try {
            const audio = new Audio('/sounds/focus.mp3');
            audio.volume = 0.2;
            audio.play().catch(() => {});
          } catch (error) {}
        }
        
        // إزالة مستمع الأحداث بعد الكشف عن استخدام لوحة المفاتيح
        window.removeEventListener('keydown', handleFirstTab);
        
        // إضافة مستمع للنقرات لإزالة نمط لوحة المفاتيح عند استخدام الماوس
        window.addEventListener('mousedown', handleMouseDown);
      }
    };
    
    const handleMouseDown = () => {
      // إزالة صنف مستخدم لوحة المفاتيح عند النقر بالماوس
      document.body.classList.remove('keyboard-user');
      hadKeyboardFocus = false;
      
      // إعادة تفعيل مستمع الأحداث للتحقق من استخدام لوحة المفاتيح مرة أخرى
      window.addEventListener('keydown', handleFirstTab);
    };
    
    const handleFocusIn = (e: FocusEvent) => {
      // تحسين تجربة التنقل عند استخدام Tab مع العناصر القابلة للنقر
      if (hadKeyboardFocus && e.target instanceof HTMLElement) {
        e.target.classList.add('keyboard-focus');
      }
    };
    
    const handleFocusOut = (e: FocusEvent) => {
      if (e.target instanceof HTMLElement) {
        e.target.classList.remove('keyboard-focus');
      }
    };
    
    window.addEventListener('keydown', handleFirstTab);
    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [soundFeedback]);
  
  return null;
}
