
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
  Shield,
  Code
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
      {/* Developer Logo & Brand Name */}
      <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 flex items-center mr-4">
        <motion.div
          className="mr-4 text-2xl font-bold"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.span 
            className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
            whileHover={{ 
              scale: 1.05,
              textShadow: "0 0 8px rgba(139, 92, 246, 0.3)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            OCTA-GRAM
          </motion.span>
        </motion.div>
      </div>
      
      {/* Developer Logo Surrounding the Nav */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[75px] -z-10">
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/15 to-blue-500/15 border border-gray-300/30 dark:border-gray-700/30"
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0 rgba(139, 92, 246, 0.1)",
              "0 0 25px rgba(139, 92, 246, 0.4)",
              "0 0 0 rgba(139, 92, 246, 0.1)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Code Icons for Developer Logo - Left side */}
        <motion.div 
          className="absolute -left-7 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full shadow-lg"
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.15, 1],
            boxShadow: [
              "0 0 0 rgba(139, 92, 246, 0.1)",
              "0 0 15px rgba(139, 92, 246, 0.6)",
              "0 0 0 rgba(139, 92, 246, 0.1)"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <Code size={18} />
        </motion.div>
        
        {/* Code Icons for Developer Logo - Right side */}
        <motion.div 
          className="absolute -right-7 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-2 rounded-full shadow-lg"
          animate={{
            rotate: [0, -10, 0, 10, 0],
            scale: [1, 1.15, 1],
            boxShadow: [
              "0 0 0 rgba(139, 92, 246, 0.1)",
              "0 0 15px rgba(139, 92, 246, 0.6)",
              "0 0 0 rgba(139, 92, 246, 0.1)"
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            delay: 0.5
          }}
        >
          <Code size={18} />
        </motion.div>
      </div>
      
      <motion.nav 
        className="flex items-center space-x-8 rtl:space-x-reverse bg-white/25 dark:bg-gray-900/35 backdrop-blur-md px-9 py-3 rounded-full border border-gray-200/40 dark:border-gray-700/40 shadow-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/" 
            icon={<LayoutDashboard size={16} />} 
            label={t('header.dashboard')} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavDropdown 
            label={t('header.tools')}
            icon={<Wrench size={16} />}
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
            icon={<BrainCircuit size={16} />} 
            label={t('header.aiAssistant')} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/settings" 
            icon={<Settings size={16} />} 
            label={t('header.settings')} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/help-center" 
            icon={<HelpCircle size={16} />} 
            label={t('header.helpCenter')} 
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <NavItem 
            to="/license" 
            icon={<Shield size={16} />} 
            label={t('header.license')} 
          />
        </motion.div>
      </motion.nav>
    </div>
  );
};
