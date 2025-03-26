
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, User } from "lucide-react";
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
          <div className="flex-1 flex justify-end ltr:mr-4 rtl:ml-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-octaBlue-600 to-purple-600 bg-clip-text text-transparent mr-6 sm:mr-16 transform hover:scale-105 transition-transform shadow-lg hover:shadow-octaBlue-500/30">
              OCTA-GRAM
            </Link>
          </div>
          
          <div className="flex-[2]">
            <DesktopNav />
          </div>
          
          <div className="flex-1 flex items-center justify-end space-x-10 rtl:space-x-reverse">
            <LanguageSwitcher className="transform hover:scale-110 transition-transform shadow-xl rounded-full" />
            
            <div className="transform hover:scale-105 transition-transform">
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
