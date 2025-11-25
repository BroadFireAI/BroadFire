import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface ThreeBackgroundProps {
  className?: string;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- State Variables within Effect Scope ---
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let controls: OrbitControls;
    let clock: THREE.Clock;
    let upperPyramid: THREE.Points;
    let lowerPyramid: THREE.Points;
    let animationFrameId: number;
    let resizeObserver: ResizeObserver;

    const state = {
      mouseX: 0,
      mouseY: 0,
      windowHalfX: 0,
      windowHalfY: 0,
      isHovering: false,
      hoverValue: 0
    };

    // --- Shader Helper Function ---
    const createPyramidLayer = (baseSize: number, height: number, particleCount: number, isUpper: boolean) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      const initialPositions = new Float32Array(particleCount * 3);
      const rotationDirections = new Float32Array(particleCount);

      const color = new THREE.Color();
      
      // Reverted to Neon/Bright Palette for Dark Background
      const colorPalette = isUpper ? [
        [1.0, 0.2, 0.6], // Hot Pink
        [0.8, 0.0, 1.0], // Purple
        [1.0, 0.4, 0.0]  // Bright Orange
      ] : [
        [0.0, 1.0, 0.8], // Cyan
        [0.0, 0.8, 1.0], // Light Blue
        [0.2, 0.4, 1.0]  // Royal Blue
      ];

      const corners = [
        { x: baseSize, z: baseSize },
        { x: -baseSize, z: baseSize },
        { x: -baseSize, z: -baseSize },
        { x: baseSize, z: -baseSize }
      ];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        const isEdge = Math.random() < 0.3; 
        let x, y, z;

        if (isEdge) {
          const edge = Math.floor(Math.random() * 8);
          const t = Math.random();

          if (edge < 4) {
            const corner1 = corners[edge];
            const corner2 = corners[(edge + 1) % 4];
            x = corner1.x + (corner2.x - corner1.x) * t;
            z = corner1.z + (corner2.z - corner1.z) * t;
            y = 0;
          } else { 
            const corner = corners[edge - 4];
            x = corner.x * (1 - t);
            z = corner.z * (1 - t);
            y = height * t;
          }
        } else {
          const face = Math.floor(Math.random() * 5);
          let u = Math.random();
          let v = Math.random();

          if (face === 0) {
            const corner = corners[0];
            x = corner.x * (2 * u - 1);
            z = corner.z * (2 * v - 1);
            y = 0;
          } else {
            const cornerIndex = face - 1;
            const corner = corners[cornerIndex];
            const nextCorner = corners[(cornerIndex + 1) % 4];
            
            if (u + v > 1) {
              let newU = 1 - u;
              let newV = 1 - v;
              u = newU;
              v = newV;
            }
            
            x = corner.x * (1 - u - v) + nextCorner.x * u;
            z = corner.z * (1 - u - v) + nextCorner.z * v;
            y = height * (1 - Math.max(u, v));
          }
        }

        if (!isUpper) {
          y = -y;
        }

        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;

        initialPositions[i3] = x;
        initialPositions[i3 + 1] = y;
        initialPositions[i3 + 2] = z;

        const colorIndex = Math.floor(Math.random() * colorPalette.length);
        const [r1, g1, b1] = colorPalette[colorIndex];

        color.setRGB(
          r1 + (Math.random() - 0.5) * 0.1,
          g1 + (Math.random() - 0.5) * 0.1,
          b1 + (Math.random() - 0.5) * 0.1
        );

        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        sizes[i] = Math.random() * 3 + 1;
        rotationDirections[i] = isUpper ? 1.0 : -1.0;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('initialPosition', new THREE.BufferAttribute(initialPositions, 3));
      geometry.setAttribute('rotationDirection', new THREE.BufferAttribute(rotationDirections, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0.0 },
          mouse: { value: new THREE.Vector2() },
          hover: { value: 0.0 },
          brightness: { value: 1.0 }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 initialPosition;
          attribute float rotationDirection;
          varying vec3 vColor;
          varying float vDistance;
          uniform float time;
          uniform vec2 mouse;
          uniform float hover;
          uniform float brightness;

          void main() {
            vColor = color;

            float angle = rotationDirection * time * 0.3;
            vec3 pos = initialPosition;

            float cosA = cos(angle);
            float sinA = sin(angle);

            vec3 newPosition = vec3(
              pos.x * cosA - pos.z * sinA,
              pos.y,
              pos.x * sinA + pos.z * cosA
            );

            float waveSpeed = 2.5;
            float waveHeight = 0.05;
            float wave = sin(time * waveSpeed + length(newPosition) * 0.08);
            float heightFactor = abs(pos.y / 400.0);
            newPosition *= 1.0 + wave * waveHeight * (1.0 - heightFactor);

            float mouseInfluence = smoothstep(500.0, 0.0, length(newPosition.xy - mouse * 150.0));
            float spiralAngle = time * 3.0 + length(newPosition) * 0.15;
            vec2 spiralOffset = vec2(cos(spiralAngle), sin(spiralAngle)) * mouseInfluence * 25.0;
            newPosition.xy += spiralOffset;

            float hoverInfluence = smoothstep(300.0, 0.0, length(newPosition.xy - mouse * 150.0));
            vec2 hoverOffset = mouse * hoverInfluence * 35.0 * hover;
            float verticalPull = sin(time * 4.0 + length(newPosition) * 0.1) * hover * 10.0;
            newPosition.xy += hoverOffset;
            newPosition.y += verticalPull * hoverInfluence;
            
            vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            float hoverSize = 1.0 + hoverInfluence * 3.5 * hover;
            float pulseSize = 1.0 + sin(time * 5.0 + length(newPosition) * 0.2) * 0.3 * hover;
            gl_PointSize = size * hoverSize * pulseSize * (300.0 / -mvPosition.z);
            
            vDistance = hoverInfluence;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vDistance;
          uniform float time;
          uniform float brightness;

          void main() {
            vec2 xy = gl_PointCoord.xy - vec2(0.5);
            float radius = length(xy);
            
            float glow = smoothstep(0.5, 0.2, radius);
            float pulse = 0.8 + 0.2 * sin(time * 3.0);
            
            float alpha = smoothstep(0.5, 0.45, radius) * (1.0 + vDistance * 0.5);
            
            vec3 finalColor = vColor * (1.0 + glow * 0.5 * pulse);
            finalColor *= brightness * (1.0 + vDistance * 0.3);
            
            gl_FragColor = vec4(finalColor, alpha * 0.9);
          }
        `,
        // Use AdditiveBlending for glowing effect on dark background
        blending: THREE.AdditiveBlending,
        depthTest: true,
        transparent: true,
        vertexColors: true
      });

      return new THREE.Points(geometry, material);
    };

    // --- Init Function ---
    const init = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      state.windowHalfX = width / 2;
      state.windowHalfY = height / 2;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.0002);

      camera = new THREE.PerspectiveCamera(75, width / height, 1, 5000);
      camera.position.z = 1000;
      camera.position.y = 400;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      // Transparent clear color so parent div background shows through
      renderer.setClearColor(0x000000, 0); 
      
      containerRef.current.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.5;
      controls.enableZoom = true;
      controls.minDistance = 500;
      controls.maxDistance = 2000;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;

      clock = new THREE.Clock();

      const pyramidHeight = 400;
      upperPyramid = createPyramidLayer(300, pyramidHeight, 30000, true);
      lowerPyramid = createPyramidLayer(300, pyramidHeight, 30000, false);

      upperPyramid.position.y = pyramidHeight/2;
      lowerPyramid.position.y = -pyramidHeight/2;

      scene.add(upperPyramid);
      scene.add(lowerPyramid);
    };

    // --- Interaction Handlers ---
    const updateDimensions = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      state.windowHalfX = width / 2;
      state.windowHalfY = height / 2;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        state.mouseX = event.clientX - centerX;
        state.mouseY = event.clientY - centerY;
        state.isHovering = true;
    };

    // --- Animation Loop ---
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();
      
      state.hoverValue += (state.isHovering ? 1 : -1) * 0.1;
      state.hoverValue = Math.max(0, Math.min(1, state.hoverValue));

      [upperPyramid, lowerPyramid].forEach(pyramid => {
        const material = pyramid.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;
        material.uniforms.hover.value = state.hoverValue;
        material.uniforms.mouse.value.set(
          (state.mouseX / state.windowHalfX) * 0.5,
          (-state.mouseY / state.windowHalfY) * 0.5
        );
        
        const baseBrightness = 1.0;
        const hoverBrightness = 1.8;
        const pulseFreq = 4.0; 
        const pulseAmp = 0.35;
        
        const brightness = baseBrightness + 
          (hoverBrightness - baseBrightness) * state.hoverValue * 
          (1 + Math.sin(time * pulseFreq) * pulseAmp);
        
        material.uniforms.brightness.value = brightness;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    // --- Execution ---
    init();
    animate();

    resizeObserver = new ResizeObserver(() => {
        updateDimensions();
    });
    resizeObserver.observe(containerRef.current);

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      
      if (renderer) {
        renderer.dispose();
        if (containerRef.current && renderer.domElement) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }
      
      if (upperPyramid) {
        upperPyramid.geometry.dispose();
        (upperPyramid.material as THREE.Material).dispose();
      }
      if (lowerPyramid) {
        lowerPyramid.geometry.dispose();
        (lowerPyramid.material as THREE.Material).dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className || ''}`}
    />
  );
};

export default ThreeBackground;