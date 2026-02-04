import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface SphereData {
  id: string;
  title: string;
  description: string;
  color: [number, number, number];
  position: [number, number, number];
}

interface Interactive3DSpheresProps {
  spheres: SphereData[];
  onSphereClick?: (sphere: SphereData) => void;
}

const Interactive3DSpheres: React.FC<Interactive3DSpheresProps> = ({ spheres, onSphereClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSphere, setHoveredSphere] = useState<string | null>(null);
  const sphereMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());

  // Lustrous iridescent shader material
  const createLustrousMaterial = useCallback((baseColor: [number, number, number]) => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Vector3(...baseColor) },
        hover: { value: 0.0 },
        lightPosition: { value: new THREE.Vector3(5, 5, 5) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewPosition;
        varying vec2 vUv;
        uniform float time;
        uniform float hover;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);

          // Subtle vertex displacement for organic feel
          vec3 displaced = position;
          float displacement = sin(position.x * 3.0 + time * 2.0) *
                               cos(position.y * 3.0 + time * 1.5) *
                               sin(position.z * 3.0 + time * 1.8) * 0.03;
          displaced += normal * displacement * (1.0 + hover * 0.5);

          // Hover scale effect
          displaced *= 1.0 + hover * 0.15;

          vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
          vViewPosition = -mvPosition.xyz;
          vPosition = displaced;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform float hover;
        uniform vec3 lightPosition;

        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewPosition;
        varying vec2 vUv;

        // Fresnel effect for iridescence
        float fresnel(vec3 viewDir, vec3 normal, float power) {
          return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
        }

        // Blue iridescence color shift
        vec3 iridescence(float angle, float time) {
          vec3 color1 = vec3(0.15, 0.4, 0.9);   // Deep blue
          vec3 color2 = vec3(0.3, 0.6, 1.0);    // Medium blue
          vec3 color3 = vec3(0.1, 0.3, 0.7);    // Navy
          vec3 color4 = vec3(0.5, 0.7, 0.95);   // Light blue

          float t = angle + time * 0.3;
          float segment = mod(t, 4.0);

          if (segment < 1.0) return mix(color1, color2, segment);
          else if (segment < 2.0) return mix(color2, color3, segment - 1.0);
          else if (segment < 3.0) return mix(color3, color4, segment - 2.0);
          else return mix(color4, color1, segment - 3.0);
        }

        void main() {
          vec3 viewDir = normalize(vViewPosition);
          vec3 normal = normalize(vNormal);
          vec3 lightDir = normalize(lightPosition - vPosition);

          // Fresnel for rim lighting
          float fresnelTerm = fresnel(viewDir, normal, 3.0);

          // Iridescent color based on view angle and time
          float viewAngle = dot(viewDir, normal) * 3.14159;
          vec3 iridescentColor = iridescence(viewAngle, time);

          // Base diffuse lighting
          float diffuse = max(dot(normal, lightDir), 0.0) * 0.6 + 0.4;

          // Specular highlight
          vec3 halfVector = normalize(lightDir + viewDir);
          float specular = pow(max(dot(normal, halfVector), 0.0), 64.0);

          // Combine colors
          vec3 finalColor = baseColor * diffuse;
          finalColor = mix(finalColor, iridescentColor, fresnelTerm * 0.7);
          finalColor += vec3(1.0) * specular * 0.8;

          // Hover glow effect
          float glowIntensity = hover * 0.4;
          finalColor += iridescentColor * glowIntensity;
          finalColor += vec3(1.0) * fresnelTerm * hover * 0.3;

          // Subtle pulsing
          float pulse = sin(time * 3.0) * 0.05 + 1.0;
          finalColor *= pulse;

          // Subtle subsurface scattering simulation
          float sss = pow(max(dot(-lightDir, normal), 0.0), 2.0) * 0.15;
          finalColor += baseColor * sss;

          gl_FragColor = vec4(finalColor, 0.95);
        }
      `,
      transparent: true,
      side: THREE.FrontSide,
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create spheres
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);

    spheres.forEach((sphereData) => {
      const material = createLustrousMaterial(sphereData.color);
      const mesh = new THREE.Mesh(sphereGeometry, material);
      mesh.position.set(...sphereData.position);
      mesh.userData = { id: sphereData.id, data: sphereData };
      scene.add(mesh);
      sphereMeshesRef.current.set(sphereData.id, mesh);
    });

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Point lights for dynamic reflections
    const pointLight1 = new THREE.PointLight(0xffffff, 1);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b6b, 0.5);
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    // Animation
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Update sphere materials and positions
      sphereMeshesRef.current.forEach((mesh, id) => {
        const material = mesh.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;

        // Smooth hover transition
        const targetHover = hoveredSphere === id ? 1.0 : 0.0;
        const currentHover = material.uniforms.hover.value;
        material.uniforms.hover.value += (targetHover - currentHover) * 0.1;

        // Gentle floating animation
        const baseY = mesh.userData.data.position[1];
        mesh.position.y = baseY + Math.sin(time * 1.5 + mesh.userData.data.position[0]) * 0.15;

        // Slow rotation
        mesh.rotation.y = time * 0.2;
        mesh.rotation.x = Math.sin(time * 0.3) * 0.1;
      });

      // Animate lights
      pointLight1.position.x = Math.sin(time * 0.5) * 6;
      pointLight1.position.z = Math.cos(time * 0.5) * 6;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Capture ref value for cleanup
    const currentSphereMeshes = sphereMeshesRef.current;

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      renderer.dispose();
      sphereGeometry.dispose();
      currentSphereMeshes.forEach((mesh) => {
        (mesh.material as THREE.Material).dispose();
      });
      currentSphereMeshes.clear();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [spheres, createLustrousMaterial, hoveredSphere]);

  // Mouse interaction handlers
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current || !cameraRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const meshes = Array.from(sphereMeshesRef.current.values());
    const intersects = raycasterRef.current.intersectObjects(meshes);

    if (intersects.length > 0) {
      const intersectedId = intersects[0].object.userData.id;
      setHoveredSphere(intersectedId);
      containerRef.current.style.cursor = 'pointer';
    } else {
      setHoveredSphere(null);
      containerRef.current.style.cursor = 'default';
    }
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (!containerRef.current || !cameraRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      const meshes = Array.from(sphereMeshesRef.current.values());
      const intersects = raycasterRef.current.intersectObjects(meshes);

      if (intersects.length > 0 && onSphereClick) {
        onSphereClick(intersects[0].object.userData.data);
      }
    },
    [onSphereClick]
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    />
  );
};

export default Interactive3DSpheres;
