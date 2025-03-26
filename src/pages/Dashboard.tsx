
import React from "react";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdvancedNetworkAnalytics } from "@/components/analytics/AdvancedNetworkAnalytics";
import { NetworkQualityGauge } from "@/components/analytics/NetworkQualityGauge";
import { RealTimeMonitoring } from "@/components/analytics/RealTimeMonitoring";
import { DashboardOverview } from "@/components/DashboardOverview";

const Dashboard = () => {
  const { t } = useTranslation("dashboard");
  const { isDeveloperMode } = useMode();
  
  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Show Developer Panel only in Developer Mode */}
            {isDeveloperMode && <DeveloperPanel />}
            
            <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
            <p className="text-muted-foreground mb-8">{t('welcome')}</p>
            
            {/* Dashboard Overview with Key Metrics */}
            <div className="mb-12">
              <DashboardOverview />
            </div>
            
            {/* Network Quality and Real-Time Monitoring Section */}
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
            
            {/* Advanced Network Analytics Section */}
            <div className="mb-8">
              <AdvancedNetworkAnalytics />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;
