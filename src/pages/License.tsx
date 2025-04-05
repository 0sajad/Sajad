
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LicenseSelector } from "@/components/license/LicenseSelector";
import { ConfigSync } from "@/components/dev/ConfigSync";
import { SyncGuide } from "@/components/license/SyncGuide";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const License = () => {
  const { t } = useTranslation();
  // Add state for license type
  const [licenseType, setLicenseType] = useState<"client" | "developer">("client");
  // Add state for active tab
  const [activeTab, setActiveTab] = useState<"sync" | "guide">("sync");

  // Handle license type change
  const handleLicenseChange = (value: string) => {
    setLicenseType(value as "client" | "developer");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">إدارة الترخيص</h1>
      
      <LicenseSelector 
        value={licenseType} 
        onChange={handleLicenseChange} 
      />
      
      {/* قسم المزامنة عند اختيار وضع المطور */}
      {licenseType === "developer" && (
        <div className="mt-8">
          <Card className="border-indigo-200">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
              <CardTitle>مزامنة التكوين</CardTitle>
              <CardDescription>
                استخدم هذه الأداة لمشاركة إعدادات وضع المطور مع العملاء على أجهزة بعيدة
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ConfigSync />
            </CardContent>
          </Card>
          
          {/* إضافة دليل المزامنة المصور */}
          <SyncGuide />
        </div>
      )}
      
      {/* قسم المزامنة عند اختيار وضع العميل */}
      {licenseType === "client" && (
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "sync" | "guide")}>
            <TabsList className="mb-4">
              <TabsTrigger value="sync">إعدادات المزامنة</TabsTrigger>
              <TabsTrigger value="guide">دليل المزامنة المصور</TabsTrigger>
            </TabsList>
            
            <TabsContent value="sync">
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="guide">
              <SyncGuide />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default License;
