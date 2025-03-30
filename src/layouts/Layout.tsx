
import React, { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "@/components/ui/error/ErrorBoundary";
import { Header } from "@/components/Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<div className="h-16 bg-gray-100 dark:bg-gray-900"></div>}>
          <Header />
        </Suspense>
        <main className="flex-grow pt-16">
          {children}
        </main>
        {/* Footer can be added here if needed */}
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
