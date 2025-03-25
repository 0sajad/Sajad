
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Zap, 
  Cpu, 
  Server, 
  BrainCircuit, 
  Globe, 
  Network, 
  Wifi,
  ThermometerSun,
  CircleCheck,
  CircleArrowDown,
  WifiOff,
  ShieldOff,
  RefreshCcw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onToggle: () => void;
  badge?: string;
  comingSoon?: boolean;
  info?: string;
  preview?: React.ReactNode;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  enabled, 
  onToggle, 
  badge, 
  comingSoon = false,
  info,
  preview
}: FeatureCardProps) => {
  return (
    <div className={cn(
      "border rounded-lg p-4 transition-all duration-300",
      enabled ? "bg-gradient-to-br from-white to-octaBlue-50 border-octaBlue-200" : "bg-white"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className={cn(
            "p-2 rounded-md ml-3 rtl:ml-0 rtl:mr-3",
            enabled ? "bg-octaBlue-100 text-octaBlue-700" : "bg-gray-100 text-gray-600"
          )}>
            {icon}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className={cn(
                "font-medium font-tajawal",
                enabled ? "text-octaBlue-900" : "text-gray-700"
              )}>
                {title}
              </h3>
              {badge && (
                <Badge variant="outline" className="mr-2 text-xs">
                  {badge}
                </Badge>
              )}
              {comingSoon && (
                <Badge variant="outline" className="mr-2 text-xs bg-amber-50 text-amber-700 border-amber-200">
                  قريبًا
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1 font-tajawal leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          {info && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 text-muted-foreground hover:text-primary transition-colors ml-2">
                    <CircleCheck size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="font-tajawal">
                  {info}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {preview && (
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-1 text-muted-foreground hover:text-primary transition-colors ml-2">
                  <CircleArrowDown size={16} />
                </button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="font-tajawal">{title}</DialogTitle>
                  <DialogDescription className="font-tajawal">
                    {description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  {preview}
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" className="font-tajawal" disabled={comingSoon}>
                    تفعيل
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          
          <Switch 
            checked={enabled} 
            onCheckedChange={onToggle} 
            disabled={comingSoon}
          />
        </div>
      </div>
    </div>
  );
};

// مكون العرض ثلاثي الأبعاد للواجهة الهولوغرافية
const HolographicPreview = () => {
  return (
    <div className="relative h-72 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-purple-500 opacity-50 rounded-full animate-pulse"></div>
        <div className="absolute w-48 h-48 border-2 border-blue-400 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
        <div className="absolute w-64 h-64 border border-blue-300 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-md p-3 rounded-lg">
        <p className="text-white text-sm font-tajawal text-center">
          واجهة ثلاثية الأبعاد تفاعلية تعرض معلومات الشبكة بشكل مرئي متطور
        </p>
      </div>
    </div>
  );
};

// مكون خريطة تأخير الشبكة
const LatencyHeatmapPreview = () => {
  return (
    <div className="relative h-72 bg-slate-900 rounded-lg overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-1 p-4">
        {Array(36).fill(0).map((_, i) => {
          const hue = Math.floor(Math.random() * 120);
          return (
            <div 
              key={i} 
              className="rounded-md" 
              style={{ 
                backgroundColor: `hsla(${hue}, 80%, 50%, ${Math.random() * 0.5 + 0.2})`,
                opacity: Math.random() * 0.7 + 0.3
              }}
            />
          );
        })}
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-md p-3 rounded-lg">
        <p className="text-white text-sm font-tajawal text-center">
          خريطة تفاعلية توضح مناطق تأخير الشبكة وتحديد النقاط الأسرع والأبطأ
        </p>
      </div>
    </div>
  );
};

export const AdvancedFeatures = () => {
  const [features, setFeatures] = useState({
    zeroPower: false,
    holographicUI: false,
    networkIsolation: false,
    dnsOptimization: false,
    latencyHeatmap: false,
    trafficShaping: false,
    invisibleMode: false,
    networkCloning: false,
    multiNetwork: false,
    autoHealing: false,
    aiAssistant: false,
    signalBooster: false,
    darkWebProtection: false,
    deviceHeat: false
  });

  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <div className="space-y-4">
      <FeatureCard 
        title="وضع الاستهلاك المنخفض للطاقة (Zero-Power Mode)"
        description="يقوم البرنامج بتقليل استهلاك الموارد عند عدم الحاجة إلى مراقبة مكثفة."
        icon={<Zap size={20} />}
        enabled={features.zeroPower}
        onToggle={() => toggleFeature('zeroPower')}
        badge="جديد"
        info="يوفر حتى 60% من استهلاك المعالج وحتى 45% من استهلاك الذاكرة"
      />
      
      <FeatureCard 
        title="واجهة ثلاثية الأبعاد تفاعلية (Holographic UI)"
        description="تعرض بيانات الشبكة وكأنها مجسمات تفاعلية 3D يمكن تحريكها."
        icon={<BrainCircuit size={20} />}
        enabled={features.holographicUI}
        onToggle={() => toggleFeature('holographicUI')}
        preview={<HolographicPreview />}
      />
      
      <FeatureCard 
        title="عزل الأجهزة المشبوهة تلقائيًا (Network Isolation AI)"
        description="إذا اكتشف التطبيق أي جهاز غير موثوق أو نشاط غريب، فإنه ينشئ شبكة مؤقتة معزولة لحماية المستخدم."
        icon={<Shield size={20} />}
        enabled={features.networkIsolation}
        onToggle={() => toggleFeature('networkIsolation')}
        info="يكتشف الأنشطة المشبوهة ويعزلها تلقائيًا"
      />
      
      <FeatureCard 
        title="تحسين تلقائي لخوادم DNS (Auto-DNS Optimization)"
        description="يقوم التطبيق بتحليل سرعة خوادم DNS المتاحة واختيار الأسرع تلقائيًا."
        icon={<Globe size={20} />}
        enabled={features.dnsOptimization}
        onToggle={() => toggleFeature('dnsOptimization')}
        info="يحسن سرعة تصفح الإنترنت بنسبة تصل إلى 35%"
      />
      
      <FeatureCard 
        title="خريطة تفاعلية لتأخير الشبكة (Latency Heatmap)"
        description="تعرض مناطق الشبكة الأبطأ والأسرع في واجهة 3D."
        icon={<Network size={20} />}
        enabled={features.latencyHeatmap}
        onToggle={() => toggleFeature('latencyHeatmap')}
        preview={<LatencyHeatmapPreview />}
      />
      
      <FeatureCard 
        title="إعادة توجيه ذكي لحركة البيانات (AI Traffic Shaping)"
        description="يوزع النطاق الترددي بشكل ذكي حسب الأولوية (مثلاً إعطاء الأولوية للألعاب والبث المباشر)."
        icon={<Server size={20} />}
        enabled={features.trafficShaping}
        onToggle={() => toggleFeature('trafficShaping')}
        badge="متقدم"
      />
      
      <FeatureCard 
        title="وضع التخفي الكامل (Invisible Mode)"
        description="يجعل الجهاز غير قابل للكشف على الشبكة لمنع عمليات الاختراق والتتبع."
        icon={<WifiOff size={20} />}
        enabled={features.invisibleMode}
        onToggle={() => toggleFeature('invisibleMode')}
      />
      
      <FeatureCard 
        title="استنساخ إعدادات الشبكة تلقائيًا (Smart Network Cloning)"
        description="إذا كنت تنتقل بين شبكات مختلفة، يقوم التطبيق بتحليل أفضل الإعدادات ويستنسخها لتوفير نفس الجودة."
        icon={<RefreshCcw size={20} />}
        enabled={features.networkCloning}
        onToggle={() => toggleFeature('networkCloning')}
        comingSoon
      />
      
      <FeatureCard 
        title="دمج عدة شبكات في وقت واحد (Multi-Network Aggregation)"
        description="يسمح باستخدام Wi-Fi وكابل إيثرنت معًا لزيادة السرعة والاستقرار."
        icon={<Wifi size={20} />}
        enabled={features.multiNetwork}
        onToggle={() => toggleFeature('multiNetwork')}
        info="يزيد السرعة بمقدار مجموع الشبكات المتصلة"
      />
      
      <FeatureCard 
        title="إصلاح تلقائي لمشاكل الاتصال (AI Auto-Healing)"
        description="عندما يكتشف التطبيق مشاكل اتصال أو بطء الإنترنت، يقوم بإجراء تحليل تلقائي واقتراح حلول فورية."
        icon={<BrainCircuit size={20} />}
        enabled={features.autoHealing}
        onToggle={() => toggleFeature('autoHealing')}
      />
      
      <FeatureCard 
        title="مساعد ذكي شخصي لتحليل الشبكة (Personalized AI Assistant)"
        description="روبوت ذكاء اصطناعي يتفاعل صوتيًا ويجيب عن استفسارات المستخدم حول الشبكة."
        icon={<BrainCircuit size={20} />}
        enabled={features.aiAssistant}
        onToggle={() => toggleFeature('aiAssistant')}
        badge="مميز"
      />
      
      <FeatureCard 
        title="تقوية الإشارة الذكية (AI Signal Booster)"
        description="يقوم بتحليل أفضل الأماكن لوضع الراوتر أو مكرر الإشارة داخل المبنى."
        icon={<Wifi size={20} />}
        enabled={features.signalBooster}
        onToggle={() => toggleFeature('signalBooster')}
      />
      
      <FeatureCard 
        title="كشف ومنع عمليات الاختراق الصامتة (Dark Web Protection)"
        description="يراقب الاتصالات المشبوهة المرتبطة بالشبكة المظلمة (Dark Web)."
        icon={<ShieldOff size={20} />}
        enabled={features.darkWebProtection}
        onToggle={() => toggleFeature('darkWebProtection')}
        badge="أمان متقدم"
      />
      
      <FeatureCard 
        title="مراقبة درجة حرارة الأجهزة المتصلة (Device Heat Monitoring)"
        description="يتتبع درجة حرارة أجهزة الكمبيوتر أو الراوتر ويحذر المستخدم عند ارتفاعها بشكل غير طبيعي."
        icon={<ThermometerSun size={20} />}
        enabled={features.deviceHeat}
        onToggle={() => toggleFeature('deviceHeat')}
      />
    </div>
  );
};
