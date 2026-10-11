# JARVIS V6 — Windows and macOS Setup Guide

> **Project state:** source snapshot for developers; **Windows was built locally by the project owner, but macOS is untested.** This repository does **not** contain the original seven PMX models/textures, API keys, or a complete installer. Do not claim a fully working Mac release until it has been tested on a Mac.

## 1. Requirements (both platforms)

- Git
- Node.js LTS (22.x recommended) with npm
- Internet for the initial `npm ci` and any cloud AI provider
- Python 3, optionally, for the separate desktop agent
- The original PMX models and their textures, obtained lawfully and placed in the paths expected by JARVIS
- A personal AI provider API key, if using cloud AI features. **Never commit your .env, secrets.json, access tokens, or user data.**

GitHub repository: https://github.com/aditya-junior-developer/JARVIS

## 2. Windows (CMD or PowerShell)

Open a terminal and run:

```cmd
git clone https://github.com/aditya-junior-developer/JARVIS.git
cd JARVIS
node --version
npm --version
npm ci
npm run build
npm run electron
```

This starts the Electron desktop app and its Node backend. The app uses `http://localhost:3000` internally; if port 3000 is in use, close other instances.

**Windows installer / portable EXE** (after the source launches correctly):

```cmd
npm run dist
```

Look in `release\` for `JARVIS Setup 1.0.1.exe` and/or `JARVIS-Portable-1.0.1.exe`. These names may differ with the version. Do not share `win-unpacked/JARVIS.exe` without its accompanying directory.

**Alternative**: `npm run dev` runs the unbundled Node backend; for Electron use `npm run build` followed by `npm run electron`.

## 3. macOS (Terminal)

Open Terminal, install Git and Node.js LTS, then:

```bash
git clone https://github.com/aditya-junior-developer/JARVIS.git
cd JARVIS
node --version
npm --version
npm ci
npm run build
npm run electron
```

This is a **development launch attempt**, not a verified macOS release. The Electron framework supports macOS, but parts of this JARVIS code and Python desktop agent were built around Windows-specific paths, startup commands and permissions. macOS accessibility, microphone, screen-recording, browser-control permissions and Python dependencies may need separate implementation. Do **not** run `npm run dist` on a Mac expecting a DMG: in this repository that script explicitly builds Windows targets (`electron-builder --win nsis portable`).

To experiment with a Mac build **after** successfully testing the app and auditing assets:

```bash
npx electron-builder --mac dmg
```

A DMG produced by this command is not proof the app runs correctly. macOS code signing/notarization may be needed for redistribution.

## 4. PMX models (both)

The public repository includes model-selector **code**, but **not** the third-party PMX `model.pmx` binaries or texture files. Without those assets, characters may not appear. Place the original PMX assets in the paths expected by the app (see `PMX_GALLERY_README.txt`, `MODEL_VARIANT.json`, and `assets/characters/`). Do not publish these models unless their licenses allow redistribution.

## 5. Configure AI

Check `.env.example` for supported environment settings. Supply your own keys locally or through secure environment variables. Do not use or publish another person's key. AI features requiring external providers do not work offline just because Electron launches.

## 6. Common fixes

| Symptom | Action |
|---|---|
| `npm` / `node` not found | Install Node.js LTS and reopen the terminal |
| `Cannot find module` | Run `npm ci`; verify `cognition/` and `api_hub/` exist |
| `dist/server.cjs` missing | Run `npm run build` before `npm run electron` |
| `localhost:3000` unavailable | Close older JARVIS / Node instances and relaunch |
| Blank/partial avatar | Original PMX models/textures are **not included** in GitHub |
| AI responds but cannot control desktop | Desktop agent or OS permissions may be missing |
| macOS security warning | Treat unverified builds as development-only; don't bypass security for untrusted software |

## 7. Safe collaboration

Create a feature branch for changes, open a pull request, and avoid uploading `node_modules/`, `release/`, `.env`, `secrets.json`, `.jarvis-data/`, user logs, and unlicensed assets. Keep the repository **private** while verifying commercial permissions and project security.

**Status:** The build commands above follow the actual `package.json` scripts. Only Windows packaging has been reported by the project owner; Mac compatibility and the complete seven-model experience have not been verified from this public source snapshot.
