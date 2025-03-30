
import React, { useState, useEffect } from "react";
import { MobileMenu } from "./nav/MobileMenu";
import { DesktopNav } from "./nav/DesktopNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderActions } from "./header/HeaderActions";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
}

export function Header({ onLanguageChange }: HeaderProps) {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);
  
  // Define navigation items with Arabic translations
  const navItems = [
    { path: "/", label: "لوحة التحكم", icon: "layout-dashboard" },
    { path: "/tools", label: "الأدوات", icon: "tools" },
    { path: "/ai", label: "مساعد الذكاء الاصطناعي", icon: "brain-circuit" },
    { path: "/settings", label: "الإعدادات", icon: "settings" },
    { path: "/help-center", label: "مركز المساعدة", icon: "help-circle" },
    { path: "/license", label: "الترخيص", icon: "file-check" },
  ];
  
  return (
    <TooltipProvider>
      <header className="py-3 bg-white shadow-sm dark:bg-gray-900">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6"> 
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600/80 to-blue-600/80 flex items-center justify-center text-white font-bold">
                <div className="text-center leading-tight">
                  <div className="text-lg">OCTA</div>
                  <div className="text-xs">GRAM</div>
                </div>
              </div>
            </div>
            
            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"} 
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => window.location.href = item.path}
                >
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <HeaderActions 
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
        
        <AnimatePresence>
          {isMobileMenuOpen && <MobileMenu isOpen={isMobileMenuOpen} />}
        </AnimatePresence>
      </header>
    </TooltipProvider>
  );
}
