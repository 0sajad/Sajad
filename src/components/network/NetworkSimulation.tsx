
import React from "react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useSimulation } from "@/hooks/useSimulation";
import { SimulationControls } from "./simulation/SimulationControls";
import { SimulationActionButtons } from "./simulation/SimulationActionButtons";
import { SimulationLogs } from "./simulation/SimulationLogs";
import { SimulationHeader } from "./simulation/SimulationHeader";
import { SimulationProgress } from "./simulation/SimulationProgress";

export const NetworkSimulation = () => {
  const { t } = useTranslation();
  const {
    isRunning,
    protocol,
    setProtocol,
    packetLoss,
    setPacketLoss,
    latency,
    setLatency,
    bandwidth,
    setBandwidth,
    progress,
    logs,
    startSimulation,
    stopSimulation,
    resetSimulation
  } = useSimulation();
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <SimulationHeader />
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <SimulationProgress isRunning={isRunning} progress={progress} />
          
          <SimulationControls 
            protocol={protocol}
            setProtocol={setProtocol}
            packetLoss={packetLoss}
            setPacketLoss={setPacketLoss}
            latency={latency}
            setLatency={setLatency}
            bandwidth={bandwidth}
            setBandwidth={setBandwidth}
            isRunning={isRunning}
          />
          
          <SimulationActionButtons 
            isRunning={isRunning}
            progress={progress}
            logs={logs}
            startSimulation={startSimulation}
            stopSimulation={stopSimulation}
            resetSimulation={resetSimulation}
          />
        </div>
        
        <div className="md:col-span-1">
          <SimulationLogs logs={logs} />
        </div>
      </div>
    </GlassCard>
  );
};
