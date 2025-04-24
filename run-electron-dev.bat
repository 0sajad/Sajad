
@echo off
echo جاري تشغيل تطبيق إلكترون في وضع التطوير...
echo يرجى الانتظار قليلاً حتى يتم تحميل التطبيق...

:: إنشاء مجلد node_modules إذا لم يكن موجوداً
if not exist "node_modules" (
  mkdir node_modules
)

:: تثبيت الحزم المطلوبة إذا لم تكن موجودة
call npm install --no-save
echo تم التأكد من وجود جميع الحزم المطلوبة.

:: تثبيت Vite بشكل صريح (مع حفظ مخرجات الأمر للحصول على مزيد من المعلومات)
echo تثبيت Vite...
call npm install vite@latest --save-dev --verbose
call npm install -g vite --verbose

:: إضافة node_modules\.bin إلى PATH للجلسة الحالية
set PATH=%cd%\node_modules\.bin;%cd%\node_modules\vite\bin;%PATH%

:: تشغيل سكربت إعداد Vite للتأكد من التثبيت الصحيح
node scripts/setup-vite.js

:: استخدام npx لضمان تشغيل Vite
echo تشغيل التطبيق باستخدام npx vite...
npx vite --host --port 8080

echo.
echo إذا واجهت أي مشاكل، يرجى الضغط على أي مفتاح ثم اتباع التعليمات التالية:
echo 1. تأكد من تثبيت Node.js بشكل صحيح
echo 2. جرب تنفيذ الأمر: npm install vite --no-save
echo 3. ثم أعد تشغيل هذا الملف
pause
