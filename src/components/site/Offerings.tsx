"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, ClipboardCheck, Wind, Wrench, ChevronRight } from "lucide-react";
import { useContent } from "@/data/content";
import { useLang } from "@/i18n/lang";

export function OfferTabs() {
  const { lang } = useLang();
  const offers = useContent().BLOCKS.OFFER_TABS[lang];
  const [active, setActive] = useState(0);
  const o = offers[active] ?? offers[0]!;
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-4xl">{lang === "en" ? "Get Solar for" : "আপনার জন্য সোলার"}</h2>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {offers.map((off, i) => (
          <button
            key={off.label}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`rounded-full border px-5 py-2.5 text-sm font-bold transition ${active === i ? "bg-brand-gradient border-transparent text-primary-foreground shadow-lg" : "bg-card hover:border-primary"}`}
          >
            {off.label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid items-stretch gap-0 overflow-hidden rounded-3xl border bg-card md:grid-cols-2">
        <Image src={o.img} alt={o.headline} width={1024} height={1024} loading="lazy" className="h-64 w-full object-cover md:h-auto" />
        <div className="p-8 md:p-10">
          <h3 className="text-2xl font-bold">{o.headline}</h3>
          <p className="mt-2 text-lg text-muted-foreground">{o.d}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {o.points.map((p) => (
              <li key={p} className="flex gap-2"><ShieldCheck size={18} className="shrink-0 text-primary" />{p}</li>
            ))}
          </ul>
          <Link href={o.to} className="mt-6 inline-flex items-center gap-1 font-bold text-primary hover:underline">
            {o.cta} <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  const { lang } = useLang();
  const t = useContent().BLOCKS.TRUST[lang];
  return (
    <section id="why" className="relative overflow-hidden bg-accent py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-block rounded-full border border-primary/40 bg-card px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            {t.pill}
          </p>
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.sub}
          </p>
        </div>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {t.cards.map(({ t: title, d, img, alt }, index) => {
            const Icon = [ShieldCheck, ClipboardCheck, Wind, Wrench][index] ?? ShieldCheck;
            return (
            <article
              key={title}
              className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={img}
                  alt={alt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-secondary/5 to-transparent" />
              </div>
              <div className="relative flex-1 px-6 pb-7 pt-9">
                <div className="bg-brand-gradient absolute -top-6 left-6 grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground shadow-lg ring-4 ring-card">
                  <Icon />
                </div>
                <h3 className="font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
