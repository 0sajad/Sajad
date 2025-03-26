
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
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
      <button
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-300 hover:text-orange-300 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span>{icon}</span>}
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 bg-black/90 rounded-lg shadow-lg border border-orange-500/20 min-w-[180px] z-50 overflow-hidden"
        >
          <div className="py-2">
            {items.map((item, index) => (
              <div key={index}>
                <Link
                  to={item.to}
                  className="flex items-center px-4 py-2 text-sm text-orange-100 hover:bg-orange-500/10 hover:text-orange-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
