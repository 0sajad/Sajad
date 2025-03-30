
import React, { useState, useEffect } from "react";
import { MobileMenu } from "./nav/MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderActions } from "./header/HeaderActions";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { Logo } from "./header/Logo";
import { AnimatedHeader3D } from "./header/AnimatedHeader3D";

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
      <header 
        className={`py-3 bg-white shadow-sm dark:bg-gray-900 relative ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        {/* 3D Header Background */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatedHeader3D />
        </div>
        
        {/* Content Layer */}
        <div className="container mx-auto px-4 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-6"> 
            {/* Logo - hidden because we're using 3D one */}
            <div className="opacity-0 pointer-events-none">
              <Logo />
            </div>
            
            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Button 
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"} 
                  size="sm"
                  className="flex items-center gap-2 backdrop-blur-sm bg-white/5"
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
