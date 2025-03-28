
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import { AdvancedFeatures } from "@/components/settings/AdvancedFeatures";
import { NotificationControl } from "@/components/settings/NotificationControl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Shield, Zap, Cpu, Server, BrainCircuit, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="container mx-auto px-6 py-24">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold font-tajawal">{t('settings.advancedSettings')}</h1>
          <span className="mr-3 px-3 py-1 text-xs font-medium bg-octaBlue-50 text-octaBlue-600 rounded-full">
            {t('settings.developerVersion')}
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SettingsMenu />
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="features" dir="rtl" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="features" className="font-tajawal">{t('settings.tabs.advancedFeatures')}</TabsTrigger>
                <TabsTrigger value="notifications" className="font-tajawal">{t('settings.tabs.notifications')}</TabsTrigger>
                <TabsTrigger value="network" className="font-tajawal">{t('settings.tabs.network')}</TabsTrigger>
                <TabsTrigger value="security" className="font-tajawal">{t('settings.tabs.security')}</TabsTrigger>
                <TabsTrigger value="system" className="font-tajawal">{t('settings.tabs.system')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <BrainCircuit className="text-purple-600 ml-2" size={24} />
                    <h2 className="text-2xl font-semibold font-tajawal">{t('settings.aiFeatures')}</h2>
                  </div>
                  <p className="text-muted-foreground font-tajawal leading-relaxed">
                    {t('settings.aiDescription')}
                  </p>
                  <Separator className="my-4" />
                  
                  <AdvancedFeatures />
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Bell className="text-blue-600 ml-2" size={24} />
                    <h2 className="text-2xl font-semibold font-tajawal">{t('settings.notificationSettings')}</h2>
                  </div>
                  <p className="text-muted-foreground font-tajawal leading-relaxed">
                    {t('settings.notificationDescription')}
                  </p>
                  <Separator className="my-4" />
                  
                  <NotificationControl />
                </div>
              </TabsContent>
              
              <TabsContent value="network">
                <div className="flex items-center">
                  <Server className="text-octaBlue-600 ml-2" size={24} />
                  <h2 className="text-2xl font-semibold font-tajawal">{t('settings.advancedNetworkSettings')}</h2>
                </div>
                <p className="text-muted-foreground font-tajawal leading-relaxed mt-2">
                  {t('settings.networkDescription')}
                </p>
                <Separator className="my-4" />
                <div className="border rounded-lg p-8 text-center">
                  <p className="text-xl font-tajawal">{t('settings.comingSoon')}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="security">
                <div className="flex items-center">
                  <Shield className="text-green-600 ml-2" size={24} />
                  <h2 className="text-2xl font-semibold font-tajawal">{t('settings.securityPrivacySettings')}</h2>
                </div>
                <p className="text-muted-foreground font-tajawal leading-relaxed mt-2">
                  {t('settings.securityDescription')}
                </p>
                <Separator className="my-4" />
                <div className="border rounded-lg p-8 text-center">
                  <p className="text-xl font-tajawal">{t('settings.comingSoon')}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="system">
                <div className="flex items-center">
                  <Cpu className="text-amber-600 ml-2" size={24} />
                  <h2 className="text-2xl font-semibold font-tajawal">{t('settings.systemSettings')}</h2>
                </div>
                <p className="text-muted-foreground font-tajawal leading-relaxed mt-2">
                  {t('settings.systemDescription')}
                </p>
                <Separator className="my-4" />
                <div className="border rounded-lg p-8 text-center">
                  <p className="text-xl font-tajawal">{t('settings.comingSoon')}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
