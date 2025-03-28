
import React from "react";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { LucideIcon } from "lucide-react";

interface AccessibilityToggleProps {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  shortcutKey?: string;
}

export function AccessibilityToggle({
  id,
  label,
  description,
  icon: Icon,
  checked,
  onChange,
  shortcutKey
}: AccessibilityToggleProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-start space-x-4 rtl:space-x-reverse p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex-shrink-0 mt-1">
        <div className="bg-primary/10 p-2 rounded-md">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <label 
            htmlFor={id} 
            className="text-sm font-medium cursor-pointer flex items-center"
          >
            {label}
            {shortcutKey && (
              <kbd className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                {shortcutKey}
              </kbd>
            )}
          </label>
          <Switch
            id={id}
            checked={checked}
            onCheckedChange={onChange}
            aria-label={t('accessibility.toggle', { feature: label })}
          />
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
