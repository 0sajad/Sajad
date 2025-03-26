
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X } from "lucide-react";
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
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-octaBlue-600 to-octaBlue-800 bg-clip-text text-transparent mr-4 sm:mr-12">
              OCTA-GRAM
            </Link>
            
            <DesktopNav />
          </div>
          
          <div className="flex items-center">
            <LanguageSwitcher className="mr-2" />
            
            <div className="mr-4">
              <ModeToggle />
            </div>
            
            <div className="hidden md:block">
              <Button size="sm">
                {t('header.login')}
              </Button>
            </div>
            
            <button
              className="p-2 md:hidden"
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
