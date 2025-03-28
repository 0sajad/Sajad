
import React from "react";
import { NavItem } from "../NavItem";
import { LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface DashboardNavItemProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}

export const DashboardNavItem = ({
  onMouseEnter,
  onMouseLeave,
  isHovered
}: DashboardNavItemProps = {}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { 
            type: "spring",
            stiffness: 300,
            damping: 20
          }
        }
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <NavItem 
        to="/dashboard" 
        icon={<LayoutDashboard size={17} />} 
        label={t('header.dashboard')} 
      />
    </motion.div>
  );
};
