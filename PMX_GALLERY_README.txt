JARVIS V6 - 7 PMX MODEL CHOOSER UPDATE
======================================

WHAT CHANGED
- Seven supplied, working PMX packages are included: V1, V3, V4, V5, V6, V7, V8.
- V2 was explicitly marked broken in the supplied catalogue and is excluded.
- Responsive PMX selection gallery with new, designed previews adapted from the exact character screenshots in the supplied PDF.
- The gallery applies the real model.pmx and extracted original textures; changing a model reloads the main JARVIS page.
- A 'PMX Models' button is available in the existing JARVIS page to switch again later.
- Calling, AI, voice, tools, original V6 UI code, and other functionality were NOT changed.
- The original V6 (Burnice) is active by default.

RUN ON WINDOWS
1. Extract this ZIP fully to a normal folder (do not run from inside ZIP).
2. Open JARVIS_V6_Burnice and double-click START_JARVIS.bat.
3. Open http://localhost:3000 if the browser does not open automatically.
4. On first browser launch the PMX gallery will open; choose a model and click Apply.
5. Later click 'PMX Models' at bottom-right to change the avatar.
6. Standalone gallery URL: http://localhost:3000/pmx-gallery.html

REQUIREMENTS
- Node.js 20+ installed (on Windows: node -v), plus Python if required by your original launcher.
- Existing npm/node_modules are preserved from your uploaded ZIP.
- Extract fully; do not remove the assets/characters/gallery folder.
- The Gemini API key is not included in the shared ZIP. Enter it in original JARVIS settings when required.

VERIFICATION
- Static JavaScript syntax checks passed.
- Tested API model switching for all seven variants, including model signature, texture files, and default restoration.
- Windows launch, animations, rendering compatibility for every PMX, and real calling were NOT verified here.
- Some imported PMX models may require bone/morph adjustments in the original 3D renderer.
- Character previews are designed from the supplied PDF screenshots, not fabricated character depictions.

SECURITY
- An existing populated secrets.json in the user's original upload was deliberately omitted from the output archive.
- PMX selection API binds to the existing JARVIS localhost server only; it does not grant remote device control.
