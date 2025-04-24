
@echo off
echo جاري بناء تطبيق إلكترون...
echo سيتم إنشاء ملف التثبيت في مجلد 'release'...

:: إنشاء مجلد node_modules إذا لم يكن موجوداً
if not exist "node_modules" (
  mkdir node_modules
)

:: تثبيت الحزم المطلوبة إذا لم تكن موجودة
call npm install --no-save
echo تم التأكد من وجود جميع الحزم المطلوبة.

:: تثبيت Vite مباشرة
echo تثبيت Vite...
call npm install vite@latest --save-dev
call npm install -g vite

:: إضافة node_modules\.bin إلى PATH للجلسة الحالية
set PATH=%cd%\node_modules\.bin;%cd%\node_modules\vite\bin;%PATH%

:: تشغيل سكربت إعداد Vite للتأكد من التثبيت الصحيح
node scripts/setup-vite.js

:: بناء التطبيق
node scripts/run-electron.js build

echo.
echo تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'release'.
echo.
pause
