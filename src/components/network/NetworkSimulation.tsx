
import React, { useState, useEffect } from "react";
import { GlassCard } from "../ui/glass-card";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Badge } from "../ui/badge";
import { Play, Pause, RotateCw, Save, XCircle, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "../ui/progress";
import { toast } from "../ui/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const NetworkSimulation = () => {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [protocol, setProtocol] = useState("tcp-ip");
  const [packetLoss, setPacketLoss] = useState(5);
  const [latency, setLatency] = useState(50);
  const [bandwidth, setBandwidth] = useState(100);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<{id: number; message: string; type: 'success' | 'error' | 'info'}[]>([]);
  
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
  }, [isRunning, packetLoss]);
  
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
  
  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={16} className="text-green-500" />;
      case 'error': return <XCircle size={16} className="text-red-500" />;
      default: return <AlertCircle size={16} className="text-blue-500" />;
    }
  };
  
  return (
    <GlassCard className="p-0 overflow-hidden">
      <div className="p-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="font-semibold">{t('networkTools.simulationSystems')}</h3>
        <p className="text-sm text-muted-foreground">{t('networkTools.dataTransmission')}</p>
      </div>
      
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="mb-2 flex justify-between items-center">
              <label className="text-sm font-medium">{t('networkTools.testEnvironment')}</label>
              <Badge variant={isRunning ? 'default' : 'secondary'}>
                {isRunning ? 'Running' : 'Ready'}
              </Badge>
            </div>
            <Progress value={progress} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium block mb-2">{t('networkTools.simulationSystems')}</label>
              <Select value={protocol} onValueChange={setProtocol} disabled={isRunning}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tcp-ip">TCP/IP</SelectItem>
                  <SelectItem value="udp">UDP</SelectItem>
                  <SelectItem value="http">HTTP</SelectItem>
                  <SelectItem value="voip">VoIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Packet Loss (%)</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Slider 
                        value={[packetLoss]} 
                        onValueChange={(value) => setPacketLoss(value[0])} 
                        min={0} 
                        max={30} 
                        step={1}
                        disabled={isRunning}
                      />
                      <p className="text-center text-sm mt-1">{packetLoss}%</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Simulated packet loss percentage</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Latency (ms)</label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Slider 
                        value={[latency]} 
                        onValueChange={(value) => setLatency(value[0])} 
                        min={0} 
                        max={200} 
                        step={5}
                        disabled={isRunning}
                      />
                      <p className="text-center text-sm mt-1">{latency} ms</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Simulated network latency</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="flex justify-between gap-2 mb-6">
            <div className="w-full">
              <label className="text-sm font-medium block mb-2">Bandwidth (Mbps)</label>
              <Slider 
                value={[bandwidth]} 
                onValueChange={(value) => setBandwidth(value[0])} 
                min={10} 
                max={1000} 
                step={10}
                disabled={isRunning}
              />
              <p className="text-center text-sm mt-1">{bandwidth} Mbps</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={startSimulation} className="flex-1">
                <Play size={16} className="mr-2" />
                {t('networkTools.testEnvironment')}
              </Button>
            ) : (
              <Button onClick={stopSimulation} variant="destructive" className="flex-1">
                <Pause size={16} className="mr-2" />
                {t('networkTools.networkTroubleshooting')}
              </Button>
            )}
            <Button variant="outline" onClick={resetSimulation} disabled={isRunning && progress < 100}>
              <RotateCw size={16} className="mr-2" />
              Reset
            </Button>
            <Button variant="outline" disabled={logs.length === 0}>
              <Save size={16} className="mr-2" />
              {t('footer.documentation')}
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <h4 className="text-sm font-medium mb-2">{t('networkTools.testEnvironment')}</h4>
          <div className="h-[300px] overflow-y-auto bg-gray-50 dark:bg-gray-900 p-2 rounded-md">
            {logs.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm p-4">
                {t('networkTools.simulationSystems')}
              </p>
            ) : (
              logs.map(log => (
                <div key={log.id} className="flex gap-2 items-start mb-2 text-sm">
                  <div className="mt-0.5">{getLogIcon(log.type)}</div>
                  <div>{log.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
