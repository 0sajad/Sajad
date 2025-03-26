
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Book, FileQuestion, PlayCircle, Code, ChevronRight, Network, ArrowRight, Phone, Wifi } from "lucide-react";

const HelpCenterMultiLang: React.FC = () => {
  const { t } = useTranslation("helpCenter");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
      </div>

      <div className="max-w-3xl mx-auto mb-10">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            {t("search", "Search")}
          </Button>
        </form>
      </div>

      <Tabs defaultValue="guides" className="max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="guides">
            <Book className="h-4 w-4 mr-2" />
            {t("guides")}
          </TabsTrigger>
          <TabsTrigger value="faq">
            <FileQuestion className="h-4 w-4 mr-2" />
            {t("faq")}
          </TabsTrigger>
          <TabsTrigger value="videos">
            <PlayCircle className="h-4 w-4 mr-2" />
            {t("videos")}
          </TabsTrigger>
          <TabsTrigger value="tools">
            <Network className="h-4 w-4 mr-2" />
            {t("tools", "Tools")}
          </TabsTrigger>
          <TabsTrigger value="developer">
            <Code className="h-4 w-4 mr-2" />
            {t("developerInfo")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("gettingStarted")}</CardTitle>
                <CardDescription>{t("gettingStartedDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("installationGuide")}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("firstTimeSetup")}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("basicNavigation")}</span>
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0">
                  {t("readFullGuide")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("aiAssistantDesc")}</CardTitle>
                <CardDescription>{t("aiAssistantDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("chatbotUsage")}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("fileAnalysis")}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("networkPredictions")}</span>
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0">
                  {t("readFullGuide")}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("communicationTools", "Communication Tools")}</CardTitle>
                <CardDescription>{t("communicationToolsDesc", "Learn how to use the various communication tools available in OCTA-GRAM.")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("connectionTestingTools", "Connection Testing Tools")}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("networkAnalysisTools", "Network Analysis Tools")}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("networkConfigurationTools", "Network Configuration Tools")}</span>
                  </li>
                </ul>
                <Link to="/communication-tools">
                  <Button variant="link" className="mt-4 p-0">
                    {t("exploreTools", "Explore Tools")}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("networkManagementDesc")}</CardTitle>
                <CardDescription>{t("networkManagementDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("deviceManagement")}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("troubleshooting")}</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{t("performanceOptimization")}</span>
                  </li>
                </ul>
                <Button variant="link" className="mt-4 p-0">
                  {t("readFullGuide")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>{t("frequentlyAskedQuestions")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>{t("faq1")}</AccordionTrigger>
                  <AccordionContent>{t("faq1Answer")}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>{t("faq2")}</AccordionTrigger>
                  <AccordionContent>{t("faq2Answer")}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>{t("faq3")}</AccordionTrigger>
                  <AccordionContent>{t("faq3Answer")}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>{t("faq4")}</AccordionTrigger>
                  <AccordionContent>{t("faq4Answer")}</AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>{t("faq5")}</AccordionTrigger>
                  <AccordionContent>{t("faq5Answer")}</AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>{t("communicationToolsFAQ", "How do I use the communication tools?")}</AccordionTrigger>
                  <AccordionContent>
                    {t("communicationToolsFAQAnswer", "OCTA-GRAM provides a variety of communication tools such as ping test, jitter analysis, packet loss test, port scanner, DNS lookup, traceroute, and network configuration analyzer. You can access these tools from the Communication Tools section in the main menu. Each tool has its own specific function to help you diagnose and improve your network connections.")}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("gettingStartedVideo")}</CardTitle>
                <CardDescription>{t("gettingStartedVideoDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  {t("viewAll")}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("aiAssistantVideo")}</CardTitle>
                <CardDescription>{t("aiAssistantVideoDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  {t("viewAll")}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("communicationToolsVideo", "Communication Tools Guide")}</CardTitle>
                <CardDescription>{t("communicationToolsVideoDesc", "Learn how to effectively use the communication and network analysis tools")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  {t("viewAll")}
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t("networkAnalysisVideo", "Network Analysis Tutorials")}</CardTitle>
                <CardDescription>{t("networkAnalysisVideoDesc", "Detailed walkthrough of network analysis features")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-muted-foreground opacity-50" />
                </div>
                <Button variant="outline" className="w-full mt-4">
                  {t("viewAll")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="tools">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("communicationTools", "Communication Tools")}</CardTitle>
                <CardDescription>{t("communicationToolsDesc", "A collection of tools to help you analyze and optimize your network connections")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-blue-500" />
                        {t("connectionTestingTools", "Connection Testing")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">
                        {t("connectionTestingDesc", "Tools to test and analyze your connection quality")}
                      </p>
                      <Link to="/communication-tools">
                        <Button size="sm" variant="outline" className="w-full">
                          {t("explore", "Explore")}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Network className="h-5 w-5 text-green-500" />
                        {t("networkAnalysisTools", "Network Analysis")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">
                        {t("networkAnalysisDesc", "Analyze network configuration and performance")}
                      </p>
                      <Link to="/communication-tools">
                        <Button size="sm" variant="outline" className="w-full">
                          {t("explore", "Explore")}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Phone className="h-5 w-5 text-purple-500" />
                        {t("advancedTools", "Advanced Tools")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-3">
                        {t("advancedToolsDesc", "Specialized tools for advanced network diagnostics")}
                      </p>
                      <Link to="/communication-tools">
                        <Button size="sm" variant="outline" className="w-full">
                          {t("explore", "Explore")}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            
            <Link to="/communication-tools">
              <Button className="w-full">
                {t("openCommunicationTools", "Open Communication Tools Dashboard")}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="developer">
          <Card>
            <CardHeader>
              <CardTitle>{t("developerInformation")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">{t("additionalResources")}</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{t("documentation")}</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{t("apiReference")}</span>
                    </li>
                    <li className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{t("communityForums")}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">{t("licenseManagement")}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("currentLicense")}:</span>
                      <span>{t("licenseStatus")}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {t("manageLicense")}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h3 className="font-medium mb-2">{t("stillNeedHelp")}</h3>
                <p className="text-muted-foreground text-sm mb-4">{t("contactSupport")}</p>
                <div className="flex gap-2">
                  <Button variant="outline">{t("openSupportTicket")}</Button>
                  <Button variant="outline">{t("emailSupport")}</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpCenterMultiLang;
