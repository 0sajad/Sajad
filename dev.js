
#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

console.log('جاري تشغيل التطبيق في وضع التطوير...');

// تحديد نوع نظام التشغيل
const isWindows = os.platform() === 'win32';

// دالة للتحقق من وجود حزمة
function checkPackageExists(packageName) {
  try {
    const nodeModulesPath = path.join(process.cwd(), 'node_modules', packageName);
    
    // التحقق من التثبيت المحلي
    if (fs.existsSync(nodeModulesPath)) {
      console.log(`✅ ${packageName} موجود محلياً`);
      return true;
    }
    
    // التحقق من التثبيت العالمي
    try {
      const checkCmd = isWindows ? 
        `where ${packageName} 2>nul` : 
        `command -v ${packageName} 2>/dev/null`;
      
      execSync(checkCmd, { stdio: 'ignore' });
      console.log(`✅ ${packageName} موجود عالمياً`);
      return true;
    } catch (e) {
      console.log(`❌ ${packageName} غير موجود عالمياً`);
      return false;
    }
  } catch (e) {
    return false;
  }
}

// تثبيت الحزم المطلوبة
function installRequiredPackages() {
  console.log('تثبيت الحزم المطلوبة...');
  try {
    execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev --force', { 
      stdio: 'inherit',
      shell: true
    });
    return true;
  } catch (error) {
    console.error('خطأ في تثبيت الحزم:', error.message);
    return false;
  }
}

// دالة لتشغيل Vite
function runVite() {
  // تجهيز متغيرات البيئة
  const env = { 
    ...process.env, 
    NODE_ENV: 'development',
    PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${path.delimiter}${process.env.PATH}`
  };

  // تحديد مسار Vite المحلي
  const viteLocalBin = path.join(process.cwd(), 'node_modules', '.bin', isWindows ? 'vite.cmd' : 'vite');
  const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  
  console.log('محاولة تشغيل Vite...');
  
  let command, args;
  
  // اختيار طريقة التشغيل المناسبة
  if (fs.existsSync(viteLocalBin)) {
    // استخدام Vite المحلي المثبت
    console.log(`تشغيل Vite من المسار المحلي: ${viteLocalBin}`);
    command = viteLocalBin;
    args = ['--host', '--port', '8080'];
  } else if (fs.existsSync(viteJsPath)) {
    // استخدام ملف vite.js مباشرة
    console.log(`تشغيل vite.js مباشرة من: ${viteJsPath}`);
    command = 'node';
    args = [viteJsPath, '--host', '--port', '8080'];
  } else {
    // استخدام npx كخيار أخير
    console.log('محاولة تشغيل Vite باستخدام npx...');
    command = isWindows ? 'npx.cmd' : 'npx';
    args = ['vite', '--host', '--port', '8080'];
  }
  
  // تنفيذ الأمر
  console.log(`تنفيذ الأمر: ${command} ${args.join(' ')}`);
  const proc = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    env: env
  });

  // معالجة الأخطاء
  proc.on('error', (error) => {
    console.error(`فشل تشغيل Vite: ${error.message}`);
    
    // في حالة الفشل، نحاول تثبيت Vite ثم إعادة المحاولة
    console.log('جاري محاولة تثبيت Vite...');
    if (installRequiredPackages()) {
      console.log('تم تثبيت Vite بنجاح، جاري إعادة تشغيل التطبيق...');
      runVite();
    } else {
      console.error('فشل تثبيت Vite. يرجى التثبيت يدوياً باستخدام: npm install vite@latest --save-dev');
      process.exit(1);
    }
  });

  // الخروج عند انتهاء العملية
  proc.on('close', (code) => {
    if (code !== 0) {
      console.log(`Vite انتهى بكود خطأ: ${code}. جاري محاولة تثبيت Vite وإعادة المحاولة...`);
      if (installRequiredPackages()) {
        runVite();
      } else {
        process.exit(code || 1);
      }
    } else {
      process.exit(0);
    }
  });
}

// التنفيذ الرئيسي
console.log('التحقق من وجود Vite...');
if (checkPackageExists('vite')) {
  runVite();
} else {
  console.log('Vite غير موجود، جاري التثبيت...');
  if (installRequiredPackages()) {
    runVite();
  } else {
    console.error('فشل تثبيت Vite. يرجى التثبيت يدوياً باستخدام: npm install vite@latest --save-dev');
    process.exit(1);
  }
}
