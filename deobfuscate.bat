@echo off
setlocal
cd /d "%~dp0"
title Dragon's Lair - JavaScript De-Obfuscator Tool

echo ========================================================
echo   Dragon's Lair Remastered - Automated De-Obfuscator
echo ========================================================
echo.

node tools\deobfuscate.js

echo.
pause
