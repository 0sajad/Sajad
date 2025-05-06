
#!/bin/bash
echo "جاري تشغيل تطبيق إلكترون في وضع التطوير..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# إضافة مجلد node_modules/.bin إلى PATH
export PATH="$PWD/node_modules/.bin:$PATH"

# تشغيل سكربت node مع تحسينات للعثور على vite
echo "تشغيل التطبيق..."
node dev.js

# في حالة الفشل، جرّب التثبيت المباشر لـ Vite
if [ $? -ne 0 ]; then
  echo "محاولة تثبيت وتشغيل Vite مباشرة..."
  npm install vite@latest @vitejs/plugin-react-swc --save-dev --force
  
  # محاولة تشغيل vite مباشرة من node_modules/.bin
  if [ -f "node_modules/.bin/vite" ]; then
    echo "تشغيل vite من node_modules/.bin..."
    node_modules/.bin/vite --host --port 8080
  else
    # محاولة أخيرة باستخدام npx
    echo "تشغيل vite باستخدام npx..."
    npx vite --host --port 8080
  fi
fi
