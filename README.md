# FluxForge

A comprehensive toolkit for creating, configuring, and exporting high-performance dynamic backgrounds for React applications.

## 🚀 Deployment (Automatic)

This project is configured with **GitHub Actions**. You do **not** need to use the terminal to deploy.

1.  **Push Changes**: Simply save your code and push it to GitHub (or let your AI builder do it).
2.  **Wait**: GitHub will automatically build your site. This takes about 2-3 minutes.
3.  **Setup (One time only)**:
    *   Go to your GitHub Repository.
    *   Click **Settings** -> **Pages** (on the left).
    *   Under **Build and deployment** > **Source**, select **Deploy from a branch**.
    *   Under **Branch**, select `gh-pages` and `/ (root)`. (Note: The `gh-pages` branch will be created automatically after the first successful action run).
    *   Click **Save**.

Your site will be live at the link displayed at the top of the Pages settings!

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
