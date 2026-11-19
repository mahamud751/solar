"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, Sun, ShieldCheck, Wrench, BadgeCheck } from "lucide-react";
import { LeadForm } from "@/components/site/SiteChrome";
import { OfferTabs, TrustSection } from "@/components/site/Offerings";
import { Stats, FaqList, CtaBand, Reviews } from "@/components/site/Blocks";
import { cityName, divisionName } from "@/data/cities";
import { useContent } from "@/data/content";
import { useLang } from "@/i18n/lang";


export function CityPage({ slug }: { slug: string }) {
  const { lang } = useLang();
  const { CITIES: cities, BLOCKS } = useContent();
  const city = cities.find((entry) => entry.slug === slug);
  if (!city) return null;
  const n = cityName(city, lang);
  const div = divisionName(city.division, lang);
  const nearby = cities.filter((c) => c.division === city.division && c.slug !== city.slug);

  const copy = BLOCKS.CITY_PAGE[lang];
  const format = (text: string, name = n) => text.replaceAll("{city}", name).replaceAll("{division}", div);
  const title = copy.title.split("{city}");
  const whyIcons = [Sun, ShieldCheck, BadgeCheck, Wrench];
  const faqs: [string, string][] = copy.faqs.map(([question, answer]) => [format(question), format(answer)]);
  const stats: [string, string][] = copy.stats.map(([value, label]) => [value, label]);

  return (
    <>
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <Image src={BLOCKS.PAGE_IMAGES.cityHeroImage} alt={`Rooftop solar in ${city.name}`} fill sizes="100vw" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold"><MapPin size={16} /> {n}, {div} {copy.regionLabel}</p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">{title[0]}{title.length > 1 && <><span className="text-primary">{n}</span>{title.slice(1).join(n)}</>}</h1>
            <p className="mt-5 max-w-xl text-lg opacity-90">{format(copy.description)}</p>
            <ul className="mt-6 space-y-2">{copy.bullets.map((x) => <li key={x} className="flex items-center gap-2"><Check className="text-primary" size={18} />{x}</li>)}</ul>
          </div>
          <LeadForm />
        </div>
      </section>
      <Stats items={stats} />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-center font-display text-3xl font-bold">{format(copy.benefitsHeading)}</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {copy.why.map((item, index) => {
            const Icon = whyIcons[index] ?? Sun;
            return <div key={index} className="rounded-2xl border bg-card p-6"><Icon className="text-primary" /><h3 className="mt-4 font-bold">{format(item.t)}</h3><p className="mt-2 text-sm text-muted-foreground">{format(item.d)}</p></div>;
          })}
        </div>
      </section>
      <OfferTabs />
      <section className="bg-accent py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-display text-3xl font-bold">{format(copy.stepsHeading)}</h2>
          <ol className="mt-10 space-y-4">{copy.steps.map((s, i) => <li key={s} className="flex items-center gap-4 rounded-xl bg-card p-4"><span className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-primary-foreground">{i + 1}</span><span className="font-semibold">{s}</span></li>)}</ol>
        </div>
      </section>
      <TrustSection />
      <section className="bg-accent py-16"><div className="mx-auto max-w-7xl px-6"><h2 className="text-center font-display text-3xl font-bold">{copy.reviewsHeading}</h2><Reviews /></div></section>
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-center font-display text-3xl font-bold">{format(copy.faqHeading)}</h2>
        <FaqList faqs={faqs} />
      </section>
      {nearby.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <h2 className="font-display text-2xl font-bold">{format(copy.nearbyHeading)}</h2>
          <div className="mt-5 flex flex-wrap gap-2">{nearby.map((c) => <Link key={c.slug} href={`/solar-company-in-${c.slug}`} className="rounded-full border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">{format(copy.nearbyLink, cityName(c, lang))}</Link>)}</div>
        </section>
      )}
      <CtaBand title={format(copy.ctaTitle)} text={format(copy.ctaText)} />
    </>
  );
}
