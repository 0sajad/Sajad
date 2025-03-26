
import React from "react";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { AlertCircle } from "lucide-react";
import { ThreatData, COLORS } from "./utils/securityUtils";

interface ThreatDistributionChartProps {
  threatData: ThreatData[];
}

export const ThreatDistributionChart: React.FC<ThreatDistributionChartProps> = ({ threatData }) => {
  const { t } = useTranslation("securityDashboard");
  const threatTotal = threatData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <div className="p-4 rounded-lg border">
      <h3 className="text-lg font-medium mb-4">{t('threatDistribution', 'Threat Distribution')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={threatData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {threatData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertCircle size={12} className="mr-1" />
          {threatTotal} {t('threatsDetected', 'threats detected')}
        </div>
      </div>
    </div>
  );
};
