import { getPageMetadata } from "@/server/page-metadata";
import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { ServicesSection } from "@/components/ServicesSection";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { QuoteForm } from "@/components/QuoteForm";
import { T } from "@/i18n/lang";

export function generateMetadata() {
  return getPageMetadata("service");
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-hero-paper pt-28 pb-10 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full bg-primary-soft px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary-deep">
              <T copyKey="service/full-lifecycle-solar-platform" en={"Full-Lifecycle Solar Platform"} bn={"শুরু থেকে শেষ পর্যন্ত সোলার সেবা"} />
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-deep sm:text-5xl">
              <T copyKey="service/every-solar-service-your-roof-or-factory" en={"Every solar service your roof or factory needs, in one platform"} bn={"আপনার ছাদ বা কারখানার প্রয়োজনীয় সব সোলার সেবা, এক জায়গায়"} />
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <T copyKey="service/from-your-first-clear-sky-estimate-and" en={"From your first clear-sky estimate and financing sanction to turnkey commissioning, robotic panel cleaning, annual O&M, and carbon credit monetization."} bn={"প্রথম হিসাব ও অর্থায়ন অনুমোদন থেকে শুরু করে টার্নকি চালু, রোবটিক প্যানেল পরিষ্কার, বার্ষিক O&M ও কার্বন ক্রেডিট থেকে আয় পর্যন্ত।"} />
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/solar-calculator"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-glow"
              >
                <Calculator className="h-4 w-4" aria-hidden="true" />
                <span><T copyKey="service/size-your-roof" en={"Size Your Roof"} bn={"ছাদের হিসাব করুন"} /></span>
              </Link>
              <Link
                href="#service-quote"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-bold text-ink-deep shadow-card hover:border-primary/40"
              >
                <span><T copyKey="service/talk-to-an-engineer" en={"Talk to an Engineer"} bn={"প্রকৌশলীর সাথে কথা বলুন"} /></span>
                <ArrowRight className="h-4 w-4 text-primary-deep" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <BrandsMarquee />

      <section id="service-quote" className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <QuoteForm
            title="Not sure which solar model fits best?"
            subtitle="Tell us your monthly bill and roof type — we'll compare CapEx, Solar Loan, and Zero-Cost PPA side by side."
            titleBn="কোন সোলার মডেল আপনার জন্য সেরা, নিশ্চিত নন?"
            subtitleBn="আপনার মাসিক বিল ও ছাদের ধরন জানান — আমরা নিজস্ব বিনিয়োগ, সোলার লোন ও শূন্য-খরচের PPA পাশাপাশি তুলনা করে দেখাব।"
          />
        </div>
      </section>
    </>
  );
}
