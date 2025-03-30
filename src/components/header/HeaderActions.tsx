
import React from "react";
import { User, Menu, X, Bell } from "lucide-react";
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
    <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-5 rtl:space-x-reverse">
      <LanguageSwitcher className="transform hover:scale-110 transition-transform shadow-xl rounded-full mr-2 sm:mr-4" />
      
      <div className="transform hover:scale-105 transition-transform">
        <ModeToggle />
      </div>
      
      {/* مكون الإشعارات */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full h-8 w-8"
          >
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-3.5 h-3.5 flex items-center justify-center rounded-full">
              3
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <NotificationsList />
        </PopoverContent>
      </Popover>
      
      <div className="hidden md:block">
        <Button 
          size="sm" 
          variant="gradient"
          className="px-4 md:px-6 py-2 shadow-xl hover:shadow-2xl transform hover:translate-y-[-2px] transition-all rounded-full"
        >
          <div className="flex items-center gap-2 rtl:flex-row-reverse">
            <div className="bg-white/30 p-1 rounded-full">
              <User size={14} className="text-white" />
            </div>
            <span className="text-sm font-medium">{t('header.login')}</span>
          </div>
        </Button>
      </div>
      
      <motion.button
        className="p-1.5 md:hidden transform hover:scale-110 transition-transform"
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
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
