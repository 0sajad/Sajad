
import React from "react";
import { NavItem } from "../NavItem";
import { BrainCircuit, Settings, HelpCircle, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface UtilityNavItemsProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
  compact?: boolean;
}

export const UtilityNavItems = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  compact = false
}: UtilityNavItemsProps) => {
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
      className="flex items-center space-x-1.5"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/ai" 
          icon={<BrainCircuit size={iconSize} />} 
          label={t('header.aiAssistant')} 
          compact={compact}
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/settings" 
          icon={<Settings size={iconSize} />} 
          label={t('header.settings')} 
          compact={compact}
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/help-center" 
          icon={<HelpCircle size={iconSize} />} 
          label={t('header.helpCenter')} 
          compact={compact}
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/license" 
          icon={<Shield size={iconSize} />} 
          label={t('header.license')} 
          compact={compact}
        />
      </motion.div>
    </motion.div>
  );
};
