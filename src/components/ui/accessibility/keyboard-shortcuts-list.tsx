
import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

export interface KeyboardShortcut {
  key: string;
  description: string;
  category?: string;
  badgeText?: string;
}

interface KeyboardShortcutsListProps {
  shortcuts: KeyboardShortcut[];
  enableHint?: boolean;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
}

export const defaultA11yShortcuts: KeyboardShortcut[] = [
  { key: 'Alt+C', description: 'accessibility.toggleHighContrast', category: 'display' },
  { key: 'Alt+T', description: 'accessibility.toggleLargeText', category: 'display' },
  { key: 'Alt+M', description: 'accessibility.toggleReducedMotion', category: 'motion' },
  { key: 'Alt+F', description: 'accessibility.toggleFocusMode', category: 'display' },
  { key: 'Alt+D', description: 'accessibility.toggleDyslexicFont', category: 'text' },
  { key: 'Alt+R', description: 'accessibility.toggleReadingGuide', category: 'text' },
  { key: 'Alt+S', description: 'accessibility.toggleSoundFeedback', category: 'sound' },
  { key: 'Alt+?', description: 'accessibility.showShortcutsMenu', category: 'help' }
];

export function KeyboardShortcutsList({ 
  shortcuts, 
  enableHint = false,
  badgeVariant = "default" 
}: KeyboardShortcutsListProps) {
  const { t } = useTranslation();
  
  // Group shortcuts by category if they have categories
  const hasCategories = shortcuts.some(s => s.category);
  const groupedShortcuts = hasCategories 
    ? shortcuts.reduce((acc, shortcut) => {
        const category = shortcut.category || 'other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(shortcut);
        return acc;
      }, {} as Record<string, KeyboardShortcut[]>) 
    : { 'all': shortcuts };
  
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'display': return t('accessibility.categoryDisplay', 'عرض');
      case 'motion': return t('accessibility.categoryMotion', 'حركة');
      case 'text': return t('accessibility.categoryText', 'نص');
      case 'sound': return t('accessibility.categorySound', 'صوت');
      case 'help': return t('accessibility.categoryHelp', 'مساعدة');
      case 'other': return t('accessibility.categoryOther', 'أخرى');
      default: return category;
    }
  };
  
  return (
    <div className="space-y-4">
      {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
        <div key={category} className="space-y-2">
          {hasCategories && category !== 'all' && (
            <h3 className="text-sm font-medium text-muted-foreground">
              {getCategoryName(category)}
            </h3>
          )}
          
          <div className="space-y-1">
            {categoryShortcuts.map((shortcut, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-1 text-sm border-b border-border/30 last:border-0"
              >
                <span>{t(shortcut.description)}</span>
                <div className="flex items-center gap-2">
                  {shortcut.badgeText && (
                    <Badge variant={badgeVariant} className="text-xs">
                      {shortcut.badgeText}
                    </Badge>
                  )}
                  <kbd className="px-2 py-0.5 text-xs bg-muted rounded border border-border">
                    {shortcut.key}
                  </kbd>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      {enableHint && (
        <p className="text-xs text-muted-foreground italic mt-2">
          {t('accessibility.tryShortcuts', 'جرب هذه الاختصارات في أي وقت للوصول السريع إلى ميزات إمكانية الوصول')}
        </p>
      )}
    </div>
  );
}
