
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
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onLanguageChange?: (language: string) => void;
}

export function Header({ onLanguageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // إغلاق القائمة عند تغيير حجم الشاشة
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "py-3 bg-white/90 shadow-sm dark:bg-gray-900/90" : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="relative mr-4 sm:mr-16 group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center justify-center bg-black/5 dark:bg-white/5 backdrop-blur-sm px-3 py-2 xs:px-4 xs:py-2 rounded-lg border border-white/20 dark:border-gray-800/50 shadow-xl">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl xs:text-2xl font-bold"
                >
                  <span className="bg-gradient-to-br from-blue-500 via-purple-500 to-octaBlue-500 bg-clip-text text-transparent">OCTA</span>
                  <span className="relative mx-1">
                    <span className="absolute -top-0.5 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></span>
                    <span className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></span>
                    -
                  </span>
                  <span className="bg-gradient-to-tr from-purple-600 to-octaBlue-500 bg-clip-text text-transparent">GRAM</span>
                  
                  {/* Subtle glowing circle behind the logo */}
                  <motion.div 
                    className="absolute -z-10 inset-0 rounded-lg opacity-30"
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(79, 70, 229, 0)",
                        "0 0 20px rgba(79, 70, 229, 0.5)",
                        "0 0 0 rgba(79, 70, 229, 0)"
                      ]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
              </div>
            </Link>
            
            <DesktopNav />
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 rtl:space-x-reverse">
            <LanguageSwitcher className="transform hover:scale-110 transition-transform shadow-xl rounded-full mr-1 sm:mr-2" />
            
            <div className="transform hover:scale-105 transition-transform">
              <ModeToggle />
            </div>
            
            <div className="hidden md:block">
              <Button 
                size="lg" 
                variant="gradient"
                className="px-6 md:px-8 py-2.5 shadow-xl hover:shadow-2xl transform hover:translate-y-[-3px] transition-all rounded-full"
              >
                <div className="flex items-center gap-2.5 rtl:flex-row-reverse">
                  <div className="bg-white/30 p-1.5 rounded-full">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-medium">{t('header.login')}</span>
                </div>
              </Button>
            </div>
            
            <motion.button
              className="p-2 md:hidden transform hover:scale-110 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label={isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: isMobileMenuOpen ? -90 : 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: isMobileMenuOpen ? 90 : -90 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        
        <AnimatePresence>
          {isMobileMenuOpen && <MobileMenu isOpen={isMobileMenuOpen} />}
        </AnimatePresence>
      </header>
    </TooltipProvider>
  );
}
