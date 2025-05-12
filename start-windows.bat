
@echo off
echo Starting Octa Network Haven Desktop Application...

:: تعيين متغير البيئة للإشارة إلى وضع Electron
set ELECTRON=true
set NODE_ENV=production

:: تحقق مما إذا كان إلكترون مثبت وتثبيته باستخدام npm بدلاً من bun
if not exist "node_modules\electron" (
  echo Installing Electron using npm...
  call npm install electron@latest --no-save
)

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
  echo Please ensure Electron is installed correctly.
  echo Press any key to exit...
  pause > nul
)
