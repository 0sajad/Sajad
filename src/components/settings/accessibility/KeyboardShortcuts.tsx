
import React from "react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Keyboard } from "lucide-react";
import { useA11y } from "@/hooks/useA11y";

export function KeyboardShortcuts() {
  const { t } = useTranslation();
  const { announce } = useA11y();
  
  const shortcuts = [
    { key: "Alt + C", description: t('settings.accessibility.shortcutHighContrast') },
    { key: "Alt + T", description: t('settings.accessibility.shortcutLargeText') },
    { key: "Alt + M", description: t('settings.accessibility.shortcutReducedMotion') },
    { key: "Alt + F", description: t('settings.accessibility.shortcutFocusMode') },
    { key: "Alt + ?", description: t('settings.accessibility.shortcutKeyboardHelp') }
  ];
  
  const announceShortcut = (shortcut: string, description: string) => {
    announce(`${shortcut}: ${description}`, "polite");
  };
  
  return (
    <div>
      <div className="flex items-center mb-4">
        <Keyboard className="mr-2 h-5 w-5 text-muted-foreground" />
        <h4 className="font-medium">{t('settings.accessibility.keyboardShortcuts')}</h4>
      </div>
      
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div 
            key={index}
            className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors"
            onClick={() => announceShortcut(shortcut.key, shortcut.description)}
            tabIndex={0}
            role="button"
            aria-label={`${shortcut.key}: ${shortcut.description}`}
          >
            <span className="text-muted-foreground">{shortcut.description}</span>
            <kbd className="bg-muted px-2 py-1 rounded text-xs">{shortcut.key}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
}
