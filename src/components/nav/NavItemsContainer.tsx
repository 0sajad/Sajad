
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface NavItemsContainerProps {
  children: ReactNode;
}

export const NavItemsContainer = ({ children }: NavItemsContainerProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  return (
    <motion.nav 
      className="flex items-center space-x-8 rtl:space-x-reverse bg-white/20 dark:bg-gray-900/30 backdrop-blur-md px-8 py-3 rounded-full border border-gray-200/30 dark:border-gray-700/30 shadow-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.nav>
  );
};
