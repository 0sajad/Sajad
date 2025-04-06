
import React from "react";
import { useTranslation } from "react-i18next";
import { 
  BarChart, 
  Shield, 
  Zap, 
  Wrench, 
  Code, 
  FileText, 
  PieChart,
  Search,
  Database,
  Network,
  Bot,
  BrainCircuit
} from "lucide-react";
import { motion } from "framer-motion";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";

interface UseCaseProps {
  icon: React.ElementType;
  title: string;
  description: string;
  isCompact?: boolean;
}

// مكون حالة استخدام منفردة
const UseCase = ({ icon: Icon, title, description, isCompact = false }: UseCaseProps) => {
  const { shouldUseAdvancedAnimations } = usePerformanceOptimization();
  
  const containerVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      scale: shouldUseAdvancedAnimations ? 1.03 : 1,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.div
      className={`p-3 rounded-md border bg-card/50 hover:bg-card transition-colors ${
        isCompact ? 'text-sm' : ''
      }`}
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={containerVariants}
    >
      <div className="flex items-start">
        <div className={`${isCompact ? 'p-1.5' : 'p-2'} rounded-md bg-primary/10 text-primary`}>
          <Icon size={isCompact ? 16 : 20} />
        </div>
        <div className={`ml-3 rtl:ml-0 rtl:mr-3 ${isCompact ? 'space-y-0.5' : 'space-y-1'}`}>
          <h3 className={`font-medium ${isCompact ? 'text-sm' : ''}`}>{title}</h3>
          {!isCompact && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </div>
    </motion.div>
  );
};

interface AISuggestedUsesProps {
  isCompact?: boolean;
  maxItems?: number;
}

export function AISuggestedUses({ isCompact = false, maxItems = 7 }: AISuggestedUsesProps) {
  const { t } = useTranslation();
  const { deviceTier } = usePerformanceOptimization();
  
  // تحديد عدد العناصر استنادًا إلى قدرة الجهاز
  const getOptimalItemCount = () => {
    if (deviceTier === 'low') {
      return Math.min(4, maxItems);
    }
    if (deviceTier === 'medium') {
      return Math.min(6, maxItems);
    }
    return maxItems;
  };
  
  // تعريف حالات الاستخدام
  const useCases = [
    {
      icon: BarChart,
      title: t('ai.useCases.networkAnalysis.title', 'تحليل الشبكة'),
      description: t('ai.useCases.networkAnalysis.description', 'مراقبة وتحليل أداء الشبكة وتحديد نقاط الضعف')
    },
    {
      icon: Shield,
      title: t('ai.useCases.security.title', 'تعزيز الأمان'),
      description: t('ai.useCases.security.description', 'تحديد التهديدات المحتملة واقتراح إجراءات لتحسين الأمان')
    },
    {
      icon: Zap,
      title: t('ai.useCases.optimization.title', 'تحسين الأداء'),
      description: t('ai.useCases.optimization.description', 'تحسين سرعة واستقرار الشبكة وتقليل زمن الاستجابة')
    },
    {
      icon: Wrench,
      title: t('ai.useCases.troubleshooting.title', 'استكشاف الأخطاء'),
      description: t('ai.useCases.troubleshooting.description', 'تشخيص وإصلاح مشاكل الاتصال والشبكة بشكل تلقائي')
    },
    {
      icon: Code,
      title: t('ai.useCases.codeGeneration.title', 'توليد الشيفرة البرمجية'),
      description: t('ai.useCases.codeGeneration.description', 'إنشاء شيفرات برمجية للتعامل مع إعدادات الشبكة')
    },
    {
      icon: FileText,
      title: t('ai.useCases.documentation.title', 'توثيق الشبكة'),
      description: t('ai.useCases.documentation.description', 'إنشاء وثائق تقنية مفصلة عن الشبكة وإعداداتها')
    },
    {
      icon: PieChart,
      title: t('ai.useCases.reports.title', 'التقارير والإحصائيات'),
      description: t('ai.useCases.reports.description', 'إنشاء تقارير تحليلية عن أداء الشبكة وتحليل البيانات')
    },
    {
      icon: Search,
      title: t('aiEnhanced.useCases.deepSearch.title', 'البحث المتقدم'),
      description: t('aiEnhanced.useCases.deepSearch.description', 'البحث الذكي عبر جميع بيانات الشبكة والنظام')
    },
    {
      icon: Database,
      title: t('aiEnhanced.useCases.dataAnalysis.title', 'تحليل البيانات'),
      description: t('aiEnhanced.useCases.dataAnalysis.description', 'استخراج رؤى مهمة من بيانات الشبكة الكبيرة')
    },
    {
      icon: Network,
      title: t('aiEnhanced.useCases.networkMapping.title', 'رسم خرائط الشبكة'),
      description: t('aiEnhanced.useCases.networkMapping.description', 'إنشاء خرائط تفاعلية لبنية الشبكة وعلاقاتها')
    },
    {
      icon: Bot,
      title: t('aiEnhanced.useCases.automation.title', 'أتمتة العمليات'),
      description: t('aiEnhanced.useCases.automation.description', 'تشغيل مهام الشبكة الروتينية بشكل آلي')
    },
    {
      icon: BrainCircuit,
      title: t('aiEnhanced.useCases.predictiveAnalysis.title', 'التحليل التنبؤي'),
      description: t('aiEnhanced.useCases.predictiveAnalysis.description', 'توقع مشكلات الشبكة قبل حدوثها')
    }
  ];
  
  const displayedUseCases = useCases.slice(0, getOptimalItemCount());
  
  // تعريف متغيرات الرسوم المتحركة للقائمة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div>
      <h3 className={`font-medium mb-3 ${isCompact ? 'text-sm' : ''}`}>
        {t('aiEnhanced.suggestedUses', 'استخدامات مقترحة للذكاء الاصطناعي')}
      </h3>
      <motion.div 
        className={`space-y-2 ${isCompact ? 'pr-1' : ''}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {displayedUseCases.map((useCase, index) => (
          <UseCase 
            key={index}
            icon={useCase.icon}
            title={useCase.title}
            description={useCase.description}
            isCompact={isCompact}
          />
        ))}
      </motion.div>
    </div>
  );
}
