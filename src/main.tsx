
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './components/ui/a11y-styles.css'; 
import './i18n';
import { LoadingScreen } from './components/LoadingScreen';

// Wrapper component to handle initialization
const AppWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle accessibility and preferences setup
    if (typeof window !== 'undefined') {
      // Set document language based on direction
      document.documentElement.lang = document.documentElement.dir === 'rtl' ? 'ar' : 'en';
      
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (prefersReducedMotion.matches) {
        document.body.classList.add('reduced-motion');
      }
      
      // Set up main content for screen readers
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('role', 'main');
        main.setAttribute('tabIndex', '-1');
      }
      
      // Add skip to content link for keyboard users
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black';
      skipLink.textContent = 'Skip to content';
      document.body.insertBefore(skipLink, document.body.firstChild);
      
      // Simulate loading completion
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return isLoading ? <LoadingScreen /> : <App />;
};

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
