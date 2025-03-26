
import React from "react";
import { Header } from "@/components/Header";
import { QuickAccessibilityButton } from "@/components/ui/QuickAccessibilityButton";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTranslation } from 'react-i18next';

export const IndexHead: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar" || i18n.language === "ar-iq";
  
  return (
    <>
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:shadow-lg rounded"
      >
        تخطي إلى المحتوى الرئيسي
      </a>
      
      <Header />
      
      {/* Accessibility and Theme Controls */}
      <div className="fixed bottom-4 left-4 z-50 md:bottom-6 md:left-6 rtl:left-auto rtl:right-4 rtl:md:right-6 flex flex-col gap-3">
        <QuickAccessibilityButton />
        <ThemeToggle />
      </div>
    </>
  );
};
