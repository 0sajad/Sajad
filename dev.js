
#!/usr/bin/env node
const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

console.log('جاري تشغيل التطبيق في وضع التطوير...');

// تحديد نوع نظام التشغيل
const isWindows = os.platform() === 'win32';

// التأكد من وجود Vite وتثبيته إذا لم يكن موجوداً
function ensureViteInstalled() {
  try {
    // محاولة تنفيذ أمر vite --version للتحقق مما إذا كان مثبتاً
    execSync('npx vite --version', { stdio: 'ignore' });
    console.log('✅ Vite موجود');
    return true;
  } catch (e) {
    console.log('⚠️ Vite غير موجود، جاري التثبيت...');
    
    try {
      execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev --force', { stdio: 'inherit' });
      console.log('✅ تم تثبيت Vite بنجاح');
      return true;
    } catch (err) {
      console.error('❌ فشل تثبيت Vite:', err.message);
      return false;
    }
  }
}

// دالة لتشغيل Vite
function runVite() {
  // إنشاء المجلدات اللازمة إذا لم تكن موجودة
  const scriptsDir = path.join(process.cwd(), 'scripts');
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }

  // تجهيز متغيرات البيئة
  const env = { 
    ...process.env, 
    NODE_ENV: 'development',
    PATH: `${path.join(process.cwd(), 'node_modules', '.bin')}${path.delimiter}${process.env.PATH}`
  };

  // محاولة تشغيل Vite باستخدام npx
  console.log('تشغيل Vite باستخدام npx...');
  
  const command = isWindows ? 'npx.cmd' : 'npx';
  const args = ['vite', '--host', '--port', '8080'];
  
  const proc = spawn(command, args, {
    stdio: 'inherit',
    shell: true,
    env: env
  });

  proc.on('error', (error) => {
    console.error(`❌ فشل تشغيل Vite: ${error.message}`);
    
    // محاولة تشغيل vite.js مباشرة
    console.log('محاولة تشغيل vite.js مباشرة...');
    
    const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
    
    if (fs.existsSync(viteJsPath)) {
      const nodeProc = spawn('node', [viteJsPath, '--host', '--port', '8080'], {
        stdio: 'inherit',
        shell: true,
        env: env
      });
      
      nodeProc.on('error', (nodeErr) => {
        console.error(`❌ فشل تشغيل vite.js: ${nodeErr.message}`);
        process.exit(1);
      });
      
      nodeProc.on('close', (code) => {
        process.exit(code || 0);
      });
    } else {
      console.error('❌ لم يتم العثور على ملف vite.js');
      process.exit(1);
    }
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.error(`Vite خرج بكود الخطأ ${code}`);
    }
    process.exit(code || 0);
  });
}

// تنفيذ الخطوات الأساسية
if (ensureViteInstalled()) {
  runVite();
} else {
  console.error('❌ لم نتمكن من تشغيل Vite. يرجى التثبيت يدوياً باستخدام: npm install vite@latest --save-dev');
  process.exit(1);
}
