
import React, { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

// استخدام التحميل الكسول للصفحات
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AI = lazy(() => import("./pages/AI"));
const Settings = lazy(() => import("./pages/Settings"));
const FiberOptic = lazy(() => import("./pages/FiberOptic"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const LicenseVerification = lazy(() => import("./pages/LicenseVerification"));
const AccessVerification = lazy(() => import("./pages/AccessVerification"));

// مكون التحميل
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="space-y-4 w-full max-w-md">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
      <div className="flex space-x-4 rtl:space-x-reverse">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  </div>
);

// إنشاء مكون التطبيق الرئيسي
const App = () => {
  // إنشاء مثيل جديد من QueryClient داخل المكون
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/fiber-optic" element={<FiberOptic />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/license" element={<LicenseVerification />} />
              <Route path="/access" element={<AccessVerification />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
