
import React from "react";
import { NavItem } from "./NavItem";
import { NavDropdown } from "./NavDropdown";
import { Activity, Network, Search, Radio, BrainCircuit, Settings } from "lucide-react";
import { useTranslation } from 'react-i18next';

export function DesktopNav() {
  const { t } = useTranslation();
  
  return (
    <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
      <NavItem to="/#dashboard" label={t('header.dashboard')} icon={<Activity size={18} />} />
      <NavDropdown 
        label={t('header.tools')} 
        icon={<Network size={18} />}
        items={[
          { to: "/#tools", label: t('header.networkScanner'), icon: <Search size={16} /> },
          { to: "/#tools", label: t('header.wifiAnalyzer'), icon: <Radio size={16} /> },
          { to: "/#tools", label: t('header.trafficAnalyzer'), icon: <Activity size={16} /> },
        ]}
      />
      <NavItem 
        to="/ai" 
        label={t('header.aiAssistant')} 
        icon={<BrainCircuit size={18} />} 
        highlight
      />
      <NavItem to="/settings" label={t('header.settings')} icon={<Settings size={18} />} />
    </nav>
  );
}
