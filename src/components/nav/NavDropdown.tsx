
import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavDropdownProps {
  label: string;
  icon?: React.ReactNode;
  items: {
    to: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  compact?: boolean;
}

export function NavDropdown({ label, icon, items, compact = false }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // التحقق من وجود عنصر نشط في القائمة المنسدلة
  const hasActiveItem = items.some(item => location.pathname === item.to);
  
  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className="relative group" ref={ref}>
      <motion.button
        className={`flex items-center transition-colors relative ${
          hasActiveItem ? "text-purple-600 font-medium" : "text-gray-700 hover:text-octaBlue-600"
        } ${compact ? "text-sm space-x-1" : "space-x-1.5"}`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setTimeout(() => setIsOpen(false), 300)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon && <span className="mr-1 rtl:ml-1 rtl:mr-0">{icon}</span>}
        <span className="relative z-10">{label}</span>
        <motion.div
          animate={{ 
            rotate: isOpen ? 180 : 0,
            y: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="ml-0.5 rtl:mr-0.5 rtl:ml-0"
        >
          <ChevronDown size={compact ? 14 : 16} className={`transition-colors ${hasActiveItem ? "text-purple-600" : ""}`} />
        </motion.div>
        
        {/* إضافة خط أسفل القائمة إذا كان أحد عناصرها نشطاً */}
        {hasActiveItem && (
          <motion.div 
            className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 ${compact ? "h-0.5" : "h-1"}`}
            layoutId="activeNavIndicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ boxShadow: "0 0 10px rgba(139, 92, 246, 0.5)" }}
          />
        )}
        
        {/* تأثير الهالة خلف النص عند النشاط */}
        {hasActiveItem && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-full opacity-10 bg-purple-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute z-50 mt-1.5 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl py-1.5 border border-gray-200/40 dark:border-gray-700/40"
            style={{ 
              right: document.dir === 'rtl' ? 'auto' : '0',
              left: document.dir === 'rtl' ? '0' : 'auto'
            }}
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            {items.map((item, index) => {
              const isActive = location.pathname === item.to;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: document.dir === 'rtl' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    backgroundColor: isActive ? "rgba(124, 58, 237, 0.1)" : "#f3f4f6",
                    x: document.dir === 'rtl' ? -3 : 3,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className={`${isActive ? 'bg-purple-50 dark:bg-purple-900/20' : ''} my-0.5 mx-1 rounded-md overflow-hidden`}
                >
                  <Link
                    to={item.to}
                    className={`flex items-center px-3 py-2 text-sm transition-all
                    ${isActive 
                      ? 'text-purple-600 font-medium' 
                      : 'text-gray-700 dark:text-gray-200'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <span className="mr-2 rtl:ml-2 rtl:mr-0">{item.icon}</span>}
                    {item.label}
                    
                    {isActive && (
                      <motion.div 
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600"
                        layoutId="activeDropdownDot"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
