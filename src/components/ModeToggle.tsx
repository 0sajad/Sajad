
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Code, User, Check, RefreshCw, Download, Globe, CloudOff } from "lucide-react";
import { useMode } from "@/context/ModeContext";
import { Button } from "./ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "./ui/tooltip";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./ui/use-toast";
import { Badge } from "./ui/badge";

export function ModeToggle() {
  const { 
    mode, 
    setMode, 
    isDeveloperMode, 
    applyConfiguration, 
    isSyncing,
    lastSyncTime,
    checkForUpdates
  } = useMode();
  const { toast } = useToast();
  const [syncKey, setSyncKey] = useState("");
  const [isOpenSyncDialog, setIsOpenSyncDialog] = useState(false);
  const [isSyncingDownload, setIsSyncingDownload] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(() => {
    return localStorage.getItem("octa-auto-sync") === "true";
  });
  const [onlineSyncAvailable, setOnlineSyncAvailable] = useState<boolean>(false);

  // التحقق من توفر المزامنة عبر الإنترنت
  useEffect(() => {
    const binId = localStorage.getItem("octa-sync-bin-id");
    setOnlineSyncAvailable(!!binId);
  }, []);

  // جدولة المزامنة التلقائية
  useEffect(() => {
    if (autoSyncEnabled && !isDeveloperMode) {
      const interval = setInterval(() => {
        checkForUpdates().then(hasUpdates => {
          if (hasUpdates) {
            toast({
              title: "تم تحديث التكوين",
              description: "تم تطبيق التكوين الجديد تلقائيًا",
            });
          }
        });
      }, 5 * 60 * 1000); // كل 5 دقائق
      
      return () => clearInterval(interval);
    }
  }, [autoSyncEnabled, isDeveloperMode, checkForUpdates, toast]);

  const handleToggle = () => {
    setMode(isDeveloperMode ? "client" : "developer");
  };
  
  const toggleAutoSync = () => {
    const newValue = !autoSyncEnabled;
    setAutoSyncEnabled(newValue);
    localStorage.setItem("octa-auto-sync", newValue.toString());
    
    toast({
      title: newValue ? "تم تفعيل المزامنة التلقائية" : "تم تعطيل المزامنة التلقائية",
      description: newValue ? "سيتم التحقق من التحديثات كل 5 دقائق" : "لن يتم التحقق من التحديثات تلقائيًا",
    });
  };
  
  const downloadConfig = async () => {
    if (!syncKey.trim()) {
      toast({
        title: "مفتاح المزامنة مطلوب",
        description: "يرجى إدخال مفتاح المزامنة للتنزيل",
        variant: "destructive",
      });
      return;
    }
    
    setIsSyncingDownload(true);
    
    try {
      // محاولة جلب التكوين من JSONBin.io إذا كان متاحًا
      const binId = localStorage.getItem("octa-sync-bin-id");
      
      if (binId) {
        const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.record && data.record.syncKey === syncKey.trim()) {
            // تطبيق التكوين
            localStorage.setItem("octa-sync-config", JSON.stringify(data.record));
            localStorage.setItem("octa-sync-timestamp", data.metadata?.createdAt || new Date().toISOString());
            
            applyConfiguration();
            
            toast({
              title: "تم تنزيل التكوين بنجاح",
              description: "تم تطبيق التكوين الجديد",
            });
            
            setIsOpenSyncDialog(false);
            setSyncKey("");
            setOnlineSyncAvailable(true);
            setIsSyncingDownload(false);
            return;
          }
        }
      }
      
      // محاولة استرجاع التكوين من التخزين المحلي كاحتياطي
      const savedConfig = localStorage.getItem("octa-sync-config");
      
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        
        if (parsedConfig.syncKey === syncKey.trim()) {
          // تطبيق التكوين
          applyConfiguration();
          
          toast({
            title: "تم تنزيل التكوين بنجاح",
            description: "تم تطبيق التكوين الجديد",
          });
          
          setIsOpenSyncDialog(false);
          setSyncKey("");
        } else {
          toast({
            title: "مفتاح المزامنة غير صالح",
            description: "يرجى التحقق من مفتاح المزامنة وإعادة المحاولة",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "لم يتم العثور على تكوين",
          description: "لم يتم العثور على تكوين متاح للمزامنة",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "فشل تنزيل التكوين",
        description: "يرجى المحاولة مرة أخرى لاحقًا",
        variant: "destructive",
      });
    } finally {
      setIsSyncingDownload(false);
    }
  };

  const checkUpdatesManually = async () => {
    toast({
      title: "جارٍ التحقق من التحديثات...",
      description: "يرجى الانتظار قليلاً",
    });
    
    const hasUpdates = await checkForUpdates();
    
    if (!hasUpdates) {
      toast({
        title: "لا توجد تحديثات جديدة",
        description: "التكوين الحالي هو الأحدث",
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-6 rtl:flex-row-reverse">
        {!isDeveloperMode && (
          <>
            <Dialog open={isOpenSyncDialog} onOpenChange={setIsOpenSyncDialog}>
              <DialogTrigger asChild>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-[38px] shadow-md hover:shadow-lg border-indigo-200 text-indigo-600 hover:text-indigo-700 transform hover:translate-y-[-3px] transition-all duration-300"
                >
                  <Download className="h-4 w-4 mr-1" />
                  <span className="text-xs">تزامن</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>مزامنة التكوين</DialogTitle>
                  <DialogDescription>
                    أدخل مفتاح المزامنة لتنزيل التكوين من جهاز مطور بعيد
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="sync-key">مفتاح المزامنة</Label>
                    <Input
                      id="sync-key"
                      placeholder="أدخل مفتاح المزامنة"
                      value={syncKey}
                      onChange={(e) => setSyncKey(e.target.value)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    اطلب مفتاح المزامنة من المطور للحصول على أحدث التكوينات والإعدادات.
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">مزامنة تلقائية:</span>
                      <Badge className={autoSyncEnabled ? "bg-green-500" : "bg-gray-500"}>
                        {autoSyncEnabled ? "مفعلة" : "معطلة"}
                      </Badge>
                    </div>
                    <div
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                        autoSyncEnabled ? "bg-green-500" : "bg-gray-300"
                      }`}
                      onClick={toggleAutoSync}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          autoSyncEnabled ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                  
                  {onlineSyncAvailable && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-700">المزامنة عبر الإنترنت متاحة</span>
                    </div>
                  )}
                  
                  {lastSyncTime && (
                    <p className="text-xs text-muted-foreground">
                      آخر مزامنة: {lastSyncTime.toLocaleString()}
                    </p>
                  )}
                </div>
                <DialogFooter className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={checkUpdatesManually}
                    disabled={isSyncing}
                    className="flex-1"
                  >
                    {isSyncing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        التحقق من التحديثات
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={downloadConfig} 
                    disabled={isSyncingDownload}
                    className="bg-indigo-600 hover:bg-indigo-700 flex-1"
                  >
                    {isSyncingDownload ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        جارٍ التنزيل...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        تنزيل التكوين
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1">
                  {onlineSyncAvailable ? (
                    <Globe className="h-4 w-4 text-green-600" />
                  ) : (
                    <CloudOff className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{onlineSyncAvailable ? "المزامنة عبر الإنترنت متاحة" : "المزامنة المحلية فقط"}</p>
              </TooltipContent>
            </Tooltip>
          </>
        )}
        
        {isDeveloperMode && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="sm" 
                variant="gradient" 
                className="h-[38px] shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transform hover:translate-y-[-3px] transition-all duration-300"
                onClick={applyConfiguration}
                disabled={isSyncing}
              >
                {isSyncing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4 mr-1" />}
                <span className="text-xs">تطبيق</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-gradient-to-r from-green-500/90 to-green-600/90 text-white border-0 shadow-lg">
              <p>تطبيق التغييرات على وضع العميل</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        <div 
          onClick={handleToggle}
          className={cn(
            "relative flex items-center w-[100px] h-[40px] rounded-full p-1 transition-colors duration-300 cursor-pointer shadow-xl hover:shadow-2xl transform hover:scale-105 border border-white/20 backdrop-blur-sm overflow-hidden",
            isDeveloperMode 
              ? "bg-gradient-to-r from-amber-500 to-orange-600" 
              : "bg-gradient-to-r from-amber-500 to-orange-600"
          )}
        >
          {/* Sliding background */}
          <div 
            className={cn(
              "absolute inset-y-1 w-[48px] bg-white dark:bg-gray-900 rounded-full shadow-md transform transition-transform duration-300",
              isDeveloperMode ? "translate-x-[0px]" : "translate-x-0"
            )}
          />
          
          {/* Icons and labels container - always maintains consistent layout */}
          <div className="relative flex w-full z-10">
            <div className={cn(
              "flex-1 flex items-center justify-center z-10 text-xs font-medium transition-colors duration-300",
              isDeveloperMode ? "text-white/60" : "text-octaBlue-600 dark:text-white"
            )}>
              <User size={16} className="mr-1" />
              <span className="text-[10px]">عميل</span>
            </div>
            
            <div className={cn(
              "flex-1 flex items-center justify-center z-10 text-xs font-medium transition-colors duration-300",
              isDeveloperMode ? "text-white" : "text-gray-500 dark:text-gray-400"
            )}>
              <Code size={16} className="mr-1" />
              <span className="text-[10px]">مطور</span>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
