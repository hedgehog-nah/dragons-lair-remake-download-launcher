# ⚔️ Dragon's Lair Remastered - Standalone Arcade Launcher v1.0 by Hdg

[![Download DragonsLair.exe](https://img.shields.io/badge/Download-DragonsLair.exe%20(37KB)-10B981?style=for-the-badge&logo=windows&logoColor=white)](bin/DragonsLair.exe?raw=true)
[![Platform](https://img.shields.io/badge/Platform-Windows%207%2F8%2F10%2F11-0284C7?style=for-the-badge)](https://github.com/)
[![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)](LICENSE)

A lightweight, 100% standalone native Windows WPF Desktop Launcher and HTTP 206 High-Performance Streaming Server for **Dragon's Lair Remastered (HTML5 Remake)**.

---

## ⬇️ Quick Download (Pre-Compiled Binary)

👉 **[Download DragonsLair.exe (v1.0)](bin/DragonsLair.exe?raw=true)** *(Direct Download, 37 KB)*

Place DragonsLair.exe inside your Dragon's Lair folder and double-click to play!

---

## 🌟 Key Features

- **100% Standalone & Zero Dependencies**:
  - No Node.js, Python, or external web server (IIS/Apache/Nginx) required.
  - Native C# .NET PE32+ Windows binary (37 KB).
- **Built-in HTTP 206 Range Streaming Server**:
  - Multithreaded local server with byte-range (Accept-Ranges: bytes) support for instant, zero-lag 1080p WebM arcade video streaming and frame seeking.
- **Smart Dynamic Port Auto-Switching**:
  - Automatically probes port 8080. If busy (e.g. by another web server or another instance), dynamically discovers the next free port (8081, 8082, ...) without crashing or blocking.
- **Cryptographic File Integrity Engine (SHA-256)**:
  - Validates all 38 game assets byte-by-byte using SHA-256 hashes against original master signatures.
  - Automatic atomic downloader (.part staging) with live speed (MB/s) and multi-hop HTTP 302 redirect preservation for master 1080p video (405 MB).
- **Modern Dark Arcade WPF GUI**:
  - Custom UI theme (#0B0D14, Amber #F59E0B, Cyan #38BDF8, Emerald #10B981).
  - Real-time scrolling console log and progress bar.
  - Embedded official game sword icon.

---

## 📁 Repository Structure

```text
├── bin/
│   └── DragonsLair.exe   # Pre-compiled, ready-to-run 37KB native executable
├── src/
│   ├── Launcher.cs       # Complete C# WPF & Server Source Code
│   └── favicon.ico       # Embedded application & window icon
├── build.bat             # 1-Click Native C# Compiler Script (Zero Visual Studio required)
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

---

## 🔨 How to Build from Source

Simply double-click **build.bat** or run:

```cmd
build.bat
```

It uses the built-in Microsoft .NET C# compiler (csc.exe) included with every Windows installation:
```cmd
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /target:winexe /optimize+ /platform:anycpu /win32icon:"src\favicon.ico" /r:PresentationFramework.dll /r:PresentationCore.dll /r:WindowsBase.dll /r:System.Xaml.dll /r:System.dll /r:System.Core.dll /r:System.Drawing.dll /r:System.Windows.Forms.dll /out:"bin\DragonsLair.exe" "src\Launcher.cs"
```

---

## 📜 Credits

- **Launcher Version**: v1.0 by **Hdg**
- **Target Game**: Dragon's Lair Remastered HTML5
