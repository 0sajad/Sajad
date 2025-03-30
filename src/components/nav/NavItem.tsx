
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
}

export function NavItem({
  to,
  icon,
  label,
  isActive,
  onClick,
  className
}: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center px-4 py-2 rounded-md text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive && "bg-gray-100 dark:bg-gray-800 text-primary",
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="mr-2 rtl:ml-2 rtl:mr-0">{icon}</span>}
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
  className
}: NavItemProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-base transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
        isActive && "bg-gray-100 dark:bg-gray-800 text-primary font-medium",
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}
