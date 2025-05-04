
#!/bin/bash
echo "جاري تشغيل تطبيق إلكترون في وضع التطوير..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# التحقق من وجود Vite وتثبيته إذا لم يكن موجوداً
if ! command -v ./node_modules/.bin/vite &> /dev/null; then
  echo "تثبيت Vite..."
  npm install vite@latest --save-dev
fi

# تنفيذ سكربت التشغيل
echo "تشغيل التطبيق..."
node dev.js
