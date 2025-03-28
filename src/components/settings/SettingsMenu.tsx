
import React from "react";
import { 
  Bell, 
  Shield, 
  Eye, 
  Zap, 
  Globe, 
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface SettingsMenuProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function SettingsMenu({ activeTab, onTabChange }: SettingsMenuProps) {
  const { t } = useTranslation(['settingsPage']);
  
  return (
    <div className="space-y-1">
      <button
        className={cn(
          "flex items-center w-full px-3 py-2 rounded-md text-sm text-left transition-colors",
          activeTab === "notifications" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        onClick={() => onTabChange("notifications")}
      >
        <Bell className="mr-2 h-4 w-4" />
        {t('sections.notifications')}
      </button>
      
      <button
        className={cn(
          "flex items-center w-full px-3 py-2 rounded-md text-sm text-left transition-colors",
          activeTab === "network" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        onClick={() => onTabChange("network")}
      >
        <Network className="mr-2 h-4 w-4" />
        {t('sections.network')}
      </button>
      
      <button
        className={cn(
          "flex items-center w-full px-3 py-2 rounded-md text-sm text-left transition-colors",
          activeTab === "security" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        onClick={() => onTabChange("security")}
      >
        <Shield className="mr-2 h-4 w-4" />
        {t('sections.security')}
      </button>
      
      <button
        className={cn(
          "flex items-center w-full px-3 py-2 rounded-md text-sm text-left transition-colors",
          activeTab === "accessibility" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        onClick={() => onTabChange("accessibility")}
      >
        <Eye className="mr-2 h-4 w-4" />
        {t('sections.accessibility')}
      </button>
      
      <button
        className={cn(
          "flex items-center w-full px-3 py-2 rounded-md text-sm text-left transition-colors",
          activeTab === "advanced" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        onClick={() => onTabChange("advanced")}
      >
        <Zap className="mr-2 h-4 w-4" />
        {t('sections.advanced')}
      </button>
    </div>
  );
}
