@echo off
setlocal
cd /d "%~dp0"
title Building DragonsLair.exe...

echo ========================================================
echo   Dragon's Lair Remastered - Build Native Executable
echo   Version: v1.0 by Hdg
echo ========================================================
echo.

set CSC=C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe
set DOTNET=C:\Windows\Microsoft.NET\Framework64\v4.0.30319
set SRC=src\Launcher.cs
set ICO=src\favicon.ico
set OUT=DragonsLair.exe

if not exist "%CSC%" (
    echo [ERROR] C# Compiler not found at: %CSC%
    pause
    exit /b 1
)

echo [*] Compiling %SRC% to %OUT%...
"%CSC%" /target:winexe /optimize+ /platform:anycpu /win32icon:"%ICO%" /r:"%DOTNET%\WPF\PresentationFramework.dll" /r:"%DOTNET%\WPF\PresentationCore.dll" /r:"%DOTNET%\WPF\WindowsBase.dll" /r:"%DOTNET%\System.Xaml.dll" /r:"%DOTNET%\System.dll" /r:"%DOTNET%\System.Core.dll" /r:"%DOTNET%\System.Drawing.dll" /r:"%DOTNET%\System.Windows.Forms.dll" /out:"%OUT%" "%SRC%"

if %errorlevel% equ 0 (
    echo.
    echo [OK] Build SUCCESSFUL! Output: %OUT%
    echo.
) else (
    echo.
    echo [FAIL] Compilation failed with error code %errorlevel%
    echo.
)

pause
