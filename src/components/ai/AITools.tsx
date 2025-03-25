
import React from "react";
import { Code, Network, Globe, Database, RefreshCcw } from "lucide-react";

export const AITools = () => {
  return (
    <div className="p-6 h-[500px]">
      <h3 className="text-xl font-semibold mb-4 font-tajawal">أدوات متقدمة للمطورين</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-octaBlue-50 ml-0 mr-3 rtl:ml-3 rtl:mr-0">
              <Code size={18} className="text-octaBlue-600" />
            </div>
            <div>
              <h4 className="font-medium font-tajawal">محرر الكود الذكي</h4>
              <p className="text-xs text-muted-foreground font-tajawal">تحرير وتحليل الكود مع اقتراحات ذكية</p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-purple-50 ml-0 mr-3 rtl:ml-3 rtl:mr-0">
              <Network size={18} className="text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium font-tajawal">محلل الشبكات</h4>
              <p className="text-xs text-muted-foreground font-tajawal">تحليل وتشخيص مشاكل الشبكات</p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-green-50 ml-0 mr-3 rtl:ml-3 rtl:mr-0">
              <Globe size={18} className="text-green-600" />
            </div>
            <div>
              <h4 className="font-medium font-tajawal">منشئ التطبيقات</h4>
              <p className="text-xs text-muted-foreground font-tajawal">إنشاء تطبيقات ويب وبرامج بسرعة</p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="flex items-center">
            <div className="p-2 rounded-md bg-amber-50 ml-0 mr-3 rtl:ml-3 rtl:mr-0">
              <Database size={18} className="text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium font-tajawal">إدارة قواعد البيانات</h4>
              <p className="text-xs text-muted-foreground font-tajawal">إنشاء وإدارة قواعد البيانات</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <h4 className="font-medium mb-2 flex items-center font-tajawal">
          <RefreshCcw size={16} className="ml-0 mr-2 rtl:ml-2 rtl:mr-0 animate-spin" />
          جاري تطوير أدوات جديدة
        </h4>
        <p className="text-sm text-muted-foreground font-tajawal">
          يقوم الذكاء الاصطناعي بتطوير أدوات جديدة باستمرار بناءً على آخر التقنيات في مجال الشبكات والبرمجة
        </p>
      </div>
    </div>
  );
};
