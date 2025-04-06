import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cloud, 
  Download, 
  Key, 
  ArrowRight, 
  CheckCircle,
  CloudDownload,
  Code,
  User
} from "lucide-react";

export function SyncGuide() {
  const { t } = useTranslation('license');

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">{t('syncGuide.title', 'دليل المزامنة المصور')}</h2>
      <p className="text-muted-foreground mb-6">
        {t('syncGuide.description', 'يوضح هذا الدليل كيفية مزامنة الإعدادات بين جهاز المطور وأجهزة العملاء البعيدة')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-indigo-200">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 text-white p-2 rounded-full">
                <Code size={20} />
              </div>
              <CardTitle className="text-lg">{t('syncGuide.developer.title', 'خطوات المطور')}</CardTitle>
            </div>
            <CardDescription>
              {t('syncGuide.developer.description', 'ما يجب على المطور القيام به لمشاركة الإعدادات')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium mb-1">{t('syncGuide.developer.step1.title', 'التبديل إلى وضع المطور')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('syncGuide.developer.step1.description', 'انقر على زر التبديل في الأعلى للانتقال إلى وضع المطور')}
                  </p>
                  <div className="border rounded-md p-3 bg-gray-50 flex items-center gap-2">
                    <User size={16} className="text-gray-500" />
                    <ArrowRight size={16} className="text-indigo-500" />
                    <Code size={16} className="text-indigo-600" />
                  </div>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium mb-1">{t('syncGuide.developer.step2.title', 'إجراء التغييرات المطلوبة')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('syncGuide.developer.step2.description', 'قم بإجراء التغييرات المطلوبة على الإعدادات والميزات في لوحة تحكم المطور')}
                  </p>
                  <div className="border rounded-md p-2 bg-gray-50">
                    <div className="w-full h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-md flex items-center justify-center text-xs text-indigo-800">
                      لوحة تحكم المطور
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium mb-1">{t('syncGuide.developer.step3.title', 'فتح قسم المزامنة وإنشاء مفتاح')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('syncGuide.developer.step3.description', 'انتقل إلى علامة التبويب "المزامنة" واضغط على زر "رفع التكوين" لإنشاء مفتاح مزامنة')}
                  </p>
                  <div className="border rounded-md p-2 bg-gray-50 flex flex-col">
                    <div className="flex items-center gap-2 mb-2">
                      <Cloud size={16} className="text-indigo-600" />
                      <span className="text-xs font-medium">رفع التكوين</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 text-green-800 p-1 rounded-md text-xs text-center">
                      <Key size={14} className="inline-block mr-1" /> ABC123XYZ
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="bg-indigo-100 text-indigo-800 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium mb-1">{t('syncGuide.developer.step4.title', 'مشاركة المفتاح مع العملاء')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('syncGuide.developer.step4.description', 'شارك مفتاح المزامنة مع العملاء عن طريق البريد الإلكتروني أو أي وسيلة أخرى')}
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-full">
                <User size={20} />
              </div>
              <CardTitle className="text-lg">{t('syncGuide.client.title', 'خطوات العميل')}</CardTitle>
            </div>
            <CardDescription>
              {t('syncGuide.client.description', 'ما يحتاج العميل القيام به لاستقبال الإعدادات من المطور')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ol className="space-y-6">
              <li className="flex gap-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-medium mb-1">{t('syncGuide.client.step1.title', 'التأكد من وضع العميل')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('syncGuide.client.step1.description', 'تأكد من أن التطبيق في وضع العميل وليس وضع المطور')}
                  </p>
                  <div className="border rounded-md p-3 bg-gray-50 flex items-center gap-2">
                    <User size={16} className="text-blue-600" />
                    <Code size={16} className="text-gray-400" />
                  </div>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-medium mb-1">{t('syncGuide.client.step2.title', 'النقر على زر التزامن')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('syncGuide.client.step2.description', 'انقر على زر "تزامن" في شريط التنقل العلوي')}
                  </p>
                  <div className="border rounded-md p-3 bg-gray-50 flex items-center gap-2">
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-md flex items-center gap-1">
                      <Download size={14} /> تزامن
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-medium mb-1">{t('syncGuide.client.step3.title', 'إدخال مفتاح المزامنة')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('syncGuide.client.step3.description', 'أدخل مفتاح المزامنة الذي استلمته من المطور في مربع الحوار الذي يظهر')}
                  </p>
                  <div className="border rounded-md p-2 bg-gray-50">
                    <div className="p-2 text-xs text-center border rounded-md">
                      <span className="text-blue-600">أدخل مفتاح المزامنة</span><br />
                      <span className="text-gray-500">مثال: ABC123XYZ</span>
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-medium mb-1">{t('syncGuide.client.step4.title', 'تنزيل التكوين')}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('syncGuide.client.step4.description', 'انقر على زر "تنزيل التكوين" لاستلام أحدث الإعدادات')}
                  </p>
                  <div className="border rounded-md p-2 bg-gray-50 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 bg-blue-600 text-white rounded-md py-1 text-xs flex items-center justify-center gap-1">
                        <Download size={12} />
                        تنزيل
                      </div>
                      <CheckCircle size={18} className="text-green-500" />
                    </div>
                  </div>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <Card className="border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-full">
              <CloudDownload size={20} />
            </div>
            <CardTitle className="text-lg">{t('syncGuide.faq.title', 'أسئلة متكررة عن المزامنة')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-green-800 mb-1">{t('syncGuide.faq.q1', 'هل يمكن للعميل المزامنة من أي مكان في العالم؟')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('syncGuide.faq.a1', 'نعم، يمكن للعميل مزامنة الإعدادات من أي مكان طالما لديه مفتاح المزامنة الصحيح واتصال بالإنترنت.')}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-green-800 mb-1">{t('syncGuide.faq.q2', 'هل تنتقل جميع الإعدادات إلى العميل؟')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('syncGuide.faq.a2', 'نعم، تنتقل جميع الإعدادات والميزات التي قام المطور بتكوينها إلى العميل عند المزامنة.')}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-green-800 mb-1">{t('syncGuide.faq.q3', 'ماذا لو واجهت مشكلة أثناء المزامنة؟')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('syncGuide.faq.a3', 'تأكد من إدخال مفتاح المزامنة بشكل صحيح وأن لديك اتصالاً بالإنترنت. إذا استمرت المشكلة، تواصل مع المطور للحصول على مفتاح جديد.')}
              </p>
            </div>
            <div>
              <h3 className="font-medium text-green-800 mb-1">{t('syncGuide.faq.q4', 'كم مرة يجب أن أقوم بالمزامنة؟')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('syncGuide.faq.a4', 'قم بالمزامنة كلما أخبرك المطور بوجود تحديثات جديدة وإعدادات محسنة. المزامنة ليست تلقائية وتتطلب تدخلك.')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
