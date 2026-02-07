# FluxForge

A comprehensive toolkit for creating, configuring, and exporting high-performance dynamic backgrounds for React applications.

## 🚀 Quick Start

1.  **Open the App**: You will see the **Sandbox** interface by default.
2.  **Select a Layer**: Click on items in the "Layers" list (e.g., "Gradient Mesh").
3.  **Configure**: Use the "Controls" tab to adjust colors, speed, and counts.
4.  **Export**: Switch to the **`< > CODE`** tab to copy the ready-to-use code.

## 🚀 Deployment (GitHub Pages)

1. Push to `main` — GitHub Actions will build and deploy to the `gh-pages` branch.
2. In the repo **Settings → Pages**: set **Source** to **Deploy from a branch**, branch `gh-pages`, folder `/ (root)`.
3. Site will be at **https://largoscript.github.io/FluxForge/**.

---

## 🛠️ Sandbox & Tools

The Sandbox is your design studio. It offers three specific modes for testing:

### 1. Viewport Modes
Located at the top of the screen:
*   **Full Screen**: See how the background behaves on a full page.
*   **Card (Div)**: Simulates a glassmorphism card. Useful for checking how transparent backgrounds look inside containers.
*   **Button**: Checks if the background works well in small, interactive elements.

### 2. Configuration Tabs
*   **CONTROLS**: Visual sliders and color pickers.
*   **{ } JSON**: Direct access to the raw configuration object. 
    *   *Pro Tip*: Use this to copy/paste settings between layers or to manually position elements (like blobs in Gradient Mesh) by editing `top` and `left` values.
*   **< > CODE**: Generates the final code.
    *   **Container Tag**: Select `div`, `section`, `main` etc. to wrap your background semantically.
    *   **Copy Config JSON**: Copies just the configuration object (useful if you already have the component mounted).
    *   **Copy JSX**: Copies the full component code including the wrapper.

---

## 📦 Component Integration

You can use these components in two ways:

### Method A: Direct Props (Simpler)
Best for static pages where configuration doesn't change often.

```tsx
import GradientMesh from './components/backgrounds/GradientMesh';

export default function Hero() {
  return (
    <section className="relative h-[500px] overflow-hidden">
      <GradientMesh 
        config={{
          backgroundColor: "#0f172a",
          animationSpeed: 10,
          items: [
             { color: "#ff0000", top: "0", left: "0", width: "300px", height: "300px", opacity: 0.6, animationDelay: "0s", animationDuration: "10s" }
          ]
        }} 
      />
      <div className="relative z-10">
        <h1>My Hero Content</h1>
      </div>
    </section>
  )
}
```

### Method B: Registry System (Advanced)
Best for CMS-like environments where you want to edit backgrounds "Live" on the site using the **DevTools**.

1. Wrap your app in `<RegistryProvider>`.
2. Give your background an `id`.

```tsx
// App.tsx
<RegistryProvider>
   <GradientMesh id="home-hero" config={...} />
   <DevTools /> {/* The floating edit button */}
</RegistryProvider>
```

When using the Registry, changing settings in the DevTools panel updates the site in real-time without code changes (during the session).

---

## 🎨 Effect Details

### Gradient Mesh
*   **Description**: Soft, moving blobs of color.
*   **Best for**: Hero sections, modern SaaS landing pages.
*   **Power Feature**: Switch to **JSON** tab to manually add/remove specific blobs or set exact `top/left/right/bottom` positions.

### Particle Network
*   **Description**: Canvas-based constellation effect. Nodes connect when close.
*   **Best for**: Tech, AI, Data visualization themes.
*   **Performance**: Uses HTML5 Canvas. Lower `particleCount` on mobile for better FPS.

### Retro Grid
*   **Description**: 80s Synthwave moving 3D grid.
*   **Best for**: Cyberpunk, gaming, or retro-futuristic designs.

### Lava Lamp
*   **Description**: Fluid, organic floating bubbles with "gooey" interactions.
*   **Best for**: Creative agencies, playful brands.
*   **Fix Note**: Speed and Count can be adjusted live without stopping animations.

---

## 📂 File Structure

*   `components/Sandbox.tsx`: The main editor UI.
*   `components/DevTools.tsx`: The floating floating panel for the Registry system.
*   `components/backgrounds/`: Individual background components.
*   `lib/schemas.ts`: Defines the UI controls (sliders, color pickers) for each effect.
*   `lib/effects/`: Heavy-lifting math logic (Canvas classes) kept separate from React components.
