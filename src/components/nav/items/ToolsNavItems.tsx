
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
  compact?: boolean;
}

export const ToolsNavItems = ({
  onMouseEnter,
  onMouseLeave,
  isHovered,
  compact = false
}: ToolsNavItemsProps) => {
  const { t } = useTranslation();
  const { features } = useMode();
  const iconSize = compact ? 14 : 17;
  const dropdownIconSize = compact ? 13 : 16;
  
  // قائمة بعناصر القائمة المنسدلة استنادًا إلى الميزات المفعلة
  const getToolsItems = () => {
    const items = [
      { to: '/tools', label: t('tools.title'), icon: <Database size={dropdownIconSize} className="mr-2" /> },
      { to: '/fiber-optic', label: t('header.networkScanner'), icon: <Network size={dropdownIconSize} className="mr-2" /> }
    ];
    
    if (features?.find(f => f.id === 'networkMonitoring')?.enabled) {
      items.push({ to: '/tools?tab=monitor', label: t('networkTools.title'), icon: <Network size={dropdownIconSize} className="mr-2" /> });
    }
    
    if (features?.find(f => f.id === 'aiAssistant')?.enabled) {
      items.push({ to: '/tools?tab=ai-tools', label: t('aiAssistant.title'), icon: <BrainCircuit size={dropdownIconSize} className="mr-2" /> });
    }
    
    if (features?.find(f => f.id === 'dnsOptimization')?.enabled) {
      items.push({ to: '/tools?tab=dns', label: 'DNS Tools', icon: <Database size={dropdownIconSize} className="mr-2" /> });
    }
    
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
        icon={<Wrench size={iconSize} />}
        items={getToolsItems()}
        compact={compact}
      />
    </motion.div>
  );
};
