
@echo off
echo جاري تشغيل تطبيق إلكترون في وضع التطوير...

:: التحقق من node_modules
if not exist "node_modules" (
  echo تثبيت الحزم المطلوبة...
  call npm install --no-save
)

:: تشغيل سكربت node
echo تشغيل التطبيق...
node dev.js

:: في حالة الفشل، جرّب التثبيت المباشر لـ Vite
if %ERRORLEVEL% NEQ 0 (
  echo محاولة تثبيت وتشغيل Vite مباشرة...
  call npm install vite@latest @vitejs/plugin-react-swc --save-dev --force
  call npx vite --host --port 8080
)

pause
