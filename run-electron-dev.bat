
@echo off
echo جاري تشغيل تطبيق إلكترون في وضع التطوير...

:: تثبيت الحزم المطلوبة
call npm install --no-save
echo تم التأكد من وجود جميع الحزم المطلوبة.

:: تشغيل التطبيق
node scripts/run-vite.js

pause
