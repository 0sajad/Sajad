
import React from "react";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { NetworkStatusCard } from "./network/NetworkStatusCard";
import { ConnectedDevicesCard } from "./network/ConnectedDevicesCard";
import { DataTransferCard } from "./network/DataTransferCard";
import { NetworkSpeedCard } from "./network/NetworkSpeedCard";
import { NetworkPerformanceCard } from "./network/NetworkPerformanceCard";
import { SecurityStatusCard } from "./network/SecurityStatusCard";
import { ErrorBoundary } from "./ui/error/ErrorBoundary";
import { useTranslation } from "react-i18next";
import { ErrorMessage } from "./ui/error/ErrorMessage";

export function NetworkDashboard() {
  const { t } = useTranslation();
  const networkStats = useNetworkStats();

  // If we have no network data, show a more user-friendly error
  if (!networkStats) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ErrorMessage 
          title={t('networkDashboard.error.title', 'خطأ في بيانات الشبكة')}
          message={t('networkDashboard.error.message', 'لا يمكن تحميل بيانات الشبكة في الوقت الحالي')}
          showDetailsDialog
          details="Network stats data is undefined. This could be due to a network connection issue or a problem with the API service."
        />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <section id="dashboard" className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-tajawal">
              {t('networkDashboard.title', 'لوحة مراقبة الشبكة')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto font-tajawal">
              {t('networkDashboard.description', 'تحليل ومراقبة أداء الشبكة والأجهزة المتصلة في الوقت الفعلي')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <NetworkStatusCard signalStrength={networkStats?.signalStrength} />
            <ConnectedDevicesCard connectedDevices={networkStats?.connectedDevices} />
            <DataTransferCard dataTransfer={networkStats?.dataTransfer} />
            <NetworkSpeedCard networkSpeed={networkStats?.networkSpeed} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <NetworkPerformanceCard 
              download={networkStats?.download} 
              upload={networkStats?.upload} 
              ping={networkStats?.ping} 
            />
            <SecurityStatusCard />
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}

// Add default export for compatibility with React.lazy()
export default NetworkDashboard;
