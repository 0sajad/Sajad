
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { HelpCircle, Scan } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function PortScannerTool() {
  const { t } = useTranslation("communicationTools");
  const [target, setTarget] = useState("");
  const [portRange, setPortRange] = useState("common");
  const [customPorts, setCustomPorts] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const startScan = () => {
    if (!target) return;
    setIsRunning(true);
    // Simulate scan
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scan className="h-5 w-5 text-primary" />
            <CardTitle>{t("tools.portScanner.name")}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{t("tools.portScanner.description")}</p>
                <p className="mt-2 text-xs">{t("tools.portScanner.howToUse")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{t("tools.portScanner.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder={t("tools.portScanner.inputPlaceholder")}
              disabled={isRunning}
            />
          </div>
          
          <div className="space-y-3">
            <label className="text-sm text-muted-foreground mb-1 block">
              {t("tools.portScanner.portRange")}
            </label>
            <RadioGroup value={portRange} onValueChange={setPortRange} disabled={isRunning}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="common" id="common" />
                <Label htmlFor="common">{t("tools.portScanner.commonPorts")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">{t("tools.portScanner.customPorts")}</Label>
              </div>
            </RadioGroup>
          </div>
          
          {portRange === "custom" && (
            <div>
              <Input
                value={customPorts}
                onChange={(e) => setCustomPorts(e.target.value)}
                placeholder={t("tools.portScanner.specificPorts")}
                disabled={isRunning}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t("example", "Example")}: 80, 443, 8080, 8443
              </p>
            </div>
          )}
          
          <Button onClick={startScan} disabled={!target || isRunning} className="w-full">
            {isRunning ? t("scanning", "Scanning...") : t("tools.portScanner.startScan")}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/40 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          <strong>{t("tip", "Tip")}:</strong> {t("tools.portScanner.tips")}
        </div>
      </CardFooter>
    </Card>
  );
}
