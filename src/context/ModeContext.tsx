
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

type ModeType = "client" | "developer";

interface ModeContextType {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  isDeveloperMode: boolean;
  features: {
    [key: string]: boolean;
  };
  toggleFeature: (featureId: string) => void;
  updateFeature: (featureId: string, enabled: boolean) => void;
  applyConfiguration: () => void;
  isSyncing: boolean;
}

const defaultFeatures = {
  // الميزات الأساسية
  networkMonitoring: true,
  advancedSecurity: true,
  aiAssistant: true,
  
  // الميزات المتقدمة
  zeroPower: false,
  holographicUI: false,
  networkIsolation: false,
  dnsOptimization: true,
  latencyHeatmap: false,
  trafficShaping: false,
  invisibleMode: false,
  networkCloning: false,
  multiNetwork: false,
  autoHealing: true,
  signalBooster: false,
  darkWebProtection: false,
  deviceHeat: false,
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [mode, setModeState] = useState<ModeType>(() => {
    const savedMode = localStorage.getItem("octa-app-mode");
    return (savedMode as ModeType) || "client";
  });
  
  const [features, setFeatures] = useState(() => {
    const savedFeatures = localStorage.getItem("octa-dev-features");
    return savedFeatures ? JSON.parse(savedFeatures) : defaultFeatures;
  });
  
  const [isSyncing, setIsSyncing] = useState(false);
  
  useEffect(() => {
    localStorage.setItem("octa-app-mode", mode);
    
    // إرسال حدث خاص عند تغيير الوضع لإعلام المكونات الأخرى
    document.dispatchEvent(new CustomEvent('modeChanged', { 
      detail: { mode, features }
    }));
  }, [mode, features]);
  
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
  
  // تطبيق التكوين على وضع العميل
  const applyConfiguration = async () => {
    if (mode !== "developer") {
      return;
    }
    
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
  
  // التحقق من صحة التكوين
  const validateConfiguration = (config: {[key: string]: boolean}) => {
    // مثال: التأكد من عدم تفعيل ميزات متعارضة
    if (config.invisibleMode && config.networkCloning) {
      return { 
        valid: false, 
        message: "لا يمكن تفعيل وضع التخفي واستنساخ الشبكة معًا"
      };
    }
    
    // مثال: التأكد من تفعيل الميزات المطلوبة للميزات المتقدمة
    if (config.holographicUI && !config.latencyHeatmap) {
      return { 
        valid: false, 
        message: "الواجهة ثلاثية الأبعاد تتطلب تفعيل خريطة التأخير"
      };
    }
    
    return { valid: true, message: "" };
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
      isSyncing
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
