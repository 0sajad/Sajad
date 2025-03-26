
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useA11y } from "@/hooks/useA11y";

export function ThemeToggle() {
  const { t } = useTranslation();
  const { setTheme, theme } = useTheme();
  const { reducedMotion } = useA11y();
  
  // تأثير لتحديث الـ meta tag للون الثيم عند تغيير الثيم
  useEffect(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#0f172a" : "#ffffff"
      );
    } else {
      // إنشاء meta tag إذا لم يكن موجوداً
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = theme === "dark" ? "#0f172a" : "#ffffff";
      document.head.appendChild(meta);
    }
  }, [theme]);
  
  // اختبار أفضلية المستخدم للوضع الداكن
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (theme === undefined) {
      setTheme(prefersDark ? "dark" : "light");
    }
  }, [theme, setTheme]);
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 border border-blue-200 dark:border-gray-600 transition-all duration-300 shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-400"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={t('common.toggleTheme', 'تبديل بين الوضع الفاتح والداكن')}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="moon"
                  initial={{ y: reducedMotion ? 0 : 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: reducedMotion ? 0 : -20, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.2 }}
                  className="absolute"
                >
                  <Moon className="h-4 w-4 text-blue-500 dark:text-yellow-300" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: reducedMotion ? 0 : -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: reducedMotion ? 0 : 20, opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.2 }}
                  className="absolute"
                >
                  <Sun className="h-4 w-4 text-yellow-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <p className="text-sm">{t('common.toggleTheme', 'تبديل بين الوضع الفاتح والداكن')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
