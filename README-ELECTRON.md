
# Octa Network Haven - تطبيق سطح المكتب

يمكن تشغيل هذا التطبيق كتطبيق سطح مكتب باستخدام Electron.

## متطلبات النظام
- Node.js (الإصدار 14 أو أحدث)
- npm (يأتي مع Node.js)

## طرق التشغيل

### الطريقة السريعة (موصى بها)
- انقر نقرًا مزدوجًا على ملف `run-app.bat`
- اختر وضع التشغيل المناسب (وضع التطوير أو وضع سطح المكتب)

### تشغيل التطبيق في وضع التطوير
```
run-electron-dev.bat
```
أو
```
node dev.js
```

### تشغيل التطبيق في وضع سطح المكتب
```
start-windows.bat
```

### إنشاء ملف تثبيت
لإنشاء ملف تثبيت للبرنامج (.exe):
```
run-electron-build.bat
```

## حل المشكلات الشائعة

### إذا واجهتك مشكلات تثبيت
استخدم npm لتثبيت التبعيات:
```
npm install electron@latest electron-builder@latest vite@latest @vitejs/plugin-react-swc --save-dev
```

### إذا لم يتم العثور على electron
```
npm install electron@latest --no-save
```

### إعادة بناء التطبيق
```
npx vite build
```

### تشغيل Electron باستخدام ملفات البناء
```
npx electron electron/main.js
```

## على أنظمة Linux/Mac
استخدم الملفات المشابهة بامتداد .sh:
```
chmod +x run-electron-dev.sh
./run-electron-dev.sh
```

```
chmod +x run-electron-build.sh
./run-electron-build.sh
```
