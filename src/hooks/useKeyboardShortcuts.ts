
import { useEffect, useRef } from 'react';
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
  
  // Create a ref for the screen reader announcer element
  const announcerRef = useRef<HTMLDivElement | null>(null);
  
  // Function to announce to screen readers
  const announce = (message: string) => {
    if (!announcerRef.current) {
      // Create the announcer element if it doesn't exist
      const announcer = document.createElement('div');
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'assertive');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
      announcerRef.current = announcer;
    }
    
    // Update the announcer content
    announcerRef.current.textContent = message;
    
    // Clear the announcer after a delay to prevent duplicate readings
    setTimeout(() => {
      if (announcerRef.current) {
        announcerRef.current.textContent = '';
      }
    }, 1000);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only respond to Alt + key combinations
      if (event.altKey) {
        let featureName = '';
        let featureState = false;
        
        switch (event.key.toLowerCase()) {
          case 'c': // Alt + C for High Contrast
            setHighContrast(!highContrast);
            featureName = t('accessibility.highContrast');
            featureState = !highContrast;
            toast({
              title: highContrast 
                ? t('accessibility.highContrastDisabled')
                : t('accessibility.highContrastEnabled')
            });
            break;
          case 't': // Alt + T for Large Text
            setLargeText(!largeText);
            featureName = t('accessibility.largeText');
            featureState = !largeText;
            toast({
              title: largeText 
                ? t('accessibility.largeTextDisabled')
                : t('accessibility.largeTextEnabled')
            });
            break;
          case 'm': // Alt + M for Reduced Motion
            setReducedMotion(!reducedMotion);
            featureName = t('accessibility.reducedMotion');
            featureState = !reducedMotion;
            toast({
              title: reducedMotion 
                ? t('accessibility.reducedMotionDisabled')
                : t('accessibility.reducedMotionEnabled')
            });
            break;
          case 'f': // Alt + F for Focus Mode
            setFocusMode(!focusMode);
            featureName = t('accessibility.focusMode');
            featureState = !focusMode;
            toast({
              title: focusMode 
                ? t('accessibility.focusModeDisabled')
                : t('accessibility.focusModeEnabled')
            });
            break;
        }
        
        // Announce changes to screen readers if a feature was toggled
        if (featureName) {
          const state = featureState ? 
            t('accessibility.enabled', 'enabled') : 
            t('accessibility.disabled', 'disabled');
          
          announce(
            t('accessibility.announcementFeaturesToggled', {
              feature: featureName,
              state: state
            })
          );
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Clean up the announcer element on unmount
      if (announcerRef.current && document.body.contains(announcerRef.current)) {
        document.body.removeChild(announcerRef.current);
      }
    };
  }, [highContrast, largeText, reducedMotion, focusMode, setHighContrast, setLargeText, setReducedMotion, setFocusMode, t]);

  // Add additional helper function to announce messages programmatically
  return {
    announce
  };
}
