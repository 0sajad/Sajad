
import React, { ReactNode } from "react";
import { ErrorBoundary } from "@/components/ui/error/ErrorBoundary";
import { Header } from "@/components/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16">
          {children}
        </main>
        {/* Footer can be added here if needed */}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
