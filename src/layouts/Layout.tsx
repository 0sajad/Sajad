
import React, { ReactNode } from "react";
import { ErrorBoundary } from "@/components/ui/error/ErrorBoundary";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        {/* Add header, navigation, etc. here if needed */}
        <main className="flex-grow">
          {children}
        </main>
        {/* Add footer here if needed */}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
