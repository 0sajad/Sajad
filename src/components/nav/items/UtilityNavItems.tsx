
import React from "react";
import { NavItem } from "../NavItem";
import { BrainCircuit, Settings, HelpCircle, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface UtilityNavItemsProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}

export const UtilityNavItems = ({
  onMouseEnter,
  onMouseLeave,
  isHovered
}: UtilityNavItemsProps = {}) => {
  const { t } = useTranslation();
  
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
      className="flex items-center space-x-2"
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
          icon={<BrainCircuit size={17} />} 
          label={t('header.aiAssistant')} 
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/settings" 
          icon={<Settings size={17} />} 
          label={t('header.settings')} 
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/help-center" 
          icon={<HelpCircle size={17} />} 
          label={t('header.helpCenter')} 
        />
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <NavItem 
          to="/license" 
          icon={<Shield size={17} />} 
          label={t('header.license')} 
        />
      </motion.div>
    </motion.div>
  );
};
