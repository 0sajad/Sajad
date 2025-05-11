
@echo off
echo Starting Octa Network Haven Desktop Application...

:: Set environment variable for Electron
set ELECTRON=true

:: First check for required dependencies
echo Checking dependencies...
if not exist "node_modules\electron" (
  echo Installing Electron...
  npm install electron --no-save
)

:: Try to run with node directly
echo Launching Electron application...
node scripts/electron-dev.js

:: In case of failure, try direct approach
if %ERRORLEVEL% NEQ 0 (
  echo Attempting direct Electron launch...
  npx electron electron/main.js
)

pause
