
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Eye, Type, ZoomIn, MousePointer2 } from "lucide-react";

interface AccessibilityOptionProps {
  id: string;
  icon: "eye" | "type" | "zoomIn" | "mousePointer2";
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
  const IconComponent = {
    eye: Eye,
    type: Type,
    zoomIn: ZoomIn,
    mousePointer2: MousePointer2
  }[icon];

  return (
    <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <IconComponent className="h-4 w-4 text-muted-foreground" />
        <Label htmlFor={id} className="flex flex-col space-y-1">
          <span>{title}</span>
          <span className="font-normal text-xs text-muted-foreground">
            {description}
          </span>
        </Label>
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={title}
      />
    </div>
  );
}
