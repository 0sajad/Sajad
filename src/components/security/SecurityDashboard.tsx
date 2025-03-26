
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { generateThreatsData, generateHistoricalData } from "./utils/securityUtils";
import { SecurityDashboardHeader } from "./SecurityDashboardHeader";
import { SecurityScoreCard } from "./SecurityScoreCard";
import { SecurityStatusMetrics } from "./SecurityStatusMetrics";
import { ThreatDistributionChart } from "./ThreatDistributionChart";
import { HistoricalThreatsChart } from "./HistoricalThreatsChart";
import { SecurityRecommendations } from "./SecurityRecommendations";

export const SecurityDashboard = () => {
  const { t } = useTranslation();
  const [threatData, setThreatData] = useState(generateThreatsData());
  const [historicalData, setHistoricalData] = useState(generateHistoricalData());
  const [securityScore, setSecurityScore] = useState(Math.floor(Math.random() * 20) + 75);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshData = () => {
    setIsRefreshing(true);
    
    toast({
      title: t('securityDashboard.refreshing', 'Refreshing Security Data'),
      description: t('securityDashboard.analyzingThreats', 'Analyzing potential security threats...')
    });
    
    setTimeout(() => {
      setThreatData(generateThreatsData());
      setHistoricalData(generateHistoricalData());
      setSecurityScore(Math.floor(Math.random() * 20) + 75);
      setIsRefreshing(false);
    }, 2000);
  };
  
  return (
    <Card className="border-octaBlue-200 shadow-md animate-fade-in">
      <SecurityDashboardHeader isRefreshing={isRefreshing} onRefresh={refreshData} />
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <SecurityScoreCard securityScore={securityScore} />
            <SecurityStatusMetrics />
          </div>
          
          <div>
            <ThreatDistributionChart threatData={threatData} />
          </div>
        </div>
        
        <HistoricalThreatsChart historicalData={historicalData} />
        
        <SecurityRecommendations />
      </CardContent>
    </Card>
  );
};
