@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
echo === JARVIS GitHub Source Setup ===
where git >nul 2>&1 || (echo Git not installed. Install Git for Windows from https://git-scm.com/downloads/win & pause & exit /b 1)
if not exist package.json (echo Error: Run from the JARVIS source folder with package.json. & pause & exit /b 1)
if not exist .git git init -b main
if errorlevel 1 (echo Git initialization failed & pause & exit /b 1)
git add -A
if errorlevel 1 (echo Git add failed & pause & exit /b 1)
echo.
echo Review the staged files carefully before sharing:
git status --short
set /p APPROVE="Commit these files locally? Type YES: "
if /i not "!APPROVE!"=="YES" (echo Cancelled. & pause & exit /b 0)
git commit -m "Prepare JARVIS V6 source for collaboration"
if errorlevel 1 (echo No commit created; check git user.name and user.email. & pause & exit /b 1)
echo.
echo Git repo prepared locally. To publish, first create an EMPTY PRIVATE repository at https://github.com/new
echo Then run: git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
echo Then run: git push -u origin main
echo Do not publish publicly until third-party asset rights are confirmed.
pause
