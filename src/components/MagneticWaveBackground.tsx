import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;
varying vec2 vUv;

vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
    return mod289(((x*34.0)+1.0)*x);
}
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}
float fbm(vec2 p) {
    float total = 0.0;
    float amplitude = 0.5;
    for(int i = 0; i < 6; i++) {
        total += snoise(p) * amplitude;
        p *= 2.0;
        amplitude *= 0.5;
    }
    return total;
}

void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    uv.x *= resolution.x / resolution.y;
    vec2 m = mouse * 2.0 - 1.0;
    m.x *= resolution.x / resolution.y;
    float dist = length(uv - m);
    float distortionStrength = 0.7;
    float distortion = (1.0 - smoothstep(0.0, 0.5, dist)) * distortionStrength;
    vec2 dir = normalize(uv - m);
    float angle = atan(dir.y, dir.x);
    float spiral = sin(angle * 6.0 - dist * 8.0 + time * 3.0);
    vec2 distortedUv = uv + dir * (distortion + spiral * distortion * 0.4);
    float turbulence = fbm(distortedUv * 1.8 + vec2(time * 0.4));
    float pattern = sin(angle * 4.0 - time * 2.0);
    pattern = pattern * turbulence;

    // Colors matching the website palette - sphere colors + accents
    // Warm orange/coral (sphere 1): rgb(255, 102, 51) = 1.0, 0.4, 0.2
    // Rich purple/violet (sphere 2): rgb(153, 77, 255) = 0.6, 0.3, 1.0
    // Teal/cyan (sphere 3): rgb(51, 204, 153) = 0.2, 0.8, 0.6
    // Deep magenta accent: rgb(255, 51, 119) = 1.0, 0.2, 0.47
    vec3 warmOrange = vec3(1.0, 0.4, 0.2);
    vec3 richPurple = vec3(0.6, 0.3, 1.0);
    vec3 vibrantTeal = vec3(0.2, 0.85, 0.65);
    vec3 deepMagenta = vec3(0.95, 0.2, 0.5);

    vec3 color = vec3(0.0);
    float t = pattern * 0.5 + 0.5; // Normalize to 0-1

    // Smooth 4-color gradient with vibrant transitions
    if(t < 0.25) {
        color = mix(warmOrange, deepMagenta, t * 4.0);
    }
    else if(t < 0.5) {
        color = mix(deepMagenta, richPurple, (t - 0.25) * 4.0);
    }
    else if(t < 0.75) {
        color = mix(richPurple, vibrantTeal, (t - 0.5) * 4.0);
    }
    else {
        color = mix(vibrantTeal, warmOrange, (t - 0.75) * 4.0);
    }

    // Enhanced mouse glow with warm orange tint
    float mouseGlow = exp(-dist * 6.0) * (1.0 + spiral * 0.3);
    vec3 glowColor = mix(vec3(1.0), warmOrange, 0.3);
    color += glowColor * mouseGlow * 0.8;

    // Add subtle color vibrancy boost
    color = pow(color, vec3(0.85));

    // Saturation boost for more vivid colors
    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(luminance), color, 1.3);

    float alpha = 0.9;
    gl_FragColor = vec4(color * 0.75, alpha);
}
`;

const MagneticWaveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Effect composer with bloom
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.8,
      0.4,
      0.9
    );
    bloomPass.threshold = 0.15;
    bloomPass.strength = 1.8;
    bloomPass.radius = 0.8;
    composer.addPass(bloomPass);

    // Shader material
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(width, height) },
        mouse: { value: new THREE.Vector2(0.5, 0.5) }
      },
      transparent: true
    });
    materialRef.current = material;

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // Animation
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation with easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      material.uniforms.time.value = time;
      material.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);

      composer.render();
    };

    animate();

    // Window-level mouse handler for global tracking
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      // Calculate mouse position relative to the container, even when mouse is outside
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1 - (event.clientY - rect.top) / rect.height;

      // Clamp values but allow some overflow for edge effects
      mouseRef.current.targetX = Math.max(-0.5, Math.min(1.5, x));
      mouseRef.current.targetY = Math.max(-0.5, Math.min(1.5, y));
    };

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
      material.uniforms.resolution.value.set(newWidth, newHeight);
    };

    // Use window-level event listener for mouse tracking
    window.addEventListener('mousemove', handleMouseMove);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      composer.dispose();
      materialRef.current = null;
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default MagneticWaveBackground;
