
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if required packages are installed
function checkDependencies() {
  try {
    // Check if electron is installed
    const electronPath = require.resolve('electron');
    console.log('✅ Electron is installed');
    
    // Check if electron-builder is installed (for builds)
    const builderPath = require.resolve('electron-builder');
    console.log('✅ Electron-builder is installed');
    
    return true;
  } catch (err) {
    console.error('❌ Missing dependencies:', err.message);
    console.log('Installing required dependencies...');
    
    try {
      console.log('Installing electron and electron-builder...');
      execSync('npm install --no-save electron electron-builder', { stdio: 'inherit' });
      console.log('✅ Dependencies installed successfully');
      return true;
    } catch (installErr) {
      console.error('❌ Failed to install dependencies:', installErr.message);
      return false;
    }
  }
}

// Verify the project structure
function verifyProjectStructure() {
  const requiredFiles = [
    'electron/main.js',
    'electron/preload.js',
    'electron/electron-builder.yml'
  ];
  
  let isValid = true;
  
  for (const file of requiredFiles) {
    const filePath = path.resolve(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${file}`);
      isValid = false;
    }
  }
  
  if (isValid) {
    console.log('✅ Project structure verification passed');
  }
  
  return isValid;
}

// Main function
function initialize() {
  console.log('🔍 Verifying Octa Network Haven Electron environment...');
  
  const dependenciesOk = checkDependencies();
  const structureOk = verifyProjectStructure();
  
  if (dependenciesOk && structureOk) {
    console.log('✅ Environment verification completed successfully');
    return true;
  } else {
    console.error('❌ Environment verification failed');
    return false;
  }
}

// Run initialization if this script is called directly
if (require.main === module) {
  const result = initialize();
  process.exit(result ? 0 : 1);
} else {
  // Export for use in other scripts
  module.exports = { initialize };
}
