"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number; y: number; r: number;
  vx: number; vy: number;
  pulse: number; active: boolean; activeCooldown: number;
}
interface Edge {
  a: number; b: number;
  signal: boolean | null; signalPos: number; signalSpeed: number;
}

const TEAL = "#1db87a";
const NODE_COUNT  = 600;
const WORLD_SCALE = 3;
const EDGE_MAX    = 200;
const EDGE_PROB   = 0.10;
const MIN_ZOOM    = 1 / WORLD_SCALE; // zoom out limit: exactly the full world fits
const MAX_ZOOM    = 4;
const PAN_MARGIN  = 0.25;            // 25% of canvas must always overlap the world

export default function NeuralNetwork() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas    = canvasRef.current!;
    const container = containerRef.current!;
    const ctx       = canvas.getContext("2d")!;

    let W = 0, H = 0, WW = 0, WH = 0;
    let nodes: Node[]  = [];
    let edges: Edge[]  = [];
    let zoom = 1,       panX = 0,       panY = 0;
    let tZoom = 1,      tPanX = 0,      tPanY = 0;
    let isDragging = false;
    let lastMouse  = { x: 0, y: 0 };
    let mouse      = { x: 0, y: 0 };
    let frame = 0, rafId: number;
    let lastTouchDist: number | null = null;

    /* ── build graph in a world 3× the canvas ── */
    function generateGraph() {
      WW = W * WORLD_SCALE;
      WH = H * WORLD_SCALE;
      nodes = [];
      edges = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * WW,
          y: Math.random() * WH,
          r: 2.5 + Math.random() * 3.5,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          pulse: Math.random() * Math.PI * 2,
          active: Math.random() > 0.72,
          activeCooldown: 0,
        });
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < EDGE_MAX && Math.random() < EDGE_PROB + (1 - dist / EDGE_MAX) * 0.06) {
            edges.push({ a: i, b: j, signal: null, signalPos: 0, signalSpeed: 0.008 + Math.random() * 0.012 });
          }
        }
      }

      /* start centered on the world — zooming out reveals more nodes */
      zoom  = tZoom  = 1;
      panX  = tPanX  = W / 2 - (WW / 2);
      panY  = tPanY  = H / 2 - (WH / 2);
    }

    /* ── pan clamping: world must always overlap ≥25% of canvas ── */
    function clampPan() {
      const worldW = WW * tZoom;
      const worldH = WH * tZoom;
      tPanX = Math.max(W * PAN_MARGIN - worldW, Math.min(W * (1 - PAN_MARGIN), tPanX));
      tPanY = Math.max(H * PAN_MARGIN - worldH, Math.min(H * (1 - PAN_MARGIN), tPanY));
    }

    /* ── coordinate helpers ── */
    function ws(wx: number, wy: number) {
      return { x: wx * zoom + panX, y: wy * zoom + panY };
    }
    function inView(wx: number, wy: number, m = 60) {
      const p = ws(wx, wy);
      return p.x > -m && p.x < W + m && p.y > -m && p.y < H + m;
    }

    /* ── drawing ── */
    function drawEdge(a: Node, b: Node, e: Edge) {
      if (!inView(a.x, a.y) && !inView(b.x, b.y)) return;
      const pa   = ws(a.x, a.y);
      const pb   = ws(b.x, b.y);
      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      const α    = Math.max(0, 0.05 + (1 - dist / EDGE_MAX) * 0.12);

      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.strokeStyle = `rgba(29,184,122,${α})`;
      ctx.lineWidth   = 0.5;
      ctx.stroke();

      if (e.signal !== null) {
        const sx   = pa.x + (pb.x - pa.x) * e.signalPos;
        const sy   = pa.y + (pb.y - pa.y) * e.signalPos;
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 5 * zoom);
        grad.addColorStop(0, "rgba(29,184,122,0.9)");
        grad.addColorStop(1, "rgba(29,184,122,0)");
        ctx.beginPath();
        ctx.arc(sx, sy, 5 * zoom, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    function drawNode(n: Node) {
      if (!inView(n.x, n.y)) return;
      const p   = ws(n.x, n.y);
      n.pulse  += 0.018;
      const pf  = n.active ? 1 + Math.sin(n.pulse) * 0.35 : 1;
      const r   = n.r * zoom * pf;
      const hov = Math.hypot(mouse.x - p.x, mouse.y - p.y) < 24;

      if (n.active) {
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        glow.addColorStop(0, "rgba(29,184,122,0.35)");
        glow.addColorStop(1, "rgba(29,184,122,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, hov ? r * 1.6 : r, 0, Math.PI * 2);
      ctx.fillStyle = n.active ? TEAL : "rgba(29,184,122,0.35)";
      ctx.fill();
    }

    function fireSignal() {
      const e = edges[Math.floor(Math.random() * edges.length)];
      if (e?.signal === null) {
        e.signal = true; e.signalPos = 0;
        nodes[e.a].active = true; nodes[e.a].activeCooldown = 60;
      }
    }

    function draw() {
      frame++;
      ctx.clearRect(0, 0, W, H);

      zoom  += (tZoom  - zoom)  * 0.08;
      panX  += (tPanX  - panX)  * 0.08;
      panY  += (tPanY  - panY)  * 0.08;

      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > WW) n.vx *= -1;
        if (n.y < 0 || n.y > WH) n.vy *= -1;
        if (n.activeCooldown > 0 && --n.activeCooldown === 0) n.active = false;
      });

      edges.forEach((e) => {
        drawEdge(nodes[e.a], nodes[e.b], e);
        if (e.signal !== null) {
          e.signalPos += e.signalSpeed;
          if (e.signalPos >= 1) {
            e.signal = null; e.signalPos = 0;
            nodes[e.b].active = true; nodes[e.b].activeCooldown = 55;
            if (Math.random() > 0.4) {
              const next = edges.find((e2) => (e2.a === e.b || e2.b === e.b) && e2.signal === null);
              if (next) { next.signal = true; next.signalPos = 0; }
            }
          }
        }
      });

      nodes.forEach(drawNode);

      /* more frequent signals so the larger network feels alive */
      if (frame % 35  === 0) fireSignal();
      if (frame % 70  === 0) fireSignal();
      if (frame % 110 === 0) fireSignal();

      rafId = requestAnimationFrame(draw);
    }

    /* ── events ── */
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta   = e.deltaY > 0 ? 0.88 : 1.12;
      const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, tZoom * delta));
      const wx      = (e.offsetX - tPanX) / tZoom;
      const wy      = (e.offsetY - tPanY) / tZoom;
      tZoom = newZoom;
      tPanX = e.offsetX - wx * newZoom;
      tPanY = e.offsetY - wy * newZoom;
      clampPan();
    };

    const onMouseDown = (e: MouseEvent) => { isDragging = true; lastMouse = { x: e.offsetX, y: e.offsetY }; };
    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.offsetX, y: e.offsetY };
      if (isDragging) {
        tPanX += e.offsetX - lastMouse.x;
        tPanY += e.offsetY - lastMouse.y;
        clampPan();
        lastMouse = { x: e.offsetX, y: e.offsetY };
      }
    };
    const onMouseUp = () => (isDragging = false);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) { isDragging = true; lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 2) {
        const d = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        if (lastTouchDist) { tZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, tZoom * (d / lastTouchDist))); clampPan(); }
        lastTouchDist = d;
      } else if (e.touches.length === 1 && isDragging) {
        tPanX += e.touches[0].clientX - lastMouse.x;
        tPanY += e.touches[0].clientY - lastMouse.y;
        clampPan();
        lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchEnd = () => { isDragging = false; lastTouchDist = null; };

    canvas.addEventListener("wheel",      onWheel,      { passive: false });
    canvas.addEventListener("mousedown",  onMouseDown);
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mouseup",    onMouseUp);
    canvas.addEventListener("mouseleave", onMouseUp);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove",  onTouchMove,  { passive: false });
    canvas.addEventListener("touchend",   onTouchEnd);

    /* ── init: wait for real dimensions from ResizeObserver ── */
    let started = false;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (!rect) return;
      W = rect.width; H = rect.height || W * 0.75;
      if (W === 0 || H === 0) return;
      canvas.width  = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      generateGraph();
      if (!started) { started = true; draw(); }
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      canvas.removeEventListener("wheel",      onWheel);
      canvas.removeEventListener("mousedown",  onMouseDown);
      canvas.removeEventListener("mousemove",  onMouseMove);
      canvas.removeEventListener("mouseup",    onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseUp);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove",  onTouchMove);
      canvas.removeEventListener("touchend",   onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden"
      style={{ background: "#0a1628" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    </div>
  );
}
