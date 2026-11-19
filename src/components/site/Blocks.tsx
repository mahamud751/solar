"use client";

import { Star } from "lucide-react";
import { useContent } from "@/data/content";
import { useLang, type Bi } from "@/i18n/lang";

export function Stats({ items }: { items: [string, string][] }) {
  return (
    <section className="border-y bg-secondary py-10 text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {items.map(([a, b]) => (
          <div key={b} className="text-center">
            <div className="font-display text-3xl font-bold text-primary">{a}</div>
            <div className="mt-1 text-sm opacity-80">{b}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FaqList({ faqs }: { faqs: [string, string][] }) {
  return (
    <div className="mt-10 space-y-3">
      {faqs.map(([q, a]) => (
        <details key={q} className="rounded-xl border bg-card p-5">
          <summary className="cursor-pointer font-semibold">{q}</summary>
          <p className="mt-3 text-muted-foreground">{a}</p>
        </details>
      ))}
    </div>
  );
}

const ctaDefaultBi: Bi<string> = {
  en: "Book a FREE consultation",
  bn: "ফ্রি পরামর্শ বুক করুন",
};

export function CtaBand({ title, text, button }: { title: string; text: string; button?: string }) {
  const { lang } = useLang();
  const label = button ?? ctaDefaultBi[lang];
  return (
    <section className="bg-brand-gradient">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-14 text-center text-primary-foreground">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="max-w-xl opacity-90">{text}</p>
        <a href="#quote" className="mt-2 rounded-full bg-secondary px-8 py-3 font-bold text-secondary-foreground shadow-lg transition hover:opacity-90">{label}</a>
      </div>
    </section>
  );
}



export function Reviews() {
  const { lang } = useLang();
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {useContent().BLOCKS.REVIEWS[lang].map((r) => (
        <div key={r.n} className="rounded-2xl bg-card p-6 shadow-sm">
          <div className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
          <p className="mt-4">&ldquo;{r.q}&rdquo;</p>
          <p className="mt-4 text-sm font-bold">{r.n}</p>
        </div>
      ))}
    </div>
  );
}
