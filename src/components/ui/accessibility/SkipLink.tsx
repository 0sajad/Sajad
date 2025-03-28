
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export function SkipLink() {
  const { t, i18n } = useTranslation();
  const [focused, setFocused] = useState(false);
  
  // تخصيص نص الرابط للهجة العراقية
  const getSkipLinkText = () => {
    if (i18n.language === "ar-iq") {
      return "انتقل للمحتوى الرئيسي";
    }
    return t('accessibility.skipToContent', 'الانتقال إلى المحتوى الأساسي');
  };
  
  return (
    <a 
      href="#main-content"
      className={`
        fixed top-0 left-1/2 transform -translate-x-1/2 
        z-50 bg-primary text-primary-foreground px-4 py-2 rounded-b-md
        transition-opacity font-medium
        ${focused ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
      `}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label={getSkipLinkText()}
    >
      {getSkipLinkText()}
    </a>
  );
}
