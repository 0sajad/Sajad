
import React from "react";
import { Progress } from "@/components/ui/progress";

export const SystemHealthAssessment = () => {
  return (
    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h3 className="text-md font-medium mb-3">System Health Assessment</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Overall Health</span>
            <span className="text-sm font-medium">91%</span>
          </div>
          <Progress value={91} className="h-2 bg-blue-100" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Resource Efficiency</span>
            <span className="text-sm font-medium">88%</span>
          </div>
          <Progress value={88} className="h-2 bg-green-100" />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Thermal Management</span>
            <span className="text-sm font-medium">95%</span>
          </div>
          <Progress value={95} className="h-2 bg-amber-100" />
        </div>
      </div>
    </div>
  );
};
