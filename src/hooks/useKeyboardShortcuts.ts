
import { useEffect, useRef, useMemo } from 'react';
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
    try {
      // إذا كانت الدالة العامة announce متاحة، فاستخدمها أولاً
      if (typeof window !== 'undefined' && window.announce) {
        window.announce(message);
        return;
      }
      
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
    } catch (error) {
      console.error('Error announcing message to screen readers:', error);
    }
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
            featureName = t('accessibility.highContrast', 'High Contrast');
            featureState = !highContrast;
            toast({
              title: highContrast 
                ? t('accessibility.highContrastDisabled', 'High contrast disabled')
                : t('accessibility.highContrastEnabled', 'High contrast enabled')
            });
            break;
          case 't': // Alt + T for Large Text
            setLargeText(!largeText);
            featureName = t('accessibility.largeText', 'Large Text');
            featureState = !largeText;
            toast({
              title: largeText 
                ? t('accessibility.largeTextDisabled', 'Large text disabled')
                : t('accessibility.largeTextEnabled', 'Large text enabled')
            });
            break;
          case 'm': // Alt + M for Reduced Motion
            setReducedMotion(!reducedMotion);
            featureName = t('accessibility.reducedMotion', 'Reduced Motion');
            featureState = !reducedMotion;
            toast({
              title: reducedMotion 
                ? t('accessibility.reducedMotionDisabled', 'Reduced motion disabled')
                : t('accessibility.reducedMotionEnabled', 'Reduced motion enabled')
            });
            break;
          case 'f': // Alt + F for Focus Mode
            setFocusMode(!focusMode);
            featureName = t('accessibility.focusMode', 'Focus Mode');
            featureState = !focusMode;
            toast({
              title: focusMode 
                ? t('accessibility.focusModeDisabled', 'Focus mode disabled')
                : t('accessibility.focusModeEnabled', 'Focus mode enabled')
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
            }, 'Feature {{feature}} is now {{state}}')
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

  // باستخدام useMemo لإعادة كائن واحد ثابت لمنع التحديثات غير الضرورية
  return useMemo(() => ({ announce }), [t]);
}
