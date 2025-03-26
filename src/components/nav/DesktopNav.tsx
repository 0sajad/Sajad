
import React from "react";
import { NavItemsContainer } from "./NavItemsContainer";
import { DashboardNavItem } from "./items/DashboardNavItem";
import { ToolsNavItems } from "./items/ToolsNavItems";
import { UtilityNavItems } from "./items/UtilityNavItems";
import { LanguageSwitcher } from "../layout/LanguageSwitcher";
import { Separator } from "../ui/separator";

export const DesktopNav = () => {
  return (
    <div className="hidden md:flex items-center justify-end flex-grow relative">
      <NavItemsContainer>
        <DashboardNavItem />
        <ToolsNavItems />
        <UtilityNavItems />
        <Separator orientation="vertical" className="mx-2 h-6" />
        <LanguageSwitcher variant="full" className="ml-2" />
      </NavItemsContainer>
    </div>
  );
};
