
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface NavItemProps {
  to: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
}

export const NavItem = ({ to, label, icon, active, className }: NavItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link to={to} className="relative group">
          <motion.div
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all relative",
              active 
                ? "text-orange-400" 
                : "text-gray-300 hover:text-orange-300",
              className
            )}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {icon && <span className="transition-transform group-hover:scale-110">{icon}</span>}
            <span>{label}</span>
            
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="bg-black/80 backdrop-blur-lg border border-orange-500/20 text-orange-200 text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};
