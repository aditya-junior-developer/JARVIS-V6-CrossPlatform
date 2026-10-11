JARVIS V6 - Windows EXE build repair

ROOT CAUSE:
The 155MB PMX_LIGHT archive omitted cognition/, api_hub/, src/ and
Windows packaging resources. Its npm run build also ran Vite with no frontend
source and overwrote your previously working dist/index.html with an empty UI.

INSTALL (NO NEW FULL DOWNLOAD):
1. Keep your EXISTING extracted JARVIS_V6_Burnice folder (contains assets/).
2. Extract THIS ZIP DIRECTLY into JARVIS_V6_Burnice.
   Merge folders; allow replacement of package.json, electron-builder.yml and
   dist/index.html. Do not create a nested folder for this patch.
3. In that folder, open CMD and run BUILD_JARVIS_EXE.bat, or run:
      npm install
      npm run dist
4. Check the release/ folder for JARVIS Setup ...exe and
   JARVIS-Portable-...exe (names depend on installed electron-builder).

CHANGES:
- Restores original missing cognition/ and api_hub/ source directories.
- Restores src/lib/memoryTypes.ts for local type imports.
- Restores original precompiled frontend assets; does NOT reintroduce phone UI.
- build now compiles only backend with esbuild and PRESERVES precompiled frontend.
- dist skips missing C# launcher / missing frozen Python agent resources.
- Installer/portable branding restored to JARVIS rather than MYRAA.
- Private secrets, personal logs, and local data are excluded from packaging.

LIMITATIONS / READ BEFORE SHARING:
- The Electron app's AI features need a working API configuration/network.
- The packaged application does NOT include a frozen Python agent; desktop
  control may need a separately installed Python + dependencies to function.
- Electron-builder on Windows may require downloads and platform toolchain
  components; code signing not configured.
- The archive structure and imports were checked, but a Windows EXE build was
  NOT run in this environment. Send the next build error if one appears.
- Review third-party PMX model licenses before commercial redistribution.
