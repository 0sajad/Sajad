
@echo off
echo جاري بناء تطبيق إلكترون...
echo سيتم إنشاء ملف التثبيت في مجلد 'release'...
node scripts/run-electron.js build
echo.
echo تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'release'.
echo.
pause
