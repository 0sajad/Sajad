
import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavItem } from "./NavItem";
import { 
  LayoutDashboard, 
  Wrench, 
  BrainCircuit, 
  Settings, 
  HelpCircle, 
  FileCheck 
} from "lucide-react";

export function NavItemsContainer() {
  const { t } = useTranslation();
  const location = useLocation();
  
  // Define navigation items
  const navItems = [
    { 
      path: "/", 
      label: t('header.dashboard', 'لوحة التحكم'),
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      path: "/tools", 
      label: t('header.tools', 'الأدوات'),
      icon: <Wrench size={20} /> 
    },
    { 
      path: "/ai", 
      label: t('header.aiAssistant', 'مساعد الذكاء الاصطناعي'),
      icon: <BrainCircuit size={20} /> 
    },
    { 
      path: "/settings", 
      label: t('header.settings', 'الإعدادات'),
      icon: <Settings size={20} /> 
    },
    { 
      path: "/help-center", 
      label: t('header.helpCenter', 'مركز المساعدة'),
      icon: <HelpCircle size={20} /> 
    },
    { 
      path: "/license", 
      label: t('header.license', 'الترخيص'),
      icon: <FileCheck size={20} /> 
    },
  ];

  return (
    <div className="hidden lg:flex items-center justify-center space-x-1 rtl:space-x-reverse flex-grow">
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          path={item.path}
          label={item.label}
          icon={item.icon}
          isActive={location.pathname === item.path}
        />
      ))}
    </div>
  );
}
