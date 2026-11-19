import { getPageMetadata } from "@/server/page-metadata";
import { getSiteContent } from "@/server/content";
import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ClipboardList,
  PhoneCall,
  FileText,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { T } from "@/i18n/lang";

export function generateMetadata() {
  return getPageMetadata("contact");
}

export default async function ContactPage() {
  const { COMPANY_INFO, HERO_STATS, CITIES: cities, BLOCKS } = await getSiteContent();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`;
  return (
    <section className="bg-hero-paper pt-28 pb-20 sm:pt-32 sm:pb-24">
      {/* Decorative rotating sun */}
      <Sun
        className="spin-slow pointer-events-none absolute top-24 right-[6%] -z-10 hidden h-40 w-40 text-gold/15 lg:block"
        strokeWidth={1}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Left Contact Details */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-deep shadow-sm backdrop-blur">
              <span className="live-dot" aria-hidden="true" />
              <T copyKey="contact/engineering-desk-replies-in-24-48-hrs" en={"Engineering desk · replies in 24–48 hrs"} bn={"ইঞ্জিনিয়ারিং ডেস্ক · ২৪–৪৮ ঘণ্টায় উত্তর"} />
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-deep sm:text-5xl lg:text-[3.5rem]">
              <T copyKey="contact/let-s-size-your" en="Let's size your" bn="চলুন একসাথে আপনার" />{" "}
              <span className="text-gradient"><T copyKey="contact/solar-plant" en="solar plant" bn="সোলার প্ল্যান্টের" /></span>{" "}
              <T copyKey="contact/together" en="together" bn="আকার ঠিক করি" />
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <T copyKey="contact/have-a-question-about-net-metering-emi" en={"Have a question about net metering, EMI plans, factory rooftop solar, zero-CapEx Solar PPAs or maintenance? Our solar engineers reply within 24–48 hours."} bn={"নেট মিটারিং, EMI প্ল্যান, কারখানার ছাদের সোলার, শূন্য-বিনিয়োগের সোলার PPA বা রক্ষণাবেক্ষণ নিয়ে প্রশ্ন আছে? আমাদের সোলার প্রকৌশলীরা ২৪–৪৮ ঘণ্টার মধ্যে উত্তর দেন।"} />
            </p>

            {/* Trust stats */}
            <dl className="mt-7 grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-white/70 py-4 backdrop-blur">
              {HERO_STATS.map(({ en: stat, bn }) => (
                <div key={stat.label} className="flex flex-col-reverse px-3 text-center">
                  <dt className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    <T en={stat.label} bn={bn.label} />
                  </dt>
                  <dd className="font-mono text-xl font-extrabold text-ink-deep sm:text-2xl">
                    {stat.value.toLocaleString("en-IN")}
                    {stat.suffix}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 space-y-4">
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rise rise-3 group flex items-start gap-3.5 rounded-2xl border border-border bg-card p-5 shadow-card"
              >
                <span className="icon-pop flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-deep">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <h2 className="flex items-center justify-between text-sm font-extrabold text-ink-deep">
                    <T copyKey="contact/dhaka-office" en={"Dhaka Office"} bn={"ঢাকা অফিস"} />
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-deep opacity-70 transition-opacity group-hover:opacity-100">
                      <T copyKey="contact/directions" en={"Directions"} bn={"দিকনির্দেশনা"} />
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    <T en={COMPANY_INFO.address} bn={COMPANY_INFO.addressBn} />
                  </p>
                </div>
              </a>

              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="rise rise-4 flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card"
                >
                  <span className="icon-pop flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-deep">
                    <Phone className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <T copyKey="contact/call-us" en={"Call Us"} bn={"কল করুন"} />
                    </h2>
                    <p className="mt-1 font-mono text-sm font-extrabold text-ink-deep">
                      {COMPANY_INFO.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={COMPANY_INFO.emailHref}
                  className="rise rise-5 flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-card"
                >
                  <span className="icon-pop flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-deep">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <T copyKey="contact/email-support" en={"Email Support"} bn={"ইমেইল সাপোর্ট"} />
                    </h2>
                    <p className="mt-1 truncate text-sm font-extrabold text-ink-deep">
                      {COMPANY_INFO.email}
                    </p>
                  </div>
                </a>
              </div>

              <div className="rise rise-6 card-lift flex items-start gap-3.5 rounded-2xl border border-border bg-card p-5 shadow-card">
                <span className="icon-pop flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-soft text-[#9A5D06]">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-extrabold text-ink-deep">
                    <T copyKey="contact/business-hours-bst" en="Business Hours (BST)" bn="অফিস সময় (বাংলাদেশ সময়)" />
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <T en={COMPANY_INFO.hoursWeekday} bn={COMPANY_INFO.hoursWeekdayBn} />
                    <br />
                    <T en={COMPANY_INFO.hoursSaturday} bn={COMPANY_INFO.hoursSaturdayBn} />
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <T copyKey="contact/service-network-all-8-divisions" en={"Service network · all 8 divisions"} bn={"সেবা নেটওয়ার্ক · ৮টি বিভাগেই"} />
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {cities
                  .filter((c) => c.cityCorp)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link href={`/solar-company-in-${c.slug}`} className="chip">
                        <T en={c.name} bn={c.bn} />
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link href="/cities" className="chip">
                    <T en={`All ${cities.length} cities →`} bn={`সব ${cities.length}টি শহর →`} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Quote Form */}
          <div id="quote" className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="relative">
              <div
                className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.25rem] bg-gradient-to-br from-primary/25 via-transparent to-gold/30 blur-2xl"
                aria-hidden="true"
              />
              <QuoteForm />
            </div>

            {/* What happens next */}
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {BLOCKS.CONTACT_STEPS.map((step, i) => {
                const StepIcon = [ClipboardList, PhoneCall, FileText][i] ?? FileText;
                return (
                <li
                  key={step.title}
                  className="card-lift relative rounded-2xl border border-border bg-white/80 p-4 backdrop-blur"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="icon-pop flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary-deep">
                      <StepIcon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-bold text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h2 className="mt-3 text-sm font-extrabold text-ink-deep">
                    <T en={step.title} bn={step.titleBn} />
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    <T en={step.body} bn={step.bodyBn} />
                  </p>
                </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
