
import React, { useState, useEffect } from "react";
import { useA11y } from "@/hooks/useA11y";
import { cn } from "@/lib/utils";

interface ReadingGuideProps {
  color?: string;
  height?: number;
  opacity?: number;
  followCursor?: boolean;
  highlight?: boolean;
}

export function ReadingGuide({
  color = "rgba(252, 211, 77, 0.8)",
  height = 24,
  opacity = 0.15,
  followCursor = true,
  highlight = false
}: ReadingGuideProps) {
  const { readingGuide } = useA11y();
  const [position, setPosition] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  
  // مراقبة موضع المؤشر إذا كان خيار followCursor مفعلاً
  useEffect(() => {
    if (!readingGuide) {
      setIsVisible(false);
      return;
    }
    
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (followCursor) {
        setPosition(e.clientY);
      }
    };
    
    const handleScroll = () => {
      // تحديث الموضع عند التمرير للحفاظ على الموضع النسبي
      setIsVisible(false);
      setTimeout(() => setIsVisible(readingGuide), 100);
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // تحريك دليل القراءة باستخدام مفاتيح الأسهم
      if (!followCursor && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
        e.preventDefault();
        setPosition((prev) => {
          const step = 15;
          return e.key === 'ArrowUp' ? Math.max(0, prev - step) : prev + step;
        });
      }
    };
    
    if (followCursor) {
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    document.addEventListener('scroll', handleScroll);
    
    // إضافة إعلان للإخبار عن دليل القراءة
    if (window.announce) {
      window.announce('تم تفعيل دليل القراءة. استخدم الماوس أو مفاتيح الأسهم للتنقل.', 'polite');
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [readingGuide, followCursor]);
  
  if (!isVisible) return null;
  
  return (
    <div
      className={cn(
        "fixed left-0 right-0 pointer-events-none z-50 transition-opacity",
        highlight ? "mix-blend-multiply" : "mix-blend-darken"
      )}
      style={{
        top: `${position}px`,
        height: `${height}px`,
        backgroundColor: color,
        opacity: opacity,
        transform: 'translateY(-50%)'
      }}
      aria-hidden="true"
    />
  );
}

export default ReadingGuide;
