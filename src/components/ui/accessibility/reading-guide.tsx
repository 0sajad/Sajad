
import React, { useEffect, useState, useRef } from "react";
import { useA11y } from "@/hooks/useA11y";

export function ReadingGuide() {
  const { readingGuide, highContrast } = useA11y();
  const [mousePosition, setMousePosition] = useState<{ y: number }>({ y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!readingGuide) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ y: e.clientY });
      setIsVisible(true);
      
      // إخفاء الدليل بعد فترة من عدم تحريك الماوس
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };
    
    const handleScroll = () => {
      // تحديث الرؤية عند التمرير
      setIsVisible(true);
      
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = window.setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [readingGuide]);
  
  // عدم عرض دليل القراءة إذا كانت الميزة معطلة
  if (!readingGuide) return null;
  
  return (
    <div
      ref={guideRef}
      className={`reading-guide-element ${highContrast ? 'high-contrast' : ''} ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        top: `${mousePosition.y}px`,
        height: '2px',
        backgroundColor: highContrast ? 'rgba(255, 255, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)',
        position: 'fixed',
        left: '0',
        right: '0',
        zIndex: 9999,
        transition: 'opacity 0.3s ease-out'
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
}
