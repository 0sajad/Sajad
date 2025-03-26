
import React from "react";
import { Code, Cpu, Network, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function AppLogo({ size = 'md', showText = true, className }: AppLogoProps) {
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
        "relative flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg"
      )}>
        {/* Central CPU Icon */}
        <Cpu className="absolute text-white w-1/2 h-1/2 z-20" />
        
        {/* Rotating Border Elements */}
        <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-spin-slow opacity-70"></div>
        
        {/* Background Elements */}
        <Code className="absolute text-amber-200 opacity-20 w-3/4 h-3/4 top-1 left-1" />
        <Network className="absolute text-amber-200 opacity-20 w-3/4 h-3/4 bottom-1 right-1" />
        <Shield className="absolute text-amber-200 opacity-20 w-3/4 h-3/4 top-1 right-1" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-amber-500 blur-sm opacity-30"></div>
      </div>
      
      {showText && (
        <div className={cn("font-bold bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent", textSizes[size])}>
          OCTA-GRAM
        </div>
      )}
    </div>
  );
}
