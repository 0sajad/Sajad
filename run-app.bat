
@echo off
echo تشغيل تطبيق Octa Network Haven...
echo.
echo 1) للتشغيل في وضع التطوير (مع تحديثات مباشرة)
echo 2) للتشغيل كتطبيق سطح مكتب (بعد البناء)
echo.
set /p choice="اختر وضع التشغيل (1 أو 2): "

:: تنفيذ الاختيار
if "%choice%"=="1" (
  echo تشغيل في وضع التطوير...
  call node dev.js
) else if "%choice%"=="2" (
  echo تشغيل كتطبيق سطح مكتب...
  
  :: التحقق من وجود مجلد dist
  if not exist "dist" (
    echo بناء التطبيق أولاً...
    call npx vite build
  )
  
  :: تحقق مما إذا كان إلكترون مثبت
  if not exist "node_modules\electron" (
    echo تثبيت Electron...
    call npm install electron@latest --no-save
  )
  
  :: تشغيل إلكترون
  echo تشغيل تطبيق Electron...
  call npx electron electron/main.js
) else (
  echo اختيار غير صالح. يرجى إدخال 1 أو 2.
  pause
)
