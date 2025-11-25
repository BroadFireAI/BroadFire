import React, { useEffect, useRef } from 'react';

const MissionShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    if (!gl.getExtension('OES_standard_derivatives')) {
      console.warn('OES_standard_derivatives not supported');
    }

    // --- Shader Sources ---
    const vsSource = `
      precision highp float;
      attribute vec3 position;
      void main(void) {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fsSource = `
      #extension GL_OES_standard_derivatives : enable
      precision highp float;

      uniform float time;
      uniform vec2 mouse;
      uniform vec2 resolution;

      const float PI = 3.14159265;

      vec3 hsv2rgb(vec3 c){
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      float smin(float d1, float d2, float k){
        float h = exp(-k * d1) + exp(-k * d2);
        return -log(h) / k;
      }

      float dSphere(vec3 p, float r) {
        return length(p) - r;
      }

      float dBox(vec3 p, vec3 size) {
        return length(max(abs(p) - size, 0.0));
      }

      float dTorus(vec3 p, vec2 t) {
        vec2 q = vec2(length(p.xz) - t.x, p.y);
        return length(q) - t.y;
      }

      float dCapsule(vec3 p, vec3 a, vec3 b, float r) {
        vec3 pa = p - a, ba = b - a;
        float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
        return length( pa - ba*h ) - r;
      }

      vec3 sphericalPolarCoord(float radius, float radian1, float radian2) {
        return vec3(
          radius * sin(radian1) * cos(radian2),
          radius * sin(radian1) * sin(radian2),
          radius * cos(radian1)
        );
      }

      vec3 rotate(vec3 p, float radian_x, float radian_y, float radian_z) {
        mat3 mx = mat3(
          1.0, 0.0, 0.0,
          0.0, cos(radian_x), -sin(radian_x),
          0.0, sin(radian_x), cos(radian_x)
        );
        mat3 my = mat3(
          cos(radian_y), 0.0, sin(radian_y),
          0.0, 1.0, 0.0,
          -sin(radian_y), 0.0, cos(radian_y)
        );
        mat3 mz = mat3(
          cos(radian_z), -sin(radian_z), 0.0,
          sin(radian_z), cos(radian_z), 0.0,
          0.0, 0.0, 1.0
        );
        return mx * my * mz * p;
      }

      float distanceFunc(vec3 p) {
        vec3 p11 = rotate(p, radians(-time), radians(time), radians(time));
        vec3 p12 = sphericalPolarCoord(2.0, radians(time), radians(time));
        float d1 = dBox(p11 + p12, vec3(1.0));

        vec3 p21 = rotate(p, radians(time), radians(-time), radians(time));
        vec3 p22 = sphericalPolarCoord(2.0, radians(-time), radians(time));
        float d2 = dTorus(p21 + p22, vec2(2.0, 0.3));

        vec3 p31 = rotate(p, radians(time * 2.0), radians(time * 2.0), radians(time * -2.0));
        vec3 p32 = sphericalPolarCoord(2.0, radians(time), radians(-time));
        float d3 = dCapsule(p31 + p32, vec3(1.0), vec3(-1.0), 0.4);

        vec3 p4 = sphericalPolarCoord(2.0, radians(-time), radians(-time));
        float d4 = dSphere(p + p4, 1.0);

        return smin(smin(d1, d2, 2.0), smin(d3, d4, 2.0), 2.0);
      }

      vec3 getNormal(vec3 p) {
        const float d = 0.0001;
        return normalize(vec3(
          distanceFunc(p + vec3(d, 0.0, 0.0)) - distanceFunc(p + vec3(-d, 0.0, 0.0)),
          distanceFunc(p + vec3(0.0, d, 0.0)) - distanceFunc(p + vec3(0.0, -d, 0.0)),
          distanceFunc(p + vec3(0.0, 0.0, d)) - distanceFunc(p + vec3(0.0, 0.0, -d))
        ));
      }

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        vec3 cPos = vec3(0.0, 0.0, 10.0);
        vec3 cDir = vec3(0.0, 0.0, -1.0);
        vec3 cUp  = vec3(0.0, 1.0, 0.0);
        vec3 cSide = cross(cDir, cUp);
        float targetDepth = 1.8;

        vec3 ray = normalize(cSide * p.x + cUp * p.y + cDir * targetDepth);

        float distance = 0.0;
        float rLen = 0.0;
        vec3 rPos = cPos;
        for(int i = 0; i < 64; i++){
            distance = distanceFunc(rPos);
            rLen += distance;
            rPos = cPos + ray * rLen;
        }

        if(abs(distance) < 0.001){
          vec3 normal = getNormal(rPos);
          gl_FragColor = vec4(hsv2rgb(vec3(dot(normal, cUp) / 4.0, 0.5, 0.9)), 1.0);
        }else{
          // Make background transparent
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      }
    `;

    // --- WebGL Setup Helpers ---
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const createProgram = (gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) => {
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);
      return program;
    };

    // --- Init ---
    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = createProgram(gl, vs, fs);
    if (!program) return;

    const uniTime = gl.getUniformLocation(program, 'time');
    const uniResolution = gl.getUniformLocation(program, 'resolution');
    const attPosition = gl.getAttribLocation(program, 'position');

    // Quad Vertices
    const vertices = [
      -1.0,  1.0, 0.0,
      1.0,  1.0, 0.0,
      -1.0, -1.0, 0.0,
      1.0, -1.0, 0.0,
    ];
    const indices = [
      0, 2, 1,
      1, 2, 3,
    ];

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    const ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.enableVertexAttribArray(attPosition);
    gl.vertexAttribPointer(attPosition, 3, gl.FLOAT, false, 0, 0);

    // --- Render Loop ---
    let time = 0;
    let animationId: number;

    const render = () => {
      time++;
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uniTime, time * 0.05); // Increased speed
      gl.uniform2fv(uniResolution, [canvas.width, canvas.height]);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
        if (!container || !canvas) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger once to set size
    render();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(vbo);
      gl.deleteBuffer(ibo);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default MissionShader;
