"use client";

import { Sun, PlugZap, BatteryCharging, Wrench, Zap, Wallet, ShieldCheck, Smartphone, Star } from "lucide-react";
import { useContent } from "@/data/content";
import { useLang } from "@/i18n/lang";

function Chip({ label }: { label: string }) {
  return (
    <li
      className="rounded-xl border bg-card px-6 py-3.5 text-center font-display text-lg font-bold tracking-tight shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
    >
      {label}
    </li>
  );
}

export function BrandPartners() {
  const { lang } = useLang();
  const t = useContent().BLOCKS.EQUIPMENT_PARTNERS[lang];
  return (
    <section id="brands" aria-labelledby="brands-heading" className="border-y bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mx-auto max-w-xl text-center text-muted-foreground">{t.intro}</p>
        <h2 id="brands-heading" className="mt-4 text-center text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">{t.heading}</h2>

        <div className="mt-10 space-y-10">
          {t.groups.map((group) => (
            <div key={group.label}>
              <h3 className="text-center text-sm font-bold text-primary-deep">{group.label}</h3>
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-3">
                {group.brands.map((b) => <Chip key={b} label={b} />)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WARRANTY_ICONS = [Sun, PlugZap, BatteryCharging, Wrench];

export function WarrantySection() {
  const { lang } = useLang();
  const t = useContent().BLOCKS.WARRANTY[lang];
  return (
    <section id="warranty" className="bg-secondary py-20 text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-block rounded-full border border-primary/40 bg-background/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            {t.pill}
          </p>
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">{t.heading}</h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.cards.map(({ t: title, d }, index) => {
            const Icon = WARRANTY_ICONS[index] ?? ShieldCheck;
            return (
              <div
                key={title}
                className="rounded-2xl border border-background/15 bg-background/5 p-6 transition hover:border-primary/50 hover:bg-background/10"
              >
                <div className="bg-brand-gradient grid h-12 w-12 place-items-center rounded-xl text-primary-foreground">
                  <Icon aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-bold">{title}</h3>
                <p className="mt-2 text-sm opacity-80">{d}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border border-primary/40 bg-primary/10 p-7 md:p-9">
          <h3 className="text-xl font-bold md:text-2xl">{t.whyTitle}</h3>
          <p className="mt-3 max-w-3xl text-lg leading-relaxed opacity-95">
            <span className="font-bold text-primary">{t.whyLead}</span>
            {t.whyBody}
          </p>
        </div>
      </div>
    </section>
  );
}

export function NetMeterBand() {
  const { lang } = useLang();
  const t = useContent().BLOCKS.NET_METER_BAND[lang];
  return (
    <section id="net-metering" className="bg-brand-gradient">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center text-primary-foreground">
        <h2 className="flex items-center justify-center gap-3 text-3xl font-bold md:text-4xl">
          <Zap className="h-8 w-8 shrink-0" aria-hidden="true" />
          {t.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed opacity-95">{t.quote}</p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {t.utilities.map((u) => (
            <li key={u} className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-5 py-2 font-display font-bold">
              {u}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const FEATURE_ICONS = [Sun, Wallet, Wrench, ShieldCheck, Smartphone];

export function HomeFeatures() {
  const { lang } = useLang();
  const t = useContent().BLOCKS.HOME_FEATURES[lang];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-4xl">{t.heading}</h2>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {t.items.map(({ t: title, d }, index) => {
          const Icon = FEATURE_ICONS[index] ?? Sun;
          return (
            <div key={title} className="rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <Icon className="text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function HomeSteps() {
  const { lang } = useLang();
  const t = useContent().BLOCKS.HOME_STEPS[lang];
  return (
    <section id="how" className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-4xl">{t.heading}</h2>
      <ol className="mt-12 grid gap-6 md:grid-cols-5">
        {t.steps.map((step, i) => (
          <li key={step} className="text-center">
            <div className="bg-brand-gradient mx-auto grid h-14 w-14 place-items-center rounded-full font-display text-xl font-bold text-primary-foreground">
              {i + 1}
            </div>
            <p className="mt-4 font-semibold">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function HomeReviews() {
  const { lang } = useLang();
  const t = useContent().BLOCKS.HOME_REVIEWS[lang];
  return (
    <section className="bg-accent py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{t.heading}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.reviews.map((r) => (
            <figure key={r.n} className="rounded-2xl bg-card p-6 shadow-sm">
              <div className="flex text-primary" role="img" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" aria-hidden="true" />)}
              </div>
              <blockquote className="mt-4">&ldquo;{r.q}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-bold">{r.n}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
