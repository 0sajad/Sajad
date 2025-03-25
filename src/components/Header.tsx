
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./nav/DesktopNav";
import { MobileMenu } from "./nav/MobileMenu";
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
}

export function Header({ onLanguageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    
    // تحديث اتجاه الصفحة بناءً على اللغة
    const isRTL = language === "ar" || language === "ar-iq";
    const dir = isRTL ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", language);
    localStorage.setItem("language", language);

    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "py-3 bg-white/90 shadow-sm dark:bg-gray-900/90" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-octaBlue-600 to-octaBlue-800 bg-clip-text text-transparent mr-12">
            OCTA-GRAM
          </Link>
          
          <DesktopNav />
        </div>
        
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Globe size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                className={currentLanguage === "ar" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("ar")}
              >
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={currentLanguage === "ar-iq" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("ar-iq")}
              >
                العراقية
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={currentLanguage === "en" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("en")}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={currentLanguage === "ja" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("ja")}
              >
                日本語
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={currentLanguage === "zh" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("zh")}
              >
                中文
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={currentLanguage === "fr" ? "bg-gray-100" : ""}
                onClick={() => handleLanguageChange("fr")}
              >
                Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
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
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen} />
    </header>
  );
}
