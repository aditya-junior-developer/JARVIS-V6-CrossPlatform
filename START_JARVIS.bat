@echo off
cd /d "%~dp0"
if not exist "assets\characters\jarvis\model.pmx" (
  echo Installing this version's PMX from your Downloads folder...
  py INSTALL_MY_MODEL.py
  if errorlevel 1 (echo Model install failed. Read the message above. & pause & exit /b 1)
)
if not exist "assets\characters\jarvis\textures.json" (
  echo textures.json missing. Reinstalling...
  py INSTALL_MY_MODEL.py
  if errorlevel 1 (pause & exit /b 1)
)
if not exist "node_modules\express" (
  echo Installing Node dependencies...
  call npm install --no-audit --no-fund
  if errorlevel 1 (pause & exit /b 1)
)
echo Launching JARVIS. Close any older JARVIS CMD windows first.
start "" http://localhost:3000
set NODE_ENV=production
node dist\server.cjs
pause
