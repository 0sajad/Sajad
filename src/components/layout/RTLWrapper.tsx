
import React, { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

interface RTLWrapperProps {
  children: React.ReactNode;
}

/**
 * RTL Wrapper Component
 * Automatically sets the correct text direction based on the current language
 */
export const RTLWrapper = memo(({ children }: RTLWrapperProps) => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState<'rtl' | 'ltr'>(
    document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr'
  );
  
  useEffect(() => {
    // Determine direction based on language code
    const isRTL = i18n.language?.startsWith('ar') || i18n.language?.startsWith('he');
    const newDirection = isRTL ? 'rtl' : 'ltr';
    
    // Only update if direction has changed
    if (newDirection !== direction) {
      setDirection(newDirection);
      
      // Update document direction
      document.documentElement.dir = newDirection;
      document.documentElement.classList.toggle('rtl', isRTL);
      document.documentElement.classList.toggle('ltr', !isRTL);
    }
  }, [i18n.language, direction]);
  
  return (
    <div className={`rtl-wrapper ${direction}`} dir={direction}>
      {children}
    </div>
  );
});

// Set display name for debugging
RTLWrapper.displayName = 'RTLWrapper';

// Don't pass any arguments to useTranslation
export const getLayoutDirection = (): 'rtl' | 'ltr' => {
  return document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
};
