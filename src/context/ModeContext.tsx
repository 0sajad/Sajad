
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  lastSyncTime: Date | null;
  checkForUpdates: () => Promise<boolean>;
}

// الميزات الافتراضية
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
  
  // ميزات أدوات تحليل البيانات
  dataAnalysis: true,
  elasticsearchIntegration: true,
  prometheusMonitoring: true,
  influxDBIntegration: true,
  aiAnalytics: false,
  kafkaStreaming: true,
  sparkProcessing: false,
  securityAnalysis: false,
  networkPacketAnalysis: true,
  cloudIntegration: false,
  customScripting: false,
  dataVisualization: true
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
    if (isSyncing) return false;
    
    setIsSyncing(true);
    try {
      // محاولة الوصول إلى المزامنة عبر JSONBin.io العام
      const binId = localStorage.getItem("octa-sync-bin-id");
      if (!binId) {
        console.log("لا يوجد معرف مخزن للمزامنة");
        setIsSyncing(false);
        return false;
      }

      const response = await fetch(`https://api.jsonbin.io/v3/b/${binId}/latest`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error("فشل في الوصول إلى بيانات المزامنة");
      }
      
      const data = await response.json();
      
      // التحقق من وجود تحديثات
      const serverTimestamp = data.metadata?.createdAt || '';
      const localTimestamp = localStorage.getItem("octa-sync-timestamp") || '';
      
      if (serverTimestamp > localTimestamp) {
        // تطبيق التحديثات إذا كانت جديدة
        if (data.record && data.record.features) {
          setFeatures(data.record.features);
          localStorage.setItem("octa-sync-config", JSON.stringify(data.record));
          localStorage.setItem("octa-sync-timestamp", serverTimestamp);
          localStorage.setItem("octa-last-sync-time", new Date().toLocaleString());
          setLastSyncTime(new Date());
          
          toast({
            title: "تم تحديث التكوين",
            description: "تم تطبيق أحدث الإعدادات من المزامنة",
          });
          
          setIsSyncing(false);
          return true;
        }
      }
      
      setIsSyncing(false);
      return false;
    } catch (error) {
      console.error("خطأ في التحقق من التحديثات:", error);
      setIsSyncing(false);
      return false;
    }
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
    
    // التحقق من تكاملات أدوات تحليل البيانات
    if (config.aiAnalytics && !config.elasticsearchIntegration) {
      return {
        valid: false,
        message: "تحليل الذكاء الاصطناعي يتطلب تكامل Elasticsearch"
      };
    }
    
    if (config.cloudIntegration && !config.dataAnalysis) {
      return {
        valid: false,
        message: "تكامل السحابة يتطلب تحليل البيانات"
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
