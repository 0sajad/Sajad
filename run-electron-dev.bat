
@echo off
echo جاري تشغيل تطبيق إلكترون في وضع التطوير...
echo يرجى الانتظار قليلاً حتى يتم تحميل التطبيق...

:: تثبيت الحزم المطلوبة إذا لم تكن موجودة
call npm install --no-save
echo تم التأكد من وجود جميع الحزم المطلوبة.

:: تحقق مما إذا كان ملف Vite موجوداً في node_modules
if not exist "node_modules\.bin\vite.cmd" (
  echo تثبيت Vite...
  call npm install --no-save vite
)

:: تشغيل التطبيق
node scripts/run-electron.js dev

echo.
echo إذا واجهت أي مشاكل، يرجى الضغط على أي مفتاح ثم اتباع التعليمات.
pause
