
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, User, LayoutGrid, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileMenu } from "./nav/MobileMenu";
import { useTranslation } from 'react-i18next';
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSwitcher } from "./nav/LanguageSwitcher";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
}

export function Header({ onLanguageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    toast(t('common.welcomeMessage', "مرحبًا بك في GRAM-OCTA"));
  };
  
  return (
    <TooltipProvider>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "py-2 bg-white/90 dark:bg-gray-900/95 backdrop-blur-xl shadow-md" 
            : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className="flex items-center group relative"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              onClick={handleLogoClick}
            >
              <div className="flex items-center relative overflow-hidden">
                <div className={`flex items-center transition-all duration-300 ${isLogoHovered ? 'scale-105' : ''}`}>
                  <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-xl p-2 flex items-center justify-center shadow-lg mr-3 rtl:ml-3 rtl:mr-0 relative z-10 overflow-hidden group-hover:shadow-purple-500/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    <Sparkles size={22} className="text-white" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">GRAM-</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">OCTA</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wider">
                      {t('header.tagline', 'NETWORK SOLUTIONS')}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            
            <DesktopNav />
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher className="transform hover:scale-110 transition-transform rounded-full" />
            
            <div className="transform hover:scale-105 transition-transform">
              <ModeToggle />
            </div>
            
            <div className="hidden md:block">
              <Button 
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600 px-6 py-2 text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-300 rounded-full"
              >
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <User size={16} className="text-white" />
                  <span className="font-medium">{t('header.login')}</span>
                </div>
              </Button>
            </div>
            
            <button
              className="p-2 md:hidden transform hover:scale-110 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        <MobileMenu isOpen={isMobileMenuOpen} />
      </header>
    </TooltipProvider>
  );
}
