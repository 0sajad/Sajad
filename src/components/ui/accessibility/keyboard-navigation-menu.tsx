
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { KeyboardShortcutsList, defaultA11yShortcuts } from "./keyboard-shortcuts-list";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";

export function KeyboardNavigationMenu() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { soundFeedback, playNotificationSound } = useA11y();
  
  useEffect(() => {
    // استمع إلى اختصار لوحة المفاتيح Alt+?
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "?" || e.key === "؟")) {
        e.preventDefault();
        setOpen(true);
        
        // تشغيل صوت التنبيه إذا كان التنبيه الصوتي مفعلاً
        if (soundFeedback && typeof playNotificationSound === 'function') {
          playNotificationSound('info');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [soundFeedback, playNotificationSound]);
  
  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    
    // تشغيل صوت عند الفتح أو الإغلاق
    if (soundFeedback && typeof playNotificationSound === 'function') {
      playNotificationSound(open ? 'info' : 'success');
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
