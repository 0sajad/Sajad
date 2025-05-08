
@echo off
echo Starting Octa Network Haven in development mode...

:: Try to run with node directly
node start.js

:: In case of failure, try with npx vite directly
if %ERRORLEVEL% NEQ 0 (
  echo Attempting to run with npx vite directly...
  npx.cmd vite --host --port 8080
)

pause
