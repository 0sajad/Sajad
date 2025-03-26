
import React from "react";
import { cn } from "@/lib/utils";
import { Code, User, Check, RefreshCw } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { Button } from "./ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
    <TooltipProvider>
      <div className="flex items-center gap-6 rtl:flex-row-reverse">
        {isDeveloperMode && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                variant="gradient" 
                className="h-[38px] shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transform hover:translate-y-[-3px] transition-all duration-300"
                onClick={applyConfiguration}
                disabled={isSyncing}
              >
                {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                <span className="text-xs">تطبيق</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-gradient-to-r from-green-500/90 to-green-600/90 text-white border-0 shadow-lg">
              <p>تطبيق التغييرات على وضع العميل</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        <div 
          onClick={handleToggle}
          className={cn(
            "relative flex items-center w-[100px] h-[40px] rounded-full p-1 transition-colors duration-300 cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 border border-white/20 backdrop-blur-sm overflow-hidden",
            isDeveloperMode 
              ? "bg-gradient-to-r from-amber-500 to-orange-600" 
              : "bg-gradient-to-r from-amber-500 to-orange-600"
          )}
        >
          {/* Sliding background */}
          <div 
            className={cn(
              "absolute inset-y-1 w-[48px] bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform duration-300",
              isDeveloperMode ? "translate-x-[32px]" : "translate-x-0"
            )}
          />
          
          {/* Icons and labels container - always maintains consistent layout */}
          <div className="relative flex w-full z-10">
            <div className={cn(
              "flex-1 flex items-center justify-center z-10 text-xs font-medium transition-colors duration-300",
              isDeveloperMode ? "text-white/60" : "text-octaBlue-600 dark:text-white"
            )}>
              <User size={16} className="mr-1" />
              <span className="text-[10px]">عميل</span>
            </div>
            
            <div className={cn(
              "flex-1 flex items-center justify-center z-10 text-xs font-medium transition-colors duration-300",
              isDeveloperMode ? "text-white" : "text-gray-500 dark:text-gray-400"
            )}>
              <Code size={16} className="mr-1" />
              <span className="text-[10px]">مطور</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
