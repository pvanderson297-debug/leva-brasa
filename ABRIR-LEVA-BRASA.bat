@echo off
cd /d "%~dp0"
start "Leva Brasa Servidor" powershell -NoProfile -ExecutionPolicy Bypass -NoExit -File "%~dp0serve-tcp.ps1"
timeout /t 2 >nul
start http://127.0.0.1:3000/
