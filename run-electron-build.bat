
@echo off
echo جاري بناء تطبيق إلكترون...

:: التحقق من node_modules
if not exist "node_modules" (
  echo تثبيت الحزم المطلوبة...
  call npm install --no-save
)

:: تأكد من تثبيت vite
if not exist "node_modules\vite" (
  echo تثبيت Vite...
  call npm install vite@latest @vitejs/plugin-react-swc --save-dev --force
)

:: تشغيل عملية البناء
echo جاري بناء التطبيق...
call npx vite build

echo.
echo تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'dist'.
pause
