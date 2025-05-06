
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
  npm install vite@latest @vitejs/plugin-react-swc --save-dev --force
fi

# تنفيذ عملية البناء
echo "جاري بناء التطبيق..."
node_modules/.bin/vite build || npx vite build

echo ""
echo "تم الانتهاء! يمكنك العثور على الملفات في مجلد 'dist'."
