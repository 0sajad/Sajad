
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
  call npm install vite@latest @vitejs/plugin-react-swc --save-dev --force
)

:: التحقق من وجود الملفات المطلوبة
if not exist "scripts" (
  mkdir scripts
)

:: تنفيذ سكربت node التشغيل الأساسي
echo تشغيل التطبيق...
node dev.js

:: إذا فشل التنفيذ، نجرب الطرق البديلة
if %ERRORLEVEL% NEQ 0 (
  echo محاولة تنفيذ بديلة...
  
  :: محاولة تنفيذ npx vite مباشرة
  echo تنفيذ Vite عبر npx...
  call npx vite --host --port 8080
  
  if %ERRORLEVEL% NEQ 0 (
    echo محاولة استدعاء vite.js مباشرة...
    node "node_modules\vite\bin\vite.js" --host --port 8080
  )
)

pause
