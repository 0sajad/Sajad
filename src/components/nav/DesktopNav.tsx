
import React, { useCallback, useState } from "react";
import { NavItemsContainer } from "./NavItemsContainer";
import { DashboardNavItem } from "./items/DashboardNavItem";
import { ToolsNavItems } from "./items/ToolsNavItems";
import { UtilityNavItems } from "./items/UtilityNavItems";
import { LanguageSwitcher } from "../layout/LanguageSwitcher";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";

export const DesktopNav = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  
  const handleHover = useCallback((item: string | null) => {
    setHovered(item);
  }, []);
  
  // تأثيرات الحركة للتنقل
  const containerVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="hidden md:flex items-center justify-end flex-grow relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <NavItemsContainer>
        <motion.div variants={itemVariants}>
          <DashboardNavItem />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <ToolsNavItems />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <UtilityNavItems />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Separator orientation="vertical" className="mx-2 h-6" />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <LanguageSwitcher variant="full" className="ml-2" />
        </motion.div>
      </NavItemsContainer>
    </motion.div>
  );
};
