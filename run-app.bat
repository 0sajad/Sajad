
@echo off
echo تشغيل تطبيق Octa Network Haven...
echo.
echo 1) للتشغيل في وضع التطوير (مع تحديثات مباشرة)
echo 2) للتشغيل كتطبيق سطح مكتب (بعد البناء)
echo.
set /p choice="اختر وضع التشغيل (1 أو 2): "

if "%choice%"=="1" (
  echo تشغيل في وضع التطوير...
  call run-electron-dev.bat
) else if "%choice%"=="2" (
  echo تشغيل كتطبيق سطح مكتب...
  call start-windows.bat
) else (
  echo اختيار غير صالح. يرجى إدخال 1 أو 2.
  pause
)
