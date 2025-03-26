
import React from "react";
import { useTranslation } from "react-i18next";
import { NotificationToggle } from "./NotificationToggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function NotificationSettings() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.notifications.title')}</CardTitle>
        <CardDescription>{t('settings.notifications.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <NotificationToggle
          id="system-notifications"
          label={t('settings.notifications.types.system')}
          description={t('settings.notifications.systemDesc')}
          defaultChecked={true}
        />
        
        <NotificationToggle
          id="security-notifications"
          label={t('settings.notifications.types.security')}
          description={t('settings.notifications.securityDesc')}
          defaultChecked={true}
        />
        
        <NotificationToggle
          id="updates-notifications"
          label={t('settings.notifications.types.updates')}
          description={t('settings.notifications.updatesDesc')}
          defaultChecked={true}
        />
        
        <NotificationToggle
          id="ai-assistant-notifications"
          label={t('settings.notifications.types.aiAssistant')}
          description={t('settings.notifications.aiAssistantDesc')}
          defaultChecked={true}
        />
        
        <NotificationToggle
          id="network-alerts-notifications"
          label={t('settings.notifications.types.networkAlerts')}
          description={t('settings.notifications.networkAlertsDesc')}
          defaultChecked={true}
        />
      </CardContent>
    </Card>
  );
}
