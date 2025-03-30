
import React from "react";
import { User, Menu, X, Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { NotificationsList } from "@/components/notifications/NotificationsList";
import { useMode } from "@/context/ModeContext";

interface HeaderActionsProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function HeaderActions({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}: HeaderActionsProps) {
  const { t } = useTranslation();
  const { theme, setTheme } = useMode();
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 rtl:space-x-reverse">
      {/* User Login Button - Style modified to match the image */}
      <div className="hidden md:block">
        <Button 
          size="lg" 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
        >
          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <div className="bg-white/20 p-1 rounded-full">
              <User size={16} className="text-white" />
            </div>
            <span className="font-medium">{t('header.login', 'تسجيل الدخول')}</span>
          </div>
        </Button>
      </div>

      {/* Theme Toggle */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('accessibility.lightMode', 'الوضع النهاري') : t('accessibility.darkMode', 'الوضع الليلي')}
      >
        {theme === 'dark' ? (
          <Sun size={18} className="text-yellow-400" />
        ) : (
          <Moon size={18} className="text-blue-600" />
        )}
      </Button>

      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative rounded-full"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              3
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <NotificationsList />
        </PopoverContent>
      </Popover>
      
      {/* Language Switcher */}
      <LanguageSwitcher className="transform hover:scale-110 transition-transform rounded-full" />
      
      {/* Mobile Menu Toggle */}
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
