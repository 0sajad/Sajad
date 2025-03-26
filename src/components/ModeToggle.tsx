
import React from "react";
import { cn } from "@/lib/utils";
import { Code, User, Check, RefreshCw } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { Button } from "./ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger 
} from "./ui/tooltip";

export function ModeToggle() {
  const { 
    mode, 
    setMode, 
    isDeveloperMode, 
    applyConfiguration, 
    isSyncing 
  } = useMode();

  const handleToggle = () => {
    setMode(isDeveloperMode ? "client" : "developer");
  };

  return (
    <div className="flex items-center gap-3">
      {isDeveloperMode && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              size="sm" 
              variant="outline" 
              className="h-[36px] bg-green-50 text-green-600 hover:bg-green-100"
              onClick={applyConfiguration}
              disabled={isSyncing}
            >
              {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
              <span className="text-xs">تطبيق</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>تطبيق التغييرات على وضع العميل</p>
          </TooltipContent>
        </Tooltip>
      )}
      
      <div 
        onClick={handleToggle}
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
          <span className="text-[10px]">عميل</span>
        </div>
        
        <div className={cn(
          "flex-1 flex items-center justify-center z-10 text-xs font-medium transition-colors duration-300",
          isDeveloperMode ? "text-white" : "text-gray-500"
        )}>
          <Code size={16} className="mr-1" />
          <span className="text-[10px]">مطور</span>
        </div>
      </div>
    </div>
  );
}
