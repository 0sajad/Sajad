
#!/bin/bash
echo "جاري بناء تطبيق إلكترون..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# تأكد من تثبيت vite
if ! command -v ./node_modules/.bin/vite &> /dev/null; then
  echo "تثبيت Vite..."
  npm install vite@latest --save-dev
fi

# تشغيل عملية البناء
npx vite build

echo ""
echo "تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'release'."

