
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

// التحقق من وجود Vite
function checkViteInstallation() {
  // تحقق من وجود Vite في node_modules
  const vitePath = path.join(nodeModulesPath, 'vite');
  const viteBinPath = path.join(nodeModulesPath, '.bin', 'vite');
  const viteBinPathWindows = path.join(nodeModulesPath, '.bin', 'vite.cmd');
  
  if (fs.existsSync(vitePath) && (fs.existsSync(viteBinPath) || fs.existsSync(viteBinPathWindows))) {
    console.log('✅ وجدنا تثبيت Vite محلي');
    return true;
  }

  // تحقق من وجود Vite عالمي
  try {
    execSync('vite --version', { stdio: 'ignore' });
    console.log('✅ وجدنا تثبيت Vite عالمي');
    return true;
  } catch (e) {
    try {
      execSync('npx vite --version', { stdio: 'ignore' });
      console.log('✅ يمكن الوصول لـ Vite عبر npx');
      return true;
    } catch (npxError) {
      console.log('❌ لم نجد تثبيت Vite');
      return false;
    }
  }
}

// تثبيت Vite إذا لم يكن موجودًا
function installVite() {
  console.log('⏳ جاري تثبيت Vite...');
  try {
    // محاولة تثبيت Vite محليًا
    execSync('npm install vite@latest --save-dev', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite بنجاح');

    // التحقق من نجاح التثبيت
    if (checkViteInstallation()) {
      return true;
    }

    // إذا لم يتم العثور على Vite بعد التثبيت، حاول تثبيته عالمياً
    console.log('⚠️ لم يتم العثور على Vite بعد التثبيت المحلي، جاري تثبيته عالمياً...');
    execSync('npm install -g vite', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite عالميًا');
    
    // إنشاء رابط npx إلى Vite
    try {
      const npxViteContent = `#!/usr/bin/env node\nrequire('${path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js').replace(/\\/g, '\\\\')}');\n`;
      const npxVitePath = path.join(process.cwd(), 'npx-vite.js');
      fs.writeFileSync(npxVitePath, npxViteContent);
      fs.chmodSync(npxVitePath, '755');
      console.log(`✅ تم إنشاء ملف تنفيذي في ${npxVitePath}`);
    } catch (e) {
      console.log('⚠️ لم نتمكن من إنشاء ملف تنفيذي: ', e);
    }
    
    return true;
  } catch (error) {
    console.error('❌ فشل تثبيت Vite:', error.message);
    
    // محاولة استخدام npx
    try {
      console.log('⏳ محاولة تشغيل Vite باستخدام npx...');
      execSync('npx vite --version', { stdio: 'ignore' });
      console.log('✅ يمكن تشغيل Vite باستخدام npx');
      return true;
    } catch (npxError) {
      console.error('❌ فشل تشغيل Vite باستخدام npx:', npxError.message);
      return false;
    }
  }
}

// إضافة Vite إلى متغير البيئة PATH
function addViteToPath() {
  const binPath = path.join(process.cwd(), 'node_modules', '.bin');
  const vitePath = path.join(process.cwd(), 'node_modules', 'vite', 'bin');
  
  console.log(`⏳ إضافة المسارات التالية إلى PATH:
- ${binPath}
- ${vitePath}`);

  // إضافة المسارات إلى PATH للعملية الحالية
  if (process.platform === 'win32') {
    process.env.PATH = `${binPath};${vitePath};${process.env.PATH}`;
    
    // محاولة إضافة المسارات إلى PATH للنظام (Windows فقط)
    try {
      const pathCmd = `setx PATH "%PATH%;${binPath};${vitePath}"`;
      execSync(pathCmd, { stdio: 'ignore' });
      console.log('✅ تم إضافة مسارات Vite إلى متغيرات النظام');
    } catch (e) {
      console.log('⚠️ تم تحديث PATH للعملية الحالية فقط');
    }
  } else {
    process.env.PATH = `${binPath}:${vitePath}:${process.env.PATH}`;
    console.log('✅ تم تحديث متغير PATH للعملية الحالية');
  }
}

// إنشاء ملف وسيط في روت المشروع لتشغيل Vite
function createViteExecutable() {
  const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  const viteRunnerPath = path.join(process.cwd(), 'vite-run.js');
  
  if (fs.existsSync(viteJsPath) && !fs.existsSync(viteRunnerPath)) {
    try {
      const viteRunnerContent = `#!/usr/bin/env node
// هذا الملف يقوم بتشغيل Vite مباشرة
require('${viteJsPath.replace(/\\/g, '\\\\')}');
`;
      fs.writeFileSync(viteRunnerPath, viteRunnerContent);
      
      // جعل الملف قابل للتنفيذ على أنظمة يونكس
      if (process.platform !== 'win32') {
        try {
          execSync(`chmod +x ${viteRunnerPath}`, { stdio: 'ignore' });
        } catch (e) {
          console.log('⚠️ لم نتمكن من جعل ملف vite-run.js قابل للتنفيذ');
        }
      }
      
      console.log(`✅ تم إنشاء ملف ${viteRunnerPath} لتشغيل Vite مباشرة`);
    } catch (e) {
      console.log('⚠️ لم نتمكن من إنشاء ملف وسيط لتشغيل Vite');
    }
  }
}

// إنشاء ملف dev.js لتشغيل Vite
function createViteDevScript() {
  const devScriptPath = path.join(process.cwd(), 'dev.js');
  
  try {
    const devScriptContent = `#!/usr/bin/env node
// هذا الملف يشغل Vite في وضع التطوير
const { spawn } = require('child_process');
const path = require('path');

console.log('جاري تشغيل Vite في وضع التطوير...');

// تحديد أمر التشغيل حسب النظام
const isWin = process.platform === 'win32';
const npxCommand = isWin ? 'npx.cmd' : 'npx';

// تشغيل Vite باستخدام npx
const viteProcess = spawn(npxCommand, ['vite', '--host', '--port', '8080'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PATH: \`\${path.join(process.cwd(), 'node_modules', '.bin')}\${isWin ? ';' : ':'}\${process.env.PATH}\`
  }
});

viteProcess.on('error', (error) => {
  console.error(\`فشل تشغيل Vite: \${error.message}\`);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  process.exit(code || 0);
});
`;
    fs.writeFileSync(devScriptPath, devScriptContent);
    
    // جعل الملف قابل للتنفيذ على أنظمة يونكس
    if (process.platform !== 'win32') {
      try {
        execSync(`chmod +x ${devScriptPath}`, { stdio: 'ignore' });
      } catch (e) {
        console.log('⚠️ لم نتمكن من جعل ملف dev.js قابل للتنفيذ');
      }
    }
    
    console.log(`✅ تم إنشاء ملف ${devScriptPath} لتشغيل Vite في وضع التطوير`);
  } catch (e) {
    console.log('⚠️ لم نتمكن من إنشاء ملف dev.js');
  }
}

// تنفيذ الخطوات واحدة تلو الأخرى
function setupVite() {
  // تحقق من وجود Vite
  if (checkViteInstallation()) {
    console.log('✅ Vite موجود بالفعل');
  } else {
    // تثبيت Vite إذا لم يكن موجودًا
    installVite();
  }
  
  // إضافة Vite إلى PATH
  addViteToPath();
  
  // إنشاء ملفات تنفيذية
  createViteExecutable();
  createViteDevScript();
  
  // تحقق مرة أخرى
  const viteOk = checkViteInstallation();
  if (viteOk) {
    console.log('✅ تم إعداد Vite بنجاح');
    return true;
  } else {
    console.error('❌ فشل إعداد Vite');
    return false;
  }
}

// تنفيذ عملية الإعداد
module.exports = setupVite();

// تنفيذ مباشر إذا تم استدعاء الملف مباشرة
if (require.main === module) {
  setupVite();
}
