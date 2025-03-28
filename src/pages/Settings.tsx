
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { useA11y } from "@/hooks/useA11y";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { AdvancedSettings } from "@/components/settings/AdvancedSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { NetworkSettings } from "@/components/settings/NetworkSettings";

const Settings = () => {
  const { t } = useTranslation(['settingsPage']);
  const { isDeveloperMode } = useMode();
  const { announce, reducedMotion, setReducedMotion, highContrast, setHighContrast } = useA11y();
  const [autoStart, setAutoStart] = useState(false);
  const [startMinimized, setStartMinimized] = useState(false);
  const [closeToTray, setCloseToTray] = useState(true);
  const [checkUpdates, setCheckUpdates] = useState(true);
  const [animations, setAnimations] = useState(!reducedMotion);
  const [compactMode, setCompactMode] = useState(false);
  
  const handleSaveSettings = () => {
    toast.success(t('saved'));
    announce(t('saved'), 'success');
  };
  
  const handleReset = () => {
    if (window.confirm(t('resetConfirm'))) {
      setAutoStart(false);
      setStartMinimized(false);
      setCloseToTray(true);
      setCheckUpdates(true);
      setAnimations(true);
      setCompactMode(false);
      setReducedMotion(false);
      setHighContrast(false);
      
      toast.success(t('resetConfirm'));
      announce(t('resetConfirm'), 'info');
    }
  };
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {isDeveloperMode && <DeveloperPanel />}
      
      <main className="container mx-auto p-6 pb-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="general">{t('sections.general')}</TabsTrigger>
            <TabsTrigger value="appearance">{t('sections.appearance')}</TabsTrigger>
            <TabsTrigger value="network">{t('sections.network')}</TabsTrigger>
            <TabsTrigger value="notifications">{t('sections.notifications')}</TabsTrigger>
            <TabsTrigger value="security">{t('sections.security')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>{t('sections.general')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoStart">{t('general.autoStart')}</Label>
                    <Switch 
                      id="autoStart" 
                      checked={autoStart} 
                      onCheckedChange={setAutoStart} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="startMinimized">{t('general.startMinimized')}</Label>
                    <Switch 
                      id="startMinimized" 
                      checked={startMinimized} 
                      onCheckedChange={setStartMinimized} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="closeToTray">{t('general.closeToTray')}</Label>
                    <Switch 
                      id="closeToTray" 
                      checked={closeToTray} 
                      onCheckedChange={setCloseToTray} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="checkUpdates">{t('general.checkUpdates')}</Label>
                    <Switch 
                      id="checkUpdates" 
                      checked={checkUpdates} 
                      onCheckedChange={setCheckUpdates} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="pt-2">
                  <h3 className="mb-4 text-lg font-medium">{t('sections.language')}</h3>
                  <div className="flex flex-col space-y-2">
                    <Label>{t('sections.language')}</Label>
                    <LanguageSwitcher variant="full" className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>{t('sections.appearance')}</CardTitle>
                <CardDescription>{t('description')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label>{t('appearance.theme')}</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder={t('appearance.systemTheme')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">{t('appearance.lightTheme')}</SelectItem>
                        <SelectItem value="dark">{t('appearance.darkTheme')}</SelectItem>
                        <SelectItem value="system">{t('appearance.systemTheme')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations">{t('appearance.animations')}</Label>
                    <Switch 
                      id="animations" 
                      checked={animations} 
                      onCheckedChange={(checked) => {
                        setAnimations(checked);
                        setReducedMotion(!checked);
                      }} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="compactMode">{t('appearance.compactMode')}</Label>
                    <Switch 
                      id="compactMode" 
                      checked={compactMode} 
                      onCheckedChange={setCompactMode} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="highContrast">High Contrast Mode</Label>
                    <Switch 
                      id="highContrast" 
                      checked={highContrast} 
                      onCheckedChange={setHighContrast} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="network">
            <NetworkSettings />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex items-center justify-end space-x-4 rtl:space-x-reverse">
          <Button variant="outline" onClick={handleReset}>{t('reset')}</Button>
          <Button variant="outline">{t('cancel')}</Button>
          <Button onClick={handleSaveSettings}>{t('save')}</Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
