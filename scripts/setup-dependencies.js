
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('التحقق من المكتبات المطلوبة وتثبيتها إذا لزم الأمر...');

// قائمة بالمكتبات الضرورية
const requiredPackages = [
  'vite',
  '@vitejs/plugin-react-swc',
  'electron',
  'electron-builder',
  'react',
  'react-dom',
  'wait-on',
  'cross-env',
  'concurrently'
];

// دالة للتحقق من تثبيت الحزم
function checkAndInstallPackages() {
  let missingPackages = [];
  
  for (const pkg of requiredPackages) {
    try {
      const packagePath = path.join(process.cwd(), 'node_modules', pkg);
      if (!fs.existsSync(packagePath)) {
        missingPackages.push(pkg);
      }
    } catch (e) {
      missingPackages.push(pkg);
    }
  }

  if (missingPackages.length > 0) {
    console.log(`جاري تثبيت المكتبات المفقودة: ${missingPackages.join(', ')}`);
    try {
      // استخدام --force لحل مشاكل التثبيت المحتملة
      execSync(`npm install --save-dev ${missingPackages.join(' ')} --force`, { stdio: 'inherit' });
      console.log('✅ تم تثبيت جميع المكتبات بنجاح');

      // تأكيد تثبيت Vite
      if (missingPackages.includes('vite')) {
        console.log('التأكد من تثبيت Vite بشكل صحيح...');
        // إنشاء رابط رمزي للتأكد من وصول Vite بشكل صحيح من الموجه
        const binDir = path.join(process.cwd(), 'node_modules', '.bin');
        if (!fs.existsSync(binDir)) {
          fs.mkdirSync(binDir, { recursive: true });
        }
        
        // إذا كان نظام ويندوز، ننشئ ملفات .cmd
        if (process.platform === 'win32') {
          const viteBatPath = path.join(binDir, 'vite.cmd');
          if (!fs.existsSync(viteBatPath)) {
            const viteContent = `@echo off\r\nnode "%~dp0\\..\\vite\\bin\\vite.js" %*`;
            fs.writeFileSync(viteBatPath, viteContent);
            console.log('✓ تم إنشاء ملف vite.cmd');
          }
        } else {
          // في أنظمة Unix، ننشئ رابط رمزي
          try {
            const viteSymlinkPath = path.join(binDir, 'vite');
            const viteTargetPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
            if (!fs.existsSync(viteSymlinkPath) && fs.existsSync(viteTargetPath)) {
              fs.symlinkSync(viteTargetPath, viteSymlinkPath, 'file');
              execSync(`chmod +x ${viteSymlinkPath}`, { stdio: 'ignore' });
              console.log('✓ تم إنشاء رابط رمزي لـ vite وضبط صلاحياته');
            }
          } catch (e) {
            console.log(`⚠️ لم نتمكن من إنشاء رابط رمزي: ${e.message}`);
          }
        }
      }
    } catch (error) {
      console.error('❌ حدث خطأ أثناء تثبيت المكتبات:', error.message);
      
      // محاولة بديلة باستخدام تثبيت المكتبات بشكل منفصل
      console.log('محاولة تثبيت المكتبات بشكل منفصل...');
      let success = true;
      for (const pkg of missingPackages) {
        try {
          console.log(`تثبيت ${pkg}...`);
          execSync(`npm install ${pkg} --save-dev --no-fund --loglevel=error`, { stdio: 'inherit' });
        } catch (e) {
          console.error(`❌ فشل تثبيت ${pkg}`);
          success = false;
        }
      }
      
      if (success) {
        console.log('✅ تم تثبيت المكتبات بنجاح في المحاولة البديلة');
      } else {
        console.error('❌ استمرت مشاكل التثبيت. قد تحتاج إلى تنفيذ npm install يدويًا');
      }
    }
  } else {
    console.log('✅ جميع المكتبات مثبتة بالفعل');
  }
  
  // التأكد من وجود إشارة تنفيذية لـ Vite
  ensureViteExecutable();
}

// التأكد من وجود إشارة تنفيذية لـ Vite
function ensureViteExecutable() {
  const isWindows = process.platform === 'win32';
  const nodeModulesBinPath = path.join(process.cwd(), 'node_modules', '.bin');
  const viteBinPath = path.join(nodeModulesBinPath, isWindows ? 'vite.cmd' : 'vite');
  const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  
  if (!fs.existsSync(viteBinPath) && fs.existsSync(viteJsPath)) {
    console.log('إنشاء ملف تنفيذي لـ Vite...');
    
    if (isWindows) {
      // إنشاء ملف batch لـ Windows
      const batchContent = `@echo off\r\nnode "%~dp0\\..\\vite\\bin\\vite.js" %*`;
      fs.writeFileSync(viteBinPath, batchContent);
    } else {
      // إنشاء رابط رمزي لـ Unix
      try {
        fs.symlinkSync(viteJsPath, viteBinPath, 'file');
        execSync(`chmod +x ${viteBinPath}`, { stdio: 'ignore' });
      } catch (e) {
        // إذا فشل الرابط الرمزي، نجرب إنشاء ملف wrapper
        const wrapperContent = `#!/usr/bin/env node\nrequire('${viteJsPath.replace(/\\/g, '\\\\')}');`;
        fs.writeFileSync(viteBinPath, wrapperContent);
        execSync(`chmod +x ${viteBinPath}`, { stdio: 'ignore' });
      }
    }
    
    console.log('✅ تم إنشاء ملف تنفيذي لـ Vite');
  } else if (fs.existsSync(viteBinPath)) {
    console.log('✓ ملف Vite التنفيذي موجود بالفعل');
  } else {
    console.log('⚠️ لم نتمكن من العثور على Vite.js، يرجى تثبيت Vite يدويًا');
  }
}

// إضافة Vite إلى مسار النظام
function addViteToPath() {
  const nodeModulesBinPath = path.join(process.cwd(), 'node_modules', '.bin');
  const viteModulePath = path.join(process.cwd(), 'node_modules', 'vite', 'bin');
  
  process.env.PATH = process.platform === 'win32' 
    ? `${nodeModulesBinPath};${viteModulePath};${process.env.PATH}`
    : `${nodeModulesBinPath}:${viteModulePath}:${process.env.PATH}`;
  
  console.log(`✅ تم إضافة مسارات Vite للعملية الحالية`);
  
  // إضافة متغير ENV لتخطي إعادة التثبيت بعد التأكد من وجود المكتبات
  process.env.VITE_SETUP_COMPLETE = 'true';
}

// إنشاء ملف وسيط لتشغيل Vite
function createViteRunner() {
  const scriptsDir = path.join(process.cwd(), 'scripts');
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  const viteRunnerPath = path.join(scriptsDir, 'run-vite.js');
  
  // التحقق من وجود ملفات Vite المختلفة
  const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  const viteBinPath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
  
  // الحصول على المسار المناسب لـ Vite
  let actualVitePath = '';
  if (fs.existsSync(viteJsPath)) {
    actualVitePath = viteJsPath;
  } else if (fs.existsSync(viteBinPath)) {
    actualVitePath = viteBinPath;
  }
  
  if (actualVitePath && !fs.existsSync(viteRunnerPath)) {
    try {
      const viteRunnerContent = `#!/usr/bin/env node
/**
 * ملف وسيط لتشغيل Vite
 * يتم إنشاؤه تلقائيًا بواسطة سكربت setup-dependencies.js
 * يكتشف مكان Vite ويشغله بالمعاملات المطلوبة
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// التحقق من وجود vite محليًا
const viteLocalPath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
const viteLocalPathJS = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
const isWindows = process.platform === 'win32';

// تحديد الأمر المناسب لتشغيل vite
let viteCommand = 'npx';
let viteArgs = ['vite'].concat(process.argv.slice(2));

if (fs.existsSync(viteLocalPath) || fs.existsSync(viteLocalPath + (isWindows ? '.cmd' : ''))) {
  // استخدام vite المحلي من node_modules/.bin
  viteCommand = isWindows ? viteLocalPath + '.cmd' : viteLocalPath;
  viteArgs = process.argv.slice(2);
  console.log('استخدام Vite المحلي من node_modules/.bin');
} else if (fs.existsSync(viteLocalPathJS)) {
  // استخدام node لتشغيل vite.js
  viteCommand = process.execPath;
  viteArgs = [viteLocalPathJS].concat(process.argv.slice(2));
  console.log('استخدام Node لتشغيل Vite من node_modules/vite/bin/vite.js');
} else {
  console.log('استخدام Vite عبر npx');
}

if (!viteArgs.includes('--host')) {
  viteArgs.push('--host');
}

if (!viteArgs.find(arg => arg.startsWith('--port'))) {
  viteArgs.push('--port', '8080');
}

// تشغيل Vite
console.log(\`تنفيذ: \${viteCommand} \${viteArgs.join(' ')}\`);

const viteProcess = spawn(viteCommand, viteArgs, {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PATH: \`\${path.join(process.cwd(), 'node_modules', '.bin')}\${isWindows ? ';' : ':'}\${process.env.PATH}\`
  }
});

viteProcess.on('error', (error) => {
  console.error(\`فشل تشغيل Vite: \${error.message}\`);
  
  // محاولة بديلة باستخدام NPX
  console.error('محاولة بديلة باستخدام NPX...');
  const fallbackProcess = spawn(isWindows ? 'npx.cmd' : 'npx', ['vite', ...process.argv.slice(2)], {
    stdio: 'inherit',
    shell: true
  });
  
  fallbackProcess.on('error', (fallbackError) => {
    console.error(\`فشلت المحاولة البديلة أيضًا: \${fallbackError.message}\`);
    process.exit(1);
  });
  
  fallbackProcess.on('close', (code) => {
    process.exit(code || 0);
  });
});

viteProcess.on('close', (code) => {
  process.exit(code || 0);
});
`;
      fs.writeFileSync(viteRunnerPath, viteRunnerContent);
      
      // جعل الملف قابل للتنفيذ على أنظمة يونكس
      if (process.platform !== 'win32') {
        try {
          execSync(`chmod +x ${viteRunnerPath}`, { stdio: 'ignore' });
        } catch (e) {
          console.log('⚠️ لم نتمكن من جعل ملف run-vite.js قابل للتنفيذ');
        }
      }
      
      console.log(`✅ تم إنشاء ملف ${viteRunnerPath} لتشغيل Vite مباشرة`);
    } catch (e) {
      console.log('⚠️ لم نتمكن من إنشاء ملف وسيط لتشغيل Vite');
    }
  }
  
  return fs.existsSync(viteRunnerPath);
}

// تنفيذ الوظائف
checkAndInstallPackages();
addViteToPath();
createViteRunner();

console.log('✅ تم الانتهاء من إعداد التبعيات بنجاح');

// إنشاء ملف تنفيذي مؤقت لـ vite للاستخدام السريع
function createTemporaryViteExecutable() {
  const tempDir = path.join(process.cwd(), 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  const tempViteFile = path.join(tempDir, process.platform === 'win32' ? 'vite.cmd' : 'vite');
  const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  
  if (fs.existsSync(viteJsPath)) {
    try {
      if (process.platform === 'win32') {
        const content = `@echo off\r\nnode "${viteJsPath.replace(/\\/g, '\\\\')}" %*`;
        fs.writeFileSync(tempViteFile, content);
      } else {
        const content = `#!/bin/bash\nnode "${viteJsPath}" "$@"`;
        fs.writeFileSync(tempViteFile, content);
        execSync(`chmod +x ${tempViteFile}`, { stdio: 'ignore' });
      }
      console.log(`✅ تم إنشاء ملف تنفيذي مؤقت لـ Vite: ${tempViteFile}`);
      
      // إضافة المسار المؤقت إلى متغير البيئة PATH
      process.env.PATH = `${tempDir}${path.delimiter}${process.env.PATH}`;
      
      return true;
    } catch (e) {
      console.error(`❌ فشل إنشاء ملف تنفيذي مؤقت: ${e.message}`);
      return false;
    }
  }
  return false;
}

// تصدير دالة للتحقق من تثبيت vite
module.exports = {
  checkViteInstallation: function() {
    try {
      const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
      const viteGloballyAvailable = (() => {
        try {
          execSync('vite --version', { stdio: 'ignore' });
          return true;
        } catch (e) {
          return createTemporaryViteExecutable();
        }
      })();
      
      return fs.existsSync(vitePath) || viteGloballyAvailable;
    } catch (e) {
      return false;
    }
  }
};
