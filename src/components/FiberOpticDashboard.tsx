
import React, { useState, useEffect } from "react";
import { FiberSpeedCard } from "./network/FiberSpeedCard";
import { FiberTemperatureCard } from "./network/FiberTemperatureCard";
import { FiberEncryptionCard } from "./network/FiberEncryptionCard";
import { FiberAnalysisCard } from "./network/FiberAnalysisCard";
import { FiberReportCard } from "./network/FiberReportCard";
import { toast } from "@/components/ui/use-toast";

export function FiberOpticDashboard() {
  const [fiberSpeed, setFiberSpeed] = useState(0);
  const [fiberQuality, setFiberQuality] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [encryptionEnabled, setEncryptionEnabled] = useState(false);
  const [encryptionType, setEncryptionType] = useState("");
  const [signalData, setSignalData] = useState<{ time: string; value: number }[]>([]);
  const [issues, setIssues] = useState<any[]>([]);

  useEffect(() => {
    // محاكاة بيانات الألياف الضوئية
    setFiberSpeed(parseFloat((Math.random() * 2 + 0.8).toFixed(2)));
    setFiberQuality(Math.floor(Math.random() * 100));
    setTemperature(Math.floor(Math.random() * 45 + 15));
    setEncryptionEnabled(Math.random() > 0.3);
    setEncryptionType(Math.random() > 0.5 ? "AES-256" : "Quantum Encryption");
    
    // إنشاء بيانات للرسم البياني
    const generateSignalData = () => {
      const now = new Date();
      const data = [];
      for (let i = 10; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 3600000);
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        data.push({
          time: `${hours}:${minutes}`,
          value: Math.floor(Math.random() * 30 + 70)
        });
      }
      setSignalData(data);
    };
    
    // إنشاء مشاكل افتراضية للتشخيص
    const generateIssues = () => {
      const issueTypes = ["critical", "warning", "info"];
      const issueMessages = [
        "انقطاع في إشارة الألياف الضوئية",
        "ضعف في جودة الإشارة",
        "ارتفاع في درجة حرارة المحول",
        "تأخر في استجابة الشبكة",
        "اتصال مستقر"
      ];
      const locations = [
        "المحول الرئيسي",
        "كابل الألياف #24",
        "نقطة الاتصال A2",
        "المجمع السكني"
      ];
      
      const newIssues = [];
      const issueCount = Math.floor(Math.random() * 3 + 1);
      
      for (let i = 0; i < issueCount; i++) {
        const type = issueTypes[Math.floor(Math.random() * issueTypes.length)] as "critical" | "warning" | "info";
        const message = issueMessages[Math.floor(Math.random() * issueMessages.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        newIssues.push({
          id: i + 1,
          type,
          message,
          location,
          timestamp: `${hours}:${minutes}`
        });
      }
      
      setIssues(newIssues);
    };
    
    generateSignalData();
    generateIssues();
    
    // محاكاة تحديث البيانات كل 10 ثوانٍ
    const interval = setInterval(() => {
      setFiberSpeed(parseFloat((Math.random() * 2 + 0.8).toFixed(2)));
      setFiberQuality(Math.floor(Math.random() * 100));
      setTemperature(Math.floor(Math.random() * 45 + 15));
      
      // إظهار تنبيه إذا كانت جودة الإشارة منخفضة أو درجة الحرارة مرتفعة
      const newQuality = Math.floor(Math.random() * 100);
      const newTemperature = Math.floor(Math.random() * 45 + 15);
      
      if (newQuality < 30) {
        toast({
          title: "تحذير: إشارة ضعيفة",
          description: "جودة إشارة الألياف الضوئية منخفضة. يرجى التحقق من الاتصال.",
          variant: "destructive"
        });
      }
      
      if (newTemperature > 40) {
        toast({
          title: "تحذير: درجة حرارة مرتفعة",
          description: "درجة حرارة محول الألياف الضوئية مرتفعة. يرجى التحقق من نظام التبريد.",
          variant: "destructive"
        });
      }
      
      // تحديث الرسم البياني ببيانات جديدة
      setSignalData(prev => {
        const newData = [...prev];
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        
        newData.shift();
        newData.push({
          time: `${hours}:${minutes}`,
          value: Math.floor(Math.random() * 30 + 70)
        });
        
        return newData;
      });
      
      // تحديث المشاكل بشكل عشوائي
      if (Math.random() > 0.7) {
        generateIssues();
      }
      
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="fiber-dashboard" className="pt-24 pb-16 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-tajawal">مراقبة الألياف الضوئية</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-tajawal">
            تحليل ومراقبة أداء شبكة الألياف الضوئية والأجهزة المتصلة في الوقت الفعلي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <FiberSpeedCard fiberSpeed={fiberSpeed} fiberQuality={fiberQuality} />
          <FiberTemperatureCard temperature={temperature} />
          <FiberEncryptionCard 
            encryptionEnabled={encryptionEnabled} 
            encryptionType={encryptionType} 
          />
          <FiberReportCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FiberAnalysisCard 
            signalData={signalData}
            issues={issues}
          />
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-xl p-6 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 font-tajawal">معلومات الألياف الضوئية</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">نوع الألياف</p>
                  <p className="font-medium">Single-mode Fiber (SMF)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">الطول الموجي</p>
                  <p className="font-medium">1310/1550 nm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">مزود الخدمة</p>
                  <p className="font-medium font-tajawal">شركة الاتصالات المتكاملة</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1 font-tajawal">نوع الاتصال</p>
                  <p className="font-medium">GPON (2.5/1.25 Gbps)</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium mb-2 font-tajawal">معلومات الشبكة</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="font-tajawal">OLT (Optical Line Terminal) حالة: نشط</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="font-tajawal">ONT (Optical Network Terminal) حالة: متصل</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                    <span className="font-tajawal">Splitter حالة: يعمل</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
