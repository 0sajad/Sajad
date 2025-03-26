
import React, { useState } from 'react';
import { useMissingTranslations } from '@/hooks/useMissingTranslations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bug, RefreshCw, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

/**
 * مكون للمساعدة في تصحيح ترجمات i18n
 * يظهر فقط في وضع التطوير
 */
export function TranslationDebugger() {
  const { missingKeys, scanPageForMissingTranslations, clearMissingKeys } = useMissingTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const [scanResults, setScanResults] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // عدم عرض المكون في وضع الإنتاج
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  // مفتوح فقط عند النقر
  if (!isOpen) {
    return (
      <Button 
        size="icon" 
        className="fixed bottom-4 right-4 z-50 bg-yellow-500 hover:bg-yellow-600 shadow-lg"
        onClick={() => setIsOpen(true)}
        title="فتح أداة تصحيح الترجمة"
      >
        <Bug size={18} />
      </Button>
    );
  }
  
  // إجراء عملية فحص للترجمات المفقودة في الصفحة
  const handleScan = () => {
    const results = scanPageForMissingTranslations();
    setScanResults(results);
  };
  
  const filteredMissingKeys = missingKeys.filter(key => 
    searchTerm === '' || key.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredHardcodedTexts = scanResults?.hardcodedTexts?.filter((item: any) => 
    searchTerm === '' || item.text.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <Card className="fixed bottom-4 right-4 w-96 max-h-[80vh] z-50 shadow-2xl">
      <CardHeader className="flex flex-row items-center justify-between py-3">
        <div>
          <CardTitle className="text-sm flex items-center">
            <Bug className="h-4 w-4 mr-2" />
            أداة تصحيح الترجمة
          </CardTitle>
          <CardDescription className="text-xs">
            فحص وتصحيح الترجمات المفقودة
          </CardDescription>
        </div>
        <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-3">
        <div className="flex items-center gap-2 mb-3">
          <Input
            placeholder="بحث..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm"
          />
          <Button size="sm" variant="outline" onClick={handleScan}>
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            فحص
          </Button>
        </div>
        
        <Tabs defaultValue="missing">
          <TabsList className="w-full mb-2">
            <TabsTrigger value="missing" className="flex-1">
              مفاتيح مفقودة
              {missingKeys.length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {missingKeys.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="hardcoded" className="flex-1">
              نصوص ثابتة
              {scanResults?.hardcodedTexts?.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {scanResults.hardcodedTexts.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="missing" className="mt-0">
            <ScrollArea className="h-64">
              {filteredMissingKeys.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  لم يتم العثور على مفاتيح ترجمة مفقودة
                </div>
              ) : (
                <ul className="space-y-1">
                  {filteredMissingKeys.map((key, index) => (
                    <li key={index} className="text-xs border-l-2 border-red-500 pl-2 py-1">
                      {key}
                    </li>
                  ))}
                </ul>
              )}
            </ScrollArea>
            {missingKeys.length > 0 && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="w-full mt-2" 
                onClick={clearMissingKeys}
              >
                مسح القائمة
              </Button>
            )}
          </TabsContent>
          
          <TabsContent value="hardcoded" className="mt-0">
            <ScrollArea className="h-64">
              {!scanResults ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  اضغط على زر "فحص" لبدء البحث عن نصوص ثابتة
                </div>
              ) : filteredHardcodedTexts.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  لم يتم العثور على نصوص ثابتة
                </div>
              ) : (
                <ul className="space-y-2">
                  {filteredHardcodedTexts.map((item: any, index: number) => (
                    <Collapsible key={index} className="text-xs border-l-2 border-yellow-500 pl-2 py-1">
                      <CollapsibleTrigger className="flex w-full items-center justify-between font-medium">
                        <span className="truncate">{item.text}</span>
                        <Search className="h-3 w-3 flex-shrink-0" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="text-muted-foreground mt-1">
                        <div className="space-y-1">
                          <div>العنصر: {item.element.tagName.toLowerCase()}</div>
                          <div className="truncate">المسار: {getElementPath(item.element)}</div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </ul>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// وظيفة مساعدة للحصول على مسار العنصر في DOM
function getElementPath(element: HTMLElement, maxDepth = 3): string {
  let path = '';
  let current = element;
  let depth = 0;
  
  while (current && current !== document.body && depth < maxDepth) {
    let selector = current.tagName.toLowerCase();
    
    if (current.id) {
      selector += `#${current.id}`;
    } else if (current.className && typeof current.className === 'string') {
      selector += `.${current.className.split(' ')[0]}`;
    }
    
    path = path ? `${selector} > ${path}` : selector;
    current = current.parentElement as HTMLElement;
    depth++;
  }
  
  return path;
}
