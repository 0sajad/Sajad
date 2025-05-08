
@echo off
echo Starting Octa Network Haven...

:: Run the application using Node.js
node start.js

:: If there's an error, pause to show the message
if %ERRORLEVEL% NEQ 0 (
  echo Error occurred. Press any key to exit...
  pause > nul
)
