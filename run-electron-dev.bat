
@echo off
echo Starting Octa Network Haven Desktop Application in Development Mode...

:: تعيين متغيرات البيئة
set ELECTRON=true
set NODE_ENV=development

:: تثبيت Electron إذا لم يكن موجودًا
if not exist "node_modules\electron" (
  echo Installing Electron...
  npm install electron --save-dev
)

:: تشغيل سكربت التطوير مباشرة
echo Launching Electron development environment...
node scripts/electron-dev.js

:: في حالة الفشل، محاولة تشغيل Electron مباشرة
if %ERRORLEVEL% NEQ 0 (
  echo Attempting direct Electron launch with Vite server...
  start /b npx vite --host --port 8080
  timeout /t 5
  npx electron electron/main.js
)

pause
