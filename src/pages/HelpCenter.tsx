
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  HelpCircle,
  FileText,
  Video,
  Code,
  MessageSquare,
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

const HelpCenter = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t('helpCenter.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('helpCenter.subtitle')}</p>
          
          <div className="relative max-w-2xl mx-auto mt-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input 
              className="pl-10 py-6" 
              placeholder={t('helpCenter.search')}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Tabs defaultValue="guides">
              <TabsList className="mb-6">
                <TabsTrigger value="guides" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{t('helpCenter.guides.title')}</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <HelpCircle size={16} />
                  <span>{t('helpCenter.faq')}</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <FileText size={16} />
                  <span>{t('helpCenter.resources.title')}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guides" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">{t('helpCenter.guides.title')}</h2>
                  <p className="text-muted-foreground mb-6">{t('helpCenter.guides.description')}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <GuideCard 
                      title={t('helpCenter.guides.basic')}
                      icon={<BookOpen className="h-5 w-5 text-blue-500" />}
                      count={8}
                    />
                    <GuideCard 
                      title={t('helpCenter.guides.intermediate')}
                      icon={<BookOpen className="h-5 w-5 text-purple-500" />}
                      count={12}
                    />
                    <GuideCard 
                      title={t('helpCenter.guides.advanced')}
                      icon={<BookOpen className="h-5 w-5 text-amber-500" />}
                      count={9}
                    />
                    <GuideCard 
                      title={t('helpCenter.guides.videos')}
                      icon={<Video className="h-5 w-5 text-red-500" />}
                      count={15}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium">{t('helpCenter.popular')}</h3>
                    <Button variant="link" className="flex items-center gap-1 text-sm">
                      {t('helpCenter.viewAll')}
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <ArticleLink title="Getting started with network monitoring" views="2.5K" time="5 min" />
                    <ArticleLink title="Advanced network troubleshooting techniques" views="1.8K" time="10 min" />
                    <ArticleLink title="How to optimize your network settings" views="1.2K" time="7 min" />
                    <ArticleLink title="Understanding network security alerts" views="950" time="8 min" />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">{t('helpCenter.faqSection.title')}</h2>
                  
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>{t('helpCenter.faqSection.question1')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faqSection.answer1')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>{t('helpCenter.faqSection.question2')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faqSection.answer2')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>{t('helpCenter.faqSection.question3')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faqSection.answer3')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>{t('helpCenter.faqSection.question4')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faqSection.answer4')}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>{t('helpCenter.faqSection.question5')}</AccordionTrigger>
                      <AccordionContent>
                        {t('helpCenter.faqSection.answer5')}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              <TabsContent value="resources">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">{t('helpCenter.resources.title')}</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ResourceCard 
                      title={t('helpCenter.resources.videos')}
                      icon={<Video className="h-5 w-5 text-red-500" />}
                    />
                    <ResourceCard 
                      title={t('helpCenter.resources.documentation')}
                      icon={<FileText className="h-5 w-5 text-blue-500" />}
                    />
                    <ResourceCard 
                      title={t('helpCenter.resources.apiReference')}
                      icon={<Code className="h-5 w-5 text-green-500" />}
                    />
                    <ResourceCard 
                      title={t('helpCenter.resources.communityForums')}
                      icon={<MessageSquare className="h-5 w-5 text-purple-500" />}
                    />
                    <ResourceCard 
                      title={t('helpCenter.resources.supportCenter')}
                      icon={<HelpCircle className="h-5 w-5 text-amber-500" />}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t('helpCenter.developerInfo.title')}</h3>
              <Separator className="mb-4" />
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t('helpCenter.developerInfo.name')}</p>
                  <p className="font-medium">OCTA-GRAM Team</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('helpCenter.developerInfo.role')}</p>
                  <p className="font-medium">Network Solutions</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('helpCenter.developerInfo.contact')}</p>
                  <p className="font-medium"></p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t('helpCenter.developerInfo.resources')}</p>
                  <div className="space-y-1 mt-2">
                    <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <span>Documentation</span>
                      <ExternalLink size={12} />
                    </a>
                    <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <span>API Reference</span>
                      <ExternalLink size={12} />
                    </a>
                    <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <span>Community Forums</span>
                      <ExternalLink size={12} />
                    </a>
                    <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <span>Video Tutorials</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="p-6 mt-6">
              <h3 className="text-xl font-semibold mb-4">{t('helpCenter.contact')}</h3>
              <p className="text-muted-foreground mb-4">Need more help? Contact our support team.</p>
              <Button className="w-full">{t('helpCenter.askQuestion')}</Button>
            </GlassCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface GuideCardProps {
  title: string;
  icon: React.ReactNode;
  count: number;
}

const GuideCard = ({ title, icon, count }: GuideCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:border-primary/40 hover:bg-accent/50 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="font-medium">{title}</h4>
        </div>
        <span className="text-sm text-muted-foreground">{count} guides</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Learn everything about {title.toLowerCase()} features and how to use them effectively.
      </p>
    </div>
  );
};

interface ArticleLinkProps {
  title: string;
  views: string;
  time: string;
}

const ArticleLink = ({ title, views, time }: ArticleLinkProps) => {
  return (
    <a 
      href="#" 
      className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/50 hover:border-primary/40 transition-colors"
    >
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{title}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>{views} views</span>
        <span>{time}</span>
      </div>
    </a>
  );
};

interface ResourceCardProps {
  title: string;
  icon: React.ReactNode;
}

const ResourceCard = ({ title, icon }: ResourceCardProps) => {
  return (
    <div className={cn(
      "border rounded-lg p-4 flex flex-col items-center justify-center text-center",
      "hover:border-primary/40 hover:bg-accent/50 transition-colors cursor-pointer",
      "aspect-square"
    )}>
      <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 mb-3">
        {icon}
      </div>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1">
        Access our {title.toLowerCase()} resources
      </p>
    </div>
  );
};

export default HelpCenter;
