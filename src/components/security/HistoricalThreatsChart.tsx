
import React from "react";
import { useTranslation } from "react-i18next";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { HistoricalData } from "./utils/securityUtils";

interface HistoricalThreatsChartProps {
  historicalData: HistoricalData[];
}

export const HistoricalThreatsChart: React.FC<HistoricalThreatsChartProps> = ({ historicalData }) => {
  const { t } = useTranslation("securityDashboard");
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{t('historicalThreats', 'Historical Security Activity')}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="blocked" name={t('blocked', 'Blocked Threats')} fill="#3b82f6" />
            <Bar dataKey="warnings" name={t('warnings', 'Warnings')} fill="#f59e0b" />
            <Bar dataKey="critical" name={t('critical', 'Critical')} fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
