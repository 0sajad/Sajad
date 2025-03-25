
import React from "react";
import { Link } from "react-router-dom";

interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

export function NavItem({ to, label, icon, highlight }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center hover:text-octaBlue-600 transition-colors ${
        highlight 
          ? "text-purple-600 font-medium" 
          : "text-gray-700"
      }`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </Link>
  );
}

export function MobileNavItem({ to, label, icon, highlight }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`flex items-center p-2 rounded-md ${
        highlight 
          ? "bg-purple-50 text-purple-600 font-medium" 
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </Link>
  );
}
