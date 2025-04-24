
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('التحقق من وجود Vite وتثبيته إذا لزم الأمر...');

// التحقق من وجود مجلد node_modules
const nodeModulesPath = path.join(process.cwd(), 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('❌ مجلد node_modules غير موجود، جاري إنشاؤه...');
  fs.mkdirSync(nodeModulesPath, { recursive: true });
}

// تحديث ملفات package.json
try {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // التأكد من وجود Vite في devDependencies
    if (!packageJson.devDependencies || !packageJson.devDependencies.vite) {
      console.log('❌ Vite غير موجود في devDependencies، جاري تثبيته...');
      
      try {
        console.log('تثبيت Vite باستخدام npm...');
        execSync('npm install --save-dev vite@latest', { stdio: 'inherit' });
        console.log('✅ تم تثبيت Vite بنجاح');
      } catch (error) {
        console.error('❌ حدث خطأ أثناء تثبيت Vite:', error.message);
        
        // محاولة تثبيت في وضع global
        try {
          console.log('محاولة تثبيت Vite بشكل عام...');
          execSync('npm install -g vite', { stdio: 'inherit' });
          console.log('✅ تم تثبيت Vite عالمياً');
        } catch (globalError) {
          console.error('❌ فشل التثبيت العام:', globalError.message);
        }
      }
    } else {
      console.log('✅ Vite موجود بالفعل في package.json');
    }
  }
} catch (error) {
  console.error('❌ حدث خطأ أثناء قراءة/تحديث package.json:', error.message);
}

// التحقق مباشرة من وجود Vite التنفيذي
const viteBinPath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
const viteBinPathWindows = path.join(process.cwd(), 'node_modules', '.bin', 'vite.cmd');

if (!fs.existsSync(viteBinPath) && !fs.existsSync(viteBinPathWindows)) {
  console.log('❌ ملف Vite التنفيذي غير موجود، جاري التثبيت...');
  
  try {
    execSync('npm install --save-dev vite@latest', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite بنجاح');
  } catch (error) {
    console.error('❌ حدث خطأ أثناء تثبيت Vite:', error.message);
  }
} else {
  console.log('✅ ملف Vite التنفيذي موجود');
}

// إضافة ارتباط رمزي إلى node_modules/.bin في حالة عدم وجوده في PATH
try {
  const binPath = path.join(process.cwd(), 'node_modules', '.bin');
  const isWindows = process.platform === 'win32';
  
  if (isWindows) {
    // إضافة ارتباط لـ Windows
    const npmBinPath = execSync('npm bin -g').toString().trim();
    if (!process.env.PATH.includes(binPath)) {
      console.log(`إضافة ${binPath} إلى PATH`);
      process.env.PATH = `${binPath}${path.delimiter}${process.env.PATH}`;
    }
  } else {
    // إضافة ارتباط لـ Unix
    execSync(`ln -sf ${path.join(binPath, 'vite')} /usr/local/bin/vite`, { stdio: 'ignore' });
  }
} catch (error) {
  console.log('ملاحظة: لم نتمكن من إضافة ارتباط رمزي، لكن هذا ليس ضرورياً');
}

console.log('✅ اكتمل إعداد Vite بنجاح');
