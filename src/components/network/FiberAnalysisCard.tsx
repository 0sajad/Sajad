
import React from "react";
import { GlassCard } from "../ui/glass-card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { AlertOctagon, AlertTriangle, CheckCircle } from "lucide-react";

interface FiberIssue {
  id: number;
  type: "critical" | "warning" | "info";
  message: string;
  location: string;
  timestamp: string;
}

interface FiberAnalysisCardProps {
  signalData: { time: string; value: number }[];
  issues: FiberIssue[];
}

export const FiberAnalysisCard: React.FC<FiberAnalysisCardProps> = ({ signalData, issues }) => {
  // تحليل المشاكل وعرضها بتنسيق مناسب
  const renderIssueIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertOctagon className="text-red-500" size={16} />;
      case "warning":
        return <AlertTriangle className="text-amber-500" size={16} />;
      default:
        return <CheckCircle className="text-green-500" size={16} />;
    }
  };

  return (
    <GlassCard className="lg:col-span-2 animate-fade-in p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-medium font-tajawal">تحليل الألياف الضوئية</h3>
        <p className="text-sm text-muted-foreground font-tajawal">جودة الإشارة وتشخيص المشاكل</p>
      </div>
      
      <div className="p-4">
        <div className="h-[200px] w-full">
          <ChartContainer 
            config={{
              signal: { 
                label: "إشارة الألياف",
                theme: { light: "#3B82F6", dark: "#60A5FA" }
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={signalData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="signal"
                  stroke="var(--color-signal)"
                  strokeWidth={2}
                  dot={false}
                  animationDuration={500}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2 font-tajawal">تشخيص الحالة</h4>
          <div className="space-y-2 max-h-[160px] overflow-y-auto">
            {issues.length > 0 ? (
              issues.map((issue) => (
                <div 
                  key={issue.id} 
                  className={`flex items-start p-2 rounded-md ${
                    issue.type === "critical" ? "bg-red-50" : 
                    issue.type === "warning" ? "bg-amber-50" : "bg-green-50"
                  }`}
                >
                  <div className="mt-0.5 mr-2">
                    {renderIssueIcon(issue.type)}
                  </div>
                  <div>
                    <p className="text-sm font-medium font-tajawal">{issue.message}</p>
                    <p className="text-xs text-muted-foreground font-tajawal">
                      {issue.location} • {issue.timestamp}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4">
                <p className="text-sm text-muted-foreground font-tajawal">لا توجد مشاكل حالية</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

// مكون مخصص لعرض توليتيب (Tooltip) مخصص للرسم البياني
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm text-xs">
        <p className="font-medium">{`${payload[0].payload.time}`}</p>
        <p className="text-blue-500">{`قيمة الإشارة: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}
