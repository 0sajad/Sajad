
import React, { useEffect, useState, useRef } from "react";
import { useA11y } from "@/hooks/useA11y";

/**
 * مكون لاكتشاف التركيز باستخدام لوحة المفاتيح وإظهار مؤشر مرئي
 * يحسن تجربة المستخدمين الذين يتنقلون باستخدام لوحة المفاتيح
 */
export function KeyboardFocusDetector() {
  const [isNavigatingWithKeyboard, setIsNavigatingWithKeyboard] = useState(false);
  const [currentFocusElement, setCurrentFocusElement] = useState<HTMLElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useA11y();
  
  // اكتشاف التنقل بلوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // التحقق مما إذا كان المفتاح متعلقًا بالتنقل
      if (
        e.key === 'Tab' ||
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight'
      ) {
        setIsNavigatingWithKeyboard(true);
      }
    };
    
    // إعادة التعيين عند استخدام الماوس
    const handleMouseDown = () => {
      setIsNavigatingWithKeyboard(false);
    };
    
    // رصد تغييرات التركيز لتحديث موقع المؤشر
    const handleFocusChange = () => {
      if (!isNavigatingWithKeyboard) return;
      
      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement && focusedElement !== document.body) {
        setCurrentFocusElement(focusedElement);
      }
    };
    
    // إضافة المستمعين
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('focusin', handleFocusChange);
    
    // تنظيف المستمعين عند إزالة المكون
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('focusin', handleFocusChange);
    };
  }, [isNavigatingWithKeyboard]);
  
  // تحديث موقع مؤشر التركيز
  useEffect(() => {
    if (!isNavigatingWithKeyboard || !currentFocusElement || !indicatorRef.current) return;
    
    // الحصول على موقع العنصر المركز عليه
    const rect = currentFocusElement.getBoundingClientRect();
    const indicator = indicatorRef.current;
    
    // تعيين موقع المؤشر
    indicator.style.top = `${rect.top + window.scrollY}px`;
    indicator.style.left = `${rect.left + window.scrollX}px`;
    indicator.style.width = `${rect.width}px`;
    indicator.style.height = `${rect.height}px`;
    indicator.style.opacity = '1';
    
    // تحديد نمط المؤشر بناءً على تفضيلات الحركة
    indicator.style.transition = reducedMotion ? 'none' : 'all 0.15s ease-out';
  }, [currentFocusElement, isNavigatingWithKeyboard, reducedMotion]);
  
  // عدم إظهار مؤشر التركيز إذا لم يكن المستخدم يتنقل بلوحة المفاتيح
  if (!isNavigatingWithKeyboard) return null;
  
  return (
    <div 
      ref={indicatorRef}
      className="fixed pointer-events-none z-[9999] rounded-md focus-outline-indicator"
      style={{
        opacity: 0,
        boxShadow: '0 0 0 2px var(--focus-ring-color, #3b82f6)',
        transition: reducedMotion ? 'none' : 'all 0.15s ease-out'
      }}
      aria-hidden="true"
    />
  );
}
