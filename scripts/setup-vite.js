
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('التحقق من وجود Vite وتثبيته إذا لزم الأمر...');

// التحقق مما إذا كان Vite مثبتًا
try {
  const vitePath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
  if (!fs.existsSync(vitePath)) {
    console.log('❌ Vite غير موجود، جاري التثبيت...');
    execSync('npm install --save-dev vite', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite بنجاح');
  } else {
    console.log('✅ Vite موجود بالفعل');
  }
} catch (error) {
  console.error('❌ حدث خطأ أثناء التحقق من أو تثبيت Vite:', error.message);
  process.exit(1);
}

// تحديث ملف setup-dependencies.js لتضمين التحقق من Vite
const setupDepsPath = path.join(process.cwd(), 'scripts', 'setup-dependencies.js');
if (fs.existsSync(setupDepsPath)) {
  console.log('تحديث ملف setup-dependencies.js لتضمين التحقق من Vite...');
  try {
    // قراءة محتوى الملف الحالي
    let content = fs.readFileSync(setupDepsPath, 'utf8');
    
    // التحقق مما إذا كان الملف يتضمن بالفعل التحقق من Vite
    if (!content.includes('vite')) {
      // إضافة Vite إلى قائمة الحزم المطلوبة
      content = content.replace(
        "const requiredPackages = [",
        "const requiredPackages = [\n  'vite',"
      );
      
      // كتابة المحتوى المحدث
      fs.writeFileSync(setupDepsPath, content, 'utf8');
      console.log('✅ تم تحديث ملف setup-dependencies.js');
    } else {
      console.log('✅ ملف setup-dependencies.js يتضمن بالفعل التحقق من Vite');
    }
  } catch (error) {
    console.error('❌ حدث خطأ أثناء تحديث ملف setup-dependencies.js:', error.message);
  }
}

console.log('✅ اكتمل إعداد Vite بنجاح');
