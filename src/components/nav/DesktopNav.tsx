
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
      {/* شعار المطور مع تحسين الموضع */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[380px] h-[20px] z-10">
        <motion.div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-gray-300/20 dark:border-gray-700/20"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.5, 0.7, 0.5],
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
              "0 0 20px rgba(139, 92, 246, 0.3)",
              "0 0 0 rgba(139, 92, 246, 0.1)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* أيقونة كود الجانب الأيسر - تحسين الموضع */}
        <motion.div 
          className="absolute -left-8 top-[16px] -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-1.5 rounded-full shadow-md"
          animate={{
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1],
            boxShadow: ["0 4px 6px rgba(0, 0, 0, 0.1)", "0 6px 10px rgba(0, 0, 0, 0.2)", "0 4px 6px rgba(0, 0, 0, 0.1)"]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <Code size={16} />
        </motion.div>
        
        {/* أيقونة كود الجانب الأيمن - تحسين الموضع */}
        <motion.div 
          className="absolute -right-8 top-[16px] -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-500 text-white p-1.5 rounded-full shadow-md"
          animate={{
            rotate: [0, -10, 0, 10, 0],
            scale: [1, 1.1, 1],
            boxShadow: ["0 4px 6px rgba(0, 0, 0, 0.1)", "0 6px 10px rgba(0, 0, 0, 0.2)", "0 4px 6px rgba(0, 0, 0, 0.1)"]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "loop",
            delay: 0.5
          }}
        >
          <Code size={16} />
        </motion.div>
      </div>
      
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
