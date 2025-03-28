
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

const Dashboard = () => {
  const { t } = useTranslation();
  const { isDeveloperMode } = useMode();
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const networkStats = useNetworkStats();
  
  // Show AI assistant after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAIAssistant(true);
    }, 3000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const handleMaximizeAI = () => {
    return window.location.href = '/ai';
  };
  
  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 pb-20">
        <Header />
        
        {/* Show Developer Panel only in Developer Mode */}
        {isDeveloperMode && <DeveloperPanel />}
        
        <DashboardHeader />
        
        <StatusCards />
        
        {/* Network quality gauge and real-time monitoring */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <NetworkQualityGauge 
            qualityScore={87} 
            latency={24} 
            packetLoss={0.5} 
            jitter={1.2} 
          />
          <div className="md:col-span-2">
            <RealTimeMonitoring />
          </div>
        </div>
        
        {/* System Performance & Devices */}
        <SystemTabs />
        
        {/* Advanced Network Analytics */}
        <div className="mb-8">
          <AdvancedNetworkAnalytics />
        </div>
        
        {/* Floating AI Assistant */}
        <FloatingAIAssistant 
          show={showAIAssistant} 
          onMaximize={handleMaximizeAI} 
        />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
