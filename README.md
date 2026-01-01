# BroadFire AI Research Lab

A high-performance, visually striking landing page for a research laboratory specializing in Embodied Agents, Spatial Intelligence, Mechanistic Interpretability, and Edge AI. This project showcases advanced WebGL shader programming, interactive 3D graphics, and modern React architecture.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technical Architecture](#technical-architecture)
4. [Installation](#installation)
5. [Development](#development)
6. [Production Build](#production-build)
7. [Project Structure](#project-structure)
8. [Shader Documentation](#shader-documentation)
9. [Performance Optimizations](#performance-optimizations)
10. [Browser Support](#browser-support)

---

## Overview

BroadFire AI is a research-focused landing page that demonstrates the intersection of scientific computing visualization and modern web development. The site features multiple custom GLSL shaders, interactive 3D elements powered by Three.js, and a carefully crafted user experience that balances visual impact with performance.

The About section showcases research domains through interactive 3D spheres with lustrous iridescent materials, backed by a magnetic wave distortion shader that responds to cursor movement in real-time.

---

## Features

### Interactive 3D Spheres

The Research Domains section presents three interactive spheres representing core research areas: Spatial Intelligence, Mechanistic Interpretability, and Optimization/HPC. Each sphere features:

- Custom vertex shaders with organic displacement animation
- Fragment shaders implementing Fresnel-based iridescence
- Subsurface scattering simulation for realistic light interaction
- Hover state animations with smooth transitions
- Click handlers that open detailed modal overlays

### Magnetic Wave Distortion Background

Behind the 3D spheres, an interactive shader background creates a dynamic visual environment:

- Simplex noise implementation for procedural pattern generation
- Fractal Brownian Motion (fBm) for multi-octave turbulence
- Mouse-reactive distortion with spiral wave propagation
- Four-color gradient system with smooth interpolation
- UnrealBloomPass post-processing for glow effects
- Window-level mouse tracking for seamless interactivity

### Optimized Image Loading

Profile images and other assets utilize a custom lazy loading system:

- IntersectionObserver-based viewport detection
- Animated shimmer placeholder during load
- Smooth fade-in transitions on image reveal
- Reduced initial page load by deferring off-screen images

### Modern UI Components

- Responsive grid layouts adapting to all screen sizes
- Sticky navigation elements with scroll-aware behavior
- Animated modal overlays with backdrop blur
- Timeline-based experience section with visual connectors
- Gradient-enhanced card components with hover states

---

## Technical Architecture

### Core Technologies

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2.0 |
| Language | TypeScript | 5.8.3 |
| Build Tool | Vite | 6.4.1 |
| 3D Graphics | Three.js | 0.176.0 |
| Styling | Tailwind CSS | 4.1.8 |
| Icons | Lucide React | 0.511.0 |

### Rendering Pipeline

The application uses a dual-renderer architecture for the Research Domains section:

1. Primary Renderer: Three.js WebGLRenderer for 3D spheres with raycasting
2. Background Renderer: Separate WebGLRenderer with EffectComposer for the magnetic wave shader

Both renderers operate independently with their own animation loops, allowing for smooth 60fps performance while maintaining visual complexity.

### Shader Architecture

All custom shaders are written in GLSL and compiled at runtime through Three.js ShaderMaterial. The codebase includes:

- Vertex shaders for geometry manipulation
- Fragment shaders for surface appearance
- Uniform variables for time-based animation and mouse interaction
- Post-processing passes for bloom and color correction

---

## Installation

### Prerequisites

- Node.js version 16.0 or higher
- npm version 7.0 or higher (or yarn/pnpm equivalent)

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/BroadFireAI/BroadFire.git
   cd BroadFire
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` by default.

---

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

### Development Server

The development server uses Vite's native Hot Module Replacement (HMR) for instant updates. Changes to React components, stylesheets, and shaders will reflect immediately without full page reloads.

### Code Style

The project follows standard TypeScript conventions with strict type checking enabled. ESLint is configured for React and TypeScript best practices.

---

## Production Build

To create an optimized production build:

```bash
npm run build
```

This generates a `dist` directory containing:

- Minified JavaScript bundles with tree-shaking
- Optimized asset handling with content hashing
- Precompiled Tailwind CSS with unused class purging

### Build Output

The production build produces approximately:
- Main JavaScript bundle: ~787KB (217KB gzipped)
- Index HTML: ~2KB

Note: The bundle size includes Three.js and post-processing libraries. Consider code splitting for production deployments where initial load time is critical.

### Preview Build

To preview the production build locally:

```bash
npm run preview
```

This serves the built files on a local server for testing before deployment.

---

## Project Structure

```
src/
  assets/
    profile.png           # Profile image asset
  components/
    About.tsx             # Main About page component
    Interactive3DSpheres.tsx  # Three.js sphere renderer
    MagneticWaveBackground.tsx # Background shader component
    OptimizedImage.tsx    # Lazy-loading image component
    SphereModal.tsx       # Modal overlay for sphere details
    [other components]
  App.tsx                 # Root application component
  main.tsx                # Application entry point
  index.css               # Global styles and Tailwind imports
```

### Component Descriptions

**About.tsx**
The primary page component containing the hero section, research domains, and experience timeline. Manages state for sphere selection and modal visibility.

**Interactive3DSpheres.tsx**
Renders three interactive 3D spheres using Three.js. Implements custom lustrous shader materials with Fresnel iridescence, raycasting for mouse interaction, and floating animation.

**MagneticWaveBackground.tsx**
Full-screen shader background with magnetic wave distortion effect. Uses window-level mouse tracking for cursor-reactive animation, simplex noise for procedural patterns, and UnrealBloomPass for glow effects.

**OptimizedImage.tsx**
Wrapper component for images that implements lazy loading via IntersectionObserver, shimmer placeholder animation, and smooth fade-in transitions.

**SphereModal.tsx**
Accessible modal component for displaying research domain details. Features backdrop blur, color-matched accents derived from sphere colors, and keyboard navigation support.

---

## Shader Documentation

### Lustrous Sphere Shader

Located in `Interactive3DSpheres.tsx`, this shader creates an iridescent, lustrous surface appearance:

**Vertex Shader Features:**
- Organic surface displacement using sine/cosine combinations
- Time-based animation for subtle surface movement
- Hover state scaling for interactive feedback

**Fragment Shader Features:**
- Fresnel effect calculation for view-angle-dependent reflectivity
- Four-color iridescence system cycling through pink, cyan, gold, and purple
- Phong-style specular highlights with adjustable shininess
- Subsurface scattering approximation for translucent appearance
- Pulsing intensity animation for dynamic visual interest

### Magnetic Wave Shader

Located in `MagneticWaveBackground.tsx`, this shader creates the interactive background effect:

**Noise Functions:**
- `mod289`: Modulo operation optimized for GPU computation
- `permute`: Pseudo-random permutation function
- `snoise`: 2D simplex noise implementation
- `fbm`: Fractal Brownian Motion with 6 octaves

**Visual Effects:**
- Mouse-centered distortion field with configurable strength
- Spiral wave propagation based on angle from cursor
- Four-color gradient system (blue, purple, green, orange)
- Exponential glow falloff around cursor position
- Gamma correction for proper color rendering

---

## Performance Optimizations

### Image Loading

- IntersectionObserver defers image loading until viewport entry
- Native `loading="lazy"` and `decoding="async"` attributes
- Placeholder shimmer animation prevents layout shift

### WebGL Rendering

- Pixel ratio clamped to maximum of 2 for high-DPI displays
- Geometry and material disposal on component unmount
- ResizeObserver for efficient viewport change handling
- RequestAnimationFrame-based render loops with cleanup

### React Optimizations

- useCallback hooks prevent unnecessary re-renders
- useRef for mutable values that do not trigger renders
- Proper cleanup in useEffect return functions

---

## Browser Support

The application requires WebGL 2.0 support and modern JavaScript features. Tested and verified on:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Mobile browsers are supported but performance may vary based on GPU capabilities. The shaders gracefully handle lower-powered devices by reducing visual complexity.

---

## License

This project is proprietary software developed for BroadFire AI. All rights reserved.

---

## Contributing

For inquiries about contributing to this project, please contact the research team at contact@broadfire.ai.
