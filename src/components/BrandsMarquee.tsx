"use client";

import React, { useState } from "react";
import { Pause, Play, ShieldCheck } from "lucide-react";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

export function BrandsMarquee() {
  const t = useT();
  const { BRAND_PARTNERS } = useContent();
  const [paused, setPaused] = useState(false);

  // Duplicate list for seamless infinite scroll when motion is enabled
  const items = [...BRAND_PARTNERS, ...BRAND_PARTNERS];

  return (
    <section
      aria-labelledby="brands-heading"
      className="border-y border-border/70 bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary-deep">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              {t("Authorized Equipment Brands", "অনুমোদিত সরঞ্জাম ব্র্যান্ড", "brands-marquee/authorized-equipment-brands")}
            </span>
            <h2
              id="brands-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
            >
              {t("The equipment behind every installation", "প্রতিটি ইনস্টলেশনের পেছনের সরঞ্জাম", "brands-marquee/the-equipment-behind-every-installation")}
            </h2>
            <p className="mt-2.5 text-base text-muted-foreground">
              {t("Tier-1 panels, certified inverters and lithium batteries — installed by our own engineers and covered by our warranty.", "টিয়ার-১ প্যানেল, সার্টিফায়েড ইনভার্টার ও লিথিয়াম ব্যাটারি — আমাদের নিজস্ব প্রকৌশলীরা ইনস্টল করেন এবং আমাদের ওয়ারেন্টিতে কভার।", "brands-marquee/tier-1-panels-certified-inverters-and-lithium")}
            </p>
          </div>

          {/* WCAG 2.2.2 Pause/Play control for moving marquee */}
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold text-ink-deep transition-colors hover:border-primary/40 hover:bg-primary-soft"
          >
            {paused ? (
              <>
                <Play className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
                <span>{t("Play brand ticker", "ব্র্যান্ড তালিকা চালু করুন", "brands-marquee/play-brand-ticker")}</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
                <span>{t("Pause brand ticker", "ব্র্যান্ড তালিকা থামান", "brands-marquee/pause-brand-ticker")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Marquee Viewport */}
      <div className="marquee-viewport relative mt-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28"
        />

        <div className="marquee-track px-4" data-paused={paused ? "true" : "false"}>
          {items.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              aria-hidden={idx >= BRAND_PARTNERS.length ? true : undefined}
              className="flex min-w-[15rem] items-center gap-3.5 rounded-2xl border border-border bg-surface px-5 py-4 shadow-card transition-colors hover:border-primary/35 hover:bg-primary-soft/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-solnce-blue font-mono text-xs font-extrabold text-white">
                {brand.shortCode}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-extrabold text-ink-deep">
                  {brand.name}
                </p>
                <p className="mt-0.5 text-[0.72rem] font-semibold text-muted-foreground">
                  {brand.tier} · {brand.efficiency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
