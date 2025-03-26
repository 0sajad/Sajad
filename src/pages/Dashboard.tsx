
import React, { useState, useEffect } from "react";
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
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const networkStats = useNetworkStats();
  
  // تحسين المكون باستخدام تأثيرات الظهور
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };
  
  // إظهار مساعد الذكاء الاصطناعي بعد فترة
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 3000);
    
    // تحميل بيانات التطبيق بشكل مسبق
    const preloadData = async () => {
      try {
        // يمكن تنفيذ عمليات تحميل البيانات هنا
        console.log("Preloading dashboard data");
      } catch (error) {
        console.error("Error preloading data:", error);
      }
    };
    
    preloadData();
    
    return () => clearTimeout(timeout);
  }, []);
  
  const handleMaximizeAI = () => {
    toast({
      title: t('aiAssistant.navigating'),
      description: t('aiAssistant.openingPage')
    });
    window.location.href = '/ai';
  };
  
  return (
    <TooltipProvider>
      <motion.div 
        className="container mx-auto p-6 pb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Header />
        
        {/* Show Developer Panel only in Developer Mode */}
        {isDeveloperMode && (
          <motion.div variants={itemVariants}>
            <DeveloperPanel />
          </motion.div>
        )}
        
        <motion.div variants={itemVariants}>
          <DashboardHeader />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <StatusCards />
        </motion.div>
        
        {/* Network quality gauge and real-time monitoring */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={itemVariants}
        >
          <NetworkQualityGauge 
            qualityScore={87} 
            latency={24} 
            packetLoss={0.5} 
            jitter={1.2} 
          />
          <div className="md:col-span-2">
            <RealTimeMonitoring />
          </div>
        </motion.div>
        
        {/* System Performance & Devices */}
        <motion.div variants={itemVariants}>
          <SystemTabs />
        </motion.div>
        
        {/* Advanced Network Analytics */}
        <motion.div className="mb-8" variants={itemVariants}>
          <AdvancedNetworkAnalytics />
        </motion.div>
        
        {/* Floating AI Assistant */}
        <FloatingAIAssistant 
          show={showAIAssistant} 
          onMaximize={handleMaximizeAI} 
        />
      </motion.div>
    </TooltipProvider>
  );
};

export default Dashboard;
