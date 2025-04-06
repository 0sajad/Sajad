
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ModeType, ModeFeatures, ModeContextType } from "./mode/types";
import { defaultFeatures } from "./mode/defaultFeatures";
import { validateConfiguration } from "./mode/featureValidator";
import { checkForSyncUpdates } from "./mode/syncService";

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [mode, setModeState] = useState<ModeType>(() => {
    const savedMode = localStorage.getItem("octa-app-mode");
    return (savedMode as ModeType) || "client";
  });
  
  const [features, setFeatures] = useState<ModeFeatures>(() => {
    const savedFeatures = localStorage.getItem("octa-dev-features");
    return savedFeatures ? JSON.parse(savedFeatures) : defaultFeatures;
  });
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  
  useEffect(() => {
    localStorage.setItem("octa-app-mode", mode);
    
    // إرسال حدث خاص عند تغيير الوضع لإعلام المكونات الأخرى
    document.dispatchEvent(new CustomEvent('modeChanged', { 
      detail: { mode, features }
    }));
  }, [mode, features]);
  
  // استعادة آخر وقت مزامنة من التخزين المحلي
  useEffect(() => {
    const storedTime = localStorage.getItem("octa-last-sync-time");
    if (storedTime) {
      setLastSyncTime(new Date(storedTime));
    }
  }, []);
  
  // الاستماع لأحداث تحديث التكوين
  useEffect(() => {
    const handleConfigUpdate = (event: CustomEvent) => {
      if (event.detail && event.detail.features) {
        setFeatures(event.detail.features);
        applyConfiguration();
      }
    };
    
    document.addEventListener('configurationUpdate', handleConfigUpdate as EventListener);
    
    return () => {
      document.removeEventListener('configurationUpdate', handleConfigUpdate as EventListener);
    };
  }, []);
  
  // حفظ تكوين الميزات في التخزين المحلي
  useEffect(() => {
    localStorage.setItem("octa-dev-features", JSON.stringify(features));
  }, [features]);
  
  const setMode = (newMode: ModeType) => {
    setModeState(newMode);
    
    toast({
      title: newMode === "developer" ? "تم تفعيل وضع المطور" : "تم تفعيل وضع العميل",
      description: newMode === "developer" 
        ? "يمكنك الآن الوصول إلى جميع الإعدادات وميزات التطوير"
        : "تم تطبيق جميع التغييرات على وضع العميل",
    });
  };
  
  const toggleFeature = (featureId: string) => {
    if (mode !== "developer") {
      toast({
        title: "تحذير",
        description: "يمكن تعديل الميزات فقط في وضع المطور",
        variant: "destructive",
      });
      return;
    }
    
    setFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
    
    toast({
      title: "تم تحديث الميزة",
      description: `تم ${!features[featureId] ? 'تفعيل' : 'تعطيل'}: ${featureId}`,
    });
  };
  
  const updateFeature = (featureId: string, enabled: boolean) => {
    if (mode !== "developer") {
      return;
    }
    
    setFeatures(prev => ({
      ...prev,
      [featureId]: enabled
    }));
  };
  
  // تحقق من تحديثات التكوين من المزامنة عبر الإنترنت
  const checkForUpdates = useCallback(async (): Promise<boolean> => {
    const binId = localStorage.getItem("octa-sync-bin-id");
    return checkForSyncUpdates(binId, isSyncing, setIsSyncing, toast, setFeatures, setLastSyncTime);
  }, [isSyncing, toast]);
  
  // تطبيق التكوين على وضع العميل
  const applyConfiguration = async () => {
    setIsSyncing(true);
    
    // محاكاة عملية المزامنة
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // محاكاة التحقق من صحة الإعدادات
    const isValid = validateConfiguration(features);
    
    if (!isValid.valid) {
      toast({
        title: "فشل تطبيق الإعدادات",
        description: isValid.message,
        variant: "destructive",
      });
      setIsSyncing(false);
      return;
    }
    
    // حفظ التكوين للعميل
    localStorage.setItem("octa-client-features", JSON.stringify(features));
    setLastSyncTime(new Date());
    localStorage.setItem("octa-last-sync-time", new Date().toLocaleString());
    
    toast({
      title: "تم تطبيق الإعدادات",
      description: "تم تطبيق جميع التغييرات بنجاح على وضع العميل",
    });
    
    setIsSyncing(false);
    
    // إرسال حدث خاص لإعلام المكونات الأخرى بتطبيق التكوين الجديد
    document.dispatchEvent(new CustomEvent('configurationApplied', { 
      detail: { features }
    }));
  };
  
  return (
    <ModeContext.Provider value={{
      mode,
      setMode,
      isDeveloperMode: mode === "developer",
      features,
      toggleFeature,
      updateFeature,
      applyConfiguration,
      isSyncing,
      lastSyncTime,
      checkForUpdates
    }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
