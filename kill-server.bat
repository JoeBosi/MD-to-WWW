@echo off
REM ============================================
REM BATCH SCRIPT: Kill Development Server
REM ============================================
REM Kills all Node.js processes (stops the dev server)
REM ============================================

echo.
echo ========================================
echo Stopping Development Server
echo ========================================
echo.

REM Kill all Node.js processes
echo Stopping all Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% == 0 (
    echo.
    echo [SUCCESS] All Node.js processes stopped.
    echo.
) else (
    echo.
    echo [INFO] No Node.js processes found.
    echo.
)

REM Also try to kill processes on port 3000 (Next.js default)
echo Checking for processes on port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do (
    echo       Found process on port 3000: %%a
    taskkill /F /PID %%a >nul 2>&1
    if %errorlevel% == 0 (
        echo       Process %%a stopped.
    )
)

echo.
echo ========================================
echo Server stopped successfully!
echo ========================================
echo.
pause

