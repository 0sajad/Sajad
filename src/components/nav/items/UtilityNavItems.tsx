
import React from "react";
import { NavItem } from "../NavItem";
import { BrainCircuit, Settings, HelpCircle, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const UtilityNavItems = () => {
  const { t } = useTranslation();
  
  return (
    <>
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
          to="/ai" 
          icon={<BrainCircuit size={17} />} 
          label={t('header.aiAssistant')} 
        />
      </motion.div>
      
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
          to="/settings" 
          icon={<Settings size={17} />} 
          label={t('header.settings')} 
        />
      </motion.div>
      
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
          to="/help-center" 
          icon={<HelpCircle size={17} />} 
          label={t('header.helpCenter')} 
        />
      </motion.div>
      
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
          to="/license" 
          icon={<Shield size={17} />} 
          label={t('header.license')} 
        />
      </motion.div>
    </>
  );
};
