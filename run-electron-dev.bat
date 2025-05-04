
@echo off
echo جاري تشغيل تطبيق إلكترون في وضع التطوير...

:: التحقق من node_modules
if not exist "node_modules" (
  echo تثبيت الحزم المطلوبة...
  call npm install --no-save
)

:: التحقق من وجود Vite
if not exist "node_modules\vite" (
  echo تثبيت Vite...
  call npm install vite@latest --save-dev
)

:: تنفيذ سكربت التشغيل
echo تشغيل التطبيق...
node dev.js

pause
