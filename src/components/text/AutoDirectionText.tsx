
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
  const { isRTL } = useRTLSupport();
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
    
    // نمط يطابق الأحرف العربية
    const rtlPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    
    // نمط يطابق الأحرف اللاتينية
    const ltrPattern = /[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/;
    
    // البحث عن أول حرف ليس رقمًا أو علامة ترقيم
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      // تجاهل الأرقام والمسافات وعلامات الترقيم
      if (/[\d\s\p{P}]/u.test(char)) {
        continue;
      }
      
      if (rtlPattern.test(char)) {
        setTextDirection('rtl');
        return;
      }
      
      if (ltrPattern.test(char)) {
        setTextDirection('ltr');
        return;
      }
    }
    
    // إذا لم يتم العثور على أحرف معرّفة، استخدم الاتجاه الافتراضي
    setTextDirection(isRTL ? 'rtl' : 'ltr');
  }, [children, forceDirection, isRTL]);
  
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
