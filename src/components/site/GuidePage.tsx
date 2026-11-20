"use client";

import Image from "next/image";
import { Check, X, Lightbulb } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { useLang, type Bi } from "@/i18n/lang";

import { useContent } from "@/data/content";
import type { Guide } from "@/data/page-content";




export function GuidePage({ g, formTitle }: { g: Bi<Guide>; formTitle: Bi<string> }) {
  const { lang } = useLang();
  const { BLOCKS } = useContent();
  const guide = g[lang];
  const c = BLOCKS.GUIDE_LABELS[lang];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        <Image src={BLOCKS.PAGE_IMAGES.guideHeroImage} alt="Rooftop solar installation in Dhaka" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="text-secondary-foreground">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl"><span className="bg-brand-gradient bg-clip-text text-transparent">{guide.title}</span></h1>
            <p className="mt-5 max-w-md text-lg opacity-90">{guide.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm font-semibold">
              {c.chips.map((chip) => <span key={chip}>{chip}</span>)}
            </div>
          </div>
          <QuoteForm
            compact
            title={formTitle.en}
            titleBn={formTitle.bn}
            subtitle="Receive an itemised quote, generation estimate and financing options within 24 hours."
            subtitleBn="২৪ ঘণ্টার মধ্যে বিস্তারিত কোটেশন, উৎপাদনের হিসাব ও অর্থায়নের বিকল্প পান।"
          />
        </div>
      </section>

      <article className="mx-auto max-w-4xl space-y-16 px-6 py-16">
        <section>
          <h2 className="text-3xl font-bold">{c.whatIs}</h2>
          {guide.whatIs.map((p) => <p key={p} className="mt-4 text-muted-foreground">{p}</p>)}
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.components}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {guide.components.map((comp, i) => (
              <div key={comp.t} className="rounded-2xl border bg-card p-5">
                <p className="font-display text-sm font-bold text-primary">0{i + 1}</p>
                <h3 className="mt-1 font-bold">{comp.t}</h3><p className="mt-2 text-sm text-muted-foreground">{comp.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3 rounded-2xl bg-accent p-5">
            <Lightbulb className="shrink-0 text-primary" /><div><h3 className="font-bold">{c.didYouKnow}</h3><p className="mt-1 text-sm">{guide.didYouKnow}</p></div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.how}</h2>
          <ol className="mt-6 space-y-4">
            {guide.steps.map((s, i) => (
              <li key={s.t} className="flex gap-4">
                <span className="bg-brand-gradient grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold text-primary-foreground">{i + 1}</span>
                <div><h3 className="font-bold">{s.t}</h3><p className="text-sm text-muted-foreground">{s.d}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-3xl font-bold">{guide.incentive.h}</h2>
          {guide.incentive.p.map((p) => <p key={p} className="mt-4 text-muted-foreground">{p}</p>)}
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.priceHeading}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{c.priceNote}</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-secondary text-secondary-foreground"><tr><th className="p-4">{c.thSize}</th><th className="p-4">{c.thUnits}</th><th className="p-4">{c.thPrice}</th><th className="p-4">{c.thSuits}</th></tr></thead>
              <tbody>{guide.prices.map((r) => (
                <tr key={r.size} className="border-t bg-card"><td className="p-4 font-bold">{r.size}</td><td className="p-4">{r.units}</td><td className="p-4 font-semibold text-foreground">{r.price}</td><td className="p-4 text-muted-foreground">{r.suits}</td></tr>
              ))}</tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.roiHeading}</h2>
          {guide.roi.map((p) => <p key={p} className="mt-4 text-muted-foreground">{p}</p>)}
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.prosConsHeading}</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-6"><h3 className="font-bold">{c.pros}</h3>
              <ul className="mt-3 space-y-2 text-sm">{guide.pros.map((p) => <li key={p} className="flex gap-2"><Check size={18} className="shrink-0 text-primary" />{p}</li>)}</ul></div>
            <div className="rounded-2xl border bg-card p-6"><h3 className="font-bold">{c.cons}</h3>
              <ul className="mt-3 space-y-2 text-sm">{guide.cons.map((p) => <li key={p} className="flex gap-2"><X size={18} className="shrink-0 text-destructive" />{p}</li>)}</ul></div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.compareHeading}</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-secondary text-secondary-foreground"><tr><th className="p-4">{c.thFeature}</th><th className="p-4">{c.thOnGrid}</th><th className="p-4">{c.thOffGrid}</th></tr></thead>
              <tbody>{c.compare.map(([a, b, col]) => <tr key={a} className="border-t bg-card"><td className="p-4 font-bold">{a}</td><td className="p-4">{b}</td><td className="p-4">{col}</td></tr>)}</tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.installHeading}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">{guide.install.map((s) => <li key={s}>{s}</li>)}</ol>
        </section>

        <section className="rounded-2xl bg-secondary p-8 text-secondary-foreground">
          <h2 className="text-3xl font-bold">{c.whyHeading}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {c.whyPoints.map((p) => (
              <p key={p} className="flex gap-2"><Check className="shrink-0 text-primary" />{p}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.conclusionHeading}</h2>
          <p className="mt-4 text-muted-foreground">{guide.conclusion}</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold">{c.faqHeading}</h2>
          <div className="mt-6 space-y-3">
            {guide.faqs.map(([q, a]) => (
              <details key={q} className="rounded-xl border bg-card p-5"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-3 text-muted-foreground">{a}</p></details>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
