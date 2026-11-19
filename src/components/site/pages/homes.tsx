"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, X, BatteryCharging, Wrench, Smartphone, BadgeCheck } from "lucide-react";
import { LeadForm } from "@/components/site/SiteChrome";
import { TrustSection } from "@/components/site/Offerings";
import { Stats, FaqList, CtaBand, Reviews } from "@/components/site/Blocks";
import { useContent } from "@/data/content";
import { useLang } from "@/i18n/lang";

const icons = [BadgeCheck, BatteryCharging, Wrench, Smartphone];

export function HomesPage() {
  const { lang } = useLang();
  const { BLOCKS } = useContent();
  const c = BLOCKS.HOMES[lang];
  return (
    <div className="min-h-screen bg-background text-foreground">

      <section className="relative overflow-hidden">
        <Image src={BLOCKS.PAGE_IMAGES.homesHeroImage} alt="Rooftop solar on a home in Dhaka" width={1024} height={1024} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-secondary/75" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="text-secondary-foreground">
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{c.h1a}<span className="bg-brand-gradient bg-clip-text text-transparent">{c.h1b}</span></h1>
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
        <p className="text-center text-sm font-bold uppercase tracking-widest text-primary">{c.introPill}</p>
        <h2 className="mt-2 text-center text-3xl font-bold md:text-4xl">GreenSure™</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">{c.introSub}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {c.guarantee.map(([t, d], i) => {
            const I = icons[i] ?? BadgeCheck;
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

      <TrustSection />

      <section className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{c.advHeading}</h2>
        <div className="mt-10 overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-secondary text-secondary-foreground"><tr>{c.thead.map((h) => <th key={h} className="p-4">{h}</th>)}</tr></thead>
            <tbody>
              {c.advantage.map(([a, b, d]) => (
                <tr key={a} className="border-t bg-card">
                  <td className="p-4 font-bold">{a}</td>
                  <td className="p-4"><span className="flex gap-2"><Check size={18} className="shrink-0 text-primary" />{b}</span></td>
                  <td className="p-4 text-muted-foreground"><span className="flex gap-2"><X size={18} className="shrink-0 text-destructive" />{d}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-accent py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold md:text-4xl">{c.reviewsHeading}</h2>
          <Reviews />
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold md:text-4xl">{c.faqHeading}</h2>
        <FaqList faqs={c.faqs} />
      </section>

      <article className="border-t bg-card/50 py-20">
        <div className="mx-auto max-w-3xl space-y-8 px-6">
          <h2 className="text-3xl font-bold">{c.articleH}</h2>
          {c.article.map((s, i) => (
            <div key={s.h}>
              <h3 className="text-xl font-bold">{s.h}</h3>
              {s.p.map((p) => <p key={p} className="mt-2 text-muted-foreground">{p}</p>)}
              {i === c.article.length - 1 && (
                <p className="mt-3 text-sm">
                  <Link href="/on-grid-solar-system" className="font-bold text-primary hover:underline">{c.linkOn}</Link>{" "}
                  <Link href="/off-grid-solar-system" className="ml-4 font-bold text-primary hover:underline">{c.linkOff}</Link>
                </p>
              )}
            </div>
          ))}
        </div>
      </article>

      <CtaBand title={c.ctaTitle} text={c.ctaText} />
    </div>
  );
}
