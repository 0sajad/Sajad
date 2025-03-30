
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export interface NavItemProps {
  to: string;
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
}

export function NavItem({
  to,
  icon,
  label,
  isActive,
  onClick,
  className,
  compact = false
}: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-2.5 py-1.5 rounded-md text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive && "bg-gray-100 dark:bg-gray-800 text-primary",
        compact && "text-xs py-1 px-2",
        className
      )}
      onClick={onClick}
    >
      {icon && <span className={cn("rtl:ml-1.5 rtl:mr-0", compact ? "mr-1" : "mr-2")}>{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}

export function MobileNavItem({
  to,
  icon,
  label,
  isActive,
  onClick,
  className,
  compact = false
}: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 px-3 py-2.5 rounded-lg text-base transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive && "bg-gray-100 dark:bg-gray-800 text-primary font-medium",
        compact && "text-sm py-2 px-2.5 gap-1.5",
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}
