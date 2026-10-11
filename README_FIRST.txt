JARVIS V6 — PMX MODELS ONLY
================================
This update removes the browser calling / device-registration module.
The original JARVIS chat, voice, 3D viewer, and local desktop components are otherwise unchanged.

RUN:
1. Extract JARVIS_V6_PMX_ONLY.zip fully.
2. Open JARVIS_V6_PMX_ONLY\JARVIS_V6_Burnice.
3. Double-click START_JARVIS.bat (requires Node.js 20+).
4. Open http://localhost:3000 if the browser does not open.
5. Click "PMX Models" in the top-right corner.
6. Select V1, V3, V4, V5, V6, V7 or V8, then Apply. JARVIS reloads with the chosen avatar.

CHANGES:
- Removed Call / Devices button and calling overlay.
- Removed WebRTC/Firebase browser calling pages, scripts, and call-only configuration.
- Preserved PMX gallery, switch endpoint, seven model bundles and textures.
- Moved the PMX Models control away from bottom Preview and Eyes Auto buttons.

NOTES:
- This is an edited build of your previous local JARVIS package, not a rebuilt frontend.
- Close older JARVIS browser tabs/server instances; use Ctrl+Shift+R if cached.
- PMX API is local-only; running this as a static-only website cannot switch local model files.
- Turning this into an EXE requires an appropriate Windows/Electron packaging workflow.
- PMX files may have third-party licensing restrictions: review licenses before redistribution/sale.
- Live Windows runtime has not been verified in this environment.
