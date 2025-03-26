
import React from "react";
import { Code, Cpu, Network, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  developerMode?: boolean;
}

export function AppLogo({ size = 'md', showText = true, className, developerMode = false }: AppLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };
  
  const textSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        sizeClasses[size],
        "relative flex items-center justify-center rounded-full shadow-lg",
        developerMode 
          ? "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600" 
          : "bg-gradient-to-br from-amber-400 to-amber-600"
      )}>
        {/* Central CPU Icon */}
        <Cpu className="absolute text-white w-1/2 h-1/2 z-20" />
        
        {/* Rotating Border Elements */}
        <div className={cn(
          "absolute inset-0 rounded-full border-2 animate-spin-slow",
          developerMode ? "border-amber-200 opacity-90" : "border-amber-300 opacity-70"
        )}></div>
        
        {/* Background Elements */}
        <Code className="absolute text-amber-200 opacity-20 w-3/4 h-3/4 top-1 left-1" />
        <Network className="absolute text-amber-200 opacity-20 w-3/4 h-3/4 bottom-1 right-1" />
        <Shield className="absolute text-amber-200 opacity-20 w-3/4 h-3/4 top-1 right-1" />
        
        {/* Developer Mode Special Effects */}
        {developerMode && (
          <>
            <div className="absolute inset-0 rounded-full bg-amber-300 blur-md opacity-20 animate-pulse"></div>
            <div className="absolute -inset-1 rounded-full border border-amber-200 opacity-40"></div>
          </>
        )}
        
        {/* Glow Effect */}
        <div className={cn(
          "absolute inset-0 rounded-full blur-sm",
          developerMode ? "bg-amber-400 opacity-40" : "bg-amber-500 opacity-30"
        )}></div>
      </div>
      
      {showText && (
        <div className={cn(
          "font-bold bg-clip-text text-transparent", 
          textSizes[size],
          developerMode 
            ? "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" 
            : "bg-gradient-to-r from-amber-500 to-amber-700"
        )}>
          OCTA-GRAM
          {developerMode && <span className="ml-1 text-xs align-top bg-amber-600 text-white px-1 py-0.5 rounded">DEV</span>}
        </div>
      )}
    </div>
  );
}
