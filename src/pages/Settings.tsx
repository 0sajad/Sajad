
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AccessibilitySettings } from "@/components/settings/AccessibilitySettings";
import { AdvancedSettings } from "@/components/settings/AdvancedSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { useA11y } from "@/hooks/useA11y";
import { NetworkSettings } from "@/components/settings/NetworkSettings";

const Settings = () => {
  const { t } = useTranslation(['settingsPage']);
  const [activeTab, setActiveTab] = useState("notifications");
  const { announce } = useA11y();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    announce(t(`sections.${value}`, value), 'info');
  };

  return (
    <div className="container mx-auto p-6 pb-20">
      <Header />
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SettingsMenu activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
        
        <div className="md:col-span-3">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="notifications">{t('sections.notifications')}</TabsTrigger>
              <TabsTrigger value="network">{t('sections.network')}</TabsTrigger>
              <TabsTrigger value="security">{t('sections.security')}</TabsTrigger>
              <TabsTrigger value="accessibility">{t('sections.accessibility')}</TabsTrigger>
              <TabsTrigger value="advanced">{t('sections.advanced')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notifications" className="mt-6">
              <NotificationSettings />
            </TabsContent>
            
            <TabsContent value="network" className="mt-6">
              <NetworkSettings />
            </TabsContent>
            
            <TabsContent value="security" className="mt-6">
              <SecuritySettings />
            </TabsContent>
            
            <TabsContent value="accessibility" className="mt-6">
              <AccessibilitySettings />
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-6">
              <AdvancedSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
