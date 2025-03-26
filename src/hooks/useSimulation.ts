
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";

export interface SimulationLog {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export function useSimulation() {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [protocol, setProtocol] = useState("tcp-ip");
  const [packetLoss, setPacketLoss] = useState(5);
  const [latency, setLatency] = useState(50);
  const [bandwidth, setBandwidth] = useState(100);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsRunning(false);
            toast({
              title: t('networkTools.simulationSystems'),
              description: t('networkTools.dataTransmission')
            });
            return 100;
          }
          
          // Add log entries as simulation progresses
          if (prev % 20 === 0) {
            addLog('info', `${t('networkTools.dataTransmission')} ${prev}%`);
          }
          
          // Simulate random packet loss
          if (Math.random() * 100 < packetLoss && prev > 10) {
            addLog('error', `${t('networkTools.networkTroubleshooting')} ${Math.floor(Math.random() * 1000)}`);
          } else if (prev % 30 === 0) {
            addLog('success', `${t('networkTools.testEnvironment')} ${Math.floor(Math.random() * 100)}ms`);
          }
          
          return prev + 1;
        });
      }, 50);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, packetLoss, t]);
  
  const startSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    setLogs([]);
    addLog('info', `${t('networkTools.testEnvironment')} ${protocol.toUpperCase()}`);
    toast({
      title: t('networkTools.simulationSystems'),
      description: t('networkTools.testEnvironment')
    });
  };
  
  const stopSimulation = () => {
    setIsRunning(false);
    addLog('error', t('networkTools.networkTroubleshooting'));
  };
  
  const resetSimulation = () => {
    setIsRunning(false);
    setProgress(0);
    setLogs([]);
  };
  
  const addLog = (type: 'success' | 'error' | 'info', message: string) => {
    setLogs(prev => [{ id: Date.now(), message, type }, ...prev].slice(0, 50));
  };

  return {
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
  };
}
