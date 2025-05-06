
@echo off
echo جاري تشغيل تطبيق إلكترون في وضع التطوير...

:: التحقق من node_modules
if not exist "node_modules" (
  echo تثبيت الحزم المطلوبة...
  call npm install --no-save
)

:: إضافة مجلد node_modules\.bin إلى PATH
set PATH=%cd%\node_modules\.bin;%PATH%

:: تشغيل سكربت node
echo تشغيل التطبيق...
node dev.js

:: في حالة الفشل، جرّب التثبيت المباشر لـ Vite
if %ERRORLEVEL% NEQ 0 (
  echo محاولة تثبيت وتشغيل Vite مباشرة...
  call npm install vite@latest @vitejs/plugin-react-swc --save-dev --force
  
  :: محاولة تشغيل vite مباشرة من node_modules\.bin
  if exist "node_modules\.bin\vite.cmd" (
    echo تشغيل vite من node_modules\.bin...
    call node_modules\.bin\vite.cmd --host --port 8080
  ) else (
    :: محاولة أخيرة باستخدام npx
    echo تشغيل vite باستخدام npx...
    call npx vite --host --port 8080
  )
)

pause
