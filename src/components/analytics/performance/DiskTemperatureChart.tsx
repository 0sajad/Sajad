
// First check the original DiskTemperatureChart props to extend them
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { PerformanceDataPoint } from "./utils/performanceUtils";

export interface DiskTemperatureChartProps {
  performanceData: PerformanceDataPoint[];
  reducedAnimations?: boolean; // Add this prop
}

export const DiskTemperatureChart: React.FC<DiskTemperatureChartProps> = ({ 
  performanceData,
  reducedAnimations = false
}) => {
  const { t } = useTranslation();
  
  return (
    <Card className="border-octaBlue-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{t('systemMonitor.diskTempChart', 'Disk Usage & System Temperature')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <Bar 
                dataKey="disk" 
                name={t('systemMonitor.disk', 'Disk')} 
                fill="#8b5cf6" 
                radius={[4, 4, 0, 0]} 
                isAnimationActive={!reducedAnimations}
              />
              <Bar 
                dataKey="temperature" 
                name={t('systemMonitor.temperature', 'Temperature')} 
                fill="#f59e0b" 
                radius={[4, 4, 0, 0]} 
                isAnimationActive={!reducedAnimations}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
