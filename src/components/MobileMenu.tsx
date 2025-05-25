
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileMenu as MobileMenuContent } from '@/components/nav/MobileMenu';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="w-9 h-9 p-0"
      >
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <Menu className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle menu</span>
      </Button>
      
      <MobileMenuContent isOpen={isOpen} />
    </div>
  );
}
