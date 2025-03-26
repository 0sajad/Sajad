
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

interface SimulationControlsProps {
  protocol: string;
  setProtocol: (value: string) => void;
  packetLoss: number;
  setPacketLoss: (value: number) => void;
  latency: number;
  setLatency: (value: number) => void;
  bandwidth: number;
  setBandwidth: (value: number) => void;
  isRunning: boolean;
}

export const SimulationControls = ({
  protocol,
  setProtocol,
  packetLoss,
  setPacketLoss,
  latency,
  setLatency,
  bandwidth,
  setBandwidth,
  isRunning
}: SimulationControlsProps) => {
  const { t } = useTranslation();

  return (
    <TooltipProvider>
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
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-2">Latency (ms)</label>
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
    </TooltipProvider>
  );
};
