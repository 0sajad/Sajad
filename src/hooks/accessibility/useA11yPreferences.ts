
import { useEffect } from 'react';

/**
 * Hook to monitor system preferences for accessibility
 */
export function useSystemPreferences(
  setReducedMotion: (value: boolean) => void
) {
  // Monitor system preference for reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setReducedMotion(true);
      }
    };
    
    prefersReducedMotion.addEventListener('change', handleMotionPreferenceChange);
    return () => {
      prefersReducedMotion.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, [setReducedMotion]);

  return null;
}
