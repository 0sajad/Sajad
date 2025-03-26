
import React from "react";
import { NavItemsContainer } from "./NavItemsContainer";
import { DashboardNavItem } from "./items/DashboardNavItem";
import { ToolsNavItems } from "./items/ToolsNavItems";
import { UtilityNavItems } from "./items/UtilityNavItems";

export const DesktopNav = () => {
  return (
    <div className="hidden md:flex items-center justify-end flex-grow relative">
      <NavItemsContainer>
        <DashboardNavItem />
        <ToolsNavItems />
        <UtilityNavItems />
      </NavItemsContainer>
    </div>
  );
};
