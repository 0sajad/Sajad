
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Activity, Zap, Server, Globe, Network } from "lucide-react";

import { PingTestTool } from "./tools/PingTestTool";
import { JitterAnalysisTool } from "./tools/JitterAnalysisTool";
import { PacketLossTool } from "./tools/PacketLossTool";
import { PortScannerTool } from "./tools/PortScannerTool";
import { DnsLookupTool } from "./tools/DnsLookupTool";
import { TracerouteTool } from "./tools/TracerouteTool";
import { NetworkConfigTool } from "./tools/NetworkConfigTool";

export function CommunicationTools() {
  const { t } = useTranslation("communicationTools");
  const [activeCategory, setActiveCategory] = useState("networkAnalysis");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for tools:", searchQuery);
    // Implement search functionality
  };

  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
      </div>

      <div className="max-w-3xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("title")}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            {t("search", "Search")}
          </Button>
        </form>
      </div>

      <Tabs 
        value={activeCategory} 
        onValueChange={setActiveCategory} 
        className="max-w-5xl mx-auto"
      >
        <div className="bg-background sticky top-16 z-10 pt-4 pb-2">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="networkAnalysis">
              <Activity className="h-4 w-4 mr-2" />
              {t("categories.networkAnalysis")}
            </TabsTrigger>
            <TabsTrigger value="connectionTesting">
              <Zap className="h-4 w-4 mr-2" />
              {t("categories.connectionTesting")}
            </TabsTrigger>
            <TabsTrigger value="portServices">
              <Server className="h-4 w-4 mr-2" />
              {t("categories.portServices")}
            </TabsTrigger>
            <TabsTrigger value="configurationTools">
              <Network className="h-4 w-4 mr-2" />
              {t("categories.configurationTools")}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="networkAnalysis" className="mt-0 space-y-6">
          <NetworkConfigTool />
          <Separator className="my-6" />
          <TracerouteTool />
        </TabsContent>

        <TabsContent value="connectionTesting" className="mt-0 space-y-6">
          <PingTestTool />
          <Separator className="my-6" />
          <JitterAnalysisTool />
          <Separator className="my-6" />
          <PacketLossTool />
        </TabsContent>

        <TabsContent value="portServices" className="mt-0 space-y-6">
          <PortScannerTool />
          <Separator className="my-6" />
          <DnsLookupTool />
        </TabsContent>

        <TabsContent value="configurationTools" className="mt-0 space-y-6">
          <NetworkConfigTool />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CommunicationTools;
