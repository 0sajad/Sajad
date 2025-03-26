
import React from "react";
import { NavItem } from "../NavItem";
import { LayoutDashboard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const DashboardNavItem = () => {
  const { t } = useTranslation();
  
  return (
    <motion.div variants={{
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
    }}>
      <NavItem 
        to="/" 
        icon={<LayoutDashboard size={17} />} 
        label={t('header.dashboard')} 
      />
    </motion.div>
  );
};
