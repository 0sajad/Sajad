
import React from "react";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { AIChatbot } from "../ai/AIChatbot";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetworkMonitoring } from "./NetworkMonitoring";
import { NetworkSimulation } from "./NetworkSimulation";
import { NetworkManagement } from "./NetworkManagement";

export function NetworkToolsSection() {
  const { t } = useTranslation();
  
  return (
    <section id="network-tools" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('networkTools.title')}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('networkTools.qualityMonitoring')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="monitoring" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="monitoring" className="flex-1">
                  {t('networkTools.qualityMonitoring')}
                </TabsTrigger>
                <TabsTrigger value="management" className="flex-1">
                  {t('networkTools.networkManagement')}
                </TabsTrigger>
                <TabsTrigger value="simulation" className="flex-1">
                  {t('networkTools.simulationSystems')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="monitoring">
                <NetworkMonitoring />
              </TabsContent>
              
              <TabsContent value="management">
                <NetworkManagement />
              </TabsContent>
              
              <TabsContent value="simulation">
                <NetworkSimulation />
              </TabsContent>
            </Tabs>
          </div>
          
          <AIChatbot />
        </div>
      </div>
    </section>
  );
}
