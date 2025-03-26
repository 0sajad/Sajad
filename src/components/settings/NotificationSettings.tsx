
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { Bell, BellOff, MessageSquare, AlertTriangle, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function NotificationSettings() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState({
    system: true,
    security: true,
    updates: true,
    aiAssistant: true,
    networkAlerts: true
  });

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      
      // إظهار إشعار بالتغيير
      toast({
        title: t('settings.notifications.updated'),
        description: prev[key] 
          ? t('settings.notifications.disabled', { type: t(`settings.notifications.types.${key}`) })
          : t('settings.notifications.enabled', { type: t(`settings.notifications.types.${key}`) }),
        variant: "default",
      });
      
      // في تطبيق حقيقي، هنا سنقوم بحفظ الإعدادات في التخزين المحلي أو قاعدة البيانات
      localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
      
      return newSettings;
    });
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-octaBlue-600" />
            <h3 className="text-xl font-semibold font-tajawal">{t('settings.notifications.title')}</h3>
          </div>
          <div className="flex items-center">
            <BellOff className={`h-5 w-5 mr-2 ${Object.values(notifications).some(v => v) ? 'text-muted-foreground' : 'text-red-500'}`} />
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6 font-tajawal">{t('settings.notifications.description')}</p>
        
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                <Label htmlFor="system-notifications" className="font-tajawal">{t('settings.notifications.types.system')}</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-tajawal">{t('settings.notifications.systemDesc')}</p>
            </div>
            <Switch
              id="system-notifications"
              checked={notifications.system}
              onCheckedChange={() => handleToggleNotification("system")}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <Label htmlFor="security-notifications" className="font-tajawal">{t('settings.notifications.types.security')}</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-tajawal">{t('settings.notifications.securityDesc')}</p>
            </div>
            <Switch
              id="security-notifications"
              checked={notifications.security}
              onCheckedChange={() => handleToggleNotification("security")}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-green-500" />
                <Label htmlFor="updates-notifications" className="font-tajawal">{t('settings.notifications.types.updates')}</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-tajawal">{t('settings.notifications.updatesDesc')}</p>
            </div>
            <Switch
              id="updates-notifications"
              checked={notifications.updates}
              onCheckedChange={() => handleToggleNotification("updates")}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-purple-500" />
                <Label htmlFor="ai-notifications" className="font-tajawal">{t('settings.notifications.types.aiAssistant')}</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-tajawal">{t('settings.notifications.aiAssistantDesc')}</p>
            </div>
            <Switch
              id="ai-notifications"
              checked={notifications.aiAssistant}
              onCheckedChange={() => handleToggleNotification("aiAssistant")}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <Label htmlFor="network-notifications" className="font-tajawal">{t('settings.notifications.types.networkAlerts')}</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-tajawal">{t('settings.notifications.networkAlertsDesc')}</p>
            </div>
            <Switch
              id="network-notifications"
              checked={notifications.networkAlerts}
              onCheckedChange={() => handleToggleNotification("networkAlerts")}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
