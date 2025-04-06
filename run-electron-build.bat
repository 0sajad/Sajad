
@echo off
echo جاري بناء تطبيق إلكترون...
echo سيتم إنشاء ملف التثبيت في مجلد 'release'...

:: تثبيت الحزم المطلوبة إذا لم تكن موجودة
call npm install --no-save
echo تم التأكد من وجود جميع الحزم المطلوبة.

:: تحقق مما إذا كان ملف Vite موجوداً في node_modules
if not exist "node_modules\.bin\vite.cmd" (
  echo تثبيت Vite...
  call npm install --no-save vite
)

:: بناء التطبيق
node scripts/run-electron.js build

echo.
echo تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'release'.
echo.
pause
