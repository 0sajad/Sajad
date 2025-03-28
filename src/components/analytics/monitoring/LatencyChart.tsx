
import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface DataPoint {
  time: string;
  download: number;
  upload: number;
  latency: number;
}

interface LatencyChartProps {
  data: DataPoint[];
}

export function LatencyChart({ data }: LatencyChartProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 font-tajawal">زمن الإستجابة</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-3 border rounded shadow-sm">
                      <p className="text-sm font-bold">{label}</p>
                      <p className="text-sm text-amber-600">{`زمن الإستجابة: ${payload[0].value} ms`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="latency" 
              name="زمن الإستجابة" 
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
}
