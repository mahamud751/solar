"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Pause, Play, Eye } from "lucide-react";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

export function AerialShowcaseSection() {
  const t = useT();
  const { AERIAL_SHOWCASE_SLIDES } = useContent();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Respect prefers-reduced-motion: auto-advance only when user permits motion and not paused
  useEffect(() => {
    if (paused || AERIAL_SHOWCASE_SLIDES.length < 2) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % AERIAL_SHOWCASE_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [paused, AERIAL_SHOWCASE_SLIDES.length]);

  const current = AERIAL_SHOWCASE_SLIDES[activeIndex] ?? AERIAL_SHOWCASE_SLIDES[0];
  if (!current) return null;

  return (
    <section
      aria-labelledby="aerial-heading"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {t("Drone QA & Real Sites", "ড্রোন QA ও বাস্তব সাইট", "aerial-showcase-section/drone-qa-real-sites")}
            </span>
            <h2
              id="aerial-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
            >
              {t("Our work, from 400 feet up", "৪০০ ফুট উপর থেকে আমাদের কাজ", "aerial-showcase-section/our-work-from-400-feet-up")}
            </h2>
            <p className="mt-2.5 text-base leading-relaxed text-muted-foreground">
              {t("At Green Dhaka we don't just quote solar — we build it, commission it and keep it running. Here is what that looks like on a real site.", "গ্রিন ঢাকা শুধু সোলারের কোটেশন দেয় না — আমরা তৈরি করি, চালু করি এবং সচল রাখি। বাস্তব সাইটে তা দেখতে এমন।", "aerial-showcase-section/at-green-dhaka-we-don-t-just")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-ink-deep shadow-card transition-colors hover:border-primary/40 hover:bg-primary-soft sm:self-auto"
          >
            {paused ? (
              <>
                <Play className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
                <span>{t("Play showcase", "শোকেস চালু করুন", "aerial-showcase-section/play-showcase")}</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
                <span>{t("Pause showcase", "শোকেস থামান", "aerial-showcase-section/pause-showcase")}</span>
              </>
            )}
          </button>
        </div>

        {/* Showcase Frame */}
        <div className="mt-9 overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-elevated">
          <div className="relative aspect-[16/9] max-h-[34rem] w-full overflow-hidden">
            <Image
              key={current.id}
              src={current.image}
              alt={current.alt}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091220]/95 via-[#091220]/35 to-transparent" />

            {/* Top Left Metric Badge */}
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-secondary/75 px-3.5 py-1.5 font-mono text-xs font-bold text-[#F6C44C] backdrop-blur-md">
                {current.metric}
              </span>
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute right-5 bottom-5 left-5 flex flex-col justify-between gap-4 sm:right-8 sm:bottom-8 sm:left-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {current.label}
                </p>
                <h3 className="mt-1.5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                  {current.headline}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-200">
                  {current.description}
                </p>
              </div>

              <Link
                href={current.ctaHref}
                className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-extrabold text-ink-deep shadow-card transition-transform hover:-translate-y-0.5 md:self-auto"
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight className="h-4 w-4 text-primary-deep" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* 3-Tab Scene Switcher */}
          <div
            className="grid border-t border-white/10 bg-secondary sm:grid-cols-3"
            role="group"
            aria-label={t("Aerial site inspection scenes", "আকাশ থেকে সাইট পরিদর্শনের দৃশ্য", "aerial-showcase-section/aerial-site-inspection-scenes")}
          >
            {AERIAL_SHOWCASE_SLIDES.map((slide, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`relative border-b border-white/10 p-5 text-left transition-colors sm:border-r sm:border-b-0 sm:last:border-r-0 ${
                    isCurrent
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {isCurrent && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-1 bg-solnce-gold"
                    />
                  )}
                  <span className="block text-xs font-bold uppercase tracking-wider text-primary">
                    0{idx + 1} · {slide.label}
                  </span>
                  <span className="mt-1 block text-sm font-bold">
                    {slide.headline}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
