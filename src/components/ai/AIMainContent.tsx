
import React, { useState, Suspense, useEffect } from "react";
import { AIPerformanceOptimizer } from "./AIPerformanceOptimizer";
import { Skeleton } from "@/components/ui/skeleton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { useTranslation } from "react-i18next";
import { AISidebar } from "@/components/ai/AISidebar";
import { AITabContent } from "@/components/ai/AITabContent";

interface AIMainContentProps {
  initialMessages: {role: string, content: string, timestamp?: Date}[];
  children?: React.ReactNode;
  layout?: "default" | "sidebar" | "fullwidth";
}

export const AIMainContent = ({ 
  initialMessages, 
  children, 
  layout = "default" 
}: AIMainContentProps) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1200px)");
  const { shouldUseAdvancedAnimations } = usePerformanceOptimization();
  
  // تحديد التخطيط المناسب تلقائيًا
  const [activeLayout, setActiveLayout] = useState(layout);
  
  // تحديد التخطيط بناءً على حجم الشاشة
  useEffect(() => {
    if (layout === "default") {
      if (isMobile) {
        setActiveLayout("fullwidth");
      } else if (isTablet) {
        setActiveLayout("sidebar");
      } else {
        setActiveLayout("default");
      }
    } else {
      setActiveLayout(layout);
    }
  }, [isMobile, isTablet, layout]);
  
  // مكون التحميل للعناصر البطيئة
  const ContentLoader = () => (
    <div className="space-y-4 p-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-32 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
  
  // تحديد التخطيط المناسب
  const renderContent = () => {
    switch (activeLayout) {
      case "fullwidth":
        return (
          <div className="w-full">
            <Suspense fallback={<ContentLoader />}>
              {children ? children : <AITabContent initialMessages={initialMessages} />}
            </Suspense>
          </div>
        );
      
      case "sidebar":
        return (
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <AISidebar isCompact={true} />
            </div>
            <div className="w-full md:w-2/3 lg:w-3/4">
              <Suspense fallback={<ContentLoader />}>
                {children ? children : <AITabContent initialMessages={initialMessages} />}
              </Suspense>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <AISidebar />
            </div>
            <div className="lg:col-span-2">
              <Suspense fallback={<ContentLoader />}>
                {children ? children : <AITabContent initialMessages={initialMessages} />}
              </Suspense>
            </div>
          </div>
        );
    }
  };
  
  return (
    <AIPerformanceOptimizer>
      <div className={`${shouldUseAdvancedAnimations() ? 'animate-fade-in' : ''}`}>
        {renderContent()}
      </div>
    </AIPerformanceOptimizer>
  );
};
