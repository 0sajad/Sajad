
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard } from "lucide-react";
import { useA11y } from "@/hooks/useA11y";
import { useConfig } from "@/hooks/useConfig";
import { KeyboardShortcutsList, defaultA11yShortcuts } from "./keyboard-shortcuts-list";

export function KeyboardNavigationMenu() {
  const { t } = useTranslation();
  const { config } = useConfig();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Toggle visibility when Alt+? is pressed
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === '?' || e.key === '/')) {
        setIsVisible(prev => !prev);
        e.preventDefault();
      } else if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  if (!config.showKeyboardHelp || !isVisible) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="keyboard-navigation-title"
    >
      <div className="bg-background rounded-lg shadow-lg w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 id="keyboard-navigation-title" className="text-lg font-semibold flex items-center">
            <Keyboard className="h-5 w-5 mr-2" />
            {t('accessibility.keyboardShortcuts', 'اختصارات لوحة المفاتيح')}
          </h2>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground"
            aria-label={t('accessibility.close', 'إغلاق')}
          >
            ×
          </button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {t('accessibility.keyboardShortcutsDescription', 'استخدم اختصارات لوحة المفاتيح للوصول السريع إلى ميزات إمكانية الوصول')}
        </p>
        
        <KeyboardShortcutsList 
          shortcuts={defaultA11yShortcuts} 
          enableHint={true}
        />
        
        <div className="mt-4 text-xs text-muted-foreground">
          {t('accessibility.pressEscToClose', 'اضغط ESC للإغلاق')}
        </div>
      </div>
    </div>
  );
}
