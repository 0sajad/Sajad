
@echo off
echo Starting Octa Network Haven Desktop Application...

:: Set environment variable to indicate Electron mode
set ELECTRON=true

:: Try to run with electron directly
echo Starting Electron application...
npx electron electron/main.js

:: If there's an error, try alternative approach
if %ERRORLEVEL% NEQ 0 (
  echo Attempting alternative launch method...
  node scripts/electron-dev.js
)

:: If still failing, provide helpful message
if %ERRORLEVEL% NEQ 0 (
  echo Failed to start Electron application.
  echo Please ensure Electron is installed by running: npm install electron --save-dev
  echo Press any key to exit...
  pause > nul
)
