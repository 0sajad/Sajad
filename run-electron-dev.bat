
@echo off
echo جاري تشغيل تطبيق إلكترون في وضع التطوير...

:: التحقق من node_modules
if not exist "node_modules" (
  echo تثبيت الحزم المطلوبة...
  call npm install --no-save
)

:: تنفيذ سكربت التشغيل الموثوق
node dev.js

pause
