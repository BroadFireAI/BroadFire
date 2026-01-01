import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WaterWaveBackgroundProps {
  className?: string;
}

const vertexShader = `
uniform float uTime;
uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uBigWaveSpeed;
uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallWavesIterations;
uniform vec2 uMouse;

varying float vElevation;
varying vec3 vPosition;

// Classic Perlin 3D Noise by Stefan Gustavson
vec4 permute(vec4 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 fade(vec3 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P);
  vec3 Pi1 = Pi0 + vec3(1.0);
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P);
  vec3 Pf1 = Pf0 - vec3(1.0);
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);
  vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);
  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);
  vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);
  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);
  vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);
  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);
  vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Mouse influence on waves
  float mouseInfluence = 1.0 - smoothstep(0.0, 3.0, length(modelPosition.xz - uMouse * 6.0 - 3.0));

  float elevation =
    sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWaveSpeed)
    * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uBigWaveSpeed)
    * uBigWavesElevation;

  // Add mouse-reactive ripples
  elevation += mouseInfluence * sin(length(modelPosition.xz - uMouse * 6.0 - 3.0) * 4.0 - uTime * 3.0) * 0.15;

  for(float i = 1.0; i <= 10.0; i++) {
    elevation -= abs(
      cnoise(
        vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)
      )
      * uSmallWavesElevation / i
    );
    if(i >= uSmallWavesIterations) {
      break;
    }
  }

  modelPosition.y += elevation;
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;

  vElevation = elevation;
  vPosition = modelPosition.xyz;
}
`;

const fragmentShader = `
precision mediump float;

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uTime;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;

varying float vElevation;
varying vec3 vPosition;

void main() {
  float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

  // Add subtle shimmer effect
  float shimmer = sin(vPosition.x * 10.0 + uTime * 2.0) * sin(vPosition.z * 10.0 + uTime * 1.5) * 0.05;
  color += shimmer;

  // Fog effect
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = smoothstep(uFogNear, uFogFar, depth);
  color = mix(color, uFogColor, fogFactor * 0.3);

  gl_FragColor = vec4(color, 0.9);
}
`;

const WaterWaveBackground: React.FC<WaterWaveBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const fogColor = new THREE.Color('#8e99a2');
    scene.fog = new THREE.Fog(fogColor, 1, 3);
    scene.background = new THREE.Color('#8e99a2');

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.set(1.5, 1.2, 1.5);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Water geometry
    const waterGeometry = new THREE.PlaneGeometry(12, 12, 512, 512);

    // Water material
    const waterMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uBigWavesElevation: { value: 0.2 },
        uBigWavesFrequency: { value: new THREE.Vector2(4, 2) },
        uBigWaveSpeed: { value: 0.75 },
        uSmallWavesElevation: { value: 0.15 },
        uSmallWavesFrequency: { value: 3 },
        uSmallWavesSpeed: { value: 0.2 },
        uSmallWavesIterations: { value: 4 },
        uDepthColor: { value: new THREE.Color('#1e4d40') },
        uSurfaceColor: { value: new THREE.Color('#4d9aaa') },
        uColorOffset: { value: 0.08 },
        uColorMultiplier: { value: 5 },
        uFogColor: { value: fogColor },
        uFogNear: { value: 1 },
        uFogFar: { value: 3 }
      }
    });

    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI * 0.5;
    scene.add(water);

    // Animation
    const clock = new THREE.Clock();
    let animationId: number;

    // Camera orbit state
    let cameraAngle = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Update uniforms
      waterMaterial.uniforms.uTime.value = elapsedTime;
      waterMaterial.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Gentle camera movement based on mouse
      cameraAngle = mouseRef.current.x * 0.5 - 0.25;
      camera.position.x = Math.sin(cameraAngle) * 2.5 + 0.5;
      camera.position.z = Math.cos(cameraAngle) * 2.5 + 0.5;
      camera.position.y = 1.0 + mouseRef.current.y * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Window-level mouse handler for global tracking
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;
      mouseRef.current.targetX = Math.max(0, Math.min(1, x));
      mouseRef.current.targetY = Math.max(0, Math.min(1, y));
    };

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      waterGeometry.dispose();
      waterMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default WaterWaveBackground;
