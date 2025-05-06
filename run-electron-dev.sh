
#!/bin/bash
echo "جاري تشغيل تطبيق إلكترون في وضع التطوير..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# تشغيل سكربت node
echo "تشغيل التطبيق..."
node dev.js

# في حالة الفشل، جرّب تنفيذ vite مباشرة
if [ $? -ne 0 ]; then
  echo "محاولة تنفيذ Vite مباشرة..."
  npx vite --host --port 8080
fi
