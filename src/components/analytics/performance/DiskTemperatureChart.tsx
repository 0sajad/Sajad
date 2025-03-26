
import React from "react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface PerformanceDataPoint {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
  temperature: number;
}

interface DiskTemperatureChartProps {
  performanceData: PerformanceDataPoint[];
}

export const DiskTemperatureChart = ({ performanceData }: DiskTemperatureChartProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Disk I/O & Temperature</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded shadow-sm">
                      <p className="font-bold">Time: {label}</p>
                      <p className="text-purple-600">Disk I/O: {payload[0].value}%</p>
                      <p className="text-amber-600">Temperature: {payload[1].value}°C</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="disk" 
              name="Disk I/O" 
              stroke="#8b5cf6" 
              strokeWidth={2} 
              dot={{ r: 3 }} 
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              name="Temperature" 
              stroke="#f59e0b" 
              strokeWidth={2} 
              dot={{ r: 3 }} 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
