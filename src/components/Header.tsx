
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
import { NavItemsContainer } from "./nav/NavItemsContainer";
import { StatusBar } from "./StatusBar";

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
  
  return (
    <TooltipProvider>
      <div className="sticky top-0 z-50 w-full">
        {/* Status bar for network info and accessibility */}
        <StatusBar />
        
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
            {/* Logo */}
            <div className="flex items-center">
              <Logo />
            </div>
            
            {/* Navigation Items */}
            <NavItemsContainer />
            
            {/* Header Actions (user, notifications, language) */}
            <HeaderActions 
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
          
          <AnimatePresence>
            {isMobileMenuOpen && <MobileMenu isOpen={isMobileMenuOpen} />}
          </AnimatePresence>
        </header>
      </div>
    </TooltipProvider>
  );
}
