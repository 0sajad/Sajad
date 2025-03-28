
import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

export interface KeyboardShortcut {
  key: string;
  description: string;
  category?: string;
  isNew?: boolean;
}

interface KeyboardShortcutsListProps {
  shortcuts: KeyboardShortcut[];
  enableHint?: boolean;
  badgeVariant?: "default" | "secondary" | "outline" | "destructive";
}

export const defaultA11yShortcuts: KeyboardShortcut[] = [
  { key: "Alt+C", description: "Toggle high contrast mode", category: "Display" },
  { key: "Alt+T", description: "Toggle large text", category: "Display" },
  { key: "Alt+M", description: "Toggle reduced motion", category: "Motion" },
  { key: "Alt+F", description: "Toggle focus mode", category: "Focus" },
  { key: "Alt+S", description: "Toggle sound feedback", category: "Sound", isNew: true },
  { key: "Alt+R", description: "Toggle reading guide", category: "Reading", isNew: true },
  { key: "Alt+?", description: "Show keyboard shortcuts help", category: "Help" },
  { key: "Tab", description: "Navigate between focusable elements", category: "Navigation" },
  { key: "Shift+Tab", description: "Navigate backwards", category: "Navigation" },
  { key: "Space/Enter", description: "Activate focused element", category: "Navigation" },
  { key: "Esc", description: "Close dialog or menu", category: "Navigation" }
];

export function KeyboardShortcutsList({ 
  shortcuts = defaultA11yShortcuts, 
  enableHint = false,
  badgeVariant = "outline"
}: KeyboardShortcutsListProps) {
  const { t } = useTranslation();
  
  // Group shortcuts by category
  const groupedShortcuts: Record<string, KeyboardShortcut[]> = {};
  
  shortcuts.forEach(shortcut => {
    const category = shortcut.category || t('accessibility.shortcutsGeneral', 'General');
    if (!groupedShortcuts[category]) {
      groupedShortcuts[category] = [];
    }
    groupedShortcuts[category].push(shortcut);
  });
  
  return (
    <div className="space-y-6">
      {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-sm font-medium text-primary">
            {category}
          </h4>
          
          <div className="space-y-1">
            {categoryShortcuts.map((shortcut, index) => (
              <div 
                key={index}
                className="flex justify-between items-center px-2 py-1.5 hover:bg-muted/50 rounded-md transition-colors"
              >
                <div className="flex items-center">
                  <kbd className="bg-muted px-2 py-1 rounded text-xs font-mono border border-gray-200 dark:border-gray-700 mr-2">
                    {shortcut.key}
                  </kbd>
                  <span className="text-sm">{shortcut.description}</span>
                  
                  {shortcut.isNew && (
                    <Badge 
                      variant={badgeVariant} 
                      className="ml-2 text-[10px] py-0 px-1"
                    >
                      {t('accessibility.shortcutsNew', 'NEW')}
                    </Badge>
                  )}
                </div>
                
                {enableHint && (
                  <button 
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    aria-label={t('accessibility.shortcutsHint', { shortcut: shortcut.description })}
                  >
                    {t('accessibility.shortcutsHintText', 'Hint')}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
