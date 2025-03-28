
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Eye, Type, ZoomIn, MousePointer2, Volume2, Keyboard } from "lucide-react";
import { useTranslation } from "react-i18next";

type IconName = "eye" | "type" | "zoomIn" | "mousePointer2" | "volume" | "keyboard";

interface AccessibilityOptionProps {
  id: string;
  icon: IconName;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function AccessibilityOption({
  id,
  icon,
  title,
  description,
  checked,
  onCheckedChange
}: AccessibilityOptionProps) {
  const { t } = useTranslation();
  
  const iconMap = {
    eye: Eye,
    type: Type,
    zoomIn: ZoomIn,
    mousePointer2: MousePointer2,
    volume: Volume2,
    keyboard: Keyboard
  };
  
  const IconComponent = iconMap[icon];
  
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start space-x-4 rtl:space-x-reverse">
        <div className="mt-1 bg-muted p-2 rounded-md">
          <IconComponent className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={t('common.toggle', { feature: title })}
      />
    </div>
  );
}
