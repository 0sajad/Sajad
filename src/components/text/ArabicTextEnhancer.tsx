
import React from 'react';
import { cn } from "@/lib/utils";
import { useArabicText } from './ArabicTextProvider';

interface ArabicTextEnhancerProps {
  children: React.ReactNode;
  className?: string;
  kashida?: boolean;
  enableDigitFormatting?: boolean;
}

/**
 * مكون لتحسين عرض النص العربي وتطبيق ميزات متقدمة مثل الكشيدة
 * تم تحسينه لاستخدام ArabicTextProvider
 */
export function ArabicTextEnhancer({
  children,
  className,
  kashida,
  enableDigitFormatting = false,
}: ArabicTextEnhancerProps) {
  const { isArabic, formatNumber, kashidaEnabled: globalKashidaEnabled } = useArabicText();

  // إذا لم تكن اللغة عربية، نُرجع المحتوى كما هو
  if (!isArabic) {
    return <span className={className}>{children}</span>;
  }

  // استخدام قيمة kashida المحلية إذا تم تمريرها، وإلا استخدام القيمة العالمية
  const useKashida = kashida !== undefined ? kashida : globalKashidaEnabled;

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
        useKashida && "kashida",
        className
      )}
      style={{
        // استخدام "inter-word" بدلاً من "kashida" للتوافق مع خصائص CSS القياسية
        textJustify: useKashida ? "inter-word" : undefined,
        fontFeatureSettings: `"rlig", "calt", "ss01", "ss02"${useKashida ? ', "kshd"' : ''}`
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
