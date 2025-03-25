
import React from "react";
import { NavItem } from "./NavItem";
import { NavDropdown } from "./NavDropdown";
import { Activity, Network, Search, Radio, BrainCircuit, Settings } from "lucide-react";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
      <NavItem to="/#dashboard" label="لوحة التحكم" icon={<Activity size={18} />} />
      <NavDropdown 
        label="الأدوات" 
        icon={<Network size={18} />}
        items={[
          { to: "/#tools", label: "ماسح الشبكة", icon: <Search size={16} /> },
          { to: "/#tools", label: "محلل WiFi", icon: <Radio size={16} /> },
          { to: "/#tools", label: "محلل حركة المرور", icon: <Activity size={16} /> },
        ]}
      />
      <NavItem 
        to="/ai" 
        label="الذكاء الاصطناعي" 
        icon={<BrainCircuit size={18} />} 
        highlight
      />
      <NavItem to="/settings" label="الإعدادات" icon={<Settings size={18} />} />
    </nav>
  );
}
