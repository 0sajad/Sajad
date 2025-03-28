
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useA11y } from "@/hooks/useA11y";

interface SkipLinkProps {
  targetId?: string;
  className?: string;
  href?: string; // إضافة خاصية الرابط
}

export function SkipLink({ targetId = "main-content", className = "", href }: SkipLinkProps) {
  const { t, i18n } = useTranslation();
  const { announce } = useA11y();
  
  // تحديد معرف الهدف من الرابط إذا تم تمريره
  const targetHref = href || `#${targetId}`;
  
  // الحصول على الترجمة المناسبة بناءً على اللغة الحالية
  const skipText = i18n.language === 'ar-iq' 
    ? 'انتقل للمحتوى الرئيسي'
    : t('accessibility.skipToContent', 'تخطى إلى المحتوى الرئيسي');
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // استخدام المعرف المستخرج من الرابط إذا كان يبدأ بعلامة #
    const id = targetHref.startsWith('#') ? targetHref.substring(1) : targetId;
    
    // البحث عن العنصر المستهدف
    const targetElement = document.getElementById(id);
    
    if (targetElement) {
      // تعيين التركيز على العنصر المستهدف
      targetElement.setAttribute('tabindex', '-1');
      targetElement.focus({ preventScroll: false });
      
      // الإعلان عن الانتقال لقارئات الشاشة
      announce(skipText, 'polite');
      
      // نقل العنصر المستهدف إلى مستوى عرض الشاشة
      targetElement.scrollIntoView({ behavior: 'smooth' });
      
      // إزالة tabindex بعد تنفيذ الانتقال
      setTimeout(() => {
        if (targetElement.getAttribute('tabindex') === '-1' && 
            targetElement.id !== 'main-content') {
          targetElement.removeAttribute('tabindex');
        }
      }, 1000);
    }
  };
  
  return (
    <a
      href={targetHref}
      className={`sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 rtl:focus:left-auto rtl:focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-md focus:outline-none ${className}`}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
        }
      }}
    >
      {skipText}
    </a>
  );
}
