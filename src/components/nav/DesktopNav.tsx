
import React, { useEffect, useMemo, useCallback } from "react";
import { NavItemsContainer } from "./NavItemsContainer";
import { DashboardNavItem } from "./items/DashboardNavItem";
import { ToolsNavItems } from "./items/ToolsNavItems";
import { UtilityNavItems } from "./items/UtilityNavItems";
import { useTranslation } from "react-i18next";

export const DesktopNav = () => {
  const { i18n } = useTranslation();
  
  // استخدام useMemo بدلاً من useState مع useEffect لتسريع التحميل
  const isRTL = useMemo(() => {
    return i18n.language === "ar" || i18n.language === "ar-iq";
  }, [i18n.language]);
  
  // استخدم useCallback لتحسين الأداء
  const handleLanguageChange = useCallback(() => {
    // سيتم إعادة تقييم isRTL تلقائيًا بسبب تغيير i18n.language
  }, []);
  
  useEffect(() => {
    // تسجيل مستمع الحدث مرة واحدة فقط
    document.addEventListener('languageChanged', handleLanguageChange);
    
    // إزالة مستمع الحدث عند تفكيك المكون
    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [handleLanguageChange]);
  
  // استخدام useMemo لحساب الأنماط والخصائص مرة واحدة فقط عند تغيير isRTL
  const navClasses = useMemo(() => {
    return `hidden md:flex items-center justify-end flex-grow relative ${isRTL ? 'flex-row-reverse' : ''}`;
  }, [isRTL]);
  
  return (
    <div className={navClasses}>
      <NavItemsContainer>
        <DashboardNavItem />
        <ToolsNavItems />
        <UtilityNavItems />
      </NavItemsContainer>
    </div>
  );
};
