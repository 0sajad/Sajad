
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";

export function AdvancedTabContent() {
  const { t } = useTranslation();
  
  return (
    <TabsContent value="advanced" className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <p className="text-muted-foreground col-span-full">
          {t('accessibility.advancedSettingsDescription', 'ستظهر هنا المزيد من الإعدادات المتقدمة في الإصدارات القادمة.')}
        </p>
      </div>
    </TabsContent>
  );
}
