
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

:: تثبيت Vite مباشرة
echo تثبيت Vite...
call npm install --no-save vite@latest

:: تشغيل سكربت إعداد Vite للتأكد من التثبيت الصحيح
node scripts/setup-vite.js

:: تشغيل التطبيق
echo تشغيل التطبيق...
node scripts/run-electron.js dev

echo.
echo إذا واجهت أي مشاكل، يرجى الضغط على أي مفتاح ثم اتباع التعليمات التالية:
echo 1. تأكد من تثبيت Node.js بشكل صحيح
echo 2. جرب تنفيذ الأمر: npm install vite --no-save
echo 3. ثم أعد تشغيل هذا الملف
pause
