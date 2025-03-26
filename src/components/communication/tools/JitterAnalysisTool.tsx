
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, Waves } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export function JitterAnalysisTool() {
  const { t } = useTranslation("communicationTools");
  const [server, setServer] = useState("auto");
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [results, setResults] = useState<{
    currentJitter: number;
    avgJitter: number;
    peakJitter: number;
    stability: number;
    quality: "excellent" | "good" | "fair" | "poor";
  } | null>(null);

  const servers = [
    { id: "auto", name: t("autoSelect", "Auto Select") },
    { id: "us-east", name: t("usEast", "US East") },
    { id: "us-west", name: t("usWest", "US West") },
    { id: "eu-central", name: t("euCentral", "EU Central") },
    { id: "asia-pacific", name: t("asiaPacific", "Asia Pacific") },
    { id: "middle-east", name: t("middleEast", "Middle East") }
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 1;
          if (newTime >= 20) {
            setIsRunning(false);
            // Simulate test completion after 20 seconds
            generateResults();
          }
          return newTime;
        });
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);

  const startAnalysis = () => {
    setIsRunning(true);
    setResults(null);
  };

  const stopAnalysis = () => {
    setIsRunning(false);
    generateResults();
  };

  const generateResults = () => {
    // Simulate results
    const currentJitter = Math.random() * 12;
    const avgJitter = Math.random() * 10;
    const peakJitter = avgJitter + Math.random() * 15;
    const stability = 100 - (avgJitter * 6);
    
    let quality: "excellent" | "good" | "fair" | "poor" = "poor";
    if (avgJitter < 3) quality = "excellent";
    else if (avgJitter < 5) quality = "good";
    else if (avgJitter < 8) quality = "fair";
    
    setResults({
      currentJitter,
      avgJitter,
      peakJitter,
      stability: Math.max(0, Math.min(100, stability)),
      quality
    });
  };

  const getQualityColor = (jitter: number) => {
    if (jitter < 3) return "text-green-600";
    if (jitter < 5) return "text-blue-600";
    if (jitter < 8) return "text-yellow-600";
    return "text-red-600";
  };

  const getQualityBadge = (quality: "excellent" | "good" | "fair" | "poor") => {
    switch (quality) {
      case "excellent":
        return <Badge className="bg-green-600">{t("excellent", "Excellent")}</Badge>;
      case "good":
        return <Badge className="bg-blue-600">{t("good", "Good")}</Badge>;
      case "fair":
        return <Badge className="bg-yellow-600">{t("fair", "Fair")}</Badge>;
      case "poor":
        return <Badge className="bg-red-600">{t("poor", "Poor")}</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-primary" />
            <CardTitle>{t("tools.jitterAnalysis.name")}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{t("tools.jitterAnalysis.description")}</p>
                <p className="mt-2 text-xs">{t("tools.jitterAnalysis.howToUse")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{t("tools.jitterAnalysis.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-1 block">
                {t("tools.jitterAnalysis.serverSelection")}
              </label>
              <Select value={server} onValueChange={setServer} disabled={isRunning}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectServer", "Select Server")} />
                </SelectTrigger>
                <SelectContent>
                  {servers.map(s => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {isRunning ? (
              <Button variant="destructive" onClick={stopAnalysis} className="mt-auto">
                {t("tools.jitterAnalysis.stopAnalysis")}
              </Button>
            ) : (
              <Button onClick={startAnalysis} className="mt-auto">
                {t("tools.jitterAnalysis.startAnalysis")}
              </Button>
            )}
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t("testing", "Testing")}...</span>
                <span>{elapsedTime}s / 20s</span>
              </div>
              <Progress value={(elapsedTime / 20) * 100} />
              
              <div className="mt-4 p-3 border rounded-md animate-pulse bg-muted/40">
                <div className="text-sm text-muted-foreground mb-1">
                  {t("tools.jitterAnalysis.results.currentJitter")}
                </div>
                <div className="text-xl font-semibold">
                  {(Math.random() * 10).toFixed(2)} ms
                </div>
              </div>
            </div>
          )}

          {results && (
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-lg">{t("tools.jitterAnalysis.results.title")}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">
                    {t("tools.jitterAnalysis.results.avgJitter")}
                  </div>
                  <div className={`text-xl font-semibold ${getQualityColor(results.avgJitter)}`}>
                    {results.avgJitter.toFixed(2)} ms
                  </div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">
                    {t("tools.jitterAnalysis.results.peakJitter")}
                  </div>
                  <div className="text-xl font-semibold">
                    {results.peakJitter.toFixed(2)} ms
                  </div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">
                    {t("tools.jitterAnalysis.results.stability")}
                  </div>
                  <div className="text-xl font-semibold">
                    {results.stability.toFixed(1)}%
                  </div>
                </div>
                
                <div className="bg-muted/50 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground">
                    {t("tools.jitterAnalysis.results.quality")}
                  </div>
                  <div className="flex mt-1">
                    {getQualityBadge(results.quality)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/40 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          <strong>{t("tip", "Tip")}:</strong> {t("tools.jitterAnalysis.tips")}
        </div>
      </CardFooter>
    </Card>
  );
}
