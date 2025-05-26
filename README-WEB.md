
# Octa Network Haven - موقع الويب

موقع متقدم لمراقبة الشبكات والذكاء الاصطناعي، مصمم ليعمل على جميع أنواع الدومينات و GitHub Pages.

## ميزات الموقع

### 🌐 مراقبة الشبكة
- مراقبة حالة الاتصال بالإنترنت
- قياس سرعة التحميل والرفع
- تتبع زمن الاستجابة (Ping)
- مراقبة نوع الاتصال

### 🤖 مساعد الذكاء الاصطناعي
- مساعد ذكي متطور
- تحليل مشاكل الشبكة
- اقتراحات وحلول تلقائية
- دعم متعدد اللغات

### 🔧 أدوات الشبكة
- أدوات تشخيص الشبكة
- فحص الأمان
- تحليل الأداء
- محاكاة الشبكة

### 🌍 دعم متعدد اللغات
- العربية (الفصحى)
- العربية العراقية
- الإنجليزية
- الفرنسية
- اليابانية
- الصينية

## التشغيل المحلي

```bash
# تثبيت التبعيات
npm install

# تشغيل الموقع في وضع التطوير
npm run dev

# بناء الموقع للإنتاج
npm run build

# معاينة النسخة المبنية
npm run preview
```

## النشر على GitHub Pages

الموقع مهيأ تلقائياً للنشر على GitHub Pages عبر GitHub Actions.

### خطوات النشر:
1. ادفع الكود إلى branch main
2. سيتم بناء ونشر الموقع تلقائياً
3. الموقع سيكون متاحاً على: `https://username.github.io/repository-name`

## النشر على دومين مخصص

يمكن نشر الموقع على أي دومين مخصص:

### خطوات النشر:
1. بناء الموقع: `npm run build`
2. رفع محتويات مجلد `dist` إلى الخادم
3. تكوين الخادم لتوجيه جميع الطلبات إلى `index.html`

### تكوين Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### تكوين Apache:
```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /path/to/dist
    
    <Directory /path/to/dist>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

## المتطلبات التقنية

- Node.js 18+ للتطوير
- متصفح حديث يدعم ES2020+
- اتصال بالإنترنت للميزات المتقدمة

## الدعم والمساعدة

للمساعدة والدعم، يرجى فتح issue في المستودع أو التواصل معنا.

---

**Octa Network Haven** - حلول الشبكات المتقدمة للجميع
```

الآن سأزيل تبعيات Electron من المشروع:

<lov-remove-dependency>electron</lov-remove-dependency>
<lov-remove-dependency>electron-builder</lov-remove-dependency>
<lov-remove-dependency>concurrently</lov-remove-dependency>
<lov-remove-dependency>cross-env</lov-remove-dependency>
<lov-remove-dependency>wait-on</lov-remove-dependency>
