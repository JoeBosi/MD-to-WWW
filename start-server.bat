@echo off
REM ============================================
REM BATCH SCRIPT: Start Development Server
REM ============================================
REM Starts the Next.js dev server in background
REM Server runs with hot reload enabled
REM ============================================

echo.
echo ========================================
echo Starting Development Server
echo ========================================
echo.

REM Check if server is already running
tasklist /FI "IMAGENAME eq node.exe" 2>NUL | find /I /N "node.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [WARNING] Node.js processes are already running.
    echo           Use restart-server.bat to restart, or kill-server.bat to stop.
    echo.
    pause
    exit /b 1
)

REM Change to project directory
echo [1/2] Changing to project directory...
cd /d "%~dp0"
echo       Current directory: %CD%

REM Start development server in background
echo [2/2] Starting Next.js development server...
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
echo Server started successfully!
echo ========================================
echo.
echo The development server is running in the background.
echo To stop it, run: kill-server.bat
echo To restart it, run: restart-server.bat
echo.
pause

