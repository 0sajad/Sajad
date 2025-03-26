
import { useEffect } from 'react';
import { useA11y } from './useA11y';
import { toast } from '@/components/ui/use-toast';
import { useTranslation } from 'react-i18next';

export function useKeyboardShortcuts() {
  const { 
    highContrast, setHighContrast,
    largeText, setLargeText,
    reducedMotion, setReducedMotion,
    focusMode, setFocusMode
  } = useA11y();
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only respond to Alt + key combinations
      if (event.altKey) {
        switch (event.key.toLowerCase()) {
          case 'c': // Alt + C for High Contrast
            setHighContrast(!highContrast);
            toast({
              title: highContrast 
                ? t('accessibility.highContrastDisabled', 'High Contrast Disabled')
                : t('accessibility.highContrastEnabled', 'High Contrast Enabled')
            });
            break;
          case 't': // Alt + T for Large Text
            setLargeText(!largeText);
            toast({
              title: largeText 
                ? t('accessibility.largeTextDisabled', 'Large Text Disabled')
                : t('accessibility.largeTextEnabled', 'Large Text Enabled')
            });
            break;
          case 'm': // Alt + M for Reduced Motion
            setReducedMotion(!reducedMotion);
            toast({
              title: reducedMotion 
                ? t('accessibility.reducedMotionDisabled', 'Reduced Motion Disabled')
                : t('accessibility.reducedMotionEnabled', 'Reduced Motion Enabled')
            });
            break;
          case 'f': // Alt + F for Focus Mode
            setFocusMode(!focusMode);
            toast({
              title: focusMode 
                ? t('accessibility.focusModeDisabled', 'Focus Mode Disabled')
                : t('accessibility.focusModeEnabled', 'Focus Mode Enabled')
            });
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [highContrast, largeText, reducedMotion, focusMode, setHighContrast, setLargeText, setReducedMotion, setFocusMode, t]);

  return null;
}
