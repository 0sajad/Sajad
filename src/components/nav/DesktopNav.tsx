
import React from "react";
import { NavItem } from "./NavItem";
import { NavDropdown } from "./NavDropdown";
import { useTranslation } from "react-i18next";
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
  
  return (
    <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
      <NavItem 
        to="/" 
        icon={<LayoutDashboard size={18} />} 
        label={t('header.dashboard')} 
      />
      
      <NavDropdown 
        label={t('header.tools')}
        icon={<Wrench size={18} />}
        items={[
          { to: '/fiber-optic', label: t('header.networkScanner') },
          { to: '#', label: t('header.wifiAnalyzer') },
          { to: '#', label: t('header.trafficAnalyzer') },
        ]}
      />
      
      <NavItem 
        to="/ai" 
        icon={<BrainCircuit size={18} />} 
        label={t('header.aiAssistant')} 
      />
      
      <NavItem 
        to="/settings" 
        icon={<Settings size={18} />} 
        label={t('header.settings')} 
      />
      
      <NavItem 
        to="/help-center" 
        icon={<HelpCircle size={18} />} 
        label={t('header.helpCenter')} 
      />
      
      <NavItem 
        to="/license" 
        icon={<Shield size={18} />} 
        label={t('header.license')} 
      />
    </nav>
  );
};
