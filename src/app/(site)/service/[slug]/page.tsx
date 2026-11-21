import { getSiteContent } from "@/server/content";
import type { Metadata } from "next";
import { absolute, breadcrumbLd, fitTitle, jsonLd, pageMeta } from "@/data/site";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";

const CATEGORY_BN: Record<string, string> = { Installations: "ইনস্টলেশন", Financing: "অর্থায়ন", Operations: "পরিচালনা" };
import { QuoteForm } from "@/components/QuoteForm";
import { T } from "@/i18n/lang";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getSiteContent();
  const entry = content.SERVICES.find((item) => item.en.slug === slug);
  if (!entry) return { title: "Service Not Found" };
  const { en: svc } = entry;
  return pageMeta({
    path: `/service/${svc.slug}`,
    title: fitTitle(`${svc.title} in Bangladesh`),
    description: svc.description,
    image: svc.image,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getSiteContent();
  const entry = content.SERVICES.find((item) => item.en.slug === slug);
  if (!entry) notFound();
  const { en: svc, bn } = entry;

  const related = content.SERVICES.filter(({ en }) => en.slug !== svc.slug).slice(0, 3);
  const { COMPANY_INFO } = content;
  const defaultSegment =
    svc.slug === "industrial-solar" ||
    svc.slug === "ground-mounted" ||
    svc.slug === "ppa" ||
    svc.slug === "carbon-credits"
      ? "Industrial"
      : "Residential";

  const pageUrl = absolute(`/service/${svc.slug}`);
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.title,
    serviceType: svc.title,
    description: svc.description,
    url: pageUrl,
    image: absolute(svc.image),
    category: svc.category,
    areaServed: { "@type": "Country", name: "Bangladesh" },
    provider: { "@type": "Organization", name: COMPANY_INFO.name, url: absolute("/"), telephone: COMPANY_INFO.phoneDial },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceLd)} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(breadcrumbLd([["Services", "/service"], [svc.title, `/service/${svc.slug}`]]))}
      />
      <section className="bg-hero-paper pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/service"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-deep hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span><T copyKey="service-slug/all-green-dhaka-services" en={"All Green Dhaka Services"} bn={"গ্রিন ঢাকার সব সার্ভিস"} /></span>
          </Link>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary-deep">
                  <T en={svc.category} bn={CATEGORY_BN[svc.category]} />
                </span>
                <span className="rounded-full bg-gold-soft px-3 py-1 font-mono text-xs font-bold text-primary-deep">
                  <T en={`${svc.highlightMetric} · ${svc.highlightLabel}`} bn={`${bn.highlightMetric} · ${bn.highlightLabel}`} />
                </span>
              </div>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink-deep sm:text-5xl">
                <T en={svc.title} bn={bn.title} />
              </h1>
              <p className="mt-3 text-lg font-semibold text-primary-deep">
                <T en={svc.tagline} bn={bn.tagline} />
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                <T en={svc.description} bn={bn.description} />
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="#request-service"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-glow"
                >
                  <span><T en={`Get a Free ${svc.shortTitle} Quote`} bn={`ফ্রি ${bn.shortTitle} কোটেশন নিন`} /></span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-5 py-3.5 font-mono text-sm font-bold text-ink-deep shadow-card hover:border-primary/40"
                >
                  <PhoneCall className="h-4 w-4 text-primary-deep" aria-hidden="true" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/80 bg-secondary shadow-elevated">
                <Image
                  src={svc.image}
                  alt={svc.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits, Deliverables & Ideal For */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <h2 className="text-lg font-extrabold text-ink-deep">
                <T copyKey="service-slug/key-advantages" en={"Key Advantages"} bn={"প্রধান সুবিধা"} />
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {svc.benefits.map((b, i) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    <span><T en={b} bn={bn.benefits[i] ?? b} /></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-7 shadow-card">
              <h2 className="text-lg font-extrabold text-ink-deep">
                <T copyKey="service-slug/what-s-included" en={"What's Included"} bn={"যা যা থাকছে"} />
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {svc.deliverables.map((d, i) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary-deep"
                      aria-hidden="true"
                    />
                    <span><T en={d} bn={bn.deliverables[i] ?? d} /></span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary-soft/55 p-7 shadow-card">
              <h2 className="text-lg font-extrabold text-ink-deep">
                <T copyKey="service-slug/ideal-for" en={"Ideal For"} bn={"যাদের জন্য উপযুক্ত"} />
              </h2>
              <ul className="mt-4 space-y-3 text-sm font-medium text-primary-deep">
                {svc.idealFor.map((item, i) => (
                  <li
                    key={item}
                    className="rounded-xl bg-white/85 px-4 py-3 shadow-xs"
                  >
                    <T en={item} bn={bn.idealFor[i] ?? item} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4-Step Execution Process */}
          <div className="mt-16">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink-deep sm:text-3xl">
              <T en={`How Green Dhaka delivers ${svc.title}`} bn={`গ্রিন ঢাকা যেভাবে ${bn.title} প্রদান করে`} />
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {svc.process.map((p, i) => (
                <div
                  key={p.step}
                  className="rounded-3xl border border-border bg-card p-6 shadow-card"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-solnce-blue font-mono text-sm font-extrabold text-white">
                    {p.step}
                  </span>
                  <h3 className="mt-4 text-base font-extrabold text-ink-deep">
                    <T en={p.title} bn={bn.process[i]?.title ?? p.title} />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    <T en={p.detail} bn={bn.process[i]?.detail ?? p.detail} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section
        id="request-service"
        className="border-t border-border/70 bg-surface py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <QuoteForm
            defaultSegment={defaultSegment}
            title={`Request Your ${svc.title} Proposal`}
            subtitle="Receive an itemised quote, generation estimate and financing options within 24 hours."
            titleBn={`আপনার ${bn.title} প্রস্তাব চান`}
            subtitleBn="২৪ ঘণ্টার মধ্যে বিস্তারিত কোটেশন, উৎপাদনের হিসাব ও অর্থায়নের বিকল্প পান।"
          />
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-extrabold text-ink-deep">
            <T copyKey="service-slug/explore-other-green-dhaka-services" en={"Explore other Green Dhaka services"} bn={"গ্রিন ঢাকার অন্যান্য সার্ভিস দেখুন"} />
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map(({ en: r, bn: rb }) => {
              return (
              <Link
                key={r.slug}
                href={`/service/${r.slug}`}
                className="group rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-primary/40"
              >
                <span className="text-xs font-bold text-primary-deep">
                  <T en={`${r.highlightMetric} · ${r.category}`} bn={`${rb.highlightMetric} · ${CATEGORY_BN[r.category]}`} />
                </span>
                <h3 className="mt-1.5 text-lg font-extrabold text-ink-deep group-hover:text-primary-deep">
                  <T en={r.title} bn={rb.title} />
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  <T en={r.tagline} bn={rb.tagline} />
                </p>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
