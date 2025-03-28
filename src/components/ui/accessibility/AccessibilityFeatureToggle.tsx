
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AccessibilityFeatureToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  icon?: React.ReactNode;
  className?: string;
}

/**
 * مفتاح تبديل لميزة إمكانية وصول مع وصف ورمز
 */
export function AccessibilityFeatureToggle({
  label,
  description,
  checked,
  onCheckedChange,
  icon,
  className,
}: AccessibilityFeatureToggleProps) {
  const id = `feature-toggle-${label.toLowerCase().replace(/\s+/g, '-')}`;
  
  return (
    <div className={cn("flex items-start space-x-4 rtl:space-x-reverse", className)}>
      {icon && <div className="mt-1 text-muted-foreground">{icon}</div>}
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <Label htmlFor={id} className="text-base font-medium cursor-pointer">
            {label}
          </Label>
          <Switch
            id={id}
            checked={checked}
            onCheckedChange={onCheckedChange}
            aria-label={label}
          />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
