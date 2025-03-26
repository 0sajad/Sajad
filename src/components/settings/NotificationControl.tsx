
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import { 
  Bell, 
  BellOff, 
  MessageSquare, 
  AlertTriangle, 
  Info, 
  Network, 
  Zap, 
  Shield, 
  Server
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface NotificationCategory {
  id: string;
  icon: React.ComponentType<any>;
  iconColor: string;
}

export function NotificationControl() {
  const { t } = useTranslation();
  
  // تعريف جميع فئات الإشعارات المتاحة
  const notificationCategories: NotificationCategory[] = [
    { id: "system", icon: Info, iconColor: "text-blue-500" },
    { id: "security", icon: AlertTriangle, iconColor: "text-amber-500" },
    { id: "updates", icon: Info, iconColor: "text-green-500" },
    { id: "aiAssistant", icon: MessageSquare, iconColor: "text-purple-500" },
    { id: "networkAlerts", icon: AlertTriangle, iconColor: "text-red-500" },
    { id: "performance", icon: Zap, iconColor: "text-orange-500" },
    { id: "securityScans", icon: Shield, iconColor: "text-teal-500" },
    { id: "serverStatus", icon: Server, iconColor: "text-indigo-500" },
    { id: "networkActivity", icon: Network, iconColor: "text-cyan-500" }
  ];

  // حالة الإشعارات - استرجاع من التخزين المحلي أو استخدام القيم الافتراضية
  const [notifications, setNotifications] = useState<Record<string, boolean>>(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
    
    // قيم افتراضية - جميع الإشعارات مفعلة
    const defaultSettings: Record<string, boolean> = {};
    notificationCategories.forEach(cat => {
      defaultSettings[cat.id] = true;
    });
    return defaultSettings;
  });

  // حفظ الإعدادات في التخزين المحلي عند تغييرها
  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
  }, [notifications]);

  // تبديل حالة تفعيل/تعطيل الإشعار
  const handleToggleNotification = (key: string) => {
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
      
      return newSettings;
    });
  };

  // تبديل حالة جميع الإشعارات دفعة واحدة
  const toggleAllNotifications = (enable: boolean) => {
    const newSettings: Record<string, boolean> = {};
    notificationCategories.forEach(cat => {
      newSettings[cat.id] = enable;
    });
    
    setNotifications(newSettings);
    
    toast({
      title: t('settings.notifications.updated'),
      description: enable 
        ? t('settings.notifications.allEnabled')
        : t('settings.notifications.allDisabled'),
      variant: "default",
    });
  };

  // التحقق ما إذا كانت جميع الإشعارات معطلة
  const areAllNotificationsDisabled = () => {
    return notificationCategories.every(cat => !notifications[cat.id]);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-octaBlue-600" />
            <h3 className="text-xl font-semibold font-tajawal">{t('settings.notifications.title')}</h3>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleAllNotifications(true)}
              className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded hover:bg-green-100"
              disabled={notificationCategories.every(cat => notifications[cat.id])}
            >
              {t('settings.notifications.enableAll')}
            </button>
            <button
              onClick={() => toggleAllNotifications(false)}
              className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100"
              disabled={areAllNotificationsDisabled()}
            >
              {t('settings.notifications.disableAll')}
            </button>
            <BellOff 
              className={`h-5 w-5 ${areAllNotificationsDisabled() ? 'text-red-500' : 'text-muted-foreground'}`} 
            />
          </div>
        </div>
        
        <p className="text-muted-foreground mb-6 font-tajawal">{t('settings.notifications.description')}</p>
        
        <div className="space-y-5">
          {notificationCategories.map((category, index) => (
            <React.Fragment key={category.id}>
              {index > 0 && <Separator />}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <category.icon className={`h-4 w-4 ${category.iconColor}`} />
                    <Label 
                      htmlFor={`${category.id}-notifications`} 
                      className="font-tajawal"
                    >
                      {t(`settings.notifications.types.${category.id}`)}
                    </Label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 font-tajawal">
                    {t(`settings.notifications.${category.id}Desc`)}
                  </p>
                </div>
                <Switch
                  id={`${category.id}-notifications`}
                  checked={notifications[category.id]}
                  onCheckedChange={() => handleToggleNotification(category.id)}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
      </Card>
    </div>
  );
}
