# ⚔️ Dragon's Lair Remastered - Standalone Arcade Launcher v1.2 by Hdg

[![Download DragonsLair.exe](https://img.shields.io/badge/Download-DragonsLair.exe%20(38KB)-10B981?style=for-the-badge&logo=windows&logoColor=white)](https://github.com/hedgehog-nah/dragons-lair-remake-download-launcher/releases/latest/download/DragonsLair.exe)
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

👉 **[Download DragonsLair.exe (v1.2)](https://github.com/hedgehog-nah/dragons-lair-remake-download-launcher/releases/latest/download/DragonsLair.exe)** *(Direct 1-Click Download, ~38 KB)*

1. Place `DragonsLair.exe` in any empty folder (e.g. `C:\Dragons Lair`).
2. Double-click `DragonsLair.exe` — the launcher will automatically verify or download the missing assets directly from the public web remake, start a local zero-lag HTTP 206 server, and launch the game for seamless offline play!

---

## 🌟 Key Features

- **100% Standalone & Zero Dependencies**:
  - No Node.js, Python, or external web server (IIS/Apache/Nginx) required.
  - Native C# .NET PE32+ Windows binary (~38 KB).
- **Built-in HTTP 206 Range Streaming Server**:
  - Multithreaded local server with byte-range (`Accept-Ranges: bytes`) support for instant, zero-lag 1080p WebM arcade video streaming and frame seeking.
- **Smart Dynamic Port Auto-Switching**:
  - Automatically probes port `8080`. If busy (e.g. by another web server or instance), dynamically discovers the next free port (`8081`, `8082`, ...) without crashing or blocking.
- **Smart HTTP Fallback Router & Script Normalization**:
  - Automatically maps and serves script aliases (e.g. handling upstream `gam.js` typos directly) and missing prefix fallback for audio/graphics.
- **Universal Dynamic Regex Patching Engine**:
  - Completely eliminates static string dependencies (e.g. `'location'`).
  - Matches and replaces both literal and heavily obfuscated window property calls (`window[_0x...][...]`).
  - Automatically strips invisible Unicode UTF-8 BOM markers (`\uFEFF`) and zero-width spaces.
- **Cryptographic File Integrity Engine (SHA-256)**:
  - Validates all 38 game assets byte-by-byte using SHA-256 hashes against original master signatures from **[dlremaster.web.app](https://dlremaster.web.app/)**.
  - Automatic atomic downloader (`.part` staging) with live speed (MB/s) and multi-hop HTTP 302 redirect preservation for master 1080p video (405 MB).
- **Modern Dark Arcade WPF GUI**:
  - Custom UI theme (`#0B0D14`, Amber `#F59E0B`, Cyan `#38BDF8`, Emerald `#10B981`).
  - Real-time scrolling console log and progress bar.
  - Embedded official game sword icon extracted at runtime.

---

## 📝 Version History & Changelog

### **v1.2** *(Current)*
- 🛡️ **Universal Dynamic Regex Patching Engine**:
  - Bypasses both literal domain checks and heavily obfuscated function calls (`window[_0x1e2bcc(...)][...]` / `window[_0x1fc722(...)][...]`).
  - Completely eliminates reliance on static strings like `'location'` or fixed variable names, guaranteeing 100% resilience against upstream re-obfuscation.
- 🧹 **UTF-8 BOM Auto-Stripping**:
  - Automatically detects and strips invisible Unicode BOM markers (`\uFEFF`) and zero-width spaces from scripts, preventing browser parsing and execution crashes.
- 🌐 **Smart HTTP Fallback Router & Normalization**:
  - Added dynamic URL routing for upstream script name changes and typos (such as `/game/gam.js` ➡️ `game/game.js`) and audio root fallbacks.
  - Cleans and aligns script tags in `index.html` to guarantee instant script execution.
- 🔄 **Updated Master Asset Manifest (SHA-256)**:
  - Synchronized cryptographic SHA-256 signatures for the latest upstream build (`index.html` 2.791 B, `game.css` 11.710 B, `game.js` 558.066 B).
- 🧪 **Multi-Version Verification Suite**:
  - Tested and benchmarked against multiple distinct structural variants (Legacy 416 KB, Desktop BOM 553 KB, Production 554 KB, Fresh 558 KB, and Obfuscated 561 KB) with 100% pass rate.
- 🎨 **Branding & UI Updates**:
  - Updated titles, status headers, and build scripts to v1.2 by Hdg.

### **v1.1**
- 🐛 **Fixed Browser Black Screen Issue**: Resolved video playback failure caused by upstream JavaScript anti-piracy domain check updates on `dlremaster.web.app`.
- ⚡ **Dynamic Port Switching**: Added dynamic port collision detection and auto-incrementing.
- 🔄 **Updated Master Asset Manifest**: Synchronized asset signatures with upstream.

### **v1.0**
- 🚀 **Initial Release**: Complete standalone native C# WPF launcher with embedded HTTP 206 byte-range streaming server and automatic SHA-256 asset downloader.

---

## 📁 Repository Structure

```text
├── bin/
│   └── DragonsLair.exe   # Pre-compiled, ready-to-run native executable (~38KB)
├── src/
│   ├── Launcher.cs       # Complete C# WPF & Server Source Code
│   └── favicon.ico       # Embedded application & window icon
├── build.bat             # 1-Click Native C# Compiler Script (Zero Visual Studio required)
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation, Legal Disclaimer & Changelog
```

---

## 🔨 How to Build from Source

Simply double-click **`build.bat`** or run:

```cmd
build.bat
```

It uses the built-in Microsoft .NET C# compiler (`csc.exe`) included with every Windows installation:
```cmd
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /target:winexe /optimize+ /platform:anycpu /win32icon:"src\favicon.ico" /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\WPF\PresentationFramework.dll" /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\WPF\PresentationCore.dll" /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\WPF\WindowsBase.dll" /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.Xaml.dll" /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.dll" /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.Core.dll" /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.Drawing.dll" /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.Windows.Forms.dll" /out:"bin\DragonsLair.exe" "src\Launcher.cs"
```

---

## 📜 Credits & Links

- **Launcher Developer**: v1.2 by **Hdg**
- **Special Thanks for Testing**: **Fabrizio La Ferrara**, **Andrea Bovo**, and **Fabrizio Radica**
- **Original Game & Remake**: **[Dragon's Lair Remastered HTML5](https://dlremaster.web.app/)**
- **Official Releases**: **[GitHub Releases](https://github.com/hedgehog-nah/dragons-lair-remake-download-launcher/releases)**
