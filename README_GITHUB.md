# JARVIS V6 — GitHub Source (Safe Starter)

This is a cleaned source snapshot generated from `JARVIS_V6_Burnice(3).zip` with the earlier EXE-build repair sources merged. This is NOT a confirmed working release.

## What is included
- Project sources and Node/Electron configuration
- Missing cognition and API hub module sources recovered from an earlier fix
- Previously compiled frontend assets from the EXE repair snapshot
- Python desktop-agent scripts
- Documentation and package-lock.json if present

## Not included
- `node_modules`, `.jarvis-data`, logs, saved conversations and secrets
- PMX model binaries/textures and bundled third-party assets (redistribution permission not verified)
- Installer output and Windows executables

**Model gallery will not render until each model's PMX assets/textures are supplied separately with redistribution permission.**

## Install on Windows/Mac for source development
Install Node.js LTS and Python where needed, then `npm ci`. Some Windows-only desktop controls will need macOS replacements; there is no working macOS app guaranteed.

## Before public sharing
Audit all files for secrets/licences, test a clean build and respect model redistribution rights.

## GitHub
1. Make a **private** empty repo on GitHub (or change the visibility of your existing JARVIS repo if appropriate).
2. Copy these source files into your local Git clone.
3. Use the included Windows script (or normal `git add`, `commit`, `push` commands).
