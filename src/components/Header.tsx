
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
            <Link to="/" className="flex items-center mr-8 sm:mr-20 transform hover:scale-105 transition-transform shadow-lg hover:shadow-octaBlue-500/30">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-full p-2 shadow-xl mr-2 rtl:ml-2 rtl:mr-0">
                  <LayoutGrid size={20} className="text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">OCTA-</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">GRAM</span>
              </div>
            </Link>
            
            <DesktopNav />
          </div>
          
          <div className="flex items-center space-x-14 rtl:space-x-reverse">
            <LanguageSwitcher className="transform hover:scale-110 transition-transform shadow-xl rounded-full" />
            
            <div className="transform hover:scale-105 transition-transform mx-2 rtl:mx-2">
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
