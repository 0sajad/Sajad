
import React, { useEffect, useState } from 'react';
import { useA11y } from '@/hooks/useA11y';
import { Portal } from '@/components/ui/portal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyboardShortcutsList } from './keyboard-shortcuts-list';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export function KeyboardNavigationMenu() {
  const { keyboardNavigationVisible, setKeyboardNavigationVisible } = useA11y();
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    // Show/hide the menu based on state
    setIsVisible(keyboardNavigationVisible);
    
    // Listen for the Alt+? shortcut to toggle menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === '?' || e.key === '؟')) {
        e.preventDefault();
        setKeyboardNavigationVisible(!keyboardNavigationVisible);
      }
      
      // Allow Escape to close the menu
      if (e.key === 'Escape' && keyboardNavigationVisible) {
        setKeyboardNavigationVisible(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyboardNavigationVisible, setKeyboardNavigationVisible]);
  
  if (!isVisible) {
    return null;
  }
  
  return (
    <Portal>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyboard-navigation-title"
      >
        <Card className="w-full max-w-md">
          <CardHeader className="relative">
            <CardTitle id="keyboard-navigation-title">
              {t('accessibility.keyboardShortcuts', 'Keyboard Shortcuts')}
            </CardTitle>
            <button
              className="absolute top-4 right-4 rounded-full p-1 hover:bg-muted"
              onClick={() => setKeyboardNavigationVisible(false)}
              aria-label={t('common.close')}
            >
              <X className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80 pr-4">
              <KeyboardShortcutsList enableHint badgeVariant="secondary" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </Portal>
  );
}
