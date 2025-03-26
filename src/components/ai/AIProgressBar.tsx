
import React from "react";
import { Progress } from "../ui/progress";

interface AIProgressBarProps {
  progress: number;
  status: "learning" | "processing" | "idle" | "protecting" | "analyzing" | "optimizing";
}

export function AIProgressBar({ progress, status }: AIProgressBarProps) {
  const getStatusColor = () => {
    switch (status) {
      case "learning": return "bg-amber-500";
      case "processing": return "bg-blue-500";
      case "protecting": return "bg-red-500";
      case "analyzing": return "bg-cyan-500";
      case "optimizing": return "bg-green-500";
      default: return "bg-green-500";
    }
  };
  
  return (
    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden mb-2">
      <Progress value={progress} className={`h-full rounded-full ${getStatusColor()}`} />
    </div>
  );
}
