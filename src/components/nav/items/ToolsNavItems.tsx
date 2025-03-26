
import React from "react";
import { NavDropdown } from "../NavDropdown";
import { Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export const ToolsNavItems = () => {
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
  );
};
