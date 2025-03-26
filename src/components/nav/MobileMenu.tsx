
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Laptop, Settings, HelpCircle, LayoutDashboard, LogIn, Shield, BrainCircuit } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MobileNavItem } from "./NavItem";
import { motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
  const { t } = useTranslation();
  const location = useLocation();
  
  if (!isOpen) return null;
  
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
        when: "beforeChildren"
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
    <motion.div 
      className="md:hidden fixed inset-x-0 top-[70px] z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-t-gray-200 dark:border-t-gray-800 transition-all max-h-[85vh] overflow-y-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      exit={{ opacity: 0, y: -20 }}
    >
      <nav className="container mx-auto px-4 py-6 flex flex-col space-y-3">
        <motion.div variants={itemVariants}>
          <MobileNavItem
            to="/"
            label={t('mobileMenu.dashboard')}
            icon={<LayoutDashboard size={22} />}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <MobileNavItem
            to="/tools"
            label={t('mobileMenu.tools')}
            icon={<Laptop size={22} />}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <MobileNavItem
            to="/ai"
            label={t('mobileMenu.aiAssistant')}
            icon={<BrainCircuit size={22} />}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <MobileNavItem
            to="/settings"
            label={t('mobileMenu.settings')}
            icon={<Settings size={22} />}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <MobileNavItem
            to="/help-center"
            label={t('mobileMenu.helpCenter')}
            icon={<HelpCircle size={22} />}
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <MobileNavItem
            to="/license"
            label={t('mobileMenu.helpCenter')}
            icon={<Shield size={22} />}
          />
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="pt-3"
        >
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 py-4 mt-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:shadow-purple-500/20"
          >
            <LogIn size={20} />
            <span className="text-base font-medium">{t('mobileMenu.login')}</span>
          </Link>
        </motion.div>
      </nav>
    </motion.div>
  );
}
