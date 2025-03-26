
import React from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface PerformanceDataPoint {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
  temperature: number;
}

interface CPUMemoryChartProps {
  performanceData: PerformanceDataPoint[];
}

export const CPUMemoryChart = ({ performanceData }: CPUMemoryChartProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">CPU & Memory Usage</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded shadow-sm">
                      <p className="font-bold">Time: {label}</p>
                      <p className="text-blue-600">CPU: {payload[0].value}%</p>
                      <p className="text-green-600">Memory: {payload[1].value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="cpu" 
              name="CPU" 
              stroke="#3b82f6" 
              fill="#93c5fd" 
              activeDot={{ r: 8 }} 
            />
            <Area 
              type="monotone" 
              dataKey="memory" 
              name="Memory" 
              stroke="#10b981" 
              fill="#6ee7b7" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
