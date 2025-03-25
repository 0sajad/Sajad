
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { MobileNavItem } from "./NavItem";
import {
  LayoutDashboard,
  Wrench,
  BrainCircuit,
  Settings,
  LogIn,
  HelpCircle
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
}

export const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-white dark:bg-gray-950 w-full border-b border-gray-100 dark:border-gray-800">
      <div className="flex flex-col p-4 space-y-2">
        <MobileNavItem 
          to="/" 
          icon={<LayoutDashboard size={18} />} 
          label={t('mobileMenu.dashboard')} 
        />
        
        <MobileNavItem 
          to="#" 
          icon={<Wrench size={18} />} 
          label={t('mobileMenu.tools')} 
        />
        
        <MobileNavItem 
          to="/ai" 
          icon={<BrainCircuit size={18} />} 
          label={t('mobileMenu.aiAssistant')} 
        />
        
        <MobileNavItem 
          to="/settings" 
          icon={<Settings size={18} />} 
          label={t('mobileMenu.settings')} 
        />
        
        <MobileNavItem 
          to="/help-center" 
          icon={<HelpCircle size={18} />} 
          label={t('mobileMenu.helpCenter')} 
        />
        
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
          <Button className="w-full">
            <LogIn size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
            <span>{t('mobileMenu.login')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
