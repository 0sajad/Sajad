
@echo off
echo Starting Octa Network Haven Desktop Application...

:: تعيين متغير البيئة للإشارة إلى وضع Electron
set ELECTRON=true
set NODE_ENV=production

:: تحقق من وجود مجلد dist
if not exist "dist" (
  echo Building application first...
  call npx vite build
)

:: تشغيل التطبيق مباشرة باستخدام Electron
echo Starting Electron application...
npx electron electron/main.js

:: في حالة حدوث خطأ، عرض رسالة مناسبة
if %ERRORLEVEL% NEQ 0 (
  echo Failed to start Electron application.
  echo Please ensure Electron is installed by running: npm install electron --save-dev
  echo Press any key to exit...
  pause > nul
)
