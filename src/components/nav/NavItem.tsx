
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
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link
        to={to}
        className={`flex items-center transition-colors relative ${
          isActive || highlight 
            ? "text-purple-600 font-medium" 
            : "text-gray-700 dark:text-gray-200 hover:text-octaBlue-600"
        }`}
      >
        {icon && <span className="mr-1.5 rtl:ml-1.5 rtl:mr-0">{icon}</span>}
        {label}
        
        {/* أضفنا خط متحرك أسفل العنصر النشط */}
        {isActive && (
          <motion.div 
            className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
            layoutId="activeNavIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
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
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        to={to}
        className={`flex items-center p-3 rounded-md ${
          isActive || highlight 
            ? "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 text-purple-600 font-medium border-l-4 border-purple-600" 
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        {icon && (
          <span className={`mr-3 rtl:ml-3 rtl:mr-0 ${isActive ? "text-purple-600" : "text-gray-500"}`}>
            {icon}
          </span>
        )}
        {label}
      </Link>
    </motion.div>
  );
}
