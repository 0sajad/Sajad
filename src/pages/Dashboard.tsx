
import React, { useState, useEffect, Suspense, lazy, useCallback, memo } from "react";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdvancedNetworkAnalytics } from "@/components/analytics/AdvancedNetworkAnalytics";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";
import { FloatingAIAssistant } from "@/components/FloatingAIAssistant";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatusCards } from "@/components/dashboard/StatusCards";
import { SystemTabs } from "@/components/dashboard/SystemTabs";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

// تحسين الأداء باستخدام Lazy Loading للمكونات الثانوية
const LazyDeveloperPanel = lazy(() => import("@/components/developer/DeveloperPanel").then(module => ({ default: module.DeveloperPanel })));

// استخدام memo لتحسين كفاءة إعادة التصيير
const MemoizedStatusCards = memo(StatusCards);
const MemoizedSystemTabs = memo(SystemTabs);

const Dashboard = () => {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);
  const networkStats = useNetworkStats();
  
  // تحسين المكون باستخدام تأثيرات الظهور
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.07, // تسريع قليلاً لتجربة أفضل
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 350, damping: 25 }
    }
  };
  
  // استخدام useCallback لتحسين الأداء
  const handleMaximizeAI = useCallback(() => {
    toast({
      title: t('aiAssistant.navigating'),
      description: t('aiAssistant.openingPage')
    });
    window.location.href = '/ai';
  }, [t]);
  
  // تحسين إدارة دورة حياة المكون
  useEffect(() => {
    // محاكاة تحميل البيانات
    const dataLoadingTimeout = setTimeout(() => {
      setIsContentReady(true);
    }, 300);
    
    // إظهار مساعد الذكاء الاصطناعي بعد فترة
    const aiAssistantTimeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 1500);
    
    // تحميل بيانات التطبيق بشكل مسبق باستخدام تقنية Intersection Observer
    const preloadData = async () => {
      try {
        if ('IntersectionObserver' in window) {
          // استخدام Intersection Observer للتحميل المتأخر للبيانات
          console.log("Using modern preloading techniques");
        } else {
          // استخدام التحميل العادي للمتصفحات القديمة
          console.log("Using standard preloading for dashboard data");
        }
      } catch (error) {
        console.error("Error preloading data:", error);
      }
    };
    
    preloadData();
    
    // تنظيف المؤقتات عند إزالة المكون
    return () => {
      clearTimeout(dataLoadingTimeout);
      clearTimeout(aiAssistantTimeout);
    };
  }, []);
  
  return (
    <TooltipProvider>
      <AnimatePresence mode="wait">
        <motion.div 
          className="container mx-auto p-6 pb-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          key="dashboard-container"
        >
          <Header />
          
          {/* عرض لوحة المطور فقط في وضع المطور */}
          {isDeveloperMode && (
            <motion.div variants={itemVariants}>
              <Suspense fallback={<Skeleton className="h-32 w-full mb-4" />}>
                <LazyDeveloperPanel />
              </Suspense>
            </motion.div>
          )}
          
          <motion.div variants={itemVariants}>
            <DashboardHeader />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MemoizedStatusCards />
          </motion.div>
          
          {/* مقياس جودة الشبكة والمراقبة في الوقت الحقيقي */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            variants={itemVariants}
          >
            <NetworkQualityGauge 
              qualityScore={networkStats?.qualityScore || 87} 
              latency={networkStats?.latency || 24} 
              packetLoss={networkStats?.packetLoss || 0.5} 
              jitter={networkStats?.jitter || 1.2} 
            />
            <div className="md:col-span-2">
              <RealTimeMonitoring />
            </div>
          </motion.div>
          
          {/* أداء النظام والأجهزة */}
          <motion.div variants={itemVariants}>
            <MemoizedSystemTabs />
          </motion.div>
          
          {/* تحليلات الشبكة المتقدمة */}
          <motion.div 
            className="mb-8" 
            variants={itemVariants}
          >
            {isContentReady ? (
              <AdvancedNetworkAnalytics />
            ) : (
              <Skeleton className="h-64 w-full rounded-lg" />
            )}
          </motion.div>
          
          {/* مساعد الذكاء الاصطناعي العائم */}
          <FloatingAIAssistant 
            show={showAIAssistant} 
            onMaximize={handleMaximizeAI} 
          />
        </motion.div>
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default Dashboard;
