import React, { useRef, useEffect } from 'react';

interface GlitchMatrixBackgroundProps {
  className?: string;
}

interface ScanlineGlitch {
  y: number;
  offset: number;
  height: number;
  framesLeft: number;
}

interface ColorBlob {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  r: number;
  g: number;
  b: number;
}

const CHAR_SIZE = 13;
const CELL_WIDTH = 10;
const CELL_HEIGHT = 15;
const TARGET_FPS = 30;
const FRAME_INTERVAL = 1000 / TARGET_FPS;
const MOUSE_RADIUS = 150;
const HEAT_DECAY = 0.93;
const HEAT_DEPOSIT = 1.0;
const BASE_BRIGHTNESS = 0.45;
const MAX_BRIGHTNESS = 1.3;
const H_SCROLL_SPEED = 0.3;

function randomChar(): string {
  return String.fromCharCode(33 + Math.floor(Math.random() * 94));
}

function createBlobs(w: number, h: number): ColorBlob[] {
  const palette: [number, number, number][] = [
    [10, 60, 160],
    [20, 90, 180],
    [5, 40, 120],
    [30, 140, 80],
    [60, 160, 60],
    [160, 160, 20],
    [180, 140, 10],
    [15, 80, 140],
    [100, 40, 140],
    [10, 30, 80],
  ];

  return palette.map(([r, g, b]) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 20,
    vy: (Math.random() - 0.5) * 15,
    radius: Math.max(w, h) * (0.25 + Math.random() * 0.35),
    r,
    g,
    b,
  }));
}

const GlitchMatrixBackground: React.FC<GlitchMatrixBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const prevMouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const bgCanvas = document.createElement('canvas');
    const bgCtx = bgCanvas.getContext('2d', { alpha: false });
    if (!bgCtx) return;

    let cols = 0;
    let rows = 0;
    let charGrid: string[][] = [];
    let heatMap: Float32Array = new Float32Array(0);
    let scanline: ScanlineGlitch | null = null;
    let blobs: ColorBlob[] = [];
    let bgW = 0;
    let bgH = 0;
    let frameCount = 0;

    const initGrid = (c: number, r: number) => {
      charGrid = [];
      for (let row = 0; row < r; row++) {
        const line: string[] = [];
        for (let col = 0; col < c; col++) {
          line.push(randomChar());
        }
        charGrid.push(line);
      }
      heatMap = new Float32Array(c * r);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL_WIDTH) + 4;
      rows = Math.ceil(h / CELL_HEIGHT) + 2;
      initGrid(cols, rows);
      blobs = createBlobs(w, h);

      bgW = Math.ceil(w / 4);
      bgH = Math.ceil(h / 4);
      bgCanvas.width = bgW;
      bgCanvas.height = bgH;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const depositHeatLine = (x0: number, y0: number, x1: number, y1: number) => {
      const dx = x1 - x0;
      const dy = y1 - y0;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.ceil(dist / (MOUSE_RADIUS * 0.4)));

      for (let s = 0; s <= steps; s++) {
        const t = steps === 0 ? 0 : s / steps;
        const px = x0 + dx * t;
        const py = y0 + dy * t;

        const mcx = px / CELL_WIDTH;
        const mcy = py / CELL_HEIGHT;
        const rCeilX = Math.ceil(MOUSE_RADIUS / CELL_WIDTH);
        const rCeilY = Math.ceil(MOUSE_RADIUS / CELL_HEIGHT);

        const startR = Math.max(0, Math.floor(mcy) - rCeilY);
        const endR = Math.min(rows - 1, Math.floor(mcy) + rCeilY);
        const startC = Math.max(0, Math.floor(mcx) - rCeilX);
        const endC = Math.min(cols - 1, Math.floor(mcx) + rCeilX);

        for (let r = startR; r <= endR; r++) {
          for (let c = startC; c <= endC; c++) {
            const cdx = (c + 0.5 - mcx) * CELL_WIDTH;
            const cdy = (r + 0.5 - mcy) * CELL_HEIGHT;
            const d = Math.sqrt(cdx * cdx + cdy * cdy);
            if (d < MOUSE_RADIUS) {
              const f = 1 - d / MOUSE_RADIUS;
              const deposit = HEAT_DEPOSIT * f * f;
              const idx = r * cols + c;
              heatMap[idx] = Math.min(1, heatMap[idx] + deposit);
            }
          }
        }
      }
    };

    const render = (timestamp: number) => {
      animRef.current = requestAnimationFrame(render);

      const elapsed = timestamp - lastFrameRef.current;
      if (elapsed < FRAME_INTERVAL) return;
      lastFrameRef.current = timestamp - (elapsed % FRAME_INTERVAL);

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dt = Math.min(elapsed / 1000, 0.1);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const pmx = prevMouseRef.current.x;
      const pmy = prevMouseRef.current.y;

      frameCount++;
      const hScrollPx = frameCount * H_SCROLL_SPEED;
      const totalRowWidth = cols * CELL_WIDTH;

      // --- Update and render blob shader to offscreen canvas ---
      for (const blob of blobs) {
        blob.x += blob.vx * dt;
        blob.y += blob.vy * dt;
        if (blob.x < -blob.radius * 0.5) blob.vx = Math.abs(blob.vx);
        if (blob.x > w + blob.radius * 0.5) blob.vx = -Math.abs(blob.vx);
        if (blob.y < -blob.radius * 0.5) blob.vy = Math.abs(blob.vy);
        if (blob.y > h + blob.radius * 0.5) blob.vy = -Math.abs(blob.vy);
      }

      const scaleX = bgW / w;
      const scaleY = bgH / h;

      bgCtx.fillStyle = '#050510';
      bgCtx.fillRect(0, 0, bgW, bgH);

      for (const blob of blobs) {
        const bx = blob.x * scaleX;
        const by = blob.y * scaleY;
        const br = blob.radius * Math.max(scaleX, scaleY);
        const grad = bgCtx.createRadialGradient(bx, by, 0, bx, by, br);
        grad.addColorStop(0, `rgba(${blob.r}, ${blob.g}, ${blob.b}, 0.6)`);
        grad.addColorStop(0.5, `rgba(${blob.r}, ${blob.g}, ${blob.b}, 0.15)`);
        grad.addColorStop(1, `rgba(${blob.r}, ${blob.g}, ${blob.b}, 0)`);
        bgCtx.fillStyle = grad;
        bgCtx.fillRect(0, 0, bgW, bgH);
      }

      const bgPixels = bgCtx.getImageData(0, 0, bgW, bgH).data;

      // Clear main canvas
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, w, h);

      // --- Decay heat ---
      for (let i = 0; i < heatMap.length; i++) {
        heatMap[i] *= HEAT_DECAY;
        if (heatMap[i] < 0.01) heatMap[i] = 0;
      }

      // --- Deposit heat along interpolated mouse path ---
      const mouseActive = mx > -500 && my > -500;
      const prevActive = pmx > -500 && pmy > -500;

      if (mouseActive) {
        if (prevActive) {
          depositHeatLine(pmx, pmy, mx, my);
        } else {
          depositHeatLine(mx, my, mx, my);
        }
      }

      prevMouseRef.current = { x: mx, y: my };

      // --- Draw character grid with alternating horizontal scroll ---
      ctx.font = `bold ${CHAR_SIZE}px monospace`;
      ctx.textBaseline = 'top';

      for (let r = 0; r < rows && r < charGrid.length; r++) {
        const direction = r % 2 === 0 ? 1 : -1;
        const rowOffset = (hScrollPx * direction) % totalRowWidth;

        const py = r * CELL_HEIGHT;
        if (py + CELL_HEIGHT < 0 || py > h) continue;

        for (let c = 0; c < cols && c < charGrid[r].length; c++) {
          let px = c * CELL_WIDTH + rowOffset;
          px = ((px % totalRowWidth) + totalRowWidth) % totalRowWidth;
          px -= CELL_WIDTH * 2;

          if (px + CELL_WIDTH < 0 || px > w) continue;

          // Sample blob shader color at screen position
          const screenX = Math.max(0, Math.min(px + CELL_WIDTH / 2, w - 1));
          const screenY = Math.max(0, Math.min(py + CELL_HEIGHT / 2, h - 1));
          const sampleX = Math.min(Math.floor(screenX * scaleX), bgW - 1);
          const sampleY = Math.min(Math.floor(screenY * scaleY), bgH - 1);
          const pidx = (sampleY * bgW + sampleX) * 4;
          const sr = bgPixels[pidx];
          const sg = bgPixels[pidx + 1];
          const sb = bgPixels[pidx + 2];

          const heat = heatMap[r * cols + c];

          const scrambleChance = 0.04 + heat * 0.5;
          if (Math.random() < scrambleChance) {
            charGrid[r][c] = randomChar();
          }

          const brightness = BASE_BRIGHTNESS + heat * (MAX_BRIGHTNESS - BASE_BRIGHTNESS);

          // Block cursor rectangle
          const blockDim = brightness * 0.55;
          const bR = Math.min(255, Math.round(sr * blockDim));
          const bG = Math.min(255, Math.round(sg * blockDim));
          const bB = Math.min(255, Math.round(sb * blockDim));

          ctx.fillStyle = `rgb(${bR},${bG},${bB})`;
          ctx.fillRect(px, py, CELL_WIDTH, CELL_HEIGHT);

          // Character on top
          const cR = Math.min(255, Math.round(sr * brightness));
          const cG = Math.min(255, Math.round(sg * brightness));
          const cB = Math.min(255, Math.round(sb * brightness));

          ctx.fillStyle = `rgb(${cR},${cG},${cB})`;
          ctx.fillText(charGrid[r][c], px + 1, py + 1);
        }
      }

      // --- Scanline glitch ---
      if (!scanline && Math.random() < 0.015) {
        scanline = {
          y: Math.random() * h,
          offset: (Math.random() - 0.5) * 50,
          height: 2 + Math.random() * 10,
          framesLeft: 2 + Math.floor(Math.random() * 3),
        };
      }
      if (scanline) {
        const dpr = window.devicePixelRatio || 1;
        const sy = Math.max(0, Math.round(scanline.y * dpr));
        const sh = Math.max(1, Math.round(scanline.height * dpr));
        if (sy + sh <= canvas.height) {
          const strip = ctx.getImageData(0, sy, canvas.width, sh);
          ctx.putImageData(strip, Math.round(scanline.offset * dpr), sy);
        }
        scanline.framesLeft--;
        if (scanline.framesLeft <= 0) scanline = null;
      }
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
};

export default GlitchMatrixBackground;
