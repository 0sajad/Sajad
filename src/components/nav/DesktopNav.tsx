
import React from "react";
import { NavItem } from "./NavItem";
import { NavDropdown } from "./NavDropdown";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard,
  Wrench,
  BrainCircuit,
  Settings,
  HelpCircle
} from "lucide-react";

export const DesktopNav = () => {
  const { t } = useTranslation();
  
  return (
    <nav className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
      <NavItem 
        to="/" 
        icon={<LayoutDashboard size={16} />} 
        label={t('header.dashboard')} 
      />
      
      <NavDropdown 
        label={t('header.tools')}
        icon={<Wrench size={16} />}
        items={[
          { to: '/fiber-optic', label: t('header.networkScanner') },
          { to: '#', label: t('header.wifiAnalyzer') },
          { to: '#', label: t('header.trafficAnalyzer') },
        ]}
      />
      
      <NavItem 
        to="/ai" 
        icon={<BrainCircuit size={16} />} 
        label={t('header.aiAssistant')} 
      />
      
      <NavItem 
        to="/settings" 
        icon={<Settings size={16} />} 
        label={t('header.settings')} 
      />
      
      <NavItem 
        to="/help-center" 
        icon={<HelpCircle size={16} />} 
        label={t('header.helpCenter')} 
      />
    </nav>
  );
};
