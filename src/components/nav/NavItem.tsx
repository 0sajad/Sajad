
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
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
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-all",
              active 
                ? "text-orange-500" 
                : "text-gray-300 hover:text-orange-300",
              className
            )}
          >
            {icon && (
              <span className="transition-transform group-hover:scale-110">
                {icon}
              </span>
            )}
            <span>{label}</span>
          </div>
        </Link>
      </TooltipTrigger>
      <TooltipContent className="bg-black/80 border border-orange-500/20 text-orange-200 text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  );
};
