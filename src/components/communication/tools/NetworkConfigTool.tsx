
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, HelpCircle, Wifi } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function NetworkConfigTool() {
  const { t } = useTranslation("communicationTools");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const analyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            <CardTitle>{t("tools.networkConfigAnalyzer.name")}</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-md">
                <p>{t("tools.networkConfigAnalyzer.description")}</p>
                <p className="mt-2 text-xs">{t("tools.networkConfigAnalyzer.howToUse")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>{t("tools.networkConfigAnalyzer.description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button 
              onClick={analyze} 
              disabled={isAnalyzing} 
              className="w-full sm:w-auto"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  {t("analyzing", "Analyzing...")}
                </>
              ) : (
                <>
                  {showResults ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      {t("tools.networkConfigAnalyzer.refresh")}
                    </>
                  ) : (
                    t("tools.networkConfigAnalyzer.analyze")
                  )}
                </>
              )}
            </Button>
          </div>
          
          {showResults && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">{t("tools.networkConfigAnalyzer.results.title")}</h3>
              
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">{t("tools.networkConfigAnalyzer.results.ipAddress")}</TableCell>
                    <TableCell>192.168.1.100</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("tools.networkConfigAnalyzer.results.subnetMask")}</TableCell>
                    <TableCell>255.255.255.0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("tools.networkConfigAnalyzer.results.gateway")}</TableCell>
                    <TableCell>192.168.1.1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("tools.networkConfigAnalyzer.results.dns")}</TableCell>
                    <TableCell>8.8.8.8, 8.8.4.4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("tools.networkConfigAnalyzer.results.macAddress")}</TableCell>
                    <TableCell>AA:BB:CC:DD:EE:FF</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">{t("tools.networkConfigAnalyzer.results.connectionType")}</TableCell>
                    <TableCell>Wi-Fi</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/40 px-6 py-4">
        <div className="text-sm text-muted-foreground">
          <strong>{t("tip", "Tip")}:</strong> {t("tools.networkConfigAnalyzer.tips")}
        </div>
      </CardFooter>
    </Card>
  );
}
