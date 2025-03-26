
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, User, Globe } from "lucide-react";
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
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mr-4 sm:mr-16 transform hover:scale-105 transition-transform">
              OCTA-GRAM
            </Link>
            
            <DesktopNav />
          </div>
          
          <div className="flex items-center gap-6">
            <LanguageSwitcher 
              className="transform hover:scale-110 transition-transform shadow-md rounded-full p-2 hover:shadow-lg" 
            />
            
            <div className="transform hover:scale-110 transition-transform">
              <ModeToggle />
            </div>
            
            <div className="hidden md:block">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-transform shadow-lg hover:shadow-blue-500/30 text-white px-8 rounded-full"
              >
                {t('header.login', 'تسجيل الدخول')}
              </Button>
            </div>
            
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 rounded-full px-4 py-2 border-2 shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              <User className="h-4 w-4" />
              <span>{t('header.clientDeveloper', 'عميل <> مطور')}</span>
            </Button>
            
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
