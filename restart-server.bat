@echo off
REM ============================================
REM BATCH SCRIPT: Restart Development Server
REM ============================================
REM Kills all Node.js processes and restarts the Next.js dev server
REM Server runs in background with hot reload enabled
REM ============================================

echo.
echo ========================================
echo Restarting Development Server
echo ========================================
echo.

REM Kill all Node.js processes
echo [1/3] Stopping existing Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% == 0 (
    echo       Existing processes stopped.
) else (
    echo       No existing processes found.
)
timeout /t 1 /nobreak >nul

REM Change to project directory
echo [2/3] Changing to project directory...
cd /d "%~dp0"
echo       Current directory: %CD%

REM Start development server in background
echo [3/3] Starting Next.js development server...
echo       Server will run in background with hot reload enabled.
echo       Access at: http://localhost:3000
echo       A new window will open for the server output.
echo.
REM Change to directory first, then start npm in new window
cd /d "%~dp0"
REM Start in new window with /k to keep it open (useful for seeing logs)
start "Next.js Dev Server" cmd /k "npm run dev"

REM Wait a moment for server to start
echo       Waiting for server to start...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo Server restarted successfully!
echo ========================================
echo.
echo The development server is running in the background.
echo To stop it, run: kill-server.bat
echo.
pause

