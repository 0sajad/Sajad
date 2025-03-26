
import React from "react";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20">
          <div className={cn(
            "absolute w-full h-full border-4 border-primary rounded-full",
            "animate-spin"
          )} />
          <div className={cn(
            "absolute w-full h-full border-4 border-transparent border-t-primary rounded-full",
            "animate-spin-slow"
          )} />
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">OCTA-GRAM</h2>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
