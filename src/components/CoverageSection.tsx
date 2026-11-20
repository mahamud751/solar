"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/data/content";
import { useLang } from "@/i18n/lang";

/** How far the glowing feeder reaches for each tab, as a share of the canvas diagonal. */
const REACH = [0.09, 0.17, 0.32, 0.62];
const AUTO_ADVANCE_MS = 7000;
const STEP = 5.5;

type Dot = { x: number; y: number; d: number };
type Feeder = { x: number; y: number; s: number };
type Network = { base: HTMLCanvasElement; local: Dot[]; feeders: Feeder[]; cx: number; cy: number; diag: number; angles: number[] };

function prng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Builds a procedural dotted street map with two feeder lines crossing at the project site. */
function buildNetwork(w: number, h: number, dpr: number): Network {
  const rand = prng(20261120);
  const narrow = w < 700;
  const cx = w * (narrow ? 0.5 : 0.42);
  const cy = h * (narrow ? 0.6 : 0.62);
  const diag = Math.hypot(w, h);
  const angles = [-0.38, 1.18];
  const dots: Dot[] = [];
  const feeders: Feeder[] = [];

  const sample = (points: [number, number][]) => {
    let carry = 0;
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1]!;
      const [x1, y1] = points[i]!;
      const len = Math.hypot(x1 - x0, y1 - y0);
      for (let s = carry; s < len; s += STEP) {
        const x = x0 + ((x1 - x0) * s) / len + (rand() - 0.5) * 1.2;
        const y = y0 + ((y1 - y0) * s) / len + (rand() - 0.5) * 1.2;
        if (x > -4 && y > -4 && x < w + 4 && y < h + 4) dots.push({ x, y, d: Math.hypot(x - cx, y - cy) });
      }
      carry = (carry - len) % STEP;
      if (carry < 0) carry += STEP;
    }
  };

  // Long, gently curving arterial roads.
  for (let i = 0; i < 11; i++) {
    const a = (i < 5 ? angles[i % 2]! : rand() * Math.PI) + (rand() - 0.5) * 0.5;
    const ox = rand() * w;
    const oy = rand() * h;
    const bend = (rand() - 0.5) * 140;
    const pts: [number, number][] = [];
    for (let k = 0; k <= 48; k++) {
      const t = k / 48 - 0.5;
      const off = bend * Math.sin(Math.PI * (t + 0.5));
      pts.push([ox + Math.cos(a) * t * diag * 1.3 - Math.sin(a) * off, oy + Math.sin(a) * t * diag * 1.3 + Math.cos(a) * off]);
    }
    sample(pts);
  }

  // Neighbourhood street grids, denser around the project site.
  const blocks = Math.min(80, Math.max(24, Math.round((w * h) / 22000)));
  for (let b = 0; b < blocks; b++) {
    const near = rand() < 0.35;
    const bx = near ? cx + (rand() - 0.5) * diag * 0.45 : rand() * w;
    const by = near ? cy + (rand() - 0.5) * diag * 0.3 : rand() * h;
    const rot = rand() < 0.65 ? angles[b % 2]! + (rand() - 0.5) * 0.2 : rand() * Math.PI;
    const cols = 2 + Math.floor(rand() * 6);
    const rows = 2 + Math.floor(rand() * 6);
    const sp = 14 + rand() * 14;
    const cos = Math.cos(rot);
    const sin = Math.sin(rot);
    const put = (x: number, y: number): [number, number] => [bx + x * cos - y * sin, by + x * sin + y * cos];
    const hw = (cols * sp) / 2;
    const hh = (rows * sp) / 2;
    for (let i = 0; i <= cols; i++) {
      if (rand() < 0.18) continue;
      const x = -hw + i * sp;
      sample([put(x, -hh + rand() * hh * 0.5), put(x, hh - rand() * hh * 0.5)]);
    }
    for (let j = 0; j <= rows; j++) {
      if (rand() < 0.18) continue;
      const y = -hh + j * sp;
      sample([put(-hw + rand() * hw * 0.5, y), put(hw - rand() * hw * 0.5, y)]);
    }
  }

  // A few winding lanes and cul-de-sacs.
  for (let i = 0; i < 14; i++) {
    const ox = rand() * w;
    const oy = rand() * h;
    const r = 18 + rand() * 50;
    const start = rand() * Math.PI * 2;
    const sweep = Math.PI * (0.6 + rand() * 1.3);
    const pts: [number, number][] = [];
    for (let k = 0; k <= 24; k++) {
      const t = start + (sweep * k) / 24;
      pts.push([ox + Math.cos(t) * r, oy + Math.sin(t) * r]);
    }
    sample(pts);
  }

  // The two feeders that light up from the project site.
  for (const a of angles) {
    for (let s = -diag; s <= diag; s += STEP) {
      const x = cx + Math.cos(a) * s;
      const y = cy + Math.sin(a) * s;
      if (x < -4 || y < -4 || x > w + 4 || y > h + 4) continue;
      feeders.push({ x, y, s: Math.abs(s) });
      dots.push({ x, y, d: Math.abs(s) });
    }
  }

  const base = document.createElement("canvas");
  base.width = Math.round(w * dpr);
  base.height = Math.round(h * dpr);
  const bctx = base.getContext("2d")!;
  bctx.scale(dpr, dpr);
  for (const dot of dots) {
    bctx.fillStyle = `rgba(150, 232, 214, ${0.16 + rand() * 0.34})`;
    bctx.fillRect(dot.x - 0.7, dot.y - 0.7, 1.4, 1.4);
  }

  return { base, local: dots.sort((p, q) => p.d - q.d), feeders, cx, cy, diag, angles };
}

function glowSprite(dpr: number) {
  const size = Math.round(24 * dpr);
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = size;
  const ctx = sprite.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(220, 255, 246, 1)");
  g.addColorStop(0.18, "rgba(120, 240, 214, 0.75)");
  g.addColorStop(1, "rgba(60, 200, 180, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

export function CoverageSection() {
  const { lang } = useLang();
  const copy = useContent().BLOCKS.HOME_COVERAGE[lang];
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const redrawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || reduced || !inView) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % copy.tabs.length), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(timer);
  }, [active, auto, reduced, inView, copy.tabs.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let net: Network | null = null;
    let sprite: HTMLCanvasElement | null = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let reach = -1;
    let frame = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      net = buildNetwork(width, height, dpr);
      sprite = glowSprite(dpr);
      if (reach < 0) reach = REACH[activeRef.current]! * net.diag;
      if (!inView || reduced) draw(performance.now());
    };

    const draw = (time: number) => {
      if (!net || !sprite) return;
      const target = (REACH[activeRef.current] ?? REACH[0]!) * net.diag;
      reach = reduced ? target : reach + (target - reach) * 0.05;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(net.base, 0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // Nearby streets warm up around the site.
      const localReach = reach * 0.5;
      for (const dot of net.local) {
        if (dot.d > localReach) break;
        const k = 1 - dot.d / localReach;
        ctx.fillStyle = `rgba(150, 245, 222, ${0.55 * k * k})`;
        ctx.fillRect(dot.x - 0.9, dot.y - 0.9, 1.8, 1.8);
      }

      // Feeders glow out to the current reach.
      for (const f of net.feeders) {
        if (f.s > reach) continue;
        const k = 1 - f.s / reach;
        ctx.globalAlpha = 0.25 + 0.6 * k;
        const size = 7 + 5 * k;
        ctx.drawImage(sprite, f.x - size / 2, f.y - size / 2, size, size);
      }

      // Pulses travelling outward along each feeder.
      if (!reduced) {
        for (const a of net.angles) {
          for (const dir of [1, -1]) {
            for (let p = 0; p < 4; p++) {
              const s = (((time / 1000) * 90 + (p * reach) / 4) % Math.max(reach, 1)) * dir;
              const x = net.cx + Math.cos(a) * s;
              const y = net.cy + Math.sin(a) * s;
              ctx.globalAlpha = 0.9 * (1 - Math.abs(s) / reach);
              ctx.drawImage(sprite, x - 9, y - 9, 18, 18);
            }
          }
        }
      }

      // Soft halo at the project site.
      ctx.globalAlpha = 1;
      const pulse = reduced ? 1 : 0.92 + 0.08 * Math.sin(time / 600);
      const r = 60 * pulse;
      const halo = ctx.createRadialGradient(net.cx, net.cy, 0, net.cx, net.cy, r);
      halo.addColorStop(0, "rgba(140, 240, 220, 0.42)");
      halo.addColorStop(1, "rgba(140, 240, 220, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(net.cx, net.cy, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    redrawRef.current = () => draw(performance.now());
    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(section);
    if (inView && !reduced) frame = requestAnimationFrame(loop);
    else draw(performance.now());

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      redrawRef.current = null;
    };
  }, [inView, reduced]);

  // Track the tab for the canvas, and redraw the still frame when nothing is animating.
  useEffect(() => {
    activeRef.current = active;
    if (reduced || !inView) redrawRef.current?.();
  }, [active, reduced, inView]);

  const tab = copy.tabs[active] ?? copy.tabs[0]!;

  return (
    <section
      ref={sectionRef}
      id="coverage"
      aria-labelledby="coverage-heading"
      className="relative isolate flex min-h-[40rem] flex-col justify-between overflow-hidden bg-[#063f43] text-white md:h-[100svh] md:max-h-[58rem]"
    >
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(6,63,67,0.85),transparent_55%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7fe3cf]">{copy.label}</p>
        <div key={`${lang}-${active}`} id="coverage-panel" role="tabpanel" aria-labelledby={`coverage-tab-${active}`} className="coverage-in">
          <h2 id="coverage-heading" className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {tab.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-[#7fe3cf] sm:text-2xl">{tab.sub}</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div role="tablist" aria-label={copy.label} className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4">
          {copy.tabs.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.label}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`coverage-tab-${index}`}
                aria-controls="coverage-panel"
                onClick={() => {
                  setActive(index);
                  setAuto(false);
                }}
                className="group self-start text-left focus-visible:outline-none"
              >
                <span className="relative block h-0.5 w-full overflow-hidden bg-white/20">
                  {selected && (
                    <span
                      key={`${active}-${auto && !reduced && inView}`}
                      className={`absolute inset-y-0 left-0 bg-[#7fe3cf] ${auto && !reduced && inView ? "coverage-progress" : "w-full"}`}
                      style={auto && !reduced && inView ? { animationDuration: `${AUTO_ADVANCE_MS}ms` } : undefined}
                    />
                  )}
                </span>
                <span className="mt-3 flex items-baseline gap-2 rounded-sm group-focus-visible:ring-2 group-focus-visible:ring-[#7fe3cf]">
                  <span className="font-mono text-sm text-white/50">{String(index + 1).padStart(2, "0")}</span>
                  <span className={`text-base transition-colors sm:text-lg ${selected ? "text-white" : "text-white/55 group-hover:text-white/85"}`}>
                    {item.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
