
@echo off
echo جاري بناء تطبيق إلكترون...

:: تثبيت الحزم المطلوبة
call npm install --no-save
echo تم التأكد من وجود جميع الحزم المطلوبة.

:: تشغيل عملية البناء
npx vite build

echo.
echo تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'release'.
pause
