
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileMenu } from "./nav/MobileMenu";
import { useTranslation } from 'react-i18next';
import { useIsMobile } from "@/hooks/use-mobile";
import { LanguageSwitcher } from "./nav/LanguageSwitcher";
import { TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { showNotification } from "./ui/notifications";

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
    showNotification({
      title: t('common.welcomeMessage', "مرحبًا بك في OCTA-GRAM"),
      type: "info"
    });
  };
  
  return (
    <TooltipProvider>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? "py-2 bg-black/80 backdrop-blur-xl shadow-lg border-b border-orange-500/20" 
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
              <div className={`flex items-center transition-all duration-500 ${isLogoHovered ? 'scale-105 translate-y-[-2px]' : ''}`}>
                <div className="relative mr-3 rtl:ml-3 rtl:mr-0">
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-50 group-hover:opacity-70 animate-pulse transition-all duration-300"></div>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-2.5 flex items-center justify-center shadow-lg relative z-10 overflow-hidden transform group-hover:rotate-12 transition-all duration-500 border border-orange-400/30">
                    <div className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
                    <Sparkles size={20} className="text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent drop-shadow-sm">OCTA-</span>
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">GRAM</span>
                  </div>
                  <span className="text-xs text-orange-300 tracking-wider font-medium">
                    {t('header.tagline', 'NETWORK SOLUTIONS')}
                  </span>
                </div>
              </div>
            </Link>
            
            <DesktopNav />
          </div>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher className="transform hover:scale-110 transition-transform rounded-full shadow-md" />
            
            <div className="transform hover:scale-105 transition-transform">
              <ModeToggle />
            </div>
            
            <div className="hidden md:block">
              <Button 
                variant="default"
                className="bg-gradient-to-r from-purple-600 via-orange-500 to-orange-600 hover:brightness-110 px-6 py-2 text-white shadow-lg hover:shadow-orange-500/20 transition-all duration-300 rounded-full effect-3d"
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
              {isMobileMenuOpen ? <X size={24} className="text-orange-500" /> : <Menu size={24} className="text-orange-500" />}
            </button>
          </div>
        </div>
        
        <MobileMenu isOpen={isMobileMenuOpen} />
      </header>
    </TooltipProvider>
  );
}
