
#!/bin/bash
echo "جاري تشغيل تطبيق إلكترون في وضع التطوير..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# التحقق من وجود Vite وتثبيته إذا لم يكن موجوداً
if [ ! -d "node_modules/vite" ]; then
  echo "تثبيت Vite..."
  npm install vite@latest @vitejs/plugin-react-swc --save-dev --force
fi

# التحقق من وجود الملفات المطلوبة
if [ ! -d "scripts" ]; then
  mkdir -p scripts
fi

# تنفيذ سكربت التشغيل
echo "تشغيل التطبيق..."
node dev.js

# إذا فشل التنفيذ، نجرب الطرق البديلة
if [ $? -ne 0 ]; then
  echo "محاولة تنفيذ بديلة..."
  
  # محاولة تنفيذ npx vite مباشرة
  echo "تنفيذ Vite عبر npx..."
  npx vite --host --port 8080
  
  # إذا فشل، نجرب استخدام ملف vite.js مباشرة
  if [ $? -ne 0 ]; then
    echo "محاولة استدعاء vite.js مباشرة..."
    node "./node_modules/vite/bin/vite.js" --host --port 8080
  fi
fi
