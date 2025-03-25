
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Code, User, Check } from "lucide-react";

export function ModeToggle() {
  const [isDeveloperMode, setIsDeveloperMode] = useState(false);

  return (
    <div 
      onClick={() => setIsDeveloperMode(!isDeveloperMode)}
      className={cn(
        "relative flex items-center w-[90px] h-[36px] rounded-full p-1 transition-colors duration-300 cursor-pointer",
        isDeveloperMode ? "bg-octaBlue-600" : "bg-gray-200"
      )}
    >
      {/* Sliding background */}
      <div 
        className={cn(
          "absolute inset-y-1 w-[44px] bg-white rounded-full shadow-sm transform transition-transform duration-300",
          isDeveloperMode ? "translate-x-[44px]" : "translate-x-0"
        )}
      />
      
      {/* Icons */}
      <div className={cn(
        "flex-1 flex items-center justify-center z-10 text-xs font-medium transition-colors duration-300",
        isDeveloperMode ? "text-white/60" : "text-octaBlue-600"
      )}>
        <User size={16} className="mr-1" />
        <span className="text-[10px]">Client</span>
      </div>
      
      <div className={cn(
        "flex-1 flex items-center justify-center z-10 text-xs font-medium transition-colors duration-300",
        isDeveloperMode ? "text-white" : "text-gray-500"
      )}>
        <Code size={16} className="mr-1" />
        <span className="text-[10px]">Dev</span>
      </div>
    </div>
  );
}
