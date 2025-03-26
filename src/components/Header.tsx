
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileMenu } from "./nav/MobileMenu";
import { useTranslation } from 'react-i18next';
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSwitcher } from "./nav/LanguageSwitcher";
import { TooltipProvider } from "@/components/ui/tooltip";

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
}

export function Header({ onLanguageChange }: HeaderProps) {
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
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "py-3 bg-white/90 shadow-sm dark:bg-gray-900/90" : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-octaBlue-600 to-purple-600 bg-clip-text text-transparent mr-6 sm:mr-16 transform hover:scale-105 transition-transform shadow-lg hover:shadow-octaBlue-500/30">
              OCTA-GRAM
            </Link>
            
            <DesktopNav />
          </div>
          
          <div className="flex items-center space-x-8 rtl:space-x-reverse">
            <LanguageSwitcher className="mr-2 rtl:ml-2 rtl:mr-0 transform hover:scale-110 transition-transform shadow-xl rounded-full effect-3d" />
            
            <div className="mr-6 rtl:ml-6 rtl:mr-0 transform hover:scale-110 transition-transform effect-3d">
              <ModeToggle />
            </div>
            
            <div className="hidden md:block">
              <Button 
                size="xl" 
                variant="gradient"
                className="px-6 py-2 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all hover:translate-y-[-3px] rounded-full effect-3d"
              >
                <div className="flex items-center gap-2 rtl:flex-row-reverse">
                  <div className="bg-white/30 p-1 rounded-full">
                    <User size={18} className="text-white" />
                  </div>
                  <span>{t('header.login')}</span>
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
