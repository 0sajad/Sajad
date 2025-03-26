
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Zap, HelpCircle, Activity } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PingTestTool() {
  const { t } = useTranslation("communicationTools");
  const [target, setTarget] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    avgResponse: number;
    minResponse: number;
    maxResponse: number;
    packetLoss: number;
    jitter: number;
    stability: number;
  } | null>(null);

  const startTest = () => {
    if (!target) return;
    
    setIsRunning(true);
    setProgress(0);
    setResults(null);
    
    // Simulate ping test progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          // Simulate results
          setResults({
            avgResponse: Math.floor(Math.random() * 50) + 10,
            minResponse: Math.floor(Math.random() * 20) + 5,
            maxResponse: Math.floor(Math.random() * 100) + 50,
            packetLoss: Math.random() * 2,
            jitter: Math.floor(Math.random() * 10) + 1,
            stability: Math.floor(Math.random() * 30) + 70,
          });
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

  const stopTest = () => {
    setIsRunning(false);
  };

  const getQualityColor = (value: number, isInverted = false) => {
    // For metrics where lower is better (response time, jitter, packet loss)
    if (!isInverted) {
      if (value < 30) return "text-green-600";
      if (value < 60) return "text-yellow-600";
      return "text-red-600";
    } 
    // For metrics where higher is better (stability)
    else {
      if (value > 90) return "text-green-600";
      if (value > 70) return "text-yellow-600";
      return "text-red-600";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle>{t("tools.pingTest.name")}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{t("tools.pingTest.description")}</p>
                <p className="mt-2 text-xs">{t("tools.pingTest.howToUse")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{t("tools.pingTest.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={t("tools.pingTest.inputPlaceholder")}
              disabled={isRunning}
              className="flex-1"
            />
            {isRunning ? (
              <Button variant="destructive" onClick={stopTest}>
                {t("tools.pingTest.stop")}
              </Button>
            ) : (
              <Button onClick={startTest} disabled={!target}>
                <Zap className="h-4 w-4 mr-2" />
                {t("tools.pingTest.start")}
              </Button>
            )}
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{progress}%</span>
                <span>{Math.round(progress / 10)} / 10 {t("packets", "packets")}</span>
              </div>
              <Progress value={progress} />
            </div>
          )}

          {results && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg">{t("tools.pingTest.results.title")}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">{t("tools.pingTest.results.avgResponse")}</div>
                  <div className={`text-xl font-semibold ${getQualityColor(results.avgResponse)}`}>
                    {results.avgResponse} ms
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">{t("tools.pingTest.results.packetLoss")}</div>
                  <div className={`text-xl font-semibold ${getQualityColor(results.packetLoss * 50)}`}>
                    {results.packetLoss.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">{t("tools.pingTest.results.minResponse")}</div>
                  <div className="text-xl font-semibold">
                    {results.minResponse} ms
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">{t("tools.pingTest.results.maxResponse")}</div>
                  <div className="text-xl font-semibold">
                    {results.maxResponse} ms
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">{t("tools.pingTest.results.jitter")}</div>
                  <div className={`text-xl font-semibold ${getQualityColor(results.jitter * 5)}`}>
                    {results.jitter} ms
                  </div>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">{t("tools.pingTest.results.stability")}</div>
                  <div className={`text-xl font-semibold ${getQualityColor(results.stability, true)}`}>
                    {results.stability}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/40 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          <strong>{t("tip", "Tip")}:</strong> {t("tools.pingTest.tips")}
        </div>
      </CardFooter>
    </Card>
  );
}
