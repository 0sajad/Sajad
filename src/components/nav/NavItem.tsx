
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export function NavItem({ to, label, icon, highlight }: NavItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Link
        to={to}
        className={`flex items-center hover:text-octaBlue-600 transition-colors ${
          highlight 
            ? "text-purple-600 font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:right-0 after:h-[2px] after:w-full after:bg-purple-600 after:scale-x-100 after:origin-right" 
            : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {icon && <span className="mr-1 rtl:ml-1 rtl:mr-0">{icon}</span>}
        {label}
      </Link>
    </motion.div>
  );
}

export function MobileNavItem({ to, label, icon, highlight }: NavItemProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        to={to}
        className={`flex items-center p-2 rounded-md ${
          highlight 
            ? "bg-purple-50 text-purple-600 font-medium" 
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        {icon && <span className="mr-2 rtl:ml-2 rtl:mr-0">{icon}</span>}
        {label}
      </Link>
    </motion.div>
  );
}
