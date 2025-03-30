
import React from "react";
import { NavItem } from "../NavItem";
import { Network, Wifi, ShieldCheck, ServerCrash } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface ToolsNavItemsProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
  compact?: boolean;
}

export const ToolsNavItems = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  compact = false
}: ToolsNavItemsProps) => {
  const { t } = useTranslation();
  const iconSize = compact ? 14 : 17;
  
  const itemVariants = {
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
  };
  
  return (
    <motion.div 
      className="flex items-center space-x-1.5 rtl:space-x-reverse"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/network-dashboard" 
          icon={<Network size={iconSize} />} 
          label={t('header.networkDashboard')} 
          compact={compact}
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/wifi-analyzer" 
          icon={<Wifi size={iconSize} />} 
          label={t('header.wifiAnalyzer')} 
          compact={compact}
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/security" 
          icon={<ShieldCheck size={iconSize} />} 
          label={t('header.security')} 
          compact={compact}
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/simulation" 
          icon={<ServerCrash size={iconSize} />} 
          label={t('header.simulation')} 
          compact={compact}
        />
      </motion.div>
    </motion.div>
  );
};
