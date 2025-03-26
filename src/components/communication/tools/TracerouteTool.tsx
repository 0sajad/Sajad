
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { HelpCircle, Route } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function TracerouteTool() {
  const { t } = useTranslation("communicationTools");
  const [target, setTarget] = useState("");
  const [maxHops, setMaxHops] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  const startTrace = () => {
    if (!target) return;
    setIsRunning(true);
    // Simulate trace
    setTimeout(() => {
      setIsRunning(false);
    }, 5000);
  };

  const stopTrace = () => {
    setIsRunning(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Route className="h-5 w-5 text-primary" />
            <CardTitle>{t("tools.traceroute.name")}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{t("tools.traceroute.description")}</p>
                <p className="mt-2 text-xs">{t("tools.traceroute.howToUse")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{t("tools.traceroute.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={t("tools.traceroute.inputPlaceholder")}
              disabled={isRunning}
              className="flex-1"
            />
            {isRunning ? (
              <Button variant="destructive" onClick={stopTrace}>
                {t("tools.traceroute.stopTrace")}
              </Button>
            ) : (
              <Button onClick={startTrace} disabled={!target}>
                {t("tools.traceroute.startTrace")}
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground mb-1 block">
              {t("tools.traceroute.maxHops")}: {maxHops}
            </label>
            <Slider
              value={[maxHops]}
              onValueChange={(value) => setMaxHops(value[0])}
              min={5}
              max={50}
              step={1}
              disabled={isRunning}
            />
          </div>
          
          {isRunning && (
            <div className="p-4 border rounded-md">
              <p className="text-center animate-pulse">{t("tracing", "Tracing route...")} {target}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/40 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          <strong>{t("tip", "Tip")}:</strong> {t("tools.traceroute.tips")}
        </div>
      </CardFooter>
    </Card>
  );
}
