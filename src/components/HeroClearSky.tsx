"use client";

import React, { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sun,
  Zap,
  TrendingDown,
  Sparkles,
  Moon,
  Pause,
  Play,
} from "lucide-react";
import { formatBDT } from "@/data/solnce";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

/** Clear-sky irradiance bell curve from 6:00 (0%) peaking at 12:30 (92% PR) to 19:00 (0%) */
function irradianceAtHour(hour: number): number {
  if (hour <= 6 || hour >= 19) return 0;
  const normalized = (hour - 6) / 13; // 0 to 1
  return Math.max(0, Math.sin(normalized * Math.PI) ** 1.45 * 0.92);
}

const DAY_START = 6;
const DAY_END = 19;
/** Real seconds for the sun to cross from 6:00 AM to 7:00 PM, then a short night pause */
const DAY_SECONDS = 12;
const NIGHT_SECONDS = 1.6;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

function formatHour(h: number): string {
  // Round to the nearest 5 minutes so the clock reads cleanly while animating
  const total = Math.round((h * 60) / 5) * 5;
  const whole = Math.floor(total / 60);
  const mins = total % 60;
  const suffix = whole >= 12 ? "PM" : "AM";
  const display12 = whole % 12 === 0 ? 12 : whole % 12;
  return `${display12}:${mins.toString().padStart(2, "0")} ${suffix}`;
}

export function HeroClearSky() {
  const t = useT();
  const { ROOF_PRESETS, PAGE_IMAGES } = useContent().BLOCKS;
  const stage = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = stage.current;
    if (!section) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const bounds = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -bounds.top / Math.max(1, bounds.height - (section.firstElementChild?.clientHeight ?? window.innerHeight))));
      const exit = motion.matches ? 0 : Math.min(1, Math.max(0, (progress - 0.08) / 0.26));
      section.style.setProperty("--exit", String(exit));
      if (intro.current) intro.current.inert = exit === 1;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    motion.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      motion.removeEventListener("change", update);
    };
  }, []);
  const [presetId, setPresetId] = useState<string>("home");
  const [hour, setHour] = useState<number>(12.5);
  // null until the visitor presses play/pause or moves the slider
  const [playChoice, setPlayChoice] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  // Autoplay by default, except for people who prefer reduced motion
  const autoplay = playChoice ?? !reducedMotion;
  const setAutoplay = (on: boolean) => setPlayChoice(on);
  const [inView, setInView] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  // Only animate while the simulator is on screen
  useEffect(() => {
    const el = panel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sun moves from sunrise to sunset, rests briefly at night, then loops
  const hourRef = useRef(hour);
  useEffect(() => {
    hourRef.current = hour;
  }, [hour]);
  useEffect(() => {
    if (!autoplay || !inView) return;
    const span = DAY_END - DAY_START;
    const cycle = DAY_SECONDS + NIGHT_SECONDS;
    // Continue from the current hour instead of jumping back to sunrise
    let elapsed = ((hourRef.current - DAY_START) / span) * DAY_SECONDS;
    let last = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      elapsed = (elapsed + Math.min(0.1, (now - last) / 1000)) % cycle;
      last = now;
      const next = elapsed >= DAY_SECONDS ? DAY_END : DAY_START + (elapsed / DAY_SECONDS) * span;
      setHour(next);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [autoplay, inView]);

  const preset = useMemo(
    () => ROOF_PRESETS.find((p) => p.id === presetId) ?? ROOF_PRESETS[0],
    [presetId, ROOF_PRESETS]
  );

  const liveFactor = irradianceAtHour(hour);
  const liveOutputKw = +(preset.capacityKw * liveFactor).toFixed(1);
  const dailyUnits = Math.round(preset.capacityKw * 4.5);
  const monthlySavings = Math.round(dailyUnits * 30 * preset.tariff);

  // Sky tint over the photo: dark blue at night, warm orange around sunrise and sunset
  const isNight = liveFactor < 0.02;
  const nightTint = Math.min(1, Math.max(0, (0.2 - liveFactor) / 0.2)) * 0.62;
  const warmTint = liveFactor > 0 ? Math.max(0, 1 - Math.abs(liveFactor - 0.22) / 0.26) * 0.55 : 0;

  // Build SVG polyline points for the clear-sky curve (6:00 to 19:00)
  const curve = useMemo(() => {
    const width = 320;
    const height = 88;
    const pts: { x: number; y: number; h: number }[] = [];
    for (let h = 6; h <= 19; h += 0.5) {
      const x = ((h - 6) / 13) * width;
      const y = height - irradianceAtHour(h) * (height - 14) - 6;
      pts.push({ x, y, h });
    }
    const line = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
    const area = `0,${height} ${line} ${width},${height}`;
    const activeX = ((hour - 6) / 13) * width;
    const activeY = height - irradianceAtHour(hour) * (height - 14) - 6;
    return { line, area, activeX, activeY, width, height };
  }, [hour]);

  return (
    <>
      <section ref={stage} className="solar-walkout" aria-label={t("Green Dhaka rooftop solar", "গ্রিন ঢাকা ছাদের সোলার", "hero-clear-sky/green-dhaka-rooftop-solar")}>
        <div className="solar-stage">
          <div aria-hidden="true" className="solar-scene" style={{ backgroundImage: `url("${PAGE_IMAGES.homeHeroImage}")` }} />
          <div aria-hidden="true" className="solar-wash" />
          <div ref={intro} className="solar-intro">
            <h1>{t("Solar that ", "সোলার, যা ", "hero-clear-sky/solar-that")}<span>{t("delivers on its promise.", "প্রতিশ্রুতি রাখে।", "hero-clear-sky/delivers-on-its-promise")}</span></h1>
            <p>{t("Guaranteed savings. End-to-end care. Complete peace of mind — we handle everything from installation to net metering, with 25 years of support.", "নিশ্চিত সাশ্রয়। সম্পূর্ণ যত্ন। পূর্ণ শান্তি — ইনস্টলেশন থেকে নেট মিটারিং পর্যন্ত সবকিছু আমরাই সামলাই, ২৫ বছরের সাপোর্টসহ।", "hero-clear-sky/guaranteed-savings-end-to-end-care")}</p>
            <Link className="inline-flex rounded-full bg-brand-gradient px-7 py-3 font-bold text-primary-foreground shadow-glow" href="/contact#quote">{t("Get a free quote", "ফ্রি কোটেশন নিন", "hero-clear-sky/get-a-free-quote")}</Link>
            <dl className="solar-stats">
              <div><dt>{t("Bill Savings", "বিল সাশ্রয়", "hero-clear-sky/stat-bill-savings")}</dt><dd>{t("Up to 80%", "৮০% পর্যন্ত", "hero-clear-sky/stat-up-to-80")}</dd></div>
              <div><dt>{t("Certified Tech", "সার্টিফায়েড প্রযুক্তি", "hero-clear-sky/stat-certified-tech")}</dt><dd>{t("Tier-1", "টিয়ার-১", "hero-clear-sky/stat-tier-1")}</dd></div>
              <div><dt>{t("Full Support", "পূর্ণ সাপোর্ট", "hero-clear-sky/stat-full-support")}</dt><dd>{t("25 Years", "২৫ বছর", "hero-clear-sky/stat-25-years")}</dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section aria-label="Rooftop production simulator" className="bg-hero-paper px-5 py-12">
        <div className="mx-auto max-w-3xl">
          <div>
          {/* Right Interactive Clear-Sky Live Rooftop Production Simulator */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-card p-3.5 shadow-elevated sm:p-5">
              {/* Top Aerial Photo Preview with Live Telemetry Overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-secondary">
                <Image
                  src={preset.image}
                  alt={`${preset.label} rooftop solar array`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-orange-500 via-amber-400/60 to-transparent mix-blend-soft-light"
                  style={{ opacity: warmTint }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[#0a1430]"
                  style={{ opacity: nightTint }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1526]/90 via-[#0B1526]/25 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/75 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    {t("Live Clear-Sky Model", "লাইভ ক্লিয়ার-স্কাই মডেল", "hero-clear-sky/live-clear-sky-model")}
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-xs font-bold text-ink-deep shadow-sm backdrop-blur-md">
                    {preset.roofArea}
                  </span>
                </div>

                {/* Bottom Live Output Readout */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-300">
                      {t("Instant Rooftop Output at", "এই মুহূর্তে ছাদের উৎপাদন:", "hero-clear-sky/instant-rooftop-output-at")} {formatHour(hour)}
                    </p>
                    <p className="mt-0.5 flex items-baseline gap-1.5 font-mono text-3xl font-extrabold text-white tabular-nums sm:text-4xl">
                      {liveOutputKw.toFixed(1)}
                      <span className="text-base font-bold text-primary">
                        kW
                      </span>
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 text-right backdrop-blur-md">
                    <p className="text-[0.68rem] font-semibold text-slate-200">
                      {t("Est. Monthly Savings", "আনুমানিক মাসিক সাশ্রয়", "hero-clear-sky/est-monthly-savings")}
                    </p>
                    <p className="font-mono text-lg font-extrabold text-primary tabular-nums">
                      {formatBDT(monthlySavings)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Controls Panel */}
              <div className="mt-4 space-y-4 px-1">
                {/* Preset Switcher */}
                <div
                  className="grid grid-cols-3 gap-2 rounded-2xl bg-surface p-1.5"
                  role="group"
                  aria-label={t("Select rooftop system size", "ছাদের সিস্টেমের আকার বাছাই করুন", "hero-clear-sky/select-rooftop-system-size")}
                >
                  {ROOF_PRESETS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPresetId(item.id)}
                      aria-pressed={preset.id === item.id}
                      className={`rounded-xl px-2.5 py-2 text-xs font-bold transition-all ${
                        preset.id === item.id
                          ? "bg-white text-primary-deep shadow-card"
                          : "text-muted-foreground hover:text-ink-deep"
                      }`}
                    >
                      {t(item.label, item.labelBn)}
                    </button>
                  ))}
                </div>

                {/* Clear-Sky Curve SVG + Time Scrubber */}
                <div ref={panel} className="rounded-2xl border border-border bg-surface/70 p-3.5">
                  <div className="mb-2 flex items-center justify-between gap-2 text-xs">
                    <span className="inline-flex min-w-0 items-center gap-1.5 font-bold text-ink-deep">
                      {isNight ? (
                        <Moon className="h-3.5 w-3.5 shrink-0 text-indigo-500" aria-hidden="true" />
                      ) : (
                        <Sun className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-hidden="true" />
                      )}
                      {t("Clear-Sky Irradiance Curve", "ক্লিয়ার-স্কাই সৌর বিকিরণ বক্ররেখা", "hero-clear-sky/clear-sky-irradiance-curve")}
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <span className="font-mono font-semibold text-amber-700">
                        {dailyUnits} kWh / day
                      </span>
                      <button
                        type="button"
                        onClick={() => setAutoplay(!autoplay)}
                        aria-pressed={autoplay}
                        aria-label={autoplay ? t("Pause sun animation", "সূর্যের অ্যানিমেশন থামান") : t("Play sun animation", "সূর্যের অ্যানিমেশন চালু করুন")}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-amber-300 bg-white text-amber-600 shadow-sm transition-colors hover:bg-amber-50"
                      >
                        {autoplay ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
                      </button>
                    </span>
                  </div>

                  <svg
                    viewBox={`0 0 ${curve.width} ${curve.height}`}
                    className="h-20 w-full overflow-visible"
                    role="img"
                    aria-label={`Clear-sky output curve peaking at ${preset.capacityKw} kW, currently ${liveOutputKw} kW at ${formatHour(hour)}`}
                  >
                    <defs>
                      <linearGradient id="clearSkyFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#facc15" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#fde68a" stopOpacity="0.04" />
                      </linearGradient>
                      <linearGradient id="clearSkyStroke" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="50%" stopColor="#eab308" />
                        <stop offset="100%" stopColor="#f97316" />
                      </linearGradient>
                      <radialGradient id="clearSkySunGlow">
                        <stop offset="0%" stopColor="#fde047" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <polygon points={curve.area} fill="url(#clearSkyFill)" />
                    <polyline
                      points={curve.line}
                      fill="none"
                      stroke="url(#clearSkyStroke)"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1={curve.activeX}
                      y1={curve.activeY}
                      x2={curve.activeX}
                      y2={curve.height}
                      stroke={isNight ? "#818cf8" : "#f59e0b"}
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    {!isNight && (
                      <circle cx={curve.activeX} cy={curve.activeY} r="15" fill="url(#clearSkySunGlow)" />
                    )}
                    <circle
                      cx={curve.activeX}
                      cy={curve.activeY}
                      r="6"
                      fill={isNight ? "#e0e7ff" : "#fde047"}
                      stroke={isNight ? "#6366f1" : "#f59e0b"}
                      strokeWidth="2"
                    />
                  </svg>

                  <div className="mt-2">
                    <label
                      htmlFor="hero-sun-slider"
                      className="flex items-center justify-between text-[0.72rem] font-semibold text-muted-foreground"
                    >
                      <span>6:00 AM</span>
                      <span className="text-ink-deep">
                        {t("Slide sun time:", "সূর্যের সময় সরান:", "hero-clear-sky/slide-sun-time")}{" "}
                        <strong className="font-mono text-amber-700">
                          {formatHour(hour)}
                        </strong>
                      </span>
                      <span>7:00 PM</span>
                    </label>
                    <input
                      id="hero-sun-slider"
                      type="range"
                      min={6}
                      max={19}
                      step="any"
                      value={hour}
                      onPointerDown={() => setAutoplay(false)}
                      onKeyDown={() => setAutoplay(false)}
                      onChange={(e) => {
                        setAutoplay(false);
                        setHour(parseFloat(e.target.value));
                      }}
                      className="mt-1.5 w-full cursor-pointer accent-amber-500"
                    />
                  </div>
                </div>

                {/* Bottom Quick Insight Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-primary-soft/75 px-3.5 py-2.5 text-xs">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-primary-deep">
                    <Sparkles className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
                    {t(preset.caption, preset.captionBn)}
                  </span>
                  <Link
                    href="/solar-calculator"
                    className="inline-flex items-center gap-1 font-bold text-primary-deep hover:underline"
                  >
                    <span>{t("Customize roof", "ছাদ কাস্টমাইজ করুন", "hero-clear-sky/customize-roof")}</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Subtle floating badges below simulator */}
            <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Zap className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
                {t("Tier-1 Modules", "টিয়ার-১ মডিউল", "hero-clear-sky/tier-1-longi-trina-modules")}
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <TrendingDown className="h-3.5 w-3.5 text-success" aria-hidden="true" />
                {t("Up to 80% bill reduction from Month 1", "প্রথম মাস থেকেই বিল ৮০% পর্যন্ত কম", "hero-clear-sky/up-to-90-bill-reduction-from-month")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
