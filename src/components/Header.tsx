
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { 
  Menu, 
  X, 
  ChevronDown,
  Activity,
  Network,
  Search,
  Radio,
  BrainCircuit,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? "py-3 bg-white/90 shadow-sm dark:bg-gray-900/90" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-octaBlue-600 to-octaBlue-800 bg-clip-text text-transparent mr-12">
            OCTA-GRAM
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <NavItem to="/#dashboard" label="لوحة التحكم" icon={<Activity size={18} />} />
            <NavDropdown 
              label="الأدوات" 
              icon={<Network size={18} />}
              items={[
                { to: "/#tools", label: "ماسح الشبكة", icon: <Search size={16} /> },
                { to: "/#tools", label: "محلل WiFi", icon: <Radio size={16} /> },
                { to: "/#tools", label: "محلل حركة المرور", icon: <Activity size={16} /> },
              ]}
            />
            <NavItem 
              to="/ai" 
              label="الذكاء الاصطناعي" 
              icon={<BrainCircuit size={18} />} 
              highlight
            />
            <NavItem to="/settings" label="الإعدادات" icon={<Settings size={18} />} />
          </nav>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4">
            <ModeToggle />
          </div>
          
          <div className="hidden md:block">
            <Button size="sm">
              تسجيل دخول
            </Button>
          </div>
          
          <button
            className="p-2 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 px-6 bg-white shadow-md dark:bg-gray-900 dark:border-gray-800 dark:border-b">
          <nav className="flex flex-col space-y-4">
            <MobileNavItem to="/#dashboard" label="لوحة التحكم" icon={<Activity size={18} />} />
            <MobileNavItem to="/#tools" label="الأدوات" icon={<Network size={18} />} />
            <MobileNavItem to="/ai" label="الذكاء الاصطناعي" icon={<BrainCircuit size={18} />} highlight />
            <MobileNavItem to="/settings" label="الإعدادات" icon={<Settings size={18} />} />
            <div className="pt-2">
              <Button size="sm" className="w-full">
                تسجيل دخول
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  highlight?: boolean;
}

function NavItem({ to, label, icon, highlight }: NavItemProps) {
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

function MobileNavItem({ to, label, icon, highlight }: NavItemProps) {
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

interface NavDropdownProps {
  label: string;
  icon?: React.ReactNode;
  items: {
    to: string;
    label: string;
    icon?: React.ReactNode;
  }[];
}

function NavDropdown({ label, icon, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative group">
      <button
        className="flex items-center text-gray-700 hover:text-octaBlue-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {label}
        <ChevronDown size={16} className="ml-1" />
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
