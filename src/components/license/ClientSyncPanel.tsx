
import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClientSyncPanelProps {
  autoSyncEnabled: boolean;
}

export function ClientSyncPanel({ autoSyncEnabled }: ClientSyncPanelProps) {
  const { t } = useTranslation();
  
  return (
    <Card className="border-indigo-200">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
        <CardTitle>مزامنة تكوين العميل</CardTitle>
        <CardDescription>
          أدخل مفتاح المزامنة للحصول على أحدث الإعدادات من المطور
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            للحصول على أحدث التكوينات والإعدادات، اطلب مفتاح المزامنة من المطور واستخدم زر "تزامن" في شريط التنقل العلوي.
          </p>
          <div className="p-4 border rounded-md bg-blue-50 text-blue-800 text-sm">
            يمكنك الآن مزامنة الإعدادات والتكوينات مع جهاز المطور حتى لو كنت في شبكة مختلفة أو دولة أخرى!
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium">مزامنة تلقائية</span>
            <Badge className={autoSyncEnabled ? "bg-green-500" : "bg-gray-500"}>
              {autoSyncEnabled ? "مفعل" : "معطل"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            عند تفعيل المزامنة التلقائية، سيقوم التطبيق بالتحقق من وجود تحديثات كل 5 دقائق تلقائيًا.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
