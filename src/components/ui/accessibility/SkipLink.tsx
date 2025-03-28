
import React from "react";
import { useTranslation } from "react-i18next";

export interface SkipLinkProps {
  href?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href = "#main-content" }) => {
  const { t } = useTranslation();
  
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
    >
      {t('accessibility.skipToContent', 'تخطي إلى المحتوى الرئيسي')}
    </a>
  );
};
