
import React, { useEffect, useState } from "react";
import { NavItemsContainer } from "./NavItemsContainer";
import { DashboardNavItem } from "./items/DashboardNavItem";
import { ToolsNavItems } from "./items/ToolsNavItems";
import { UtilityNavItems } from "./items/UtilityNavItems";
import { useTranslation } from "react-i18next";

export const DesktopNav = () => {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.language === "ar" || i18n.language === "ar-iq");
  
  useEffect(() => {
    // تحديث اتجاه القائمة عند تغيير اللغة
    const updateDirection = () => {
      setIsRTL(i18n.language === "ar" || i18n.language === "ar-iq");
    };
    
    updateDirection();
    
    // الاستماع لتغييرات اللغة
    const handleLanguageChange = () => {
      updateDirection();
    };
    
    document.addEventListener('languageChanged', handleLanguageChange);
    
    return () => {
      document.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, [i18n.language]);
  
  return (
    <div className={`hidden md:flex items-center justify-end flex-grow relative ${isRTL ? 'flex-row-reverse' : ''}`}>
      <NavItemsContainer>
        <DashboardNavItem />
        <ToolsNavItems />
        <UtilityNavItems />
      </NavItemsContainer>
    </div>
  );
};
