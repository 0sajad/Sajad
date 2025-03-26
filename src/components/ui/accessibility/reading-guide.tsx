
import React, { useEffect, useState, useRef } from "react";
import { useA11y } from "@/hooks/useA11y";

export function ReadingGuide() {
  const { readingGuide } = useA11y();
  const [mousePosition, setMousePosition] = useState<{ y: number }>({ y: 0 });
  const guideRef = useRef<HTMLDivElement>(null);
  const highContrast = useA11y().highContrast;
  
  useEffect(() => {
    if (!readingGuide) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [readingGuide]);
  
  // عدم عرض دليل القراءة إذا كانت الميزة معطلة
  if (!readingGuide) return null;
  
  return (
    <div
      ref={guideRef}
      className={`reading-guide-element ${highContrast ? 'high-contrast' : ''}`}
      style={{ top: `${mousePosition.y}px` }}
      role="presentation"
      aria-hidden="true"
    />
  );
}
