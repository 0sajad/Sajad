
import React from "react";
import { NavItem } from "../NavItem";
import { LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface DashboardNavItemProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
  compact?: boolean;
}

export const DashboardNavItem = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  compact = false
}: DashboardNavItemProps) => {
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
        icon={<LayoutDashboard size={compact ? 14 : 17} />} 
        label={t('header.dashboard')} 
        compact={compact}
      />
    </motion.div>
  );
};
