
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import AI from './pages/AI';
import Settings from './pages/Settings';
import License from './pages/License';
import FiberOptic from './pages/FiberOptic';
import HelpCenter from './pages/HelpCenter';
import NotFound from './pages/NotFound';
import { ModeProvider } from './context/ModeContext';
import { ThemeProvider } from './components/theme-provider';
import { TooltipProvider } from './components/ui/tooltip';
import { Toaster } from './components/ui/toaster';
import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';

function App() {
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18nInstance.changeLanguage(savedLanguage);
    }

    // Apply RTL direction for Arabic languages
    const isRTL = i18nInstance.language === 'ar' || i18nInstance.language === 'ar-iq';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18nInstance.language;
    
    if (isRTL) {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
  }, [i18nInstance.language]);

  return (
    <I18nextProvider i18n={i18n}>
      <ModeProvider>
        <ThemeProvider defaultTheme="system" storageKey="theme-mode">
          <TooltipProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ai" element={<AI />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/license" element={<License />} />
                <Route path="/fiber-optic" element={<FiberOptic />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
              <Toaster />
            </Router>
          </TooltipProvider>
        </ThemeProvider>
      </ModeProvider>
    </I18nextProvider>
  );
}

export default App;
