
import React, { useState, useEffect } from "react";
import { MobileMenu } from "./nav/MobileMenu";
import { DesktopNav } from "./nav/DesktopNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./header/Logo";
import { HeaderActions } from "./header/HeaderActions";

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
}

export function Header({ onLanguageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  
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
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "py-2 bg-white/90 shadow-sm dark:bg-gray-900/90" : "py-3 bg-transparent"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-8"> {/* زيادة المساحة هنا من عدم وجود gap إلى gap-8 */}
            <Logo />
            <DesktopNav />
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
