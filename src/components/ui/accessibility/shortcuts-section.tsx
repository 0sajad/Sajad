
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function ShortcutsSection({ className }: { className?: string }) {
  const { t } = useTranslation();
  
  const shortcuts = [
    { key: "Alt+C", description: t('accessibility.shortcutHighContrast', 'High contrast') },
    { key: "Alt+T", description: t('accessibility.shortcutLargeText', 'Large text') },
    { key: "Alt+M", description: t('accessibility.shortcutReducedMotion', 'Reduced motion') }
  ];
  
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center text-muted-foreground text-sm">
        <Keyboard className="h-3.5 w-3.5 mr-1.5" />
        <span>{t('accessibility.shortcuts', 'Keyboard Shortcuts')}</span>
      </div>
      
      <Separator />
      
      <div className="text-xs space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-muted-foreground">{shortcut.description}</span>
            <kbd className="bg-muted px-1.5 py-0.5 rounded text-[10px] font-mono border border-gray-300 dark:border-gray-700">
              {shortcut.key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
