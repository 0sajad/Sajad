
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, Package } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

export function PacketLossTool() {
  const { t } = useTranslation("communicationTools");
  const [target, setTarget] = useState("");
  const [packetCount, setPacketCount] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{loss: number; sent: number; received: number} | null>(null);

  const startTest = () => {
    if (!target) return;
    setIsRunning(true);
    setProgress(0);
    setResult(null);
    
    // Simulate test with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          // Generate simulated result
          const lossPercent = Math.random() * 5;
          const sent = packetCount;
          const received = Math.round(packetCount * (100 - lossPercent) / 100);
          setResult({
            loss: parseFloat(lossPercent.toFixed(2)),
            sent,
            received
          });
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <CardTitle>{t("tools.packetLossTest.name")}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{t("tools.packetLossTest.description")}</p>
                <p className="mt-2 text-xs">{t("tools.packetLossTest.howToUse")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{t("tools.packetLossTest.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-4">
            <div>
              <Input
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={t("tools.packetLossTest.inputPlaceholder")}
                disabled={isRunning}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground mb-1 block">
                {t("tools.packetLossTest.packetCount")}: {packetCount}
              </label>
              <Slider
                value={[packetCount]}
                onValueChange={(value) => setPacketCount(value[0])}
                min={10}
                max={1000}
                step={10}
                disabled={isRunning}
              />
            </div>
            
            {isRunning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Testing...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
            
            {result && (
              <div className="bg-muted/50 p-3 rounded-md space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Packets sent:</span>
                  <span className="text-sm">{result.sent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Packets received:</span>
                  <span className="text-sm">{result.received}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Packet loss:</span>
                  <span className={`text-sm ${result.loss > 2 ? 'text-red-500' : 'text-green-500'}`}>
                    {result.loss}%
                  </span>
                </div>
              </div>
            )}
            
            <Button onClick={startTest} disabled={!target || isRunning} className="w-full">
              {isRunning ? t("testing", "Testing...") : t("tools.packetLossTest.startTest")}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/40 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          <strong>{t("tip", "Tip")}:</strong> {t("tools.packetLossTest.tips")}
        </div>
      </CardFooter>
    </Card>
  );
}
