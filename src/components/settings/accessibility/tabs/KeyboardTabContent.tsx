
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { KeyboardShortcutsList, defaultA11yShortcuts } from "@/components/ui/accessibility/keyboard-shortcuts-list";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyboardShortcuts } from "@/components/settings/accessibility/KeyboardShortcuts";
import { ScrollArea } from "@/components/ui/scroll-area";

export function KeyboardTabContent() {
  const { t } = useTranslation();

  return (
    <TabsContent value="keyboard" className="space-y-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('accessibility.keyboardShortcuts', 'اختصارات لوحة المفاتيح')}</CardTitle>
          <CardDescription>
            {t('accessibility.keyboardShortcutsDescription', 'استخدم اختصارات لوحة المفاتيح للوصول السريع إلى ميزات إمكانية الوصول')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <KeyboardShortcuts />
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">
              {t('accessibility.allAvailableShortcuts', 'جميع الاختصارات المتاحة')}
            </h3>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              <KeyboardShortcutsList 
                shortcuts={defaultA11yShortcuts} 
                enableHint={true}
                badgeVariant="secondary"
              />
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>{t('accessibility.customizeShortcuts', 'تخصيص الاختصارات')}</CardTitle>
          <CardDescription>
            {t('accessibility.customizeShortcutsDescription', 'سيكون متاحًا في الإصدارات المستقبلية')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32 border rounded-md border-dashed text-muted-foreground">
            {t('accessibility.comingSoon', 'قادم قريبًا')}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
