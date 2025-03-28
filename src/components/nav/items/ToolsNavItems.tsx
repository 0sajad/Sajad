
import React from "react";
import { NavDropdown } from "../NavDropdown";
import { Wrench, Database, Network, BrainCircuit } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useMode } from "@/context/ModeContext";

interface ToolsNavItemsProps {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isHovered?: boolean;
}

export const ToolsNavItems = ({
  onMouseEnter,
  onMouseLeave,
  isHovered
}: ToolsNavItemsProps = {}) => {
  const { t } = useTranslation();
  const { features } = useMode();
  
  // قائمة بعناصر القائمة المنسدلة استنادًا إلى الميزات المفعلة
  const getToolsItems = () => {
    const items = [
      { to: '/tools', label: t('tools.title'), icon: <Database size={16} className="mr-2" /> },
      { to: '/fiber-optic', label: t('header.networkScanner'), icon: <Network size={16} className="mr-2" /> }
    ];
    
    if (features?.networkMonitoring) {
      items.push({ to: '/tools?tab=monitor', label: t('networkTools.title'), icon: <Network size={16} className="mr-2" /> });
    }
    
    if (features?.aiAssistant) {
      items.push({ to: '/tools?tab=ai-tools', label: t('aiAssistant.title'), icon: <BrainCircuit size={16} className="mr-2" /> });
    }
    
    if (features?.dnsOptimization) {
      items.push({ to: '/tools?tab=dns', label: 'DNS Tools', icon: <Database size={16} className="mr-2" /> });
    }
    
    // يمكن إضافة المزيد من العناصر هنا استنادًا إلى الميزات الأخرى
    
    return items;
  };
  
  return (
    <motion.div 
      variants={{
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
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <NavDropdown 
        label={t('header.tools')}
        icon={<Wrench size={17} />}
        items={getToolsItems()}
      />
    </motion.div>
  );
};
