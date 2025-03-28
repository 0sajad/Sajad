
import React, { useState, useEffect } from 'react';
import { useA11y } from '@/hooks/useA11y';
import { toast } from 'sonner';

export function KeyboardNavigationMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [commands, setCommands] = useState<Array<{key: string, description: string}>>([]);
  const { 
    announce,
    playSound
  } = useA11y();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        toggleMenu();
      }

      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  useEffect(() => {
    // Only fetch commands when menu is visible
    if (isVisible) {
      fetchKeyboardCommands();
    }
  }, [isVisible]);

  const fetchKeyboardCommands = () => {
    // This would typically come from a configuration or API
    // Here we're mocking the list of commands
    const availableCommands = [
      { key: 'Ctrl + ?', description: 'Show/hide keyboard shortcuts' },
      { key: 'Alt + C', description: 'Toggle high contrast mode' },
      { key: 'Alt + L', description: 'Toggle large text mode' },
      { key: 'Alt + M', description: 'Toggle reduced motion' },
      { key: 'Alt + F', description: 'Toggle focus mode' },
      { key: 'Alt + D', description: 'Toggle dyslexic font' },
      { key: 'Alt + R', description: 'Toggle reading guide' },
      { key: 'Ctrl + Alt + S', description: 'Toggle screen reader optimization' },
      { key: 'Esc', description: 'Close menus or dialogs' }
    ];
    
    setCommands(availableCommands);
  };

  const toggleMenu = () => {
    setIsVisible(!isVisible);
    
    if (!isVisible) {
      announce('Keyboard shortcuts panel opened', 'polite');
      playSound('info');
    } else {
      announce('Keyboard shortcuts panel closed', 'polite');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={() => setIsVisible(false)}
    >
      <div 
        className="bg-background border rounded-lg shadow-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Keyboard Shortcuts</h2>
        
        <div className="space-y-2">
          {commands.map((command, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
              <span className="text-muted-foreground">{command.description}</span>
              <kbd className="px-2 py-1 bg-muted rounded text-sm font-mono">{command.key}</kbd>
            </div>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground mt-4">
          Press Esc to close this panel
        </p>
      </div>
    </div>
  );
}
