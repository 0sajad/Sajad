
import React from "react";
import { Link } from "react-router-dom";
import { Laptop, Settings, HelpCircle, LayoutDashboard, LogIn } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
  const { t } = useTranslation();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="md:hidden fixed inset-x-0 top-[60px] z-40 bg-black/90 backdrop-blur-xl shadow-lg border-t border-orange-500/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="container mx-auto px-4 py-3 flex flex-col">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-orange-500/10 transition-colors"
            >
              <LayoutDashboard size={18} className="text-orange-400" />
              <span className="text-sm font-medium text-orange-100">{t('mobileMenu.dashboard')}</span>
            </Link>
            
            <Link
              to="/tools"
              className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-orange-500/10 transition-colors"
            >
              <Laptop size={18} className="text-orange-400" />
              <span className="text-sm font-medium text-orange-100">{t('mobileMenu.tools')}</span>
            </Link>
            
            <Link
              to="/ai"
              className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-orange-500/10 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-400">
                <path 
                  d="M12 4.75V6.25M15.25 8L14.25 9M8.75 8L9.75 9M15.25 16L14.25 15M8.75 16L9.75 15M12 17.75V19.25M17.75 12.75H19.25M4.75 12.75H6.25" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path 
                  d="M12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75Z" 
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium text-orange-100">{t('mobileMenu.aiAssistant')}</span>
            </Link>
            
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-orange-500/10 transition-colors"
            >
              <Settings size={18} className="text-orange-400" />
              <span className="text-sm font-medium text-orange-100">{t('mobileMenu.settings')}</span>
            </Link>
            
            <Link
              to="/help"
              className="flex items-center gap-2 px-4 py-3 rounded-md hover:bg-orange-500/10 transition-colors"
            >
              <HelpCircle size={18} className="text-orange-400" />
              <span className="text-sm font-medium text-orange-100">{t('mobileMenu.helpCenter')}</span>
            </Link>
            
            <Link
              to="/license"
              className="flex items-center justify-center gap-2 mt-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md hover:brightness-110 transition-all duration-300"
            >
              <LogIn size={16} />
              <span className="text-sm font-medium">{t('mobileMenu.login')}</span>
            </Link>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
