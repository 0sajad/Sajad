
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Code, User, Check, RefreshCw, Download } from "lucide-react";
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

export function ModeToggle() {
  const { 
    mode, 
    setMode, 
    isDeveloperMode, 
    applyConfiguration, 
    isSyncing 
  } = useMode();
  const { toast } = useToast();
  const [syncKey, setSyncKey] = useState("");
  const [isOpenSyncDialog, setIsOpenSyncDialog] = useState(false);
  const [isSyncingDownload, setIsSyncingDownload] = useState(false);

  const handleToggle = () => {
    setMode(isDeveloperMode ? "client" : "developer");
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
      // محاكاة تنزيل التكوين
      await new Promise(r => setTimeout(r, 1500));
      
      // استرجاع التكوين من التخزين المحلي
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

  return (
    <TooltipProvider>
      <div className="flex items-center gap-6 rtl:flex-row-reverse">
        {!isDeveloperMode && (
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
              </div>
              <DialogFooter>
                <Button 
                  onClick={downloadConfig} 
                  disabled={isSyncingDownload}
                  className="bg-indigo-600 hover:bg-indigo-700"
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
