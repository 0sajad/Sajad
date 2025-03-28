
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
        <TabsList className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg w-full">
          <TabsTrigger value="tools" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-md">
            {t('tools', 'Network Tools')}
          </TabsTrigger>
          <TabsTrigger value="devices" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-md">
            {t('devices', 'Devices')}
          </TabsTrigger>
          <TabsTrigger value="router" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm rounded-md">
            {t('router', 'Router Config')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tools" className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <NetworkTools />
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <DeviceManager />
        </TabsContent>
        
        <TabsContent value="router" className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <RouterConfiguration />
        </TabsContent>
      </Tabs>
    </div>
  );
}
