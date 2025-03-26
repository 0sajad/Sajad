
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
}

export function NavDropdown({ label, icon, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
        className="flex items-center text-gray-700 hover:text-octaBlue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => !isMobile && setIsOpen(true)}
        onMouseLeave={() => !isMobile && setTimeout(() => setIsOpen(false), 200)}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon && <span className="mr-1 rtl:ml-1 rtl:mr-0">{icon}</span>}
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} className="ml-1 rtl:mr-1 rtl:ml-0" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute z-50 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg py-2"
            style={{ 
              right: document.dir === 'rtl' ? 'auto' : '0',
              left: document.dir === 'rtl' ? '0' : 'auto'
            }}
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {items.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: document.dir === 'rtl' ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ backgroundColor: "#f3f4f6" }}
              >
                <Link
                  to={item.to}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <span className="mr-2 rtl:ml-2 rtl:mr-0">{item.icon}</span>}
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
