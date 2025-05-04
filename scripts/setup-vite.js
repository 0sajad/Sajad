
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// تحديد نظام التشغيل
const isWindows = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';
const isLinux = os.platform() === 'linux';

console.log(`التحقق من وجود Vite وتثبيته إذا لزم الأمر... (${isWindows ? 'Windows' : isMac ? 'macOS' : 'Linux'})`);

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
    const viteCommand = isWindows ? 'where vite' : 'which vite';
    execSync(viteCommand, { stdio: 'ignore' });
    console.log('✅ وجدنا تثبيت Vite عالمي');
    return true;
  } catch (e) {
    try {
      const npxCommand = isWindows ? 'npx.cmd vite --version' : 'npx vite --version';
      execSync(npxCommand, { stdio: 'ignore' });
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
    const installCommand = isWindows ? 'npm install vite@latest --save-dev' : 'npm install vite@latest --save-dev';
    execSync(installCommand, { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite بنجاح');

    // التحقق من نجاح التثبيت
    if (checkViteInstallation()) {
      return true;
    }

    // إذا لم يتم العثور على Vite بعد التثبيت، حاول تثبيته عالمياً
    console.log('⚠️ لم يتم العثور على Vite بعد التثبيت المحلي، جاري تثبيته عالمياً...');
    const globalInstallCommand = isWindows ? 'npm install -g vite' : 'sudo npm install -g vite';
    execSync(globalInstallCommand, { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite عالمياً');
    
    return true;
  } catch (error) {
    console.error('❌ فشل تثبيت Vite:', error.message);
    
    // محاولة استخدام npx
    try {
      console.log('⏳ محاولة تشغيل Vite باستخدام npx...');
      const npxCommand = isWindows ? 'npx.cmd vite --version' : 'npx vite --version';
      execSync(npxCommand, { stdio: 'ignore' });
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
  if (isWindows) {
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
    
    // إضافة إلى ملف تكوين الشل للأنظمة القائمة على يونكس
    const homeDir = os.homedir();
    let shellConfigFile;
    
    // تحديد ملف تكوين الشل المناسب
    if (isMac) {
      // macOS يستخدم عادة .bash_profile أو .zshrc
      if (fs.existsSync(path.join(homeDir, '.zshrc'))) {
        shellConfigFile = path.join(homeDir, '.zshrc');
      } else {
        shellConfigFile = path.join(homeDir, '.bash_profile');
      }
    } else {
      // معظم توزيعات لينكس تستخدم .bashrc
      shellConfigFile = path.join(homeDir, '.bashrc');
    }
    
    try {
      if (fs.existsSync(shellConfigFile)) {
        const pathExportLine = `export PATH="${binPath}:${vitePath}:$PATH"`;
        const configContent = fs.readFileSync(shellConfigFile, 'utf8');
        
        if (!configContent.includes(pathExportLine)) {
          fs.appendFileSync(shellConfigFile, `\n# Added by Octa Network Haven setup\n${pathExportLine}\n`);
          console.log(`✅ تمت إضافة المسارات إلى ${shellConfigFile}`);
        }
      }
    } catch (e) {
      console.log(`⚠️ لم نتمكن من تحديث ملف التكوين ${shellConfigFile}`);
    }
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
      if (!isWindows) {
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

// إنشاء سكربت تشغيل متوافق مع النظام
function createSystemSpecificScripts() {
  // إنشاء سكربت لينكس/ماك إذا لم يكن موجوداً
  if (!isWindows && (!fs.existsSync('./run-electron-dev.sh') || !fs.existsSync('./run-electron-build.sh'))) {
    try {
      // سكربت التطوير
      const devScriptContent = `#!/bin/bash
echo "جاري تشغيل تطبيق إلكترون في وضع التطوير..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# تنفيذ سكربت التشغيل
node dev.js
`;
      fs.writeFileSync('./run-electron-dev.sh', devScriptContent);
      execSync('chmod +x ./run-electron-dev.sh', { stdio: 'ignore' });
      
      // سكربت البناء
      const buildScriptContent = `#!/bin/bash
echo "جاري بناء تطبيق إلكترون..."

# التحقق من node_modules
if [ ! -d "node_modules" ]; then
  echo "تثبيت الحزم المطلوبة..."
  npm install --no-save
fi

# تشغيل عملية البناء
npx vite build

echo ""
echo "تم الانتهاء! يمكنك العثور على ملف التثبيت في مجلد 'release'."
`;
      fs.writeFileSync('./run-electron-build.sh', buildScriptContent);
      execSync('chmod +x ./run-electron-build.sh', { stdio: 'ignore' });
      
      console.log('✅ تم إنشاء ملفات تشغيل متوافقة مع لينكس/ماك');
    } catch (e) {
      console.log('⚠️ فشل إنشاء ملفات تشغيل لينكس/ماك:', e.message);
    }
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
  
  // إنشاء سكربتات متوافقة مع النظام
  createSystemSpecificScripts();
  
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
