
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface AccessibilityToggleProps {
  id: string;
  label: string;
  icon: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  shortcutKey: string;
  descriptionId?: string;
}

export function AccessibilityToggle({
  id,
  label,
  icon: Icon,
  checked,
  onChange,
  shortcutKey,
  descriptionId
}: AccessibilityToggleProps) {
  // Get keyboard shortcut display
  const getKeyboardShortcut = (shortcut: string) => {
    return (
      <kbd className="px-2 py-0.5 text-xs bg-muted rounded border border-border">
        {shortcut}
      </kbd>
    );
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Label 
          htmlFor={id}
          className="text-sm cursor-pointer"
          id={`${id}-label`}
        >
          {label}
        </Label>
      </div>
      <div className="flex items-center gap-2">
        {getKeyboardShortcut(shortcutKey)}
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={onChange}
          aria-checked={checked}
          aria-labelledby={`${id}-label`}
          aria-describedby={descriptionId}
        />
      </div>
    </div>
  );
}
