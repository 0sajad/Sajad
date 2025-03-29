
import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface ArabicTextEnhancerProps {
  /** النص الذي سيتم تحسينه */
  children: React.ReactNode;
  /** فئات CSS إضافية */
  className?: string;
  /** ما إذا كان سيتم تطبيق التحسين بغض النظر عن اللغة الحالية */
  forceEnhance?: boolean;
  /** استخدام خط مخصص للأرقام العربية */
  arabicDigits?: boolean;
  /** نوع الخط العربي المستخدم */
  fontType?: 'tajawal' | 'cairo' | 'noto-kufi' | 'default';
}

/**
 * مكون لتحسين عرض النصوص العربية
 * يطبق أنماط محسنة للنصوص العربية مثل المسافة بين الأحرف ووزن الخط
 */
export function ArabicTextEnhancer({
  children,
  className,
  forceEnhance = false,
  arabicDigits = false,
  fontType = 'default'
}: ArabicTextEnhancerProps) {
  const { i18n } = useTranslation();
  const isArabicLanguage = i18n.language?.startsWith('ar');
  
  // تطبيق التحسينات فقط للغة العربية أو عند التطبيق الإجباري
  if (!isArabicLanguage && !forceEnhance) {
    return <>{children}</>;
  }
  
  // اختيار نوع الخط المناسب
  const fontClass = {
    tajawal: 'font-tajawal',
    cairo: 'font-cairo',
    'noto-kufi': 'font-noto-kufi-arabic',
    default: 'font-tajawal'
  }[fontType];
  
  return (
    <span
      className={cn(
        'tracking-normal',   // تحسين المسافة بين الأحرف
        fontClass,           // تطبيق الخط المناسب
        arabicDigits && 'font-feature-settings: "ss01"', // الأرقام العربية
        'font-feature-settings: "calt", "dlig", "kern", "liga"', // تحسينات الليجاتور
        className
      )}
      dir="auto"
      style={{
        letterSpacing: isArabicLanguage ? '0' : 'inherit',
        wordSpacing: isArabicLanguage ? '0.05em' : 'inherit',
      }}
    >
      {children}
    </span>
  );
}

/**
 * مكون لتحسين عرض الأرقام العربية
 */
export function ArabicDigits({
  children,
  className
}: PropsWithChildren<{ className?: string }>) {
  const { i18n } = useTranslation();
  const isArabicLanguage = i18n.language?.startsWith('ar');
  
  if (!isArabicLanguage) {
    return <>{children}</>;
  }
  
  return (
    <span
      className={cn(
        'font-feature-settings: "ss01"', // الأرقام العربية
        className
      )}
    >
      {children}
    </span>
  );
}
