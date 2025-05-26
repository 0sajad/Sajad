
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/useTheme';
import { Shield, CheckCircle, Clock, Users } from 'lucide-react';

export default function License() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme === 'dark' ? 'dark' : 'light');

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('license.title', 'الترخيص والاشتراك')}</h1>
          <p className="text-muted-foreground">
            {t('license.subtitle', 'إدارة ترخيص البرنامج ومعلومات الاشتراك')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                حالة الترخيص
              </CardTitle>
              <CardDescription>
                معلومات الترخيص الحالي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>النوع</span>
                <Badge variant="default">مجاني</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>الحالة</span>
                <Badge variant="default" className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  نشط
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>تاريخ الانتهاء</span>
                <span className="text-sm text-muted-foreground">غير محدود</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                معلومات الاستخدام
              </CardTitle>
              <CardDescription>
                إحصائيات الاستخدام الحالية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span>المستخدمون النشطون</span>
                <Badge variant="outline">1</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>آخر استخدام</span>
                <span className="text-sm text-muted-foreground">الآن</span>
              </div>
              <div className="flex items-center justify-between">
                <span>إجمالي الجلسات</span>
                <span className="text-sm text-muted-foreground">∞</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات النظام</CardTitle>
              <CardDescription>
                تخصيص إعدادات البرنامج
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">الوضع الداكن</h3>
                  <p className="text-sm text-muted-foreground">تبديل بين الوضع الفاتح والداكن</p>
                </div>
                <Button variant="outline" onClick={handleThemeToggle}>
                  {currentTheme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
