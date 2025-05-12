
@echo off
echo Starting Octa Network Haven Desktop Application in Development Mode...

:: تعيين متغيرات البيئة
set ELECTRON=true
set NODE_ENV=development

:: تأكد من تثبيت حزم npm بدلاً من bun
if not exist "node_modules\electron" (
  echo Installing Electron using npm...
  call npm install electron@latest --no-save
)

:: تحقق من التبعيات الأخرى
if not exist "node_modules\concurrently" (
  echo Installing additional dependencies using npm...
  call npm install concurrently cross-env wait-on --save-dev
)

:: تشغيل سكربت التطوير
echo Launching Electron development environment...
npx concurrently "npx vite --host --port 8080" "npx wait-on http://localhost:8080 && npx electron electron/main.js"

pause
