
import React from "react";
import { User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { SearchCommand } from "@/components/search/SearchCommand";

interface HeaderActionsProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function HeaderActions({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: HeaderActionsProps) {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 rtl:space-x-reverse">
      <div className="hidden md:flex">
        <SearchCommand />
      </div>
      
      <LanguageSwitcher className="transform hover:scale-110 transition-transform shadow-xl rounded-full mr-6 sm:mr-8" />
      
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
  );
}
