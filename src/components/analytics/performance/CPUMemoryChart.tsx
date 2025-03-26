
// First check the original CPUMemoryChart props to extend them
import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { PerformanceDataPoint } from "./utils/performanceUtils";

export interface CPUMemoryChartProps {
  performanceData: PerformanceDataPoint[];
  reducedAnimations?: boolean; // Add this prop
}

export const CPUMemoryChart: React.FC<CPUMemoryChartProps> = ({ 
  performanceData,
  reducedAnimations = false
}) => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-octaBlue-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{t('systemMonitor.cpuMemoryChart', 'CPU & Memory Usage')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
              <XAxis dataKey="time" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip 
                contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "8px", border: "1px solid #eaeaea" }}
                isAnimationActive={!reducedAnimations}
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="cpu" 
                name={t('systemMonitor.cpu', 'CPU')} 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.2} 
                isAnimationActive={!reducedAnimations}
              />
              <Area 
                type="monotone" 
                dataKey="memory" 
                name={t('systemMonitor.memory', 'Memory')} 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.2} 
                isAnimationActive={!reducedAnimations}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
