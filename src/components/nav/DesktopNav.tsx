
import React from "react";
import { NavItem } from "./NavItem";
import { NavDropdown } from "./NavDropdown";
import { useTranslation } from "react-i18next";
import { 
  LayoutDashboard,
  Tools,
  Zap,
  BrainCircuit,
  Settings,
  HelpCircle
} from "lucide-react";

export const DesktopNav = () => {
  const { t } = useTranslation();
  
  return (
    <nav className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
      <NavItem to="/" icon={<LayoutDashboard size={16} />}>
        {t('header.dashboard')}
      </NavItem>
      
      <NavDropdown 
        trigger={t('header.tools')}
        icon={<Tools size={16} />}
        items={[
          { label: t('header.networkScanner'), href: '/fiber-optic' },
          { label: t('header.wifiAnalyzer'), href: '#' },
          { label: t('header.trafficAnalyzer'), href: '#' },
        ]}
      />
      
      <NavItem to="/ai" icon={<BrainCircuit size={16} />}>
        {t('header.aiAssistant')}
      </NavItem>
      
      <NavItem to="/settings" icon={<Settings size={16} />}>
        {t('header.settings')}
      </NavItem>
      
      <NavItem to="/help-center" icon={<HelpCircle size={16} />}>
        {t('header.helpCenter')}
      </NavItem>
    </nav>
  );
};
