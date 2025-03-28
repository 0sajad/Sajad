
import React from "react";
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataPoint {
  time: string;
  download: number;
  upload: number;
  latency: number;
}

interface SpeedChartProps {
  data: DataPoint[];
}

export function SpeedChart({ data }: SpeedChartProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 font-tajawal">سرعة التنزيل والرفع</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded shadow-sm">
                      <p className="text-sm font-bold">{label}</p>
                      <p className="text-sm text-blue-600">{`تنزيل: ${payload[0].value} Mbps`}</p>
                      <p className="text-sm text-green-600">{`رفع: ${payload[1].value} Mbps`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="download" 
              name="التنزيل" 
              stroke="#3b82f6" 
              fill="#93c5fd" 
              activeDot={{ r: 8 }} 
            />
            <Area 
              type="monotone" 
              dataKey="upload" 
              name="الرفع" 
              stroke="#10b981" 
              fill="#6ee7b7" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
