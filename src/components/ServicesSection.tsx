"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

const CATEGORIES = ["All", "Installations", "Financing", "Operations"] as const;
const CATEGORY_BN: Record<string, string> = {
  All: "সব",
  Installations: "ইনস্টলেশন",
  Financing: "অর্থায়ন",
  Operations: "পরিচালনা",
};

export function ServicesSection() {
  const t = useT();
  const { SERVICES } = useContent();
  const [activeCategory, setActiveCategory] =
    useState<(typeof CATEGORIES)[number]>("All");

  const filtered =
    activeCategory === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
              {t("End-to-End Ecosystem", "শুরু থেকে শেষ পর্যন্ত সেবা", "services-section/end-to-end-ecosystem")}
            </span>
            <h2
              id="services-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
            >
              {t("Our Services", "আমাদের সার্ভিস", "services-section/our-services")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {t("We offer end-to-end solar solutions — from high-quality panel installations for homes and businesses to expert maintenance, cleaning and flexible financing.", "বাসা ও ব্যবসার জন্য মানসম্পন্ন প্যানেল ইনস্টলেশন থেকে শুরু করে দক্ষ রক্ষণাবেক্ষণ, পরিষ্কার ও সহজ অর্থায়ন — আমরা দিই শুরু থেকে শেষ পর্যন্ত সোলার সমাধান।", "services-section/we-offer-end-to-end-solar-solutions")}
            </p>
          </div>

          {/* Interactive category filter */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t("Filter solar services by category", "ধরন অনুযায়ী সার্ভিস ফিল্টার করুন", "services-section/filter-solar-services-by-category")}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat}
                className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-solnce-blue text-white shadow-glow"
                    : "border border-border bg-card text-foreground/80 hover:border-primary/40 hover:text-primary-deep"
                }`}
              >
                {t(cat, CATEGORY_BN[cat] ?? cat)}
              </button>
            ))}
          </div>
        </div>

        {/* 8-Service Card Grid */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((svc) => (
            <Link
              key={svc.slug}
              href={`/service/${svc.slug}`}
              className="reveal-on-scroll group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/35 hover:shadow-elevated"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-muted">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/75 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-white/92 px-2.5 py-1 text-[0.68rem] font-bold text-primary-deep shadow-sm backdrop-blur-sm">
                  {t(svc.category, CATEGORY_BN[svc.category] ?? svc.category)}
                </span>
                <span className="absolute bottom-3 left-3 font-mono text-xs font-extrabold text-primary">
                  {svc.highlightMetric}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-ink-deep transition-colors group-hover:text-primary-deep">
                    {svc.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {svc.tagline}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3.5 text-xs font-bold text-primary-deep">
                  <span>{svc.highlightLabel}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-soft text-primary-deep transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
