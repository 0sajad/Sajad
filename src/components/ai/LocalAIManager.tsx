
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';
import { BrainCircuit, Cpu, Zap, Download, Trash, Server, PlusCircle } from 'lucide-react';
import { useLocalAI } from '@/hooks/use-local-ai';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function LocalAIManager() {
  const { t } = useTranslation();
  const {
    isInitialized,
    isProcessing,
    currentModel,
    availableModels,
    localKnowledge,
    deviceType,
    loadModel,
    addLocalKnowledge,
    clearLocalKnowledge
  } = useLocalAI();
  
  const [activeTab, setActiveTab] = useState('models');
  const [newKnowledge, setNewKnowledge] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // محاكاة تقدم التحميل
  useEffect(() => {
    if (isProcessing) {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + (5 * Math.random());
          return newProgress > 90 ? 90 : newProgress;
        });
      }, 500);
      
      return () => {
        clearInterval(interval);
        setLoadingProgress(100);
        
        // إعادة تعيين التقدم بعد انتهاء المعالجة
        setTimeout(() => {
          setLoadingProgress(0);
        }, 1000);
      };
    }
  }, [isProcessing]);
  
  const handleAddKnowledge = () => {
    if (newKnowledge.trim()) {
      addLocalKnowledge(newKnowledge.trim());
      setNewKnowledge('');
      setIsDialogOpen(false);
    }
  };
  
  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'webgpu':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'webgl':
        return <Server className="h-4 w-4 text-blue-500" />;
      default:
        return <Cpu className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getDeviceName = () => {
    switch (deviceType) {
      case 'webgpu':
        return t('ai.webgpu', 'وحدة معالجة الرسومات المتقدمة (WebGPU)');
      case 'webgl':
        return t('ai.webgl', 'وحدة معالجة الرسومات (WebGL)');
      default:
        return t('ai.cpu', 'وحدة المعالجة المركزية (CPU)');
    }
  };
  
  if (!isInitialized) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BrainCircuit className="mr-2 h-5 w-5" />
            {t('ai.localAI', 'الذكاء الاصطناعي المحلي')}
          </CardTitle>
          <CardDescription>
            {t('ai.initializing', 'جاري تهيئة الذكاء الاصطناعي المحلي...')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={45} className="h-2 mb-4" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <BrainCircuit className="mr-2 h-5 w-5 text-purple-500" />
            {t('ai.localAI', 'الذكاء الاصطناعي المحلي')}
          </div>
          <Badge variant="outline" className="flex items-center gap-1 bg-muted/50">
            {getDeviceIcon()}
            <span className="text-xs">{getDeviceName()}</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          {t('ai.localAIDesc', 'تحميل وإدارة نماذج الذكاء الاصطناعي التي تعمل في المتصفح')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="models">
              {t('ai.models', 'النماذج')}
            </TabsTrigger>
            <TabsTrigger value="knowledge">
              {t('ai.knowledge', 'المعرفة المحلية')}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="models" className="space-y-4">
            {isProcessing && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">{t('ai.loading', 'جاري التحميل...')}</p>
                <Progress value={loadingProgress} className="h-2" />
              </div>
            )}
            
            <div className="space-y-3">
              {availableModels.map(model => (
                <div key={model.id} className="flex items-center justify-between border rounded-lg p-3 bg-card">
                  <div>
                    <h3 className="text-sm font-medium">{model.name}</h3>
                    <p className="text-xs text-muted-foreground">{model.id}</p>
                    <div className="flex items-center mt-1">
                      <Badge variant={
                        model.status === 'loaded' ? 'default' :
                        model.status === 'loading' ? 'outline' :
                        model.status === 'error' ? 'destructive' : 'secondary'
                      } className="text-[10px]">
                        {
                          model.status === 'loaded' ? t('ai.loaded', 'مُحمل') :
                          model.status === 'loading' ? t('ai.loading', 'جاري التحميل') :
                          model.status === 'error' ? t('ai.error', 'خطأ') : t('ai.notLoaded', 'غير مُحمل')
                        }
                      </Badge>
                      <Badge variant="outline" className="ml-2 text-[10px]">
                        {
                          model.size === 'small' ? t('ai.sizeSmall', 'صغير') :
                          model.size === 'medium' ? t('ai.sizeMedium', 'متوسط') : t('ai.sizeLarge', 'كبير')
                        }
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant={model.status === 'loaded' ? 'secondary' : 'default'}
                    onClick={() => loadModel(model.id)}
                    disabled={isProcessing || model.status === 'loading'}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    {model.status === 'loaded' ? t('ai.reload', 'إعادة تحميل') : t('ai.load', 'تحميل')}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="knowledge" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium">{t('ai.storedKnowledge', 'المعرفة المخزنة')}</h3>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <PlusCircle className="h-4 w-4 mr-1" />
                      {t('ai.addKnowledge', 'إضافة معرفة')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t('ai.addNewKnowledge', 'إضافة معرفة جديدة')}</DialogTitle>
                      <DialogDescription>
                        {t('ai.addKnowledgeDesc', 'أضف معلومات أو بيانات جديدة للذكاء الاصطناعي ليتعلم منها')}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="knowledge" className="mb-2 block">
                        {t('ai.knowledge', 'المعرفة')}
                      </Label>
                      <Textarea
                        id="knowledge"
                        value={newKnowledge}
                        onChange={(e) => setNewKnowledge(e.target.value)}
                        placeholder={t('ai.knowledgePlaceholder', 'أدخل معلومات أو بيانات هنا...')}
                        rows={6}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        {t('common.cancel', 'إلغاء')}
                      </Button>
                      <Button onClick={handleAddKnowledge}>
                        {t('ai.addKnowledge', 'إضافة معرفة')}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button size="sm" variant="outline" onClick={clearLocalKnowledge} disabled={localKnowledge.length === 0}>
                  <Trash className="h-4 w-4 mr-1" />
                  {t('ai.clearKnowledge', 'مسح المعرفة')}
                </Button>
              </div>
            </div>
            
            {localKnowledge.length > 0 ? (
              <ScrollArea className="h-[200px] rounded-md border p-4">
                {localKnowledge.map((item, index) => (
                  <div key={index} className="mb-3">
                    <p className="text-sm">{item}</p>
                    {index < localKnowledge.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md bg-muted/20">
                <BrainCircuit className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">{t('ai.noKnowledge', 'لا توجد معرفة مخزنة')}</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  {t('ai.noKnowledgeDesc', 'أضف معرفة لمساعدة الذكاء الاصطناعي على التعلم وتحسين استجاباته')}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
