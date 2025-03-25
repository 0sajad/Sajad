
import React from "react";
import { Button } from "@/components/ui/button";
import { MobileNavItem } from "./NavItem";
import { Activity, Network, BrainCircuit, Settings } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
  isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
  const { t } = useTranslation();
  
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden py-4 px-6 bg-white shadow-md dark:bg-gray-900 dark:border-gray-800 dark:border-b">
      <nav className="flex flex-col space-y-4">
        <MobileNavItem to="/#dashboard" label={t('mobileMenu.dashboard')} icon={<Activity size={18} />} />
        <MobileNavItem to="/#tools" label={t('mobileMenu.tools')} icon={<Network size={18} />} />
        <MobileNavItem to="/ai" label={t('mobileMenu.aiAssistant')} icon={<BrainCircuit size={18} />} highlight />
        <MobileNavItem to="/settings" label={t('mobileMenu.settings')} icon={<Settings size={18} />} />
        <div className="pt-2">
          <Button size="sm" className="w-full">
            {t('mobileMenu.login')}
          </Button>
        </div>
      </nav>
    </div>
  );
}
