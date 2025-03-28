
import React, { useEffect, useState, useRef } from "react";
import { useA11y } from "@/hooks/useA11y";
import { useTranslation } from "react-i18next";

export function ReadingGuide() {
  const { readingGuide, highContrast, reducedMotion } = useA11y();
  const { t } = useTranslation();
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
    
    const handleKeydown = (e: KeyboardEvent) => {
      // إظهار دليل القراءة عند تمرير المحتوى باستخدام لوحة المفاتيح
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp') {
        setIsVisible(true);
        
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = window.setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
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
    
    // إضافة مستمعات الأحداث
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeydown);
    
    // إعلان عن تفعيل دليل القراءة للقارئات الشاشية
    const announcement = t('accessibility.readingGuideEnabled', 'تم تفعيل دليل القراءة');
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    setTimeout(() => {
      announcer.textContent = announcement;
      
      setTimeout(() => {
        document.body.removeChild(announcer);
      }, 3000);
    }, 500);
    
    return () => {
      // إزالة مستمعات الأحداث عند التفكيك
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeydown);
      
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [readingGuide, t]);
  
  // عدم عرض دليل القراءة إذا كانت الميزة معطلة
  if (!readingGuide) return null;
  
  // تحديد لون ونمط دليل القراءة حسب الإعدادات
  const guideColor = highContrast 
    ? 'rgba(255, 255, 0, 0.8)' // أصفر شديد في وضع التباين العالي
    : 'rgba(59, 130, 246, 0.4)'; // أزرق شفاف في الوضع العادي
  
  // تحديد حجم وسمك الدليل
  const guideHeight = highContrast ? '4px' : '2px';
  
  // تحديد نمط الانتقال
  const transitionStyle = reducedMotion 
    ? 'opacity 0.5s linear' 
    : 'opacity 0.3s ease-out, top 0.2s ease-out';
  
  return (
    <div
      ref={guideRef}
      className="reading-guide-element"
      style={{ 
        top: `${mousePosition.y}px`,
        height: guideHeight,
        backgroundColor: guideColor,
        position: 'fixed',
        left: '0',
        right: '0',
        zIndex: 9999,
        boxShadow: highContrast ? '0 0 4px rgba(255, 255, 255, 0.7)' : 'none',
        opacity: isVisible ? 1 : 0,
        transition: transitionStyle,
        pointerEvents: 'none'
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
}
