
import React, { useState } from "react";
import { NavItemsContainer } from "./NavItemsContainer";
import { DashboardNavItem } from "./items/DashboardNavItem";
import { ToolsNavItems } from "./items/ToolsNavItems";
import { UtilityNavItems } from "./items/UtilityNavItems";
import { LanguageSwitcher } from "../layout/LanguageSwitcher";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";

export const DesktopNav = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div className="hidden md:flex items-center justify-end flex-grow relative">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="flex items-center"
      >
        <NavItemsContainer>
          <DashboardNavItem 
            onMouseEnter={() => setHoveredItem('dashboard')}
            onMouseLeave={() => setHoveredItem(null)}
            isHovered={hoveredItem === 'dashboard'}
          />
          <ToolsNavItems 
            onMouseEnter={() => setHoveredItem('tools')}
            onMouseLeave={() => setHoveredItem(null)}
            isHovered={hoveredItem === 'tools'}
          />
          <UtilityNavItems 
            onMouseEnter={() => setHoveredItem('utility')}
            onMouseLeave={() => setHoveredItem(null)}
            isHovered={hoveredItem === 'utility'}
          />
          <Separator orientation="vertical" className="mx-2 h-6" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LanguageSwitcher variant="full" className="ml-2" />
          </motion.div>
        </NavItemsContainer>
      </motion.div>
    </div>
  );
};
