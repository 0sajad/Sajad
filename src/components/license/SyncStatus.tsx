
import React, { useState, useEffect } from "react";
import { Cloud, CloudOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMode } from "@/context/ModeContext";

interface SyncStatusProps {
  syncStatus: "offline" | "syncing" | "synced";
  lastSyncTime: string | null;
  autoSyncEnabled: boolean;
  toggleAutoSync: () => void;
  syncNow: () => void;
}

export function SyncStatus({ 
  syncStatus, 
  lastSyncTime, 
  autoSyncEnabled, 
  toggleAutoSync, 
  syncNow 
}: SyncStatusProps) {
  const { isSyncing } = useMode();
  
  return (
    <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-md border">
      <div className="flex items-center gap-2">
        {syncStatus === "offline" ? (
          <CloudOff className="h-5 w-5 text-gray-500" />
        ) : syncStatus === "syncing" ? (
          <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />
        ) : (
          <Cloud className="h-5 w-5 text-green-500" />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {syncStatus === "offline" ? "غير متزامن" : syncStatus === "syncing" ? "جارٍ المزامنة..." : "متزامن"}
          </span>
          {lastSyncTime && syncStatus === "synced" && (
            <span className="text-xs text-muted-foreground">آخر مزامنة: {lastSyncTime}</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">مزامنة تلقائية</span>
          <div
            className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              autoSyncEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
            onClick={toggleAutoSync}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                autoSyncEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </div>
        </div>
        <Button 
          size="sm" 
          onClick={syncNow} 
          disabled={syncStatus === "syncing" || isSyncing}
          className="ml-2 h-8"
        >
          {syncStatus === "syncing" ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <RefreshCw className="h-3 w-3 mr-1" />
              <span className="text-xs">تزامن الآن</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
