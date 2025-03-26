
import React, { useId } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AccessibilityToggleProps {
  id?: string;
  label: string;
  icon: LucideIcon;
  checked: boolean;
  onChange: (checked: boolean) => void;
  shortcutKey: string;
  descriptionId?: string;
  description?: string;
  disabled?: boolean;
}

export function AccessibilityToggle({
  id: propId,
  label,
  icon: Icon,
  checked,
  onChange,
  shortcutKey,
  descriptionId,
  description,
  disabled = false
}: AccessibilityToggleProps) {
  // Generate a unique ID if one is not provided
  const generatedId = useId();
  const id = propId || `a11y-toggle-${generatedId}`;
  
  // Format keyboard shortcut for display
  const getKeyboardShortcut = (shortcut: string) => {
    return (
      <kbd className="px-2 py-0.5 text-xs bg-muted rounded border border-border">
        {shortcut}
      </kbd>
    );
  };
  
  // Description ID for aria-describedby
  const actualDescriptionId = descriptionId || description ? `${id}-description` : undefined;

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-2 rounded-md transition-colors",
        checked ? "bg-muted/50" : "hover:bg-muted/20", 
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: checked ? 1.1 : 1 }}
          className={cn("p-1 rounded-full", checked ? "bg-primary/10" : "text-muted-foreground")}
        >
          <Icon 
            className={cn(
              "h-4 w-4 transition-colors", 
              checked ? "text-primary" : "text-muted-foreground"
            )} 
            aria-hidden="true" 
          />
        </motion.div>
        <div className="flex flex-col">
          <Label 
            htmlFor={id}
            className={cn(
              "text-sm cursor-pointer transition-colors",
              checked ? "font-medium" : ""
            )}
            id={`${id}-label`}
          >
            {label}
          </Label>
          {description && (
            <p 
              id={actualDescriptionId} 
              className="text-xs text-muted-foreground"
            >
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {getKeyboardShortcut(shortcutKey)}
        <Switch
          id={id}
          checked={checked}
          onCheckedChange={disabled ? undefined : onChange}
          aria-checked={checked}
          aria-labelledby={`${id}-label`}
          aria-describedby={actualDescriptionId}
          disabled={disabled}
          onKeyDown={(e) => {
            // Add support for Alt+shortcutKey when focused
            if (e.altKey && e.key.toLowerCase() === shortcutKey.replace(/alt\+/i, '').toLowerCase()) {
              if (!disabled) {
                onChange(!checked);
                e.preventDefault();
              }
            }
          }}
        />
      </div>
    </div>
  );
}
