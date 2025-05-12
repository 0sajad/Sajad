
@echo off
echo جاري بناء تطبيق إلكترون...

:: التحقق من node_modules
if not exist "node_modules" (
  echo تثبيت الحزم المطلوبة باستخدام npm...
  call npm install --no-fund --no-audit
)

:: تأكد من تثبيت vite و electron
if not exist "node_modules\vite" (
  echo تثبيت Vite...
  call npm install vite@latest @vitejs/plugin-react-swc --save-dev
)

if not exist "node_modules\electron" (
  echo تثبيت Electron...
  call npm install electron@latest --no-save
)

if not exist "node_modules\electron-builder" (
  echo تثبيت Electron Builder...
  call npm install electron-builder@latest --save-dev
)

:: تشغيل عملية البناء
echo جاري بناء التطبيق...
call npx vite build

:: إنشاء حزمة التثبيت باستخدام electron-builder
echo جاري إنشاء حزمة التثبيت...
call npx electron-builder --win --config electron/electron-builder.yml

echo.
echo تم الانتهاء! يمكنك العثور على الملفات في مجلد 'release'.
pause
