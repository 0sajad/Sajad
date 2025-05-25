
import React from 'react';
import { Toaster } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
      <Toaster 
        position="top-right" 
        richColors 
        expand={true}
        closeButton
      />
    </div>
  );
}
