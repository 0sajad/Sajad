
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { 
  Search, 
  BookOpen, 
  FileText, 
  Video, 
  Code, 
  HelpCircle, 
  MessageSquare,
  Settings,
  ChevronRight,
  ExternalLink 
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const HelpCenterMultiLang = () => {
  const { t } = useTranslation(['common', 'helpCenter']);
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{t('helpCenter.title')}</h1>
              <p className="text-muted-foreground text-lg">{t('helpCenter.description')}</p>
            </div>
            <LanguageSwitcher className="shrink-0" />
          </div>
          
          <div className="relative max-w-2xl mx-auto mt-8">
            <Search className="absolute left-3 rtl:right-3 rtl:left-auto top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              className="pl-10 rtl:pr-10 rtl:pl-4 py-6" 
              placeholder={t('helpCenter.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Tabs defaultValue="guides">
              <TabsList className="mb-6">
                <TabsTrigger value="guides" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{t('helpCenter.guides')}</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle size={16} />
                  <span>{t('helpCenter.faq')}</span>
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Video size={16} />
                  <span>{t('helpCenter.videos')}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guides" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('helpCenter.gettingStarted')}</h2>
                  <p className="text-muted-foreground mb-6">{t('helpCenter.gettingStartedDesc')}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GuideCategory 
                      title={t('helpCenter.userGuides')}
                      icon={<BookOpen className="h-5 w-5 text-blue-500" />}
                      items={[
                        t('helpCenter.installationGuide'),
                        t('helpCenter.firstTimeSetup'),
                        t('helpCenter.basicNavigation')
                      ]}
                    />
                    
                    <GuideCategory 
                      title={t('helpCenter.networkManagementDesc')}
                      icon={<Settings className="h-5 w-5 text-purple-500" />}
                      items={[
                        t('helpCenter.deviceManagement'),
                        t('helpCenter.troubleshooting'),
                        t('helpCenter.performanceOptimization')
                      ]}
                    />
                    
                    <GuideCategory 
                      title={t('helpCenter.qualityMonitoringDesc')}
                      icon={<FileText className="h-5 w-5 text-amber-500" />}
                      items={[
                        t('helpCenter.signalMeasurement'),
                        t('helpCenter.speedTesting'),
                        t('helpCenter.latencyAnalysis')
                      ]}
                    />
                    
                    <GuideCategory 
                      title={t('helpCenter.aiAssistantDesc')}
                      icon={<MessageSquare className="h-5 w-5 text-red-500" />}
                      items={[
                        t('helpCenter.chatbotUsage'),
                        t('helpCenter.fileAnalysis'),
                        t('helpCenter.networkPredictions')
                      ]}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">{t('helpCenter.guides')}</h3>
                    <Button variant="link" className="flex items-center gap-1 text-sm">
                      {t('helpCenter.readFullGuide')}
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <GuideLink title={t('helpCenter.installationGuide')} />
                    <GuideLink title={t('helpCenter.deviceManagement')} />
                    <GuideLink title={t('helpCenter.troubleshooting')} />
                    <GuideLink title={t('helpCenter.speedTesting')} />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">{t('helpCenter.frequentlyAskedQuestions')}</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{t('helpCenter.faq1')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faq1Answer')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>{t('helpCenter.faq2')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faq2Answer')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>{t('helpCenter.faq3')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faq3Answer')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>{t('helpCenter.faq4')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faq4Answer')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>{t('helpCenter.faq5')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faq5Answer')}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="videos">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">{t('helpCenter.videoTutorials')}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <VideoCard 
                      title={t('helpCenter.gettingStartedVideo')}
                      description={t('helpCenter.gettingStartedVideoDesc')}
                    />
                    <VideoCard 
                      title={t('helpCenter.networkAnalysisVideo')}
                      description={t('helpCenter.networkAnalysisVideoDesc')}
                    />
                    <VideoCard 
                      title={t('helpCenter.troubleshootingVideo')}
                      description={t('helpCenter.troubleshootingVideoDesc')}
                    />
                    <VideoCard 
                      title={t('helpCenter.aiAssistantVideo')}
                      description={t('helpCenter.aiAssistantVideoDesc')}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t('helpCenter.developerInformation')}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('helpCenter.developerName')}</p>
                  <p className="font-medium">OCTA-GRAM Team</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('helpCenter.developerRole')}</p>
                  <p className="font-medium">Network Solutions</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('helpCenter.additionalResources')}</p>
                  <div className="space-y-1 mt-2">
                    <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <span>{t('helpCenter.documentation')}</span>
                      <ExternalLink size={12} />
                    </a>
                    <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <span>{t('helpCenter.apiReference')}</span>
                      <ExternalLink size={12} />
                    </a>
                    <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <span>{t('helpCenter.communityForums')}</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('helpCenter.licenseManagement')}</p>
                  <p className="font-medium mt-1">{t('helpCenter.currentLicense')}: <span className="text-green-500">{t('helpCenter.licenseStatus')}</span></p>
                  <Button variant="outline" size="sm" className="mt-2">
                    {t('helpCenter.manageLicense')}
                  </Button>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 mt-6">
              <h3 className="text-xl font-semibold mb-3">{t('helpCenter.stillNeedHelp')}</h3>
              <p className="text-muted-foreground text-sm mb-4">
                {t('helpCenter.contactSupport')}
              </p>
              <div className="space-y-2">
                <Button className="w-full" variant="default">
                  {t('helpCenter.openSupportTicket')}
                </Button>
                <Button className="w-full" variant="outline">
                  {t('helpCenter.emailSupport')}
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Props for the GuideCategory component
interface GuideCategoryProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
}

// GuideCategory component
const GuideCategory = ({ title, icon, items }: GuideCategoryProps) => {
  return (
    <div className="border rounded-lg p-4 hover:border-primary/40 hover:bg-accent/50 transition-colors">
      <div className="flex items-center mb-2">
        {icon}
        <h4 className="font-medium ml-2 rtl:mr-2 rtl:ml-0">{title}</h4>
      </div>
      <ul className="text-sm text-muted-foreground space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={14} className="mr-1 rtl:ml-1 rtl:mr-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Props for the GuideLink component
interface GuideLinkProps {
  title: string;
}

// GuideLink component
const GuideLink = ({ title }: GuideLinkProps) => {
  return (
    <a 
      href="#" 
      className="flex items-center p-3 border rounded-md hover:bg-accent/50 hover:border-primary/40 transition-colors"
    >
      <FileText className="h-5 w-5 text-primary mr-3 rtl:ml-3 rtl:mr-0" />
      <span className="font-medium">{title}</span>
    </a>
  );
};

// Props for the VideoCard component
interface VideoCardProps {
  title: string;
  description: string;
}

// VideoCard component
const VideoCard = ({ title, description }: VideoCardProps) => {
  return (
    <div className={cn(
      "border rounded-lg p-4 hover:border-primary/40 hover:bg-accent/50 transition-colors"
    )}>
      <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-3">
        <Video className="h-8 w-8 text-muted-foreground" />
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">
        {description}
      </p>
    </div>
  );
};

export default HelpCenterMultiLang;
