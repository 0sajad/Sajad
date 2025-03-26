
import React from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface NotificationToggleProps {
  id: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
  onToggle?: (enabled: boolean) => void;
}

export const NotificationToggle = ({
  id,
  label,
  description,
  defaultChecked = true,
  onToggle
}: NotificationToggleProps) => {
  const { t } = useTranslation();
  const [enabled, setEnabled] = React.useState<boolean>(defaultChecked);

  const handleToggle = (checked: boolean) => {
    setEnabled(checked);
    
    if (onToggle) {
      onToggle(checked);
    }
    
    // إظهار إشعار للمستخدم
    toast({
      title: t('settings.notifications.updated'),
      description: checked 
        ? t('settings.notifications.enabled', { type: label })
        : t('settings.notifications.disabled', { type: label }),
      duration: 3000
    });
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <h4 className="font-medium">{label}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch
        id={id}
        checked={enabled}
        onCheckedChange={handleToggle}
      />
    </div>
  );
};
