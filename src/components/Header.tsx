
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, User, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileMenu } from "./nav/MobileMenu";
import { useTranslation } from 'react-i18next';
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSwitcher } from "./nav/LanguageSwitcher";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

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
    toast({
      title: t('common.welcome'),
      description: t('common.welcomeMessage', "مرحبًا بك في OCTA-GRAM"),
      className: "toast-3d",
    });
  };
  
  return (
    <TooltipProvider>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "py-3 bg-white/90 shadow-sm dark:bg-gray-900/90" : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center mr-14 sm:mr-28 transform hover:scale-105 transition-transform shadow-lg hover:shadow-amber-500/30"
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
              onClick={handleLogoClick}
            >
              <div className="flex items-center">
                <div 
                  className={`relative bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full p-2.5 shadow-xl mr-3 rtl:ml-3 rtl:mr-0 transition-all duration-500 ${
                    isLogoHovered ? 'scale-110 rotate-[360deg]' : ''
                  }`}
                >
                  <LayoutGrid size={22} className="text-white" />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mr-1">OCTA-</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">GRAM</span>
                </div>
              </div>
            </Link>
            
            <DesktopNav />
          </div>
          
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <LanguageSwitcher className="transform hover:scale-110 transition-transform shadow-xl rounded-full mx-3 rtl:mx-3" />
            
            <div className="transform hover:scale-105 transition-transform mx-4 rtl:mx-4">
              <ModeToggle />
            </div>
            
            <div className="hidden md:block">
              <Button 
                size="lg" 
                variant="gradient"
                className="px-8 py-2.5 shadow-xl hover:shadow-2xl transform hover:translate-y-[-3px] transition-all rounded-full"
              >
                <div className="flex items-center gap-2.5 rtl:flex-row-reverse">
                  <div className="bg-white/30 p-1.5 rounded-full">
                    <User size={16} className="text-white" />
                  </div>
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
