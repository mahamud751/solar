"use client";

import React, { useState } from "react";
import { Pause, Play, Star, BadgeCheck } from "lucide-react";
import { useContent } from "@/data/content";
import { useT } from "@/i18n/lang";

export function TestimonialsSection() {
  const tx = useT();
  const { TESTIMONIALS } = useContent();
  const [paused, setPaused] = useState(false);
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-y border-border/70 bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3.5 py-1 text-xs font-bold text-[#9A5D06]">
              <Star className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
              {tx("4.8 / 5 Customer Rating", "৪.৮ / ৫ গ্রাহক রেটিং")}
            </span>
            <h2
              id="testimonials-heading"
              className="mt-3 text-3xl font-extrabold tracking-tight text-ink-deep sm:text-4xl"
            >
              {tx("What homeowners say after going solar", "সোলারে যাওয়ার পর বাড়ির মালিকরা যা বলেন")}
            </h2>
            <p className="mt-2.5 text-base text-muted-foreground">
              {tx("Real experiences from people who planned and managed their solar journey with Green Dhaka.", "গ্রিন ঢাকার সাথে সোলার যাত্রা পরিকল্পনা ও পরিচালনা করা মানুষের বাস্তব অভিজ্ঞতা।")}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-xs font-bold text-ink-deep shadow-card transition-colors hover:border-primary/40 hover:bg-primary-soft"
          >
            {paused ? (
              <>
                <Play className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
                <span>{tx("Play reviews", "রিভিউ চালু করুন")}</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-primary-deep" aria-hidden="true" />
                <span>{tx("Pause reviews", "রিভিউ থামান")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Smooth Infinite Reviews Marquee */}
      <div className="marquee-viewport relative mt-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent sm:w-24"
        />

        <div
          className="marquee-track marquee-slow px-4"
          data-paused={paused ? "true" : "false"}
        >
          {items.map((t, idx) => {
            const initials = t.name
              .replace(/^(Mr\.|Mrs\.|Ms\.)\s*/i, "")
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <article
                key={`${t.name}-${idx}`}
                aria-hidden={idx >= TESTIMONIALS.length ? true : undefined}
                className="flex w-[21.5rem] shrink-0 flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-card sm:w-[23.5rem]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5 text-[#E08A1A]">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star
                          key={s}
                          className="h-3.5 w-3.5 fill-current"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="rounded-full bg-success-soft px-2.5 py-0.5 text-[0.7rem] font-bold text-emerald-800">
                      {t.savingsNote}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft font-mono text-xs font-extrabold text-primary-deep"
                  >
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-extrabold text-ink-deep">
                      {t.name}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <BadgeCheck
                        className="h-3.5 w-3.5 shrink-0 text-primary-deep"
                        aria-hidden="true"
                      />
                      <span className="truncate">
                        {t.capacity} · {t.location}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
