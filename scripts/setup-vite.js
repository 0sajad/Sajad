
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('تهيئة Vite وإعداده للعمل مع المشروع...');

// التحقق من وجود vite في المشروع
function checkViteExists() {
  try {
    const vitePath = path.join(process.cwd(), 'node_modules', 'vite');
    const viteLocalBin = path.join(process.cwd(), 'node_modules', '.bin', 'vite' + (process.platform === 'win32' ? '.cmd' : ''));
    
    if (fs.existsSync(vitePath) && fs.existsSync(viteLocalBin)) {
      console.log('✅ Vite موجود في المشروع');
      return true;
    }
    
    // التحقق من وجود Vite عالمياً
    try {
      execSync('vite --version', { stdio: 'ignore' });
      console.log('⚠️ Vite غير موجود محلياً لكنه متاح عالمياً. سيتم تثبيته محلياً...');
    } catch (e) {
      console.log('❌ Vite غير موجود. جاري التثبيت...');
    }
    
    // تثبيت Vite
    execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev', { stdio: 'inherit' });
    console.log('✅ تم تثبيت Vite بنجاح');
    
    return true;
  } catch (error) {
    console.error('❌ فشل التحقق من Vite أو تثبيته:', error.message);
    return false;
  }
}

// إنشاء ملف تشغيل لـ Vite
function createViteRunner() {
  const scriptsDir = path.join(process.cwd(), 'scripts');
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  const runVitePath = path.join(scriptsDir, 'run-vite.js');
  const viteJsPath = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
  
  if (!fs.existsSync(runVitePath) && fs.existsSync(viteJsPath)) {
    try {
      const script = `#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// التحقق من وجود vite محليًا
const viteLocalPath = path.join(process.cwd(), 'node_modules', '.bin', 'vite');
const viteLocalPathJS = path.join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js');
const isWindows = process.platform === 'win32';

// تحديد الأمر المناسب لتشغيل vite
let viteCommand = 'npx';
let viteArgs = ['vite', '--host', '--port', '8080'];

if (fs.existsSync(viteLocalPath) || fs.existsSync(viteLocalPath + (isWindows ? '.cmd' : ''))) {
  // استخدام vite المحلي من node_modules/.bin
  viteCommand = isWindows ? viteLocalPath + '.cmd' : viteLocalPath;
  viteArgs = ['--host', '--port', '8080'];
  console.log('استخدام Vite المحلي من node_modules/.bin');
} else if (fs.existsSync(viteLocalPathJS)) {
  // استخدام node لتشغيل vite.js
  viteCommand = 'node';
  viteArgs = [viteLocalPathJS, '--host', '--port', '8080'];
  console.log('استخدام Node لتشغيل Vite من node_modules/vite/bin/vite.js');
} else {
  console.log('استخدام Vite عبر npx');
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
  process.exit(1);
});

viteProcess.on('close', (code) => {
  process.exit(code || 0);
});
`;
      
      fs.writeFileSync(runVitePath, script);
      
      // جعل الملف قابل للتنفيذ على أنظمة Unix
      if (process.platform !== 'win32') {
        try {
          execSync(`chmod +x ${runVitePath}`, { stdio: 'ignore' });
          console.log(`✅ تم ضبط صلاحيات التنفيذ لملف run-vite.js`);
        } catch (e) {
          console.log(`⚠️ لم نتمكن من ضبط صلاحيات التنفيذ لملف run-vite.js`);
        }
      }
      
      console.log(`✅ تم إنشاء ملف run-vite.js بنجاح`);
      return true;
    } catch (error) {
      console.error(`❌ فشل إنشاء ملف run-vite.js:`, error.message);
      return false;
    }
  }
  
  return fs.existsSync(runVitePath);
}

// التأكد من تكوين vite.config.ts
function ensureViteConfig() {
  const viteConfigPath = path.join(process.cwd(), 'vite.config.ts');
  
  if (!fs.existsSync(viteConfigPath)) {
    console.log('إنشاء ملف vite.config.ts...');
    
    const config = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: process.env.ELECTRON === 'true' ? './' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
}));
`;
    
    try {
      fs.writeFileSync(viteConfigPath, config);
      console.log('✅ تم إنشاء ملف vite.config.ts بنجاح');
      return true;
    } catch (e) {
      console.error('❌ فشل إنشاء ملف vite.config.ts:', e.message);
      return false;
    }
  }
  
  return true;
}

// تنفيذ العمليات
const viteExists = checkViteExists();
const runnerCreated = createViteRunner();
const configEnsured = ensureViteConfig();

module.exports = viteExists && runnerCreated && configEnsured;
