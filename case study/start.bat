@echo off
title Student Management System
echo =========================================================
echo    Starting Student Management System
echo    Backend (Port 5000) + Frontend (Port 5173)
echo =========================================================
echo.
cd /d "%~dp0"
node start-all.js
pause
