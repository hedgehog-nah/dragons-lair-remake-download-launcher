@echo off
setlocal
cd /d "%~dp0"
title Dragon's Lair - Daily Archive Snapshot Tool

echo ========================================================
echo   Dragon's Lair Remastered - Daily Archive Snapshot Tool
echo ========================================================
echo.

node tools\archive_snapshot.js

echo.
pause
