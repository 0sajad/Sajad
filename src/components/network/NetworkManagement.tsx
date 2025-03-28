
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkTools } from "./NetworkTools"; 
import { DeviceManager } from "./DeviceManager";
import { RouterConfiguration } from "./RouterConfiguration";

export function NetworkManagement() {
  const { t } = useTranslation(['networkTools']);
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="tools" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tools">{t('tools', 'Network Tools')}</TabsTrigger>
          <TabsTrigger value="devices">{t('devices', 'Devices')}</TabsTrigger>
          <TabsTrigger value="router">{t('router', 'Router Config')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tools" className="space-y-4">
          <NetworkTools />
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-4">
          <DeviceManager />
        </TabsContent>
        
        <TabsContent value="router" className="space-y-4">
          <RouterConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
}
