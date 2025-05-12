
#!/bin/bash
echo "جاري تشغيل تطبيق إلكترون في وضع التطوير..."

# تعيين متغيرات البيئة
export ELECTRON=true
export NODE_ENV=development

# التحقق من وجود Electron
if [ ! -d "node_modules/electron" ]; then
  echo "تثبيت Electron..."
  npm install electron@latest --no-save
fi

# التحقق من وجود التبعيات الأخرى
if [ ! -d "node_modules/concurrently" ] || [ ! -d "node_modules/wait-on" ]; then
  echo "تثبيت التبعيات الإضافية..."
  npm install concurrently cross-env wait-on --save-dev
fi

# تشغيل سكربت التطوير
echo "بدء تشغيل بيئة التطوير لـ Electron..."
npx concurrently "npx vite --host --port 8080" "npx wait-on http://localhost:8080 && npx electron electron/main.js"
