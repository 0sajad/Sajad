
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cpu, Network, Shield } from "lucide-react";
import { SystemPerformanceMonitor } from "@/components/analytics/SystemPerformanceMonitor";
import { DeviceManager } from "@/components/network/DeviceManager";
import { SecurityDashboard } from "@/components/security/SecurityDashboard";

export const SystemTabs = () => {
  const { t } = useTranslation();
  const [activeSystemTab, setActiveSystemTab] = useState("performance");
  
  return (
    <div className="mb-8">
      <Tabs value={activeSystemTab} onValueChange={setActiveSystemTab}>
        <TabsList className="mb-4 grid grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <Cpu size={14} />
            <span>{t('dashboard.systemPerformance', 'System')}</span>
          </TabsTrigger>
          <TabsTrigger value="devices" className="flex items-center gap-1">
            <Network size={14} />
            <span>{t('dashboard.devices', 'Devices')}</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Shield size={14} />
            <span>{t('dashboard.security', 'Security')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <SystemPerformanceMonitor />
        </TabsContent>
        
        <TabsContent value="devices">
          <DeviceManager />
        </TabsContent>
        
        <TabsContent value="security">
          <SecurityDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
