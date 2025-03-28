
import React from "react";
import { useTranslation } from "react-i18next";
import { 
  Network, 
  ShieldCheck, 
  Zap, 
  Wifi, 
  Code, 
  FileText, 
  BarChart4 
} from "lucide-react";

interface AIUseCase {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function AISuggestedUses() {
  const { t } = useTranslation();
  
  const useCases: AIUseCase[] = [
    {
      id: "network-analysis",
      icon: <Network className="h-5 w-5 text-blue-500" />,
      title: t('ai.useCases.networkAnalysis.title', 'تحليل الشبكة'),
      description: t('ai.useCases.networkAnalysis.description', 'مراقبة وتحليل أداء الشبكة وتحديد نقاط الضعف')
    },
    {
      id: "security",
      icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      title: t('ai.useCases.security.title', 'تعزيز الأمان'),
      description: t('ai.useCases.security.description', 'تحديد التهديدات المحتملة واقتراح إجراءات لتحسين الأمان')
    },
    {
      id: "optimization",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      title: t('ai.useCases.optimization.title', 'تحسين الأداء'),
      description: t('ai.useCases.optimization.description', 'تحسين سرعة واستقرار الشبكة وتقليل زمن الاستجابة')
    },
    {
      id: "troubleshooting",
      icon: <Wifi className="h-5 w-5 text-red-500" />,
      title: t('ai.useCases.troubleshooting.title', 'استكشاف الأخطاء'),
      description: t('ai.useCases.troubleshooting.description', 'تشخيص وإصلاح مشاكل الاتصال والشبكة بشكل تلقائي')
    },
    {
      id: "code-generation",
      icon: <Code className="h-5 w-5 text-purple-500" />,
      title: t('ai.useCases.codeGeneration.title', 'توليد الشيفرة البرمجية'),
      description: t('ai.useCases.codeGeneration.description', 'إنشاء شيفرات برمجية للتعامل مع إعدادات الشبكة')
    },
    {
      id: "documentation",
      icon: <FileText className="h-5 w-5 text-gray-500" />,
      title: t('ai.useCases.documentation.title', 'توثيق الشبكة'),
      description: t('ai.useCases.documentation.description', 'إنشاء وثائق تقنية مفصلة عن الشبكة وإعداداتها')
    },
    {
      id: "reports",
      icon: <BarChart4 className="h-5 w-5 text-indigo-500" />,
      title: t('ai.useCases.reports.title', 'التقارير والإحصائيات'),
      description: t('ai.useCases.reports.description', 'إنشاء تقارير تحليلية عن أداء الشبكة وتحليل البيانات')
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">{t('ai.suggestedUses', 'استخدامات مقترحة للذكاء الاصطناعي')}</h3>
      
      <div className="grid grid-cols-1 gap-3">
        {useCases.map(useCase => (
          <button
            key={useCase.id}
            className="flex items-start p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
          >
            <div className="mr-3 rtl:ml-3 rtl:mr-0 mt-0.5">
              {useCase.icon}
            </div>
            <div>
              <h4 className="text-sm font-medium">{useCase.title}</h4>
              <p className="text-xs text-muted-foreground">{useCase.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
