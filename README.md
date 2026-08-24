# ⚔️ Dragon's Lair Remastered - Standalone Arcade Launcher v1.0 by Hdg

[![Download DragonsLair.exe](https://img.shields.io/badge/Download-DragonsLair.exe%20(37KB)-10B981?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/hedgehog-nah/dragons-lair-remake-download-launcher/releases/latest/download/DragonsLair.exe)
[![Latest Release](https://img.shields.io/github/v/release/hedgehog-nah/dragons-lair-remake-download-launcher?style=for-the-badge&color=F59E0B)](https://github.com/hedgehog-nah/dragons-lair-remake-download-launcher/releases/latest)
[![Target Game](https://img.shields.io/badge/Target%20Game-dlremaster.web.app-38BDF8?style=for-the-badge&logo=google-chrome&logoColor=white)](https://dlremaster.web.app/)
[![Platform](https://img.shields.io/badge/Platform-Windows%207%2F8%2F10%2F11-0284C7?style=for-the-badge)](https://github.com/)

A lightweight, 100% standalone native Windows WPF Desktop Launcher and HTTP 206 High-Performance Streaming Server for **[Dragon's Lair Remastered (HTML5 Remake)](https://dlremaster.web.app/)**.

---

## ⚖️ Legal Disclaimer & Copyright Notice

> [!IMPORTANT]
> **No Copyrighted Files Bundled:**
> - This software is strictly an **open-source launcher and asset downloader utility**.
> - **Zero copyrighted game assets, audio files, textures, or video media are hosted, distributed, or bundled** within this repository or within `DragonsLair.exe`.
> - All assets and media are fetched dynamically at runtime on the client machine directly from the publicly accessible web application at **[dlremaster.web.app](https://dlremaster.web.app/)**.
> - *Dragon's Lair* and related trademarks and assets belong to their respective copyright holders (Digital Leisure Inc. / Don Bluth / Rick Dyer). This project is non-commercial, created solely for educational purposes and offline playback convenience.

---

## ⬇️ Quick Download (Pre-Compiled Binary)

👉 **[Download DragonsLair.exe (v1.0)](https://github.com/hedgehog-nah/dragons-lair-remake-download-launcher/releases/latest/download/DragonsLair.exe)** *(Direct 1-Click Download, 37 KB)*

1. Place `DragonsLair.exe` in any empty folder (e.g. `C:\Dragons Lair`).
2. Double-click `DragonsLair.exe` — the launcher will download the missing assets directly from the public web remake, start a local zero-lag HTTP 206 server, and launch the game for seamless offline play!

---

## 🌟 Key Features

- **100% Standalone & Zero Dependencies**:
  - No Node.js, Python, or external web server (IIS/Apache/Nginx) required.
  - Native C# .NET PE32+ Windows binary (37 KB).
- **Built-in HTTP 206 Range Streaming Server**:
  - Multithreaded local server with byte-range (`Accept-Ranges: bytes`) support for instant, zero-lag 1080p WebM arcade video streaming and frame seeking.
- **Smart Dynamic Port Auto-Switching**:
  - Automatically probes port `8080`. If busy (e.g. by another web server or another instance), dynamically discovers the next free port (`8081`, `8082`, ...) without crashing or blocking.
- **Cryptographic File Integrity Engine (SHA-256)**:
  - Validates all 38 game assets byte-by-byte using SHA-256 hashes against original master signatures from **[dlremaster.web.app](https://dlremaster.web.app/)**.
  - Automatic atomic downloader (`.part` staging) with live speed (MB/s) and multi-hop HTTP 302 redirect preservation for master 1080p video (405 MB).
- **Modern Dark Arcade WPF GUI**:
  - Custom UI theme (`#0B0D14`, Amber `#F59E0B`, Cyan `#38BDF8`, Emerald `#10B981`).
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
└── README.md             # Project documentation & Legal Disclaimer
```

---

## 🔨 How to Build from Source

Simply double-click **`build.bat`** or run:

```cmd
build.bat
```

It uses the built-in Microsoft .NET C# compiler (`csc.exe`) included with every Windows installation:
```cmd
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /target:winexe /optimize+ /platform:anycpu /win32icon:"src\favicon.ico" /r:PresentationFramework.dll /r:PresentationCore.dll /r:WindowsBase.dll /r:System.Xaml.dll /r:System.dll /r:System.Core.dll /r:System.Drawing.dll /r:System.Windows.Forms.dll /out:"bin\DragonsLair.exe" "src\Launcher.cs"
```

---

## 📜 Credits & Links

- **Launcher Developer**: v1.0 by **Hdg**
- **Original Game & Remake**: **[Dragon's Lair Remastered HTML5](https://dlremaster.web.app/)**
- **Official Releases**: **[GitHub Releases](https://github.com/hedgehog-nah/dragons-lair-remake-download-launcher/releases)**
