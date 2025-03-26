
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, User, Shield, Settings, HelpCircle, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from "./nav/LanguageSwitcher";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileMenu } from "./nav/MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <TooltipProvider>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "py-2 bg-black/80 backdrop-blur-xl shadow-lg border-b border-orange-500/20" 
            : "py-3 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-orange-500 flex items-center">
                  <span className="text-orange-500 mr-1 rtl:ml-1 rtl:mr-0">GRAM-</span>
                  <span className="text-orange-500">OCTA</span>
                </span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <Link to="/" className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-gray-300 hover:text-orange-300">
                <LayoutDashboard size={18} />
                <span>{t('header.dashboard')}</span>
              </Link>
              
              <div className="relative group">
                <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 hover:text-orange-300 transition-colors">
                  <span>{t('header.tools')}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              
              <Link to="/ai" className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-gray-300 hover:text-orange-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 4.75V6.25M15.25 8L14.25 9M8.75 8L9.75 9M15.25 16L14.25 15M8.75 16L9.75 15M12 17.75V19.25M17.75 12.75H19.25M4.75 12.75H6.25" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path 
                    d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" 
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{t('header.aiAssistant')}</span>
              </Link>
              
              <Link to="/settings" className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-gray-300 hover:text-orange-300">
                <Settings size={18} />
                <span>{t('header.settings')}</span>
              </Link>
              
              <Link to="/help-center" className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-gray-300 hover:text-orange-300">
                <HelpCircle size={18} />
                <span>{t('header.helpCenter')}</span>
              </Link>
              
              <Link to="/license" className="flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors text-gray-300 hover:text-orange-300">
                <Shield size={18} />
                <span>{t('header.license')}</span>
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher className="shadow-md" />
            
            <div>
              <ModeToggle />
            </div>
            
            <div className="hidden md:block">
              <Button 
                variant="default"
                className="bg-orange-500 hover:bg-orange-600 px-4 text-white"
              >
                <div className="flex items-center gap-2">
                  <User size={16} className="text-white" />
                  <span>{t('header.login')}</span>
                </div>
              </Button>
            </div>
            
            <button
              className="p-2 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMobileMenuOpen ? <X size={24} className="text-orange-500" /> : <Menu size={24} className="text-orange-500" />}
            </button>
          </div>
        </div>
        
        <MobileMenu isOpen={isMobileMenuOpen} />
      </header>
    </TooltipProvider>
  );
}
