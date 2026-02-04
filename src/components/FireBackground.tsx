import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FireBackgroundProps {
  className?: string;
}

const FireBackground: React.FC<FireBackgroundProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let geometry: THREE.BufferGeometry;
    let animationId: number;
    let resizeObserver: ResizeObserver;

    // Simulation config
    const w = 20;
    const h = 20;
    const scale = 20;
    const fire: number[][] = [];
    const firec: number[][] = [];

    // --- 1. Initialize Color Palette ---
    for (let i = 0; i < 16; i++) firec[i + 0] = [i, i, i / 2];
    for (let i = 0; i < 16; i++) firec[i + 16] = [i + 16, i + 16, i + 32];
    for (let i = 0; i < 16; i++) firec[i + 32] = [i + 32, 31 - i / 2, 31 - i / 2];
    for (let i = 0; i < 16; i++) firec[i + 48] = [23 - i / 2, 23 - i / 2, 31 - i];
    for (let i = 0; i < 32; i++) firec[i + 64] = [i / 2 + 16, 16, 15];
    for (let i = 0; i < 32; i++) firec[i + 96] = [i + 32, 16, 15 - i / 2];
    for (let i = 0; i < 32; i++) firec[i + 128] = [63, 16 + i / 2, 0];
    for (let i = 0; i < 32; i++) firec[i + 160] = [63, i + 43, i];
    for (let i = 0; i < 32; i++) firec[i + 192] = [63, 63, i + 32];
    for (let i = 0; i < 32; i++) firec[i + 224] = [63, 63, 63];

    // --- 2. Initialize Fire Grid ---
    for (let y = 0; y < h * scale; y++) {
      fire[y] = [];
      for (let x = 0; x < w * scale; x++) {
        fire[y][x] = 0;
      }
    }

    // --- 3. Setup Three.js Scene ---
    const init = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      scene = new THREE.Scene();
      // Restored camera Z to 12 (was 22) to enlarge fire
      camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
      camera.position.set(0, 4, 12);
      camera.lookAt(0, 1, 0);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      containerRef.current.appendChild(renderer.domElement);

      // --- 4. Build Geometry ---
      geometry = new THREE.BufferGeometry();

      const vertices: number[] = [];
      const colors: number[] = [];

      const pushTriangle = (v1: THREE.Vector3, v2: THREE.Vector3, v3: THREE.Vector3) => {
        vertices.push(v1.x, v1.y, v1.z);
        vertices.push(v2.x, v2.y, v2.z);
        vertices.push(v3.x, v3.y, v3.z);
        for (let i = 0; i < 9; i++) colors.push(0);
      };

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const vA = new THREE.Vector3(x, y, 0);
          const vB = new THREE.Vector3(x, y + 1, 0);
          const vC = new THREE.Vector3(x + 0.5, y + 0.5, 0.1);
          const vD = new THREE.Vector3(x + 1, y, 0);
          const vE = new THREE.Vector3(x + 1, y + 1, 0);

          pushTriangle(vA, vC, vB);
          pushTriangle(vA, vD, vC);
          pushTriangle(vD, vE, vC);
          pushTriangle(vB, vC, vE);
        }
      }

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.center();

      const material = new THREE.ShaderMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: {},
        vertexShader: `
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
        fragmentShader: `
                varying vec3 vColor;
                void main() {
                    float luminance = dot(vColor, vec3(0.299, 0.587, 0.114));
                    float alpha = smoothstep(0.05, 0.25, luminance);
                    gl_FragColor = vec4(vColor, alpha);
                }
            `,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = 0.2;
      // Removed mesh scaling to restore size
      scene.add(mesh);
    };

    // --- 5. Animation Loop ---
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const t = performance.now();

      // Fire Prop logic
      for (let x = 1; x < fire[0].length - 1; x++) {
        fire[0][x] = 0;
        fire[1][x] = 0;
        if (Math.random() > 0.4) {
          fire[0][x] = 1;
          fire[1][x] = 1;
        }
      }

      for (let y = 2; y < fire.length; y++) {
        for (let x = 1; x < fire[0].length - 1; x++) {
          fire[y][x] =
            (fire[y][x] +
              fire[y][x] +
              fire[y - 1][x - 1] +
              fire[y - 1][x] +
              fire[y - 1][x + 1] +
              fire[y - 2][x - 1] +
              fire[y - 2][x] +
              fire[y - 2][x + 1]) /
            8.05;
        }
      }

      // Color update
      const colorAttr = geometry.attributes.color;
      const array = colorAttr.array as Float32Array;
      let offset = 0;

      const getRgb = (gx: number, gy: number) => {
        const val = fire[Math.floor(gy * scale)]?.[Math.floor(gx * scale)] || 0;
        const idx = Math.min(255, Math.floor(val * 255));
        const c = firec[idx] || [0, 0, 0];
        return [c[0] / 63, c[1] / 63, c[2] / 63];
      };

      const pushColor = (rgb: number[]) => {
        array[offset++] = rgb[0];
        array[offset++] = rgb[1];
        array[offset++] = rgb[2];
      };

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let rgb = getRgb(x + 0.2, y + 0.5);
          for (let k = 0; k < 3; k++) pushColor(rgb);

          rgb = getRgb(x + 0.5, y + 0.2);
          for (let k = 0; k < 3; k++) pushColor(rgb);

          rgb = getRgb(x + 0.8, y + 0.5);
          for (let k = 0; k < 3; k++) pushColor(rgb);

          rgb = getRgb(x + 0.5, y + 0.8);
          for (let k = 0; k < 3; k++) pushColor(rgb);
        }
      }
      colorAttr.needsUpdate = true;

      // Camera Sway
      camera.position.x = Math.sin(t * 0.0002) * 2;
      camera.lookAt(0, 1, 0);

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    init();
    animate();

    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
      if (renderer) {
        renderer.dispose();
        container?.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
    };
  }, []);

  return <div ref={containerRef} className={`${className} overflow-hidden pointer-events-none`} />;
};

export default FireBackground;
