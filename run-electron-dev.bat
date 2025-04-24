
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

:: تشغيل سكربت إعداد Vite
node scripts/setup-vite.js

:: تحقق مما إذا كان ملف Vite موجوداً في node_modules
if not exist "node_modules\.bin\vite.cmd" (
  echo تثبيت Vite...
  call npm install --save-dev vite
)

:: تشغيل التطبيق
node scripts/run-electron.js dev

echo.
echo إذا واجهت أي مشاكل، يرجى الضغط على أي مفتاح ثم اتباع التعليمات التالية:
echo 1. تأكد من تثبيت Node.js بشكل صحيح
echo 2. جرب تنفيذ الأمر: npm install
echo 3. ثم أعد تشغيل هذا الملف
pause
