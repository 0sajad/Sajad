
import React from "react";
import { User, Menu, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { NotificationsList } from "@/components/notifications/NotificationsList";

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
    <div className="flex items-center space-x-3 sm:space-x-5 rtl:space-x-reverse">
      {/* User Login Button */}
      <Button 
        size="sm" 
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
      >
        <div className="flex items-center gap-2 rtl:flex-row-reverse">
          <div className="bg-white/20 p-1 rounded-full">
            <User size={16} className="text-white" />
          </div>
          <span className="font-medium text-xs sm:text-sm">{t('header.login', 'تسجيل الدخول')}</span>
        </div>
      </Button>

      {/* Notifications */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="relative rounded-full border-0 bg-gray-100/50 dark:bg-gray-800/50"
          >
            <Bell size={20} />
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
      <LanguageSwitcher className="transform hover:scale-110 transition-transform" />
      
      {/* Mobile Menu Toggle */}
      <motion.button
        className="p-2 lg:hidden transform hover:scale-110 transition-transform"
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
