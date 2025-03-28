
import React from "react";
import { 
  Shield, 
  Zap, 
  Cpu, 
  Server, 
  BrainCircuit, 
  Globe, 
  Network, 
  Wifi,
  ThermometerSun
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SettingsSectionProps {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const SettingsSection = ({ title, icon, active = false, onClick }: SettingsSectionProps) => {
  return (
    <button
      className={cn(
        "flex items-center w-full px-3 py-2 rounded-md text-right transition-colors",
        active 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted"
      )}
      onClick={onClick}
    >
      <span className="ml-2.5 rtl:ml-0 rtl:mr-2.5">{icon}</span>
      <span className="font-tajawal">{title}</span>
    </button>
  );
};

export const SettingsMenu = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2 font-tajawal">الميزات الرئيسية</h3>
        <div className="space-y-1">
          <SettingsSection 
            title="الذكاء الاصطناعي" 
            icon={<BrainCircuit size={18} />} 
            active
          />
          <SettingsSection 
            title="مراقبة الشبكة" 
            icon={<Network size={18} />}
          />
          <SettingsSection 
            title="خدمات DNS" 
            icon={<Globe size={18} />}
          />
          <SettingsSection 
            title="مراقبة الأجهزة" 
            icon={<Cpu size={18} />}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2 font-tajawal">إعدادات الأمان</h3>
        <div className="space-y-1">
          <SettingsSection 
            title="حماية الشبكة" 
            icon={<Shield size={18} />}
          />
          <SettingsSection 
            title="وضع التخفي" 
            icon={<Wifi size={18} />}
          />
          <SettingsSection 
            title="حماية الشبكة المظلمة" 
            icon={<Shield size={18} />}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2 font-tajawal">إعدادات النظام</h3>
        <div className="space-y-1">
          <SettingsSection 
            title="توفير الطاقة" 
            icon={<Zap size={18} />}
          />
          <SettingsSection 
            title="مراقبة الحرارة" 
            icon={<ThermometerSun size={18} />}
          />
          <SettingsSection 
            title="إعدادات الخادم" 
            icon={<Server size={18} />}
          />
        </div>
      </div>
    </div>
  );
};
