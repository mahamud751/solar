"use client";

import Image from "next/image";
import { Check, Award, Leaf, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/site/SiteChrome";
import { Stats, FaqList, CtaBand } from "@/components/site/Blocks";
import { useContent } from "@/data/content";
import { useLang } from "@/i18n/lang";

const whyIcons = [Award, Leaf, ShieldCheck];

export function SocietyPage() {
  const { lang } = useLang();
  const { BLOCKS } = useContent();
  const c = BLOCKS.SOCIETIES[lang];
  return (
    <div className="min-h-screen bg-background text-foreground">

      <section className="relative overflow-hidden">
        <Image src={BLOCKS.PAGE_IMAGES.housingSocietyHeroImage} alt="Solar panels on a Dhaka apartment building" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-secondary/75" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="text-secondary-foreground">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{c.h1}<span className="bg-brand-gradient bg-clip-text text-transparent">90%!</span></h1>
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
        <h2 className="text-center text-3xl font-bold md:text-4xl">{c.whyHeading}</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {c.why.map(([t, d], i) => {
            const I = whyIcons[i] ?? Award;
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

      <section className="bg-secondary py-20 text-secondary-foreground">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {c.band.map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-background/10 p-6">
              <h3 className="font-bold">{t}</h3>
              <p className="mt-2 text-sm opacity-80">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{c.beHeading}</h2>
        <p className="mt-3 text-center text-muted-foreground">{c.beSub}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {c.breakEven.map(([a, b], i) => (
            <div key={b} className={`rounded-2xl border p-6 text-center ${i === 3 ? "bg-brand-gradient text-primary-foreground" : "bg-card"}`}>
              <div className="font-display text-2xl font-bold">{a}</div>
              <div className={`mt-1 text-sm ${i === 3 ? "opacity-90" : "text-muted-foreground"}`}>{b}</div>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-3xl border bg-card p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">{c.caseLabel}</p>
          <h3 className="mt-2 text-2xl font-bold">{c.caseName}</h3>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {c.caseStudy.map(([k, v]) => (
              <div key={k}><dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</dt><dd className="mt-1 font-bold">{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-accent py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{c.safetyHeading}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{c.safetySub}</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.safety.map((t) => (
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
          <div>
            <h3 className="text-xl font-bold">{c.costH}</h3>
            <p className="mt-2 text-muted-foreground">{c.costP}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{c.nmH}</h3>
            <p className="mt-2 text-muted-foreground">{c.nmP}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{c.processH}</h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
              {c.process.map((p) => <li key={p}>{p}</li>)}
            </ol>
          </div>
        </div>
      </article>

      <CtaBand title={c.ctaTitle} text={c.ctaText} />
    </div>
  );
}
