
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { KeyboardShortcutsList, defaultA11yShortcuts } from "./keyboard-shortcuts-list";
import { useTranslation } from "react-i18next";

export function KeyboardNavigationMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    // استمع إلى اختصار لوحة المفاتيح Alt+?
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "?") {
        e.preventDefault();
        setOpen(true);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-lg font-medium mb-4">
          {t('accessibility.keyboardShortcuts', 'اختصارات لوحة المفاتيح')}
        </DialogTitle>
        
        <KeyboardShortcutsList 
          shortcuts={defaultA11yShortcuts} 
          enableHint={false} 
        />
      </DialogContent>
    </Dialog>
  );
}
