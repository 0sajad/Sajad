
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './components/ui/a11y-styles.css'; 
import './i18n';
import { toast } from '@/components/ui/use-toast';
import { LiveAnnouncer } from './components/ui/accessibility/live-announcer';

// Unique identifier to track user interactions with accessibility features
const ACCESS_INTERACTION_KEY = 'a11y_interaction_version';

// Wrapper component to handle initialization
const AppWrapper = () => {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Handle accessibility setup and preferences
    if (typeof window !== 'undefined' && !hasInitialized) {
      setHasInitialized(true);
      
      // Set document language based on direction
      document.documentElement.lang = document.documentElement.dir === 'rtl' ? 'ar' : 'en';
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
        localStorage.setItem('reducedMotion', 'true');
      }
      
      // Check for enhanced contrast preference
      const prefersContrastMore = window.matchMedia('(prefers-contrast: more)');
      if (prefersContrastMore.matches && localStorage.getItem('highContrast') === null) {
        document.body.classList.add('high-contrast');
        localStorage.setItem('highContrast', 'true');
      }
      
      // Check for dyslexic font mode
      if (localStorage.getItem('dyslexicFont') === 'true') {
        document.body.classList.add('dyslexic-font');
      }
      
      // Check for color blind mode
      const colorBlindMode = localStorage.getItem('colorBlindMode');
      if (colorBlindMode) {
        document.body.classList.add(colorBlindMode);
      }
      
      // Set up main content for screen readers
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('role', 'main');
        main.setAttribute('id', 'main-content');
        main.setAttribute('tabIndex', '-1');
      }
      
      // Add skip link for keyboard users
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:shadow-lg rounded';
      skipLink.textContent = document.documentElement.lang === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content';
      document.body.insertBefore(skipLink, document.body.firstChild);
      
      // Add SVG filters for color blind modes
      const svgFilters = document.createElement('div');
      svgFilters.setAttribute('aria-hidden', 'true');
      svgFilters.innerHTML = `
        <svg style="display:none">
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"/>
          </filter>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"/>
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"/>
          </filter>
          <filter id="grayscale-filter">
            <feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0.33 0.33 0.33 0 0 0 0 0 1 0"/>
          </filter>
        </svg>
      `;
      document.body.appendChild(svgFilters);
      
      // Detect keyboard users
      const handleFirstTab = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-user');
          setIsKeyboardUser(true);
          window.removeEventListener('keydown', handleFirstTab);
        }
      };
      
      window.addEventListener('keydown', handleFirstTab);
      
      // Inform screen readers that the app has loaded
      setTimeout(() => {
        if (window.announce) {
          window.announce(
            document.documentElement.lang === 'ar' 
              ? 'تم تحميل التطبيق بنجاح' 
              : 'Application loaded successfully'
          );
        }
        
        // Show subtle welcome notification
        setTimeout(() => {
          toast({
            title: document.documentElement.lang === 'ar' ? 'مرحبًا بك!' : 'Welcome!',
            description: document.documentElement.lang === 'ar' 
              ? 'استخدم زر إمكانية الوصول في أسفل اليسار لتخصيص تجربتك'
              : 'Use the accessibility button at the bottom left to customize your experience'
          });
        }, 1500);
        
        // Update user interaction version with accessibility features if not already updated
        const currentVersion = localStorage.getItem(ACCESS_INTERACTION_KEY);
        if (!currentVersion) {
          localStorage.setItem(ACCESS_INTERACTION_KEY, '1.0');
        }
      }, 800);
      
      return () => {
        window.removeEventListener('keydown', handleFirstTab);
      };
    }
  }, [hasInitialized]);

  // Render App directly without additional loading screen
  return (
    <>
      <LiveAnnouncer />
      <App />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
