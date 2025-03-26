
import React from "react";
import { NavItem } from "./NavItem";
import { NavDropdown } from "./NavDropdown";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  LayoutDashboard,
  Wrench,
  BrainCircuit,
  Settings,
  HelpCircle,
  Shield
} from "lucide-react";

export const DesktopNav = () => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
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
    <div className="hidden md:flex items-center justify-end flex-grow relative">
      <motion.nav 
        className="flex items-center space-x-8 rtl:space-x-reverse bg-white/20 dark:bg-gray-900/30 backdrop-blur-md px-8 py-3 rounded-full border border-gray-200/30 dark:border-gray-700/30 shadow-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/" 
            icon={<LayoutDashboard size={17} />} 
            label={t('header.dashboard')} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavDropdown 
            label={t('header.tools')}
            icon={<Wrench size={17} />}
            items={[
              { to: '/fiber-optic', label: t('header.networkScanner') },
              { to: '#', label: t('header.wifiAnalyzer') },
              { to: '#', label: t('header.trafficAnalyzer') },
            ]}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/ai" 
            icon={<BrainCircuit size={17} />} 
            label={t('header.aiAssistant')} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/settings" 
            icon={<Settings size={17} />} 
            label={t('header.settings')} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/help-center" 
            icon={<HelpCircle size={17} />} 
            label={t('header.helpCenter')} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/license" 
            icon={<Shield size={17} />} 
            label={t('header.license')} 
          />
        </motion.div>
      </motion.nav>
    </div>
  );
};
