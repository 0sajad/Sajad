
import React, { useEffect, useState } from "react";
import { Portal } from "@/components/ui/portal";
import { 
  Keyboard, 
  Eye, 
  Type, 
  ZoomIn, 
  MousePointer2, 
  Volume
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { KeyboardShortcutsList } from "./keyboard-shortcuts-list";

interface KeyboardNavigationMenuProps {
  visible: boolean;
}

export function KeyboardNavigationMenu({ visible }: KeyboardNavigationMenuProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  
  // Define shortcuts
  const shortcuts = [
    {
      key: "Alt+C",
      label: t('accessibility.highContrast'),
      icon: <Eye className="h-4 w-4" />
    },
    {
      key: "Alt+T",
      label: t('accessibility.largeText'),
      icon: <Type className="h-4 w-4" />
    },
    {
      key: "Alt+M",
      label: t('accessibility.reducedMotion'),
      icon: <ZoomIn className="h-4 w-4" />
    },
    {
      key: "Alt+F",
      label: t('accessibility.focusMode'),
      icon: <MousePointer2 className="h-4 w-4" />
    },
    {
      key: "Alt+D",
      label: t('accessibility.dyslexicFont'),
      icon: <Type className="h-4 w-4" />
    },
    {
      key: "Alt+R",
      label: t('accessibility.readingGuide'),
      icon: <MousePointer2 className="h-4 w-4" />
    },
    {
      key: "Alt+S",
      label: t('accessibility.soundFeedback'),
      icon: <Volume className="h-4 w-4" />
    }
  ];
  
  // Show or hide based on props
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);
  
  if (!isVisible) return null;
  
  return (
    <Portal>
      <div 
        role="dialog"
        aria-label={t('accessibility.keyboardNavigation')}
        className="fixed top-24 right-8 w-80 p-4 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg z-50"
      >
        <div className="flex items-center gap-2 mb-4">
          <Keyboard className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-medium">{t('accessibility.keyboardShortcuts')}</h3>
        </div>
        
        <KeyboardShortcutsList
          shortcuts={shortcuts}
          enableHint={true}
          badgeVariant="secondary"
        />
      </div>
    </Portal>
  );
}
