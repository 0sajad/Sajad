
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useTranslation } from "react-i18next";
import { SimulationHeader } from "@/components/network/simulation/SimulationHeader";
import { SimulationControls } from "@/components/network/simulation/SimulationControls";
import { SimulationProgress } from "@/components/network/simulation/SimulationProgress";
import { SimulationLogs } from "@/components/network/simulation/SimulationLogs";
import { SimulationActionButtons } from "@/components/network/simulation/SimulationActionButtons";
import { Card, CardContent } from "@/components/ui/card";

const Simulation = () => {
  const { t } = useTranslation();
  const [protocol, setProtocol] = useState('tcp-ip');
  const [packetLoss, setPacketLoss] = useState(5);
  const [latency, setLatency] = useState(20);
  const [bandwidth, setBandwidth] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);
  
  const startSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    setLogs([
      { id: Date.now(), message: "Initializing simulation environment...", type: "info" }
    ]);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setLogs(prevLogs => [
            ...prevLogs,
            { id: Date.now(), message: "Simulation completed successfully", type: "success" }
          ]);
          return 100;
        }
        
        // Add some simulation logs
        if (newProgress === 30) {
          setLogs(prevLogs => [
            ...prevLogs,
            { id: Date.now(), message: "Network packets initialized", type: "info" }
          ]);
        } else if (newProgress === 50) {
          setLogs(prevLogs => [
            ...prevLogs,
            { id: Date.now(), message: "Processing data transfer simulations", type: "info" }
          ]);
        } else if (newProgress === 70) {
          setLogs(prevLogs => [
            ...prevLogs,
            { id: Date.now(), message: "Analyzing network performance metrics", type: "info" }
          ]);
        }
        
        return newProgress;
      });
    }, 1000);
  };
  
  const stopSimulation = () => {
    setIsRunning(false);
    setLogs(prevLogs => [
      ...prevLogs,
      { id: Date.now(), message: "Simulation stopped by user", type: "error" }
    ]);
  };
  
  const resetSimulation = () => {
    setProgress(0);
    setLogs([]);
  };
  
  return (
    <div className="container mx-auto p-6 pb-20">
      <Header />
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4 font-tajawal">{t('networkTools.simulationSystems')}</h1>
        <p className="text-muted-foreground">{t('networkTools.dataTransmission')}</p>
      </div>
      
      <Card>
        <SimulationHeader />
        <CardContent className="space-y-6 pt-6">
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
          
          <SimulationProgress isRunning={isRunning} progress={progress} />
          
          <SimulationLogs logs={logs} />
          
          <div className="mt-6">
            <SimulationActionButtons 
              isRunning={isRunning}
              progress={progress}
              logs={logs}
              startSimulation={startSimulation}
              stopSimulation={stopSimulation}
              resetSimulation={resetSimulation}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulation;
