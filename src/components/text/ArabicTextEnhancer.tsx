
import React from 'react';
import { cn } from "@/lib/utils";
import { useArabicSupport } from '@/hooks/useArabicSupport';

interface ArabicTextEnhancerProps {
  children: React.ReactNode;
  className?: string;
  kashida?: boolean;
  enableDigitFormatting?: boolean;
}

/**
 * مكون لتحسين عرض النص العربي وتطبيق ميزات متقدمة مثل الكشيدة
 */
export function ArabicTextEnhancer({
  children,
  className,
  kashida = false,
  enableDigitFormatting = false,
}: ArabicTextEnhancerProps) {
  const { isArabic, formatNumber } = useArabicSupport();

  // إذا لم تكن اللغة عربية، نُرجع المحتوى كما هو
  if (!isArabic) {
    return <span className={className}>{children}</span>;
  }

  // تحويل الأرقام في النص إذا كان مطلوباً
  const processContent = (content: React.ReactNode): React.ReactNode => {
    if (typeof content !== 'string' || !enableDigitFormatting) {
      return content;
    }

    // نمط للبحث عن الأرقام في النص
    const numberPattern = /(\d+(\.\d+)?)/g;
    
    // تقسيم النص حول الأرقام والحفاظ عليها
    const parts = content.split(numberPattern);
    
    return parts.map((part, index) => {
      if (numberPattern.test(part)) {
        // تحويل الرقم إلى تنسيق أرقام عربية/هندية
        return formatNumber(parseFloat(part), true);
      }
      return part;
    });
  };

  // تطبيق الكشيدة وتنسيق النص العربي
  return (
    <span 
      className={cn(
        "arabic-text",
        kashida && "kashida",
        className
      )}
      style={{
        // استخدام "inter-word" بدلاً من "kashida" للتوافق مع خصائص CSS القياسية
        textJustify: kashida ? "inter-word" : undefined,
        fontFeatureSettings: `"rlig", "calt", "ss01", "ss02"${kashida ? ', "kshd"' : ''}`
      }}
    >
      {React.Children.map(children, child => {
        if (typeof child === 'string') {
          return processContent(child);
        }
        return child;
      })}
    </span>
  );
}
