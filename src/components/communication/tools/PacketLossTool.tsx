
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, Package } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";

export function PacketLossTool() {
  const { t } = useTranslation("communicationTools");
  const [target, setTarget] = useState("");
  const [packetCount, setPacketCount] = useState(100);
  const [isRunning, setIsRunning] = useState(false);

  const startTest = () => {
    if (!target) return;
    setIsRunning(true);
    // Simulate test
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
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
