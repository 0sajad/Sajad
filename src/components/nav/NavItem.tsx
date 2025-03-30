
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

export function NavItem({ path, label, icon, isActive }: NavItemProps) {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap",
        isActive
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-200"
          : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/20"
      )}
    >
      <span className="hidden sm:inline">{icon}</span>
      <span className="text-xs sm:text-sm">{label}</span>
    </Link>
  );
}
