"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/data/content";
import { useLang, useT } from "@/i18n/lang";

const AUTO_ADVANCE_MS = 7000;
/** Block size plus street width, in world units. */
const PITCH = 14;
const GRID = 7;
const CITY_RADIUS = GRID * PITCH;
const BG: [number, number, number] = [6, 63, 67];

type Rect = { x0: number; z0: number; x1: number; z1: number };
type Box = Rect & { kind: "box"; h: number; solar: boolean; site: number; phase: number };
type Row = { kind: "row"; x0: number; x1: number; z: number; site: number; phase: number };
type Item = (Box | Row) & { key: number };

/** One featured project per tab; the camera flies to it and pulls back as the scale grows. */
const SITES = [
  { x: 2.5, z: 2.5, h: 3.2, dist: 72, reach: 26 },
  { x: 28, z: -14, h: 11, dist: 100, reach: 42 },
  { x: -35, z: 28, h: 4.5, dist: 155, reach: 68 },
  { x: 63, z: 49, h: 1.4, dist: 270, reach: 115 },
];
const FIELD: Rect = { x0: 37, z0: 23, x1: 89, z1: 75 };
const FACTORY: Rect = { x0: -47, z0: 23, x1: -23, z1: 33 };

function prng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const inside = (r: Rect, x: number, z: number) => x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1;

/** Procedural city: blocks of buildings, a few solar rooftops, and the four featured sites. */
function buildCity() {
  const rand = prng(20261121);
  const items: Item[] = [];
  const box = (x0: number, z0: number, x1: number, z1: number, h: number, solar: boolean, site = -1) =>
    items.push({ kind: "box", x0, z0, x1, z1, h, solar, site, phase: rand() * Math.PI * 2, key: 0 });

  const edge = (a: number) => CITY_RADIUS * (0.78 + 0.22 * Math.sin(a * 3 + 1.3) * Math.cos(a * 2));

  for (let i = -GRID; i <= GRID; i++) {
    for (let j = -GRID; j <= GRID; j++) {
      const cx = i * PITCH;
      const cz = j * PITCH;
      if (Math.hypot(cx, cz) > edge(Math.atan2(cz, cx))) continue;
      if (inside(FIELD, cx, cz) || inside(FACTORY, cx, cz)) continue;

      if (i === 0 && j === 0) {
        // Homes: a street of low houses, one with a new rooftop system.
        for (const [dx, dz] of [[-2.5, -2.5], [2.5, -2.5], [-2.5, 2.5], [2.5, 2.5]] as const) {
          const main = dx > 0 && dz > 0;
          box(cx + dx - 1.9, cz + dz - 1.9, cx + dx + 1.9, cz + dz + 1.9, main ? 3.2 : 2.4 + rand() * 1.4, main, main ? 0 : -1);
        }
        continue;
      }
      if (i === 2 && j === -1) {
        // Housing society: four apartment towers sharing one solar project.
        for (const [dx, dz] of [[-2.5, -2.5], [2.5, -2.5], [-2.5, 2.5], [2.5, 2.5]] as const) {
          box(cx + dx - 2, cz + dz - 2, cx + dx + 2, cz + dz + 2, 9.5 + rand() * 1.5, true, 1);
        }
        continue;
      }
      if (rand() < 0.06) continue; // park

      const d2 = (cx + 35) ** 2 + (cz + 45) ** 2;
      const tall = 15 * Math.exp(-d2 / (2 * 34 * 34));
      // Low-rise homes around the featured house so it stays in view.
      const homes = Math.hypot(cx, cz) < 30;
      const height = () => (homes ? 1.8 + rand() * 1.8 : 1.8 + rand() * 3 + tall * (0.45 + rand() * 0.55));
      const solar = () => rand() < 0.16;
      const m = 0.6;
      const split = rand();
      if (split < 0.3) {
        box(cx - 5 + m, cz - 5 + m, cx + 5 - m, cz + 5 - m, height(), solar());
      } else if (split < 0.65) {
        if (rand() < 0.5) {
          box(cx - 5 + m, cz - 5 + m, cx - m / 2, cz + 5 - m, height(), solar());
          box(cx + m / 2, cz - 5 + m, cx + 5 - m, cz + 5 - m, height(), solar());
        } else {
          box(cx - 5 + m, cz - 5 + m, cx + 5 - m, cz - m / 2, height(), solar());
          box(cx - 5 + m, cz + m / 2, cx + 5 - m, cz + 5 - m, height(), solar());
        }
      } else {
        for (const [dx, dz] of [[-2.5, -2.5], [2.5, -2.5], [-2.5, 2.5], [2.5, 2.5]] as const) {
          if (rand() < 0.12) continue;
          box(cx + dx - 2.5 + m / 2, cz + dz - 2.5 + m / 2, cx + dx + 2.5 - m / 2, cz + dz + 2.5 - m / 2, height(), solar());
        }
      }
    }
  }

  // Commercial & industrial: one long factory roof.
  box(FACTORY.x0 + 0.6, FACTORY.z0 + 0.6, FACTORY.x1 - 0.6, FACTORY.z1 - 0.6, 4.5, true, 2);

  // Ground-mounted: rows of tilted panels across the field, split into arrays.
  for (let z = FIELD.z0 + 3; z < FIELD.z1 - 1; z += 2.6) {
    for (let x = FIELD.x0 + 2; x < FIELD.x1 - 2; x += 8.5) {
      items.push({ kind: "row", x0: x, x1: Math.min(x + 7.5, FIELD.x1 - 2), z, site: 3, phase: rand() * Math.PI * 2, key: 0 });
    }
  }

  // Street dots, skipping the field, the factory and anything past the city edge.
  const streets: number[] = [];
  for (let k = -GRID - 1; k <= GRID; k++) {
    const line = k * PITCH + PITCH / 2;
    for (let s = -CITY_RADIUS - 7; s <= CITY_RADIUS + 7; s += 1.6) {
      for (const [x, z] of [[line, s], [s, line]] as const) {
        if (Math.hypot(x, z) > edge(Math.atan2(z, x)) + 7) continue;
        if (inside(FIELD, x, z) || inside(FACTORY, x, z)) continue;
        streets.push(x + (rand() - 0.5) * 0.3, z + (rand() - 0.5) * 0.3, 0.25 + rand() * 0.35);
      }
    }
  }
  return { items, streets: Float32Array.from(streets) };
}

function glowSprite(dpr: number) {
  const size = Math.round(32 * dpr);
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = size;
  const ctx = sprite.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(230, 255, 248, 1)");
  g.addColorStop(0.2, "rgba(127, 240, 214, 0.75)");
  g.addColorStop(1, "rgba(60, 200, 180, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return sprite;
}

const mix = (c: [number, number, number], light: number, fog: number) =>
  `rgb(${Math.round(BG[0] + (c[0] * light - BG[0]) * fog)},${Math.round(BG[1] + (c[1] * light - BG[1]) * fog)},${Math.round(BG[2] + (c[2] * light - BG[2]) * fog)})`;
const SIDE: [number, number, number] = [14, 92, 94];
const TOP: [number, number, number] = [22, 116, 114];
/** Fixed sun direction: each wall keeps its shade as the city turns. */
const WALL_LIGHT = [0.72, 1, 0.86, 0.58];

export function CoverageSection() {
  const { lang } = useLang();
  const t = useT();
  const copy = useContent().BLOCKS.HOME_COVERAGE[lang];
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const redrawRef = useRef<(() => void) | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

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

    const { items, streets } = buildCity();
    let sprite = glowSprite(1);
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let last = 0;
    const start = SITES[activeRef.current] ?? SITES[0]!;
    const cam = { x: start.x, z: start.z, d: start.dist, yaw: 0.65, tilt: 0, reach: start.reach };
    const P = new Float32Array(24);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = section.clientWidth;
      height = section.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      sprite = glowSprite(dpr);
      if (!inView || reduced) draw(performance.now(), true);
    };

    const draw = (time: number, snap = false) => {
      const site = SITES[activeRef.current] ?? SITES[0]!;
      const dt = last ? Math.min(time - last, 64) : 16;
      last = time;
      const k = snap || reduced ? 1 : 1 - Math.exp(-dt / 520);
      cam.x += (site.x - cam.x) * k;
      cam.z += (site.z - cam.z) * k;
      cam.d += (site.dist - cam.d) * k;
      cam.reach += (site.reach - cam.reach) * k;
      const pointer = pointerRef.current;
      const yaw = (reduced ? 0.65 : 0.65 + time * 0.00004) + pointer.x * 0.3;
      cam.tilt += (pointer.y * 0.1 - cam.tilt) * (reduced ? 1 : 1 - Math.exp(-dt / 300));
      const pitch = 0.8 + 0.28 * Math.min(1, Math.max(0, (cam.d - 72) / 198)) + cam.tilt;

      const narrow = width < 700;
      const ox = width * (narrow ? 0.5 : 0.66);
      const oy = height * (narrow ? 0.64 : 0.6);
      const f = Math.min(width, height * 1.4) * 0.95;
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
      const near = cam.d * 0.3;
      const D = cam.d;

      /** Projects a world point into P at slot i: screen x, screen y, distance. */
      const project = (x: number, y: number, z: number, i: number) => {
        const dx = x - cam.x, dz = z - cam.z;
        const xr = dx * cy - dz * sy;
        const zr = dx * sy + dz * cy;
        const dist = D - (y * sp + zr * cp);
        P[i * 3] = ox + (f * xr) / dist;
        P[i * 3 + 1] = oy - (f * (y * cp - zr * sp)) / dist;
        P[i * 3 + 2] = dist;
        return dist;
      };
      const depth = (x: number, y: number, z: number) => D - (y * sp + ((x - cam.x) * sy + (z - cam.z) * cy) * cp);
      const fogOf = (dist: number) => Math.min(1, Math.max(0.12, 1.45 - (0.5 * dist) / D));
      const pulse = reduced ? 1 : 0.5 + 0.5 * Math.sin(time / 420);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${BG.join(",")})`;
      ctx.fillRect(0, 0, width, height);

      // Field ground tint.
      const fc = [[FIELD.x0, FIELD.z0], [FIELD.x1, FIELD.z0], [FIELD.x1, FIELD.z1], [FIELD.x0, FIELD.z1]] as const;
      if (fc.every(([x, z], i) => project(x, 0, z, i) > near)) {
        ctx.fillStyle = activeRef.current === 3 ? "rgba(40, 140, 110, 0.32)" : "rgba(30, 110, 90, 0.22)";
        ctx.beginPath();
        for (let i = 0; i < 4; i++) ctx[i ? "lineTo" : "moveTo"](P[i * 3]!, P[i * 3 + 1]!);
        ctx.fill();
      }

      // Streets as a dotted map, warming up around the featured site.
      ctx.fillStyle = "rgb(150, 232, 214)";
      const reach2 = cam.reach * cam.reach;
      for (let i = 0; i < streets.length; i += 3) {
        const x = streets[i]!, z = streets[i + 1]!;
        const dist = project(x, 0, z, 0);
        if (dist < near) continue;
        const sx = P[0]!, sy2 = P[1]!;
        if (sx < -4 || sy2 < -4 || sx > width + 4 || sy2 > height + 4) continue;
        const r2 = (x - site.x) ** 2 + (z - site.z) ** 2;
        const glow = r2 < reach2 ? (1 - Math.sqrt(r2) / cam.reach) ** 2 : 0;
        ctx.globalAlpha = Math.min(1, streets[i + 2]! * fogOf(dist) + glow * 0.75);
        const s = Math.min(2.6, Math.max(0.9, (f / dist) * 0.22)) * (1 + glow * 0.6);
        ctx.fillRect(sx - s / 2, sy2 - s / 2, s, s);
      }
      ctx.globalAlpha = 1;

      // Ripple and energy pulses travelling out along the site's streets.
      ctx.globalCompositeOperation = "lighter";
      if (!reduced) {
        for (const offset of [0, 0.5]) {
          const phase = ((time / 2600 + offset) % 1);
          const radius = phase * cam.reach;
          ctx.strokeStyle = `rgba(127, 227, 207, ${0.55 * (1 - phase)})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          let pen = false;
          for (let a = 0; a <= 48; a++) {
            const ang = (a / 48) * Math.PI * 2;
            if (project(site.x + Math.cos(ang) * radius, 0.05, site.z + Math.sin(ang) * radius, 0) < near) { pen = false; continue; }
            ctx[pen ? "lineTo" : "moveTo"](P[0]!, P[1]!);
            pen = true;
          }
          ctx.stroke();
        }
        const lineX = Math.round((site.x - PITCH / 2) / PITCH) * PITCH + PITCH / 2;
        const lineZ = Math.round((site.z - PITCH / 2) / PITCH) * PITCH + PITCH / 2;
        for (let p = 0; p < 5; p++) {
          const s = ((time / 1000) * 14 + (p * cam.reach) / 5) % cam.reach;
          const fade = 1 - s / cam.reach;
          for (const [x, z] of [[site.x + s, lineZ], [site.x - s, lineZ], [lineX, site.z + s], [lineX, site.z - s]] as const) {
            const dist = project(x, 0.1, z, 0);
            if (dist < near) continue;
            const size = Math.max(8, (f / dist) * 2.4);
            ctx.globalAlpha = 0.9 * fade;
            ctx.drawImage(sprite, P[0]! - size / 2, P[1]! - size / 2, size, size);
          }
        }
        ctx.globalAlpha = 1;
      }
      ctx.globalCompositeOperation = "source-over";

      // Buildings and panel rows, far to near.
      for (const item of items) {
        item.key = item.kind === "box"
          ? depth((item.x0 + item.x1) / 2, item.h / 2, (item.z0 + item.z1) / 2)
          : depth((item.x0 + item.x1) / 2, 0.8, item.z);
      }
      items.sort((a, b) => b.key - a.key);

      const poly = (idx: number[]) => {
        ctx.beginPath();
        idx.forEach((v, n) => ctx[n ? "lineTo" : "moveTo"](P[v * 3]!, P[v * 3 + 1]!));
        ctx.closePath();
      };
      const area = (a: number, b: number, c: number, d: number) => {
        let s = 0;
        const q = [a, b, c, d];
        for (let n = 0; n < 4; n++) {
          const u = q[n]!, v = q[(n + 1) % 4]!;
          s += P[u * 3]! * P[v * 3 + 1]! - P[v * 3]! * P[u * 3 + 1]!;
        }
        return s;
      };
      const panelFill = (siteIndex: number, phase: number, fog: number) => {
        if (siteIndex >= 0 && siteIndex === activeRef.current) return `rgba(120, 245, 215, ${0.55 + 0.3 * pulse})`;
        const tw = reduced ? 0.5 : 0.5 + 0.5 * Math.sin(time / 900 + phase);
        return `rgba(${Math.round(60 + 50 * tw)}, ${Math.round(140 + 60 * tw)}, ${Math.round(200 + 20 * tw)}, ${(0.45 + 0.3 * tw) * fog})`;
      };

      for (const item of items) {
        if (item.key < near) continue;
        const fog = fogOf(item.key);
        // Fade out buildings close to the camera so they never block the view.
        ctx.globalAlpha = Math.min(1, (item.key - near) / (D * 0.35));
        const isActive = item.site >= 0 && item.site === activeRef.current;

        if (item.kind === "row") {
          if (project(item.x0, 0.4, item.z, 0) < near || project(item.x1, 0.4, item.z, 1) < near
            || project(item.x1, 1.5, item.z - 1.3, 2) < near || project(item.x0, 1.5, item.z - 1.3, 3) < near) continue;
          if (P[0]! < -50 && P[3]! < -50) continue;
          if (P[0]! > width + 50 && P[3]! > width + 50) continue;
          ctx.globalCompositeOperation = isActive ? "lighter" : "source-over";
          ctx.fillStyle = panelFill(item.site, item.phase, fog);
          poly([0, 1, 2, 3]);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
          continue;
        }

        const { x0, z0, x1, z1, h } = item;
        const corners = [[x0, z0], [x1, z0], [x1, z1], [x0, z1]] as const;
        let clipped = false;
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        corners.forEach(([x, z], n) => {
          if (project(x, 0, z, n) < near || project(x, h, z, n + 4) < near) clipped = true;
          for (const v of [n, n + 4]) {
            minX = Math.min(minX, P[v * 3]!); maxX = Math.max(maxX, P[v * 3]!);
            minY = Math.min(minY, P[v * 3 + 1]!); maxY = Math.max(maxY, P[v * 3 + 1]!);
          }
        });
        if (clipped || maxX < 0 || minX > width || maxY < 0 || minY > height) continue;

        ctx.lineWidth = 0.7;
        ctx.strokeStyle = `rgba(127, 227, 207, ${(isActive ? 0.6 : 0.2) * fog})`;
        for (let n = 0; n < 4; n++) {
          const m = (n + 1) % 4;
          if (area(n, m, m + 4, n + 4) <= 0) continue;
          ctx.fillStyle = mix(SIDE, WALL_LIGHT[n]!, fog);
          poly([n, m, m + 4, n + 4]);
          ctx.fill();
          ctx.stroke();
        }
        ctx.fillStyle = mix(TOP, 1, fog);
        poly([4, 5, 6, 7]);
        ctx.fill();
        ctx.stroke();

        if (item.solar) {
          const ix = (x1 - x0) * 0.14, iz = (z1 - z0) * 0.14;
          const py = h + 0.02;
          project(x0 + ix, py, z0 + iz, 0);
          project(x1 - ix, py, z0 + iz, 1);
          project(x1 - ix, py, z1 - iz, 2);
          project(x0 + ix, py, z1 - iz, 3);
          ctx.globalCompositeOperation = isActive ? "lighter" : "source-over";
          ctx.fillStyle = panelFill(item.site, item.phase, fog);
          poly([0, 1, 2, 3]);
          ctx.fill();
          ctx.globalCompositeOperation = "source-over";
          const strips = Math.max(2, Math.min(9, Math.round((z1 - z0) / 1.6)));
          ctx.strokeStyle = `rgba(4, 34, 42, ${0.55 * fog})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          for (let s = 1; s < strips; s++) {
            const u = s / strips;
            ctx.moveTo(P[0]! + (P[9]! - P[0]!) * u, P[1]! + (P[10]! - P[1]!) * u);
            ctx.lineTo(P[3]! + (P[6]! - P[3]!) * u, P[4]! + (P[7]! - P[4]!) * u);
          }
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;

      // Map pin over the featured project.
      const beam = cam.d * 0.11;
      if (project(site.x, site.h, site.z, 0) > near && project(site.x, site.h + beam, site.z, 1) > near) {
        const grad = ctx.createLinearGradient(P[0]!, P[1]!, P[3]!, P[4]!);
        grad.addColorStop(0, "rgba(160, 255, 230, 0.9)");
        grad.addColorStop(1, "rgba(160, 255, 230, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(P[0]!, P[1]!);
        ctx.lineTo(P[3]!, P[4]!);
        ctx.stroke();
        ctx.globalCompositeOperation = "lighter";
        const glow = 46 + 14 * pulse;
        ctx.drawImage(sprite, P[0]! - glow / 2, P[1]! - glow / 2, glow, glow);
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#eafff8";
        ctx.beginPath();
        ctx.arc(P[0]!, P[1]!, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pointerRef.current = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 };
    };
    const onLeave = () => { pointerRef.current = { x: 0, y: 0 }; };

    redrawRef.current = () => draw(performance.now(), true);
    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(section);
    if (inView && !reduced) {
      section.addEventListener("pointermove", onPointer);
      section.addEventListener("pointerleave", onLeave);
      frame = requestAnimationFrame(loop);
    } else draw(performance.now(), true);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("pointerleave", onLeave);
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
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(6,63,67,0.92),transparent_55%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#063f43] to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="flex items-start justify-between gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7fe3cf]">{copy.label}</p>
          <div aria-hidden="true" className="hidden flex-col gap-2 rounded-xl border border-white/10 bg-[#063f43]/60 px-4 py-3 text-xs text-white/75 backdrop-blur-sm md:flex">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#7ff5d7] shadow-[0_0_10px_#7ff5d7]" />
              {t("Featured project", "নির্বাচিত প্রকল্প")}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#5aa0d8]" />
              {t("Solar rooftops", "সোলার ছাদ")}
            </span>
          </div>
        </div>
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
