
import React, { useEffect } from "react";

export function KeyboardFocusDetector() {
  useEffect(() => {
    const handleFirstTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        // إضافة صنف لإظهار مؤشرات التركيز عند استخدام لوحة المفاتيح
        document.body.classList.add('keyboard-user');
        
        // إزالة مستمع الأحداث بعد الكشف عن استخدام لوحة المفاتيح
        window.removeEventListener('keydown', handleFirstTab);
        
        // إضافة مستمع للنقرات لإزالة نمط لوحة المفاتيح عند استخدام الماوس
        window.addEventListener('mousedown', handleMouseDown);
      }
    };
    
    const handleMouseDown = () => {
      // إزالة صنف مستخدم لوحة المفاتيح عند النقر بالماوس
      document.body.classList.remove('keyboard-user');
    };
    
    window.addEventListener('keydown', handleFirstTab);
    
    return () => {
      window.removeEventListener('keydown', handleFirstTab);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  return null;
}
