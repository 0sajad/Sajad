
import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SettingsMenu } from "@/components/settings/SettingsMenu";
import { AdvancedFeatures } from "@/components/settings/AdvancedFeatures";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Shield, Zap, Cpu, Server, BrainCircuit } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      
      <main className="container mx-auto px-6 py-24">
        <div className="flex items-center mb-8">
          <h1 className="text-3xl font-bold font-tajawal">الإعدادات المتقدمة</h1>
          <span className="mr-3 px-3 py-1 text-xs font-medium bg-octaBlue-50 text-octaBlue-600 rounded-full">
            نسخة المطور
          </span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SettingsMenu />
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="features" dir="rtl" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="features" className="font-tajawal">الميزات المتقدمة</TabsTrigger>
                <TabsTrigger value="network" className="font-tajawal">إعدادات الشبكة</TabsTrigger>
                <TabsTrigger value="security" className="font-tajawal">الأمان والخصوصية</TabsTrigger>
                <TabsTrigger value="system" className="font-tajawal">النظام</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <BrainCircuit className="text-purple-600 ml-2" size={24} />
                    <h2 className="text-2xl font-semibold font-tajawal">ميزات الذكاء الاصطناعي</h2>
                  </div>
                  <p className="text-muted-foreground font-tajawal leading-relaxed">
                    قم بتفعيل ميزات الذكاء الاصطناعي المتقدمة لتحليل شبكتك وتحسينها تلقائيًا.
                  </p>
                  <Separator className="my-4" />
                  
                  <AdvancedFeatures />
                </div>
              </TabsContent>
              
              <TabsContent value="network">
                <div className="flex items-center">
                  <Server className="text-octaBlue-600 ml-2" size={24} />
                  <h2 className="text-2xl font-semibold font-tajawal">إعدادات الشبكة المتقدمة</h2>
                </div>
                <p className="text-muted-foreground font-tajawal leading-relaxed mt-2">
                  تحكم في جميع جوانب اتصال الشبكة لديك، من تحسين DNS إلى دمج الشبكات المتعددة.
                </p>
                <Separator className="my-4" />
                <div className="border rounded-lg p-8 text-center">
                  <p className="text-xl font-tajawal">قريبًا</p>
                </div>
              </TabsContent>
              
              <TabsContent value="security">
                <div className="flex items-center">
                  <Shield className="text-green-600 ml-2" size={24} />
                  <h2 className="text-2xl font-semibold font-tajawal">إعدادات الأمان والخصوصية</h2>
                </div>
                <p className="text-muted-foreground font-tajawal leading-relaxed mt-2">
                  اضبط مستويات الحماية والخصوصية لشبكتك وأجهزتك المتصلة.
                </p>
                <Separator className="my-4" />
                <div className="border rounded-lg p-8 text-center">
                  <p className="text-xl font-tajawal">قريبًا</p>
                </div>
              </TabsContent>
              
              <TabsContent value="system">
                <div className="flex items-center">
                  <Cpu className="text-amber-600 ml-2" size={24} />
                  <h2 className="text-2xl font-semibold font-tajawal">إعدادات النظام</h2>
                </div>
                <p className="text-muted-foreground font-tajawal leading-relaxed mt-2">
                  ضبط إعدادات موارد النظام وإدارة الطاقة والأداء.
                </p>
                <Separator className="my-4" />
                <div className="border rounded-lg p-8 text-center">
                  <p className="text-xl font-tajawal">قريبًا</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
