
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
  /** وزن الخط */
  fontWeight?: 'normal' | 'medium' | 'bold';
  /** حجم الخط */
  fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  /** تباعد الأحرف المخصص */
  letterSpacing?: string;
  /** تباعد الكلمات المخصص */
  wordSpacing?: string;
  /** تفعيل الكاشيدا (التمديد) */
  kashidaEnabled?: boolean;
  /** اتجاه النص (تلقائي، يمين لليسار، يسار لليمين) */
  textDirection?: 'auto' | 'rtl' | 'ltr';
  /** إعدادات خصائص الخط */
  fontFeatureSettings?: {
    setFontFamily?: (value: string) => void;
    setLineHeight?: (value: number) => void;
    setLetterSpacing?: (value: number) => void;
    setKashidaEnabled?: (value: boolean) => void;
  };
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
  fontType = 'default',
  fontWeight = 'normal',
  fontSize = 'base',
  letterSpacing,
  wordSpacing,
  kashidaEnabled = false,
  textDirection = 'auto',
  fontFeatureSettings,
  ...props
}: ArabicTextEnhancerProps) {
  const { i18n } = useTranslation();
  const isArabicLanguage = i18n.language?.startsWith('ar');
  
  // تطبيق التحسينات فقط للغة العربية أو عند التطبيق الإجباري
  if (!isArabicLanguage && !forceEnhance) {
    return <span className={className} {...props}>{children}</span>;
  }
  
  // اختيار نوع الخط المناسب
  const fontClass = {
    tajawal: 'font-tajawal',
    cairo: 'font-cairo',
    'noto-kufi': 'font-noto-kufi-arabic',
    default: 'font-tajawal'
  }[fontType];
  
  // وزن الخط
  const weightClass = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold'
  }[fontWeight];
  
  // حجم الخط
  const sizeClass = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  }[fontSize];
  
  // إعدادات خصائص الخط
  const featureSettings = [
    'calt',  // الأشكال البديلة السياقية
    'kern',  // تباعد الأحرف
    'liga',  // الربط بين الأحرف
  ];
  
  if (arabicDigits) {
    featureSettings.push('ss01'); // الأرقام العربية
  }
  
  if (kashidaEnabled) {
    featureSettings.push('jalt'); // أشكال المد العربي (الكاشيدا)
  }
  
  const featureSettingsStyle = `"${featureSettings.join('", "')}"`;
  
  return (
    <span
      className={cn(
        'tracking-normal',         // تحسين المسافة بين الأحرف
        fontClass,                // تطبيق الخط المناسب
        weightClass,              // تطبيق وزن الخط
        sizeClass,                // تطبيق حجم الخط
        className
      )}
      dir={textDirection === 'auto' ? (isArabicLanguage ? 'rtl' : 'ltr') : textDirection}
      lang={isArabicLanguage ? 'ar' : undefined}
      style={{
        letterSpacing: letterSpacing || (isArabicLanguage ? '0' : 'inherit'),
        wordSpacing: wordSpacing || (isArabicLanguage ? '0.05em' : 'inherit'),
        fontFeatureSettings: featureSettingsStyle,
        fontVariationSettings: isArabicLanguage ? "'wght' 450" : 'inherit', // وزن خط أثقل قليلاً للعربية
      }}
      {...props}
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
    return <span className={className}>{children}</span>;
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
