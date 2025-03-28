
import React from "react";
import { useTranslation } from "react-i18next";

export interface SkipLinkProps {
  href?: string;
  targetId?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({ href, targetId }) => {
  const { t } = useTranslation();
  
  // Use targetId if provided, otherwise use href, or default to #main-content
  const skipTarget = targetId ? `#${targetId}` : (href || "#main-content");
  
  return (
    <a
      href={skipTarget}
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
    >
      {t('accessibility.skipToContent', 'تخطي إلى المحتوى الرئيسي')}
    </a>
  );
};
