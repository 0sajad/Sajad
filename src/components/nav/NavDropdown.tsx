
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  icon?: ReactNode;
  items: { to: string; label: string }[];
}

export const NavDropdown = ({ label, icon, items }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-orange-300 transition-all"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        {icon && <span className="transition-transform hover:scale-110">{icon}</span>}
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 mt-1 bg-black/90 backdrop-blur-xl rounded-lg shadow-lg border border-orange-500/20 min-w-[180px] z-50 overflow-hidden"
            initial={{ opacity: 0, y: -5, scaleY: 0.8 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -5, scaleY: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: 'top center' }}
          >
            <div className="py-2">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.to}
                    className="flex items-center px-4 py-2 text-sm text-orange-100 hover:bg-orange-500/10 hover:text-orange-300 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
