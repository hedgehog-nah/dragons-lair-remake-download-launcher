@echo off
setlocal
cd /d "%~dp0"
title Push Dragons Lair Source to GitHub

echo ========================================================
echo   Push Dragon's Lair Remastered Launcher to GitHub
echo   Author: hedgehog-nah (v1.0 by Hdg)
echo ========================================================
echo.

set /p REPONAME="Inserisci il nome del repository GitHub (premi INVIO per 'dragons-lair-launcher'): "
if "%REPONAME%"=="" set REPONAME=dragons-lair-launcher

echo.
echo [*] Impostazione remote origin su: https://github.com/hedgehog-nah/%REPONAME%.git
git remote remove origin >nul 2>&1
git remote add origin "https://github.com/hedgehog-nah/%REPONAME%.git"
git branch -M main

echo [*] Esecuzione git push su GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   [OK] Repository caricato con successo su GitHub!
    echo   URL: https://github.com/hedgehog-nah/%REPONAME%
    echo ========================================================
) else (
    echo.
    echo [!] Se non hai ancora creato il repository su GitHub, crealo prima qui:
    echo     https://github.com/new (chiamalo: %REPONAME%)
)

echo.
pause
