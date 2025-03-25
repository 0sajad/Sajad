
import React, { useState } from "react";
import { FeatureCard } from "./FeatureCard";
import { HolographicPreview } from "./previewComponents/HolographicPreview";
import { LatencyHeatmapPreview } from "./previewComponents/LatencyHeatmapPreview";
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
  WifiOff,
  ShieldOff,
  RefreshCcw
} from "lucide-react";
import { FeatureState, createInitialFeatureState } from "./featureDefinitions";

export const FeatureList = () => {
  const [features, setFeatures] = useState<FeatureState>(createInitialFeatureState());

  const toggleFeature = (feature: keyof FeatureState) => {
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
