
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  Tools,
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
        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md flex items-center">
          <LayoutDashboard size={18} className="mr-2" />
          <span>{t('mobileMenu.dashboard')}</span>
        </Link>
        
        <Link to="#" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md flex items-center">
          <Tools size={18} className="mr-2" />
          <span>{t('mobileMenu.tools')}</span>
        </Link>
        
        <Link to="/ai" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md flex items-center">
          <BrainCircuit size={18} className="mr-2" />
          <span>{t('mobileMenu.aiAssistant')}</span>
        </Link>
        
        <Link to="/settings" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md flex items-center">
          <Settings size={18} className="mr-2" />
          <span>{t('mobileMenu.settings')}</span>
        </Link>
        
        <Link to="/help-center" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 py-2 rounded-md flex items-center">
          <HelpCircle size={18} className="mr-2" />
          <span>{t('mobileMenu.helpCenter')}</span>
        </Link>
        
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2">
          <Button className="w-full">
            <LogIn size={18} className="mr-2" />
            <span>{t('mobileMenu.login')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
