
@echo off
echo جاري بناء تطبيق إلكترون...

:: التحقق من node_modules
if not exist "node_modules" (
  echo تثبيت الحزم المطلوبة...
  call npm install --no-save
)

:: تأكد من تثبيت vite
call npx vite --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo تثبيت Vite...
  call npm install vite@latest --save-dev
)

:: تشغيل عملية البناء
call npx vite build

echo.
echo تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'release'.
pause
