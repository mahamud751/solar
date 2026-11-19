"use client";

import Image from "next/image";
import { Grid3x3, BatteryCharging, Blend, Check, Quote } from "lucide-react";
import { LeadForm } from "@/components/site/SiteChrome";
import { Stats, FaqList, CtaBand } from "@/components/site/Blocks";
import { useContent } from "@/data/content";
import { useLang } from "@/i18n/lang";

const typeIcons = [Grid3x3, BatteryCharging, Blend];

export function CommercialPage() {
  const { lang } = useLang();
  const { BLOCKS } = useContent();
  const c = BLOCKS.COMMERCIAL[lang];
  return (
    <div className="min-h-screen bg-background text-foreground">

      <section className="relative overflow-hidden">
        <Image src={BLOCKS.PAGE_IMAGES.commercialHeroImage} alt="Commercial rooftop solar on a factory in Bangladesh" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-secondary/75" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="text-secondary-foreground">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{c.h1}<span className="bg-brand-gradient bg-clip-text text-transparent">{lang === "en" ? "Green Dhaka." : "গ্রিন ঢাকা।"}</span></h1>
            <p className="mt-5 max-w-md text-lg opacity-90">{c.sub}</p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-semibold">
              {c.chips.map((x) => <span key={x}>{x}</span>)}
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <Stats items={c.stats} />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{c.featHeading}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{c.featSub}</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.features.map(([t, d]) => (
            <div key={t} className="rounded-2xl border bg-card p-6">
              <h3 className="font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{c.caseHeading}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {c.cases.map((cs) => (
              <div key={cs.n} className="rounded-2xl bg-card p-6 text-card-foreground">
                <Quote className="text-primary" />
                <h3 className="mt-3 font-bold">{cs.n}</h3>
                <dl className="mt-4 space-y-1.5 text-sm">
                  {[cs.kw, cs.capex, cs.save, cs.payback].map((v, i) => (
                    <div key={c.caseLabels[i]} className="flex justify-between gap-4 border-b border-border/60 pb-1.5"><dt className="text-muted-foreground">{c.caseLabels[i]}</dt><dd className="font-bold">{v}</dd></div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs opacity-70">{c.caseNote}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{c.typesHeading}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.types.map(([t, d], i) => {
            const I = typeIcons[i] ?? Grid3x3;
            return (
              <div key={t} className="rounded-2xl border bg-card p-6">
                <div className="bg-brand-gradient grid h-12 w-12 place-items-center rounded-xl text-primary-foreground"><I /></div>
                <h3 className="mt-4 font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-accent py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{c.benefitsHeading}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {c.benefits.map((t) => (
              <p key={t} className="flex items-start gap-2 rounded-2xl border bg-card p-5 text-sm font-semibold"><Check className="mt-0.5 shrink-0 text-primary" />{t}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{c.faqHeading}</h2>
        <FaqList faqs={c.faqs} />
      </section>

      <article className="border-t bg-card/50 py-20">
        <div className="mx-auto max-w-3xl space-y-8 px-6">
          <h2 className="text-3xl font-bold">{c.articleH}</h2>
          {c.article.map(([h, p]) => (
            <div key={h}>
              <h3 className="text-xl font-bold">{h}</h3>
              <p className="mt-2 text-muted-foreground">{p}</p>
            </div>
          ))}
        </div>
      </article>

      <CtaBand title={c.ctaTitle} text={c.ctaText} button={c.ctaButton} />
    </div>
  );
}
