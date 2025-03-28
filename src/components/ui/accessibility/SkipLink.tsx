
import React from "react";
import { useTranslation } from "react-i18next";

export function SkipLink() {
  const { t } = useTranslation();
  
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-1/2 focus:-translate-x-1/2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:shadow-md"
    >
      {t('accessibility.skipToContent', 'Skip to content')}
    </a>
  );
}
