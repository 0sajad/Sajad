
import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const DesktopNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  // Define navigation items with Arabic translations
  const navItems = [
    { path: "/", label: "لوحة التحكم", icon: "dashboard" },
    { path: "/tools", label: "الأدوات", icon: "tools" },
    { path: "/ai", label: "مساعد الذكاء الاصطناعي", icon: "ai" },
    { path: "/settings", label: "الإعدادات", icon: "settings" },
    { path: "/help-center", label: "مركز المساعدة", icon: "help" },
    { path: "/license", label: "الترخيص", icon: "license" }
  ];
  
  return (
    <motion.nav 
      className="hidden md:flex items-center"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1
          }
        }
      }}
    >
      <motion.div className="flex items-center space-x-6 rtl:space-x-reverse">
        {navItems.map((item) => (
          <motion.a
            key={item.path}
            href={item.path}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? "bg-blue-100 text-blue-700 dark:bg-blue-800/30 dark:text-blue-200"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/30"
            }`}
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {t(`nav.${item.icon}`, item.label)}
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
};
