
#!/bin/bash
echo "جاري تشغيل تطبيق إلكترون في وضع التطوير..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# تشغيل سكربت node
echo "تشغيل التطبيق..."
node start.js

# في حالة الفشل، جرّب التثبيت المباشر لـ Vite
if [ $? -ne 0 ]; then
  echo "محاولة تثبيت وتشغيل Vite مباشرة..."
  npm install vite@latest @vitejs/plugin-react-swc lovable-tagger --save-dev --force
  
  # تشغيل vite مباشرة باستخدام npx
  echo "تشغيل vite باستخدام npx..."
  npx vite --host --port 8080
fi
