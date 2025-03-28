
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Book, 
  FileQuestion, 
  PlayCircle, 
  Code,
  BookOpen,
  HelpCircle,
  Download,
  ChevronRight
} from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { DeveloperPanel } from "@/components/developer/DeveloperPanel";
import { HelpArticle } from "@/components/help/HelpArticle";
import { useA11y } from "@/hooks/useA11y";

export default function HelpCenter() {
  const { t } = useTranslation(['helpCenter']);
  const { isDeveloperMode } = useMode();
  const { announce } = useA11y();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    announce(`Searching for: ${searchQuery}`, "info");
    // هنا يمكن إضافة منطق البحث الفعلي
  };
  
  const handleSelectArticle = (articleId: string) => {
    setSelectedArticle(articleId);
  };
  
  const handleBackToList = () => {
    setSelectedArticle(null);
  };
  
  // قائمة وهمية من المقالات
  const articles = [
    { id: "getting-started", title: "Getting Started Guide", category: "guides" },
    { id: "network-setup", title: "Network Setup", category: "guides" },
    { id: "troubleshooting", title: "Troubleshooting Common Issues", category: "guides" },
    { id: "wifi-optimization", title: "WiFi Signal Optimization", category: "guides" },
    { id: "security-best-practices", title: "Security Best Practices", category: "guides" },
    
    { id: "faq-connection", title: "Connection Problems", category: "faq" },
    { id: "faq-speed", title: "Speed Issues", category: "faq" },
    { id: "faq-security", title: "Security Questions", category: "faq" },
    { id: "faq-devices", title: "Device Compatibility", category: "faq" },
    { id: "faq-settings", title: "Settings Configuration", category: "faq" },
    
    { id: "video-setup", title: "Initial Setup Tutorial", category: "videos" },
    { id: "video-tools", title: "Network Tools Overview", category: "videos" },
    { id: "video-security", title: "Securing Your Network", category: "videos" },
    { id: "video-troubleshoot", title: "Troubleshooting Guide", category: "videos" },
    { id: "video-advanced", title: "Advanced Features", category: "videos" },
    
    { id: "api-docs", title: "API Documentation", category: "developer" },
    { id: "developer-guide", title: "Developer Guide", category: "developer" },
    { id: "plugin-development", title: "Plugin Development", category: "developer" },
    { id: "custom-tools", title: "Creating Custom Tools", category: "developer" },
    { id: "integration", title: "Integration Guide", category: "developer" }
  ];
  
  // تصفية المقالات حسب الفئة
  const filterArticlesByCategory = (category: string) => {
    return articles.filter(article => article.category === category);
  };
  
  // تصفية المقالات حسب البحث
  const filteredArticles = searchQuery.trim() === "" 
    ? articles 
    : articles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="min-h-screen">
      <Header />
      
      {isDeveloperMode && <DeveloperPanel />}
      
      <main className="container mx-auto p-6 pb-20">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
        
        {/* شريط البحث */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder={t('searchPlaceholder')} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="absolute right-1 top-1">
              {t('search', 'Search')}
            </Button>
          </div>
        </form>
        
        {selectedArticle ? (
          /* عرض المقالة المختارة */
          <div className="space-y-4">
            <Button variant="outline" onClick={handleBackToList}>
              <ChevronRight className="h-4 w-4 mr-2 rtl:rotate-180" />
              {t('backToList', 'Back to List')}
            </Button>
            <HelpArticle articleId={selectedArticle} />
          </div>
        ) : (
          /* عرض قائمة الفئات والمقالات */
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="all">
                <HelpCircle className="h-4 w-4 mr-2" />
                {t('all', 'All')}
              </TabsTrigger>
              <TabsTrigger value="guides">
                <Book className="h-4 w-4 mr-2" />
                {t('guides')}
              </TabsTrigger>
              <TabsTrigger value="faq">
                <FileQuestion className="h-4 w-4 mr-2" />
                {t('faq')}
              </TabsTrigger>
              <TabsTrigger value="videos">
                <PlayCircle className="h-4 w-4 mr-2" />
                {t('videos')}
              </TabsTrigger>
              <TabsTrigger value="developer">
                <Code className="h-4 w-4 mr-2" />
                {t('developerInfo')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map(article => (
                  <Card 
                    key={article.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleSelectArticle(article.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="link" className="px-0">
                        {t('readMore', 'Read More')}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="guides">
              <div className="grid gap-4">
                <h2 className="text-xl font-semibold">{t('userGuides')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filterArticlesByCategory('guides').map(article => (
                    <Card 
                      key={article.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleSelectArticle(article.id)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="link" className="px-0">
                          {t('readMore', 'Read More')}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle>{t('frequentlyAskedQuestions')}</CardTitle>
                  <CardDescription>
                    {t('faqDescription', 'Find answers to commonly asked questions')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filterArticlesByCategory('faq').map(article => (
                      <div 
                        key={article.id}
                        className="p-4 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                        onClick={() => handleSelectArticle(article.id)}
                      >
                        <h3 className="font-medium">{article.title}</h3>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos">
              <h2 className="text-xl font-semibold mb-4">{t('videoTutorials')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterArticlesByCategory('videos').map(article => (
                  <Card 
                    key={article.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
                    onClick={() => handleSelectArticle(article.id)}
                  >
                    <div className="aspect-video bg-muted relative">
                      <PlayCircle className="h-12 w-12 absolute inset-0 m-auto text-primary/70" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="link" className="px-0">
                        {t('watchVideo', 'Watch Video')}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="developer">
              <Card>
                <CardHeader>
                  <CardTitle>{t('developerInfo')}</CardTitle>
                  <CardDescription>
                    {t('developerDescription', 'Resources for developers')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filterArticlesByCategory('developer').map(article => (
                      <div 
                        key={article.id}
                        className="p-4 border rounded-md cursor-pointer hover:bg-secondary/50 transition-colors"
                        onClick={() => handleSelectArticle(article.id)}
                      >
                        <div className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-md mr-3">
                            <Code className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {t('developerDocsDescription', 'Technical documentation')}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      {t('downloadAllDocs', 'Download Full Documentation')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
