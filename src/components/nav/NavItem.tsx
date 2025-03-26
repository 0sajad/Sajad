
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export function NavItem({ to, label, icon, highlight }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link
        to={to}
        className={`flex items-center transition-all duration-300 relative ${
          isActive || highlight 
            ? "text-purple-600 font-medium" 
            : "text-gray-700 dark:text-gray-200 hover:text-octaBlue-600"
        }`}
      >
        {icon && (
          <span className={`mr-1.5 rtl:ml-1.5 rtl:mr-0 ${isActive ? "text-purple-600" : ""}`}>
            {icon}
          </span>
        )}
        <span className="relative z-10">{label}</span>
        
        {/* خط متحرك أسفل العنصر النشط مع تأثير */}
        {isActive && (
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
            layoutId="activeNavIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)" }}
          />
        )}
        
        {/* تأثير الهالة خلف النص عند النشاط */}
        {isActive && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-full opacity-10 bg-purple-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export function MobileNavItem({ to, label, icon, highlight }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ x: document.dir === 'rtl' ? -5 : 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        to={to}
        className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
          isActive || highlight 
            ? "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-purple-600 font-medium border-r-4 border-purple-600 shadow-inner" 
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        {icon && (
          <span className={`text-xl mr-4 rtl:ml-4 rtl:mr-0 ${isActive ? "text-purple-600" : "text-gray-500"}`}>
            {icon}
          </span>
        )}
        <span className="text-base">{label}</span>
        
        {/* مؤشر للعنصر النشط */}
        {isActive && (
          <motion.div
            className="ml-auto"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-2 h-2 rounded-full bg-purple-600"></div>
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}
