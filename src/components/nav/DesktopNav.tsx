
import React, { useState } from "react";
import { DashboardNavItem } from "./items/DashboardNavItem";
import { ToolsNavItems } from "./items/ToolsNavItems";
import { UtilityNavItems } from "./items/UtilityNavItems";
import { NavItemsContainer } from "./NavItemsContainer";
import { motion } from "framer-motion";

export const DesktopNav = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const handleItemHover = (item: string) => {
    setHoveredItem(item);
  };
  
  const handleItemLeave = () => {
    setHoveredItem(null);
  };
  
  return (
    <nav className="hidden md:flex items-center">
      <motion.div 
        className="flex items-center space-x-6 rtl:space-x-reverse" // زيادة المساحة هنا من space-x-1 إلى space-x-6
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.1
            }
          }
        }}
      >
        <NavItemsContainer>
          <DashboardNavItem
            onMouseEnter={() => handleItemHover('dashboard')}
            onMouseLeave={handleItemLeave}
            isHovered={hoveredItem === 'dashboard'}
          />
          
          <ToolsNavItems
            onMouseEnter={() => handleItemHover('tools')}
            onMouseLeave={handleItemLeave}
            isHovered={hoveredItem === 'tools'}
          />
          
          <UtilityNavItems />
        </NavItemsContainer>
      </motion.div>
    </nav>
  );
};
