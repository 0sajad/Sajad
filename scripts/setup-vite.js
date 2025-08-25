
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
    
    // تثبيت Vite
    console.log('❌ Vite غير موجود. جاري التثبيت...');
    try {
      execSync('npm install vite@latest @vitejs/plugin-react-swc --save-dev --force', { stdio: 'inherit' });
      
      // التحقق مرة أخرى بعد التثبيت
      if (fs.existsSync(path.join(process.cwd(), 'node_modules', 'vite'))) {
        console.log('✅ تم تثبيت Vite بنجاح');
        return true;
      } else {
        console.error('❌ فشل تثبيت Vite رغم عدم وجود أخطاء');
        return false;
      }
    } catch (error) {
      console.error('❌ فشل تثبيت Vite:', error.message);
      return false;
    }
  } catch (error) {
    console.error('❌ فشل التحقق من Vite أو تثبيته:', error.message);
    return false;
  }
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
  base: '/',
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

// تنفيذ الوظائف
const viteExists = checkViteExists();
const configEnsured = ensureViteConfig();

// إظهار نتيجة التنفيذ
if (viteExists && configEnsured) {
  console.log('✅ تم إعداد Vite بنجاح');
} else {
  console.error('❌ فشل إعداد Vite');
}

module.exports = viteExists && configEnsured;
