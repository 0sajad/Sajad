
#!/bin/bash
echo "جاري بناء تطبيق إلكترون..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# تأكد من تثبيت vite
if [ ! -d "node_modules/vite" ]; then
  echo "تثبيت Vite..."
  npm install vite@latest @vitejs/plugin-react-swc --save-dev
fi

# تأكد من تثبيت electron
if [ ! -d "node_modules/electron" ]; then
  echo "تثبيت Electron..."
  npm install electron@latest --no-save
fi

# تأكد من تثبيت electron-builder
if [ ! -d "node_modules/electron-builder" ]; then
  echo "تثبيت Electron Builder..."
  npm install electron-builder@latest --save-dev
fi

# تنفيذ عملية البناء
echo "جاري بناء التطبيق..."
npx vite build

# إنشاء حزمة التثبيت باستخدام electron-builder
echo "جاري إنشاء حزمة التثبيت..."
npx electron-builder --config electron/electron-builder.yml

echo ""
echo "تم الانتهاء! يمكنك العثور على الملفات في مجلد 'release'."
