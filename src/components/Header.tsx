
import React, { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";
import { Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Dashboard", href: "#dashboard" },
    { name: "Network Tools", href: "#tools" },
    { name: "AI Features", href: "#ai-features" },
    { name: "Settings", href: "#settings" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ease-in-out",
        scrolled
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-lg font-semibold bg-gradient-to-r from-octaBlue-600 to-octaBlue-800 bg-clip-text text-transparent">
            OCTA-GRAM
          </span>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <button 
            className="rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
          
          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-full p-2 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-200"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 top-16 z-40 bg-white/90 backdrop-blur-md transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
