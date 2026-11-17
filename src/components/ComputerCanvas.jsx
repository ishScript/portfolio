import { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

// The scene is laid out on a grid of cells; each filled cell is drawn as one small dash.
const CELL = 5;
const COLS = 72;
const ROWS = 66;
const WIDTH = COLS * CELL;
const HEIGHT = ROWS * CELL;
const DASH = [0.9, 1.9, 3, 4.2]; // dash length per tone, faintest first
const RADIUS = 55; // how far the cursor pushes dashes
const HOVER = 7; // how far the mouse floats, in pixels

function buildScene() {
  const cells = new Map();
  const put = (col, row, tone, group = 'static') => cells.set(`${col},${row}`, { col, row, tone, group });
  const rect = (c0, r0, c1, r1, tone, group, round = 0) => {
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) {
        const dc = Math.min(c - c0, c1 - c);
        const dr = Math.min(r - r0, r1 - r);
        if (dc + dr < round) continue; // clip the corners
        put(c, r, tone, group);
      }
    }
  };

  // Monitor: case, screen, lines of "code", blinking cursor, power light.
  rect(14, 3, 53, 35, 2, 'static', 3);
  rect(18, 7, 49, 29, 0, 'static', 2);
  [
    [10, 21, 30],
    [12, 23, 38],
    [14, 23, 34],
    [16, 25, 41],
    [18, 23, 31],
    [20, 21, 27],
  ].forEach(([row, from, to]) => rect(from, row, to, row, 3));
  rect(21, 23, 23, 24, 3, 'cursor');
  rect(18, 32, 26, 32, 0);
  put(50, 32, 3);
  put(48, 32, 3);

  // Stand.
  rect(30, 36, 37, 38, 1);
  rect(23, 39, 44, 41, 2, 'static', 1);

  // Keyboard: faint body, bright keys in rows, long spacebar.
  rect(6, 47, 47, 59, 0, 'static', 1);
  for (let row = 49; row <= 57; row += 2) {
    for (let col = 8; col <= 45; col++) {
      const spacebar = row === 57 && col >= 17 && col <= 36;
      if (spacebar || (col - 8) % 3 !== 2) put(col, row, 3);
    }
  }

  // Mouse cable, then the mouse itself (drawn as its own group so it can float).
  rect(45, 40, 58, 40, 1);
  rect(58, 41, 58, 44, 1);
  for (let row = 46; row <= 58; row++) {
    for (let col = 54; col <= 62; col++) {
      const x = (col - 58) / 4.6;
      const y = (row - 52) / 6.6;
      if (x * x + y * y > 1) continue;
      const seam = row === 51 || (col === 58 && row < 51);
      put(col, row, seam ? 0 : 2, 'mouse');
    }
  }
  // Soft shadow under the mouse.
  rect(54, 62, 62, 62, 0, 'shadow');
  rect(55, 63, 61, 63, 0, 'shadow');

  return [...cells.values()].map(({ col, row, tone, group }) => {
    const x = col * CELL;
    const y = row * CELL + CELL / 2;
    return { hx: x, hy: y, x, y, len: DASH[tone], group, vx: 0, vy: 0 };
  });
}

// A retro computer, keyboard and mouse drawn as a field of small dashes.
// The mouse floats, the cursor on screen blinks, and dashes scatter away from the pointer.
export default function ComputerCanvas({ label }) {
  const canvasRef = useRef(null);
  const color = useTheme().palette.primary.main;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const points = buildScene();
    const pointer = { x: -999, y: -999 };
    let frame = 0;

    function draw(time) {
      const lift = HOVER * (0.5 - 0.5 * Math.sin(time / 600)); // 0 = resting, HOVER = highest
      const cursorOn = Math.floor(time / 530) % 2 === 0;
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.8;

      ctx.beginPath();
      for (const p of points) {
        if (p.group === 'shadow') continue;
        if (p.group === 'cursor' && !cursorOn) continue;
        const y = p.group === 'mouse' ? p.y - lift : p.y;
        ctx.moveTo(p.x, y);
        ctx.lineTo(p.x + p.len, y);
      }
      ctx.stroke();

      // The shadow fades as the mouse rises.
      ctx.globalAlpha = 1 - 0.7 * (lift / HOVER);
      ctx.beginPath();
      for (const p of points) {
        if (p.group !== 'shadow') continue;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.len, p.y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    function tick(time) {
      for (const p of points) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS && dist > 0.01) {
          const force = ((RADIUS - dist) / RADIUS) * 2;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        // spring back home, with damping
        p.vx = (p.vx + (p.hx - p.x) * 0.06) * 0.86;
        p.vy = (p.vy + (p.hy - p.y) * 0.06) * 0.86;
        p.x += p.vx;
        p.y += p.vy;
      }
      draw(time);
      frame = requestAnimationFrame(tick);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const scale = WIDTH / rect.width;
      pointer.x = (e.clientX - rect.left) * scale;
      pointer.y = (e.clientY - rect.top) * scale;
    }
    function onLeave() {
      pointer.x = -999;
      pointer.y = -999;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw(0); // static picture, no motion
      return undefined;
    }
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      style={{ width: WIDTH, maxWidth: '100%', aspectRatio: `${COLS} / ${ROWS}`, touchAction: 'pan-y' }}
    />
  );
}
