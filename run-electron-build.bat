
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

:: تثبيت Vite بشكل صريح (مع حفظ مخرجات الأمر للحصول على مزيد من المعلومات)
echo تثبيت Vite...
call npm install vite@latest --save-dev --verbose
call npm install -g vite --verbose

:: إضافة node_modules\.bin إلى PATH للجلسة الحالية
set PATH=%cd%\node_modules\.bin;%cd%\node_modules\vite\bin;%PATH%

:: تشغيل سكربت إعداد Vite للتأكد من التثبيت الصحيح
node scripts/setup-vite.js

:: استخدام npx لتشغيل vite build
echo بناء التطبيق باستخدام npx vite build...
npx vite build

echo.
echo تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'release'.
echo.
pause
