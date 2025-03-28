
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccessibilityIcon, TextIcon, EyeIcon, MousePointerSquare, KeySquare } from "lucide-react";
import { useTranslation } from "react-i18next";

interface AccessibilityTabsProps {
  children: React.ReactNode;
  defaultTab?: string;
}

/**
 * مكون التبويبات لقائمة إمكانية الوصول
 */
export function AccessibilityTabs({ children, defaultTab = "display" }: AccessibilityTabsProps) {
  const { t } = useTranslation();
  
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="display" aria-label={t('accessibility.display', 'عرض')}>
          <EyeIcon className="h-4 w-4" />
          <span className="sr-only">{t('accessibility.display', 'عرض')}</span>
        </TabsTrigger>
        <TabsTrigger value="text" aria-label={t('accessibility.text', 'نص')}>
          <TextIcon className="h-4 w-4" />
          <span className="sr-only">{t('accessibility.text', 'نص')}</span>
        </TabsTrigger>
        <TabsTrigger value="motion" aria-label={t('accessibility.motion', 'حركة')}>
          <MousePointerSquare className="h-4 w-4" />
          <span className="sr-only">{t('accessibility.motion', 'حركة')}</span>
        </TabsTrigger>
        <TabsTrigger value="keyboard" aria-label={t('accessibility.keyboard', 'لوحة المفاتيح')}>
          <KeySquare className="h-4 w-4" />
          <span className="sr-only">{t('accessibility.keyboard', 'لوحة المفاتيح')}</span>
        </TabsTrigger>
        <TabsTrigger value="all" aria-label={t('accessibility.all', 'الكل')}>
          <AccessibilityIcon className="h-4 w-4" />
          <span className="sr-only">{t('accessibility.all', 'الكل')}</span>
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
}
