
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GlassCard } from "@/components/ui/glass-card";
import { useTranslation } from "react-i18next";
import { Search, Book, FileText, Video, MessageSquare, Code, User, Mail, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const HelpCenter = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Developer information - typically would come from an API or config
  const developerInfo = {
    name: "", // Left empty for developer to fill in later
    role: "Network Systems Developer",
    contact: "", // Left empty for developer to fill in later
  };

  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="container mx-auto px-6 py-24">
        <div className="flex flex-col items-center mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">{t('helpCenter.title')}</h1>
          <p className="text-muted-foreground max-w-2xl">
            {t('helpCenter.description')}
          </p>
          
          <div className="w-full max-w-2xl mt-8 relative">
            <Input
              placeholder={t('helpCenter.searchPlaceholder')}
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute right-3 top-3 text-muted-foreground" size={18} />
          </div>
        </div>
        
        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="w-full max-w-4xl mx-auto grid grid-cols-4 mb-8">
            <TabsTrigger value="guides">
              <Book className="mr-2 h-4 w-4" />
              {t('helpCenter.guides')}
            </TabsTrigger>
            <TabsTrigger value="faq">
              <FileText className="mr-2 h-4 w-4" />
              {t('helpCenter.faq')}
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Video className="mr-2 h-4 w-4" />
              {t('helpCenter.videos')}
            </TabsTrigger>
            <TabsTrigger value="developer">
              <Code className="mr-2 h-4 w-4" />
              {t('helpCenter.developerInfo')}
            </TabsTrigger>
          </TabsList>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <GlassCard className="sticky top-24">
                <div className="p-4">
                  <h3 className="font-semibold mb-3">{t('helpCenter.categories')}</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      {t('helpCenter.gettingStarted')}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      {t('networkTools.networkManagement')}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      {t('networkTools.qualityMonitoring')}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      {t('networkTools.simulationSystems')}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      {t('aiFeatures.title')}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      {t('helpCenter.licenses')}
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </div>
            
            <div className="md:col-span-3">
              <TabsContent value="guides" className="mt-0">
                <GlassCard>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('helpCenter.userGuides')}</h2>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>{t('helpCenter.gettingStarted')}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p>{t('helpCenter.gettingStartedDesc')}</p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>{t('helpCenter.installationGuide')}</li>
                              <li>{t('helpCenter.firstTimeSetup')}</li>
                              <li>{t('helpCenter.basicNavigation')}</li>
                            </ul>
                            <Button variant="outline" size="sm">
                              {t('helpCenter.readFullGuide')}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger>{t('networkTools.networkManagement')}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p>{t('helpCenter.networkManagementDesc')}</p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>{t('helpCenter.deviceManagement')}</li>
                              <li>{t('helpCenter.troubleshooting')}</li>
                              <li>{t('helpCenter.performanceOptimization')}</li>
                            </ul>
                            <Button variant="outline" size="sm">
                              {t('helpCenter.readFullGuide')}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger>{t('networkTools.qualityMonitoring')}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p>{t('helpCenter.qualityMonitoringDesc')}</p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>{t('helpCenter.signalMeasurement')}</li>
                              <li>{t('helpCenter.speedTesting')}</li>
                              <li>{t('helpCenter.latencyAnalysis')}</li>
                            </ul>
                            <Button variant="outline" size="sm">
                              {t('helpCenter.readFullGuide')}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger>{t('aiFeatures.title')}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4">
                            <p>{t('helpCenter.aiAssistantDesc')}</p>
                            <ul className="list-disc pl-5 space-y-2">
                              <li>{t('helpCenter.chatbotUsage')}</li>
                              <li>{t('helpCenter.fileAnalysis')}</li>
                              <li>{t('helpCenter.networkPredictions')}</li>
                            </ul>
                            <Button variant="outline" size="sm">
                              {t('helpCenter.readFullGuide')}
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </GlassCard>
              </TabsContent>
              
              <TabsContent value="faq" className="mt-0">
                <GlassCard>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('helpCenter.frequentlyAskedQuestions')}</h2>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-1">
                        <AccordionTrigger>{t('helpCenter.faq1')}</AccordionTrigger>
                        <AccordionContent>
                          <p>{t('helpCenter.faq1Answer')}</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-2">
                        <AccordionTrigger>{t('helpCenter.faq2')}</AccordionTrigger>
                        <AccordionContent>
                          <p>{t('helpCenter.faq2Answer')}</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-3">
                        <AccordionTrigger>{t('helpCenter.faq3')}</AccordionTrigger>
                        <AccordionContent>
                          <p>{t('helpCenter.faq3Answer')}</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-4">
                        <AccordionTrigger>{t('helpCenter.faq4')}</AccordionTrigger>
                        <AccordionContent>
                          <p>{t('helpCenter.faq4Answer')}</p>
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="faq-5">
                        <AccordionTrigger>{t('helpCenter.faq5')}</AccordionTrigger>
                        <AccordionContent>
                          <p>{t('helpCenter.faq5Answer')}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </GlassCard>
              </TabsContent>
              
              <TabsContent value="videos" className="mt-0">
                <GlassCard>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('helpCenter.videoTutorials')}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{t('helpCenter.gettingStartedVideo')}</h3>
                          <p className="text-sm text-muted-foreground">{t('helpCenter.gettingStartedVideoDesc')}</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{t('helpCenter.networkAnalysisVideo')}</h3>
                          <p className="text-sm text-muted-foreground">{t('helpCenter.networkAnalysisVideoDesc')}</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{t('helpCenter.troubleshootingVideo')}</h3>
                          <p className="text-sm text-muted-foreground">{t('helpCenter.troubleshootingVideoDesc')}</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold">{t('helpCenter.aiAssistantVideo')}</h3>
                          <p className="text-sm text-muted-foreground">{t('helpCenter.aiAssistantVideoDesc')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>
              
              <TabsContent value="developer" className="mt-0">
                <GlassCard>
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">{t('helpCenter.developerInformation')}</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="col-span-1">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
                          <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="font-semibold">{t('helpCenter.developerName')}</h3>
                          <p className="text-muted-foreground">{developerInfo.name || t('helpCenter.notSpecified')}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-1">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
                          <Code className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="font-semibold">{t('helpCenter.developerRole')}</h3>
                          <p className="text-muted-foreground">{developerInfo.role}</p>
                        </div>
                      </div>
                      
                      <div className="col-span-1">
                        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
                          <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                          <h3 className="font-semibold">{t('helpCenter.developerContact')}</h3>
                          <p className="text-muted-foreground">{developerInfo.contact || t('helpCenter.notSpecified')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-8" />
                    
                    <h3 className="text-xl font-semibold mb-4">{t('helpCenter.additionalResources')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        {t('helpCenter.documentation')}
                      </Button>
                      
                      <Button variant="outline" className="justify-start">
                        <Code className="mr-2 h-4 w-4" />
                        {t('helpCenter.apiReference')}
                      </Button>
                      
                      <Button variant="outline" className="justify-start">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {t('helpCenter.communityForums')}
                      </Button>
                      
                      <Button variant="outline" className="justify-start">
                        <Video className="mr-2 h-4 w-4" />
                        {t('helpCenter.videoTutorials')}
                      </Button>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">{t('helpCenter.licenseManagement')}</h3>
                      <GlassCard>
                        <div className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{t('helpCenter.currentLicense')}</h4>
                              <div className="flex items-center mt-1">
                                <Badge variant="outline">{t('helpCenter.licenseStatus')}</Badge>
                                <span className="text-sm text-muted-foreground ml-2">{t('helpCenter.licenseId')}: OCTA-XXXX-XXXX-XXXX</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              {t('helpCenter.manageLicense')}
                            </Button>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </div>
                </GlassCard>
              </TabsContent>
            </div>
          </div>
        </Tabs>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold mb-4">{t('helpCenter.stillNeedHelp')}</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t('helpCenter.contactSupport')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              {t('helpCenter.openSupportTicket')}
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              {t('helpCenter.emailSupport')}
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
