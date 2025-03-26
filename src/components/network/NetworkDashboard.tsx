
import React from "react";
import { useNetworkStats } from "@/hooks/useNetworkStats";
import { NetworkStatusCard } from "./NetworkStatusCard";
import { ConnectedDevicesCard } from "./ConnectedDevicesCard";
import { DataTransferCard } from "./DataTransferCard";
import { NetworkSpeedCard } from "./NetworkSpeedCard";
import { NetworkPerformanceCard } from "./NetworkPerformanceCard";
import { SecurityStatusCard } from "./SecurityStatusCard";
import { useTranslation } from "react-i18next";

export function NetworkDashboard() {
  const networkStats = useNetworkStats();
  const { t, i18n } = useTranslation("dashboard");
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === "ar" || currentLanguage === "ar-iq";

  return (
    <section id="dashboard" className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isRTL ? 'font-tajawal' : ''}`}>
            {t('title')}
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${isRTL ? 'font-tajawal' : ''}`}>
            {t('overview')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <NetworkStatusCard signalStrength={networkStats.signalStrength} />
          <ConnectedDevicesCard connectedDevices={networkStats.connectedDevices} />
          <DataTransferCard dataTransfer={networkStats.dataTransfer} />
          <NetworkSpeedCard networkSpeed={networkStats.networkSpeed} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NetworkPerformanceCard 
            download={networkStats.download} 
            upload={networkStats.upload} 
            ping={networkStats.ping} 
          />
          <SecurityStatusCard />
        </div>
      </div>
    </section>
  );
}
