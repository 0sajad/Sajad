
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { useRTLSupport } from '@/hooks/useRTLSupport';

interface AutoDirectionTextProps {
  children: React.ReactNode;
  className?: string;
  forceDirection?: 'rtl' | 'ltr' | 'auto';
  preserveNumbers?: boolean;
  lang?: string;
}

/**
 * مكون يكتشف اتجاه النص تلقائيًا بناءً على المحتوى
 */
export function AutoDirectionText({
  children,
  className,
  forceDirection = 'auto',
  preserveNumbers = true,
  lang,
}: AutoDirectionTextProps) {
  const { isRTL, getDirectionByContent } = useRTLSupport();
  const [textDirection, setTextDirection] = useState<'rtl' | 'ltr'>(isRTL ? 'rtl' : 'ltr');
  
  // كشف اتجاه النص تلقائيًا
  useEffect(() => {
    if (forceDirection !== 'auto') {
      setTextDirection(forceDirection);
      return;
    }
    
    if (typeof children !== 'string') {
      // إذا كان المحتوى ليس نصًا، استخدم الاتجاه الافتراضي
      setTextDirection(isRTL ? 'rtl' : 'ltr');
      return;
    }
    
    // كشف اتجاه النص بناءً على أول حرف غير رقمي أو علامة ترقيم
    const text = children as string;
    
    // استخدام الوظيفة المساعدة من خطاف useRTLSupport
    const detectedDirection = getDirectionByContent(text);
    setTextDirection(detectedDirection);
    
  }, [children, forceDirection, isRTL, getDirectionByContent]);
  
  // معالجة النص لتطبيق اتجاه صحيح للأرقام
  const formatText = (text: string): React.ReactNode => {
    if (!preserveNumbers) {
      return text;
    }
    
    // تطبيق اتجاه لغة من اليسار إلى اليمين للأرقام حتى في النص العربي
    const segments = text.split(/(\d+)/g);
    
    return segments.map((segment, index) => {
      if (/^\d+$/.test(segment)) {
        return (
          <span key={index} style={{ direction: 'ltr', unicodeBidi: 'embed' }}>
            {segment}
          </span>
        );
      }
      return segment;
    });
  };
  
  return (
    <span 
      className={cn("auto-direction", className)}
      dir={textDirection}
      lang={lang}
      style={{ unicodeBidi: 'isolate' }}
    >
      {typeof children === 'string' ? formatText(children) : children}
    </span>
  );
}
