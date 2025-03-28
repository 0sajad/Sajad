
import React from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLanguageTransition } from "@/hooks/useLanguageTransition";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface LanguageSwitcherButtonProps {
  className?: string;
  onClick: () => void;
  isTransitioning: boolean;
  currentLanguageFlag: string;
}

export function LanguageSwitcherButton({ 
  className = "", 
  onClick, 
  isTransitioning, 
  currentLanguageFlag 
}: LanguageSwitcherButtonProps) {
  const { t } = useTranslation();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`relative ${className} ${isTransitioning ? 'opacity-50' : 'opacity-100'} transition-all duration-300 shadow-xl hover:shadow-2xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 group overflow-hidden`}
            aria-label={t('common.selectLanguage', 'تغيير اللغة')}
            data-testid="language-switcher"
            onClick={onClick}
          >
            <div className="relative z-10 flex items-center justify-center">
              <Globe className="h-4 w-4 text-blue-500 dark:text-blue-300 group-hover:scale-110 transition-transform" />
              
              {/* علم اللغة الحالية مع تحسين الظهور */}
              <motion.div 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center border border-white dark:border-gray-700 shadow-md"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <span className="text-[10px]">{currentLanguageFlag}</span>
              </motion.div>
            </div>
            
            {/* تأثير متحرك عند التحويم */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{ 
                background: ["linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1))", 
                            "linear-gradient(to right, rgba(124, 58, 237, 0.1), rgba(59, 130, 246, 0.1))"]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* هالة حول الزر عند التحويم */}
            <motion.div
              className="absolute -inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              whileHover={{ 
                opacity: 1,
                boxShadow: [
                  "0 0 0 rgba(59, 130, 246, 0.3)",
                  "0 0 8px rgba(59, 130, 246, 0.6)",
                  "0 0 0 rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            
            <span className="sr-only">{t('common.language', 'اللغة')}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-gradient-to-r from-blue-500/90 to-blue-600/90 text-white border-0 shadow-lg">
          <p>{t('common.selectLanguage', 'تغيير اللغة')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
