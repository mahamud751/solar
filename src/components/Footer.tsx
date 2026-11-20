"use client";

import React, { useId, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useInquiry } from "./useInquiry";
import { InquiryFeedback, InquiryHoneypot } from "./InquiryFeedback";
import { useContent } from "@/data/content";
import { divisions, cityName, divisionName } from "@/data/cities";
import { useLang, useT } from "@/i18n/lang";
import { offeringsNav, solutionsNav } from "@/components/site/SiteChrome";

const AI_LINKS = [
  {
    name: "Claude",
    href: "https://claude.ai/new?q=Tell%20me%20about%20Green%20Dhaka%20(greendhaka.com)%2C%20a%20rooftop%20solar%20company%20in%20Bangladesh",
    accent: "bg-[#D97757]/15 text-[#F2B59F] border-[#D97757]/30",
  },
  {
    name: "Gemini",
    href: "https://gemini.google.com/app?q=Explain%20Green%20Dhaka%20(greendhaka.com)%20rooftop%20solar%20solutions%20in%20Bangladesh",
    accent: "bg-primary/15 text-primary border-primary/30",
  },
  {
    name: "Perplexity",
    href: "https://www.perplexity.ai/search?q=Green+Dhaka+greendhaka.com+rooftop+solar+Bangladesh+review",
    accent: "bg-[#22B8CF]/15 text-[#99E9F2] border-[#22B8CF]/30",
  },
];

export function Footer() {
  const emailId = useId();
  const t = useT();
  const { lang } = useLang();
  const { SERVICES, COMPANY_INFO, CITIES: cities } = useContent();
  const { submit, pending, error } = useInquiry();
  const solutionLinks = [...offeringsNav[lang].items, ...solutionsNav[lang].items];
  const [sent, setSent] = useState(false);

  const handleEstimateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.currentTarget));
    if (await submit({ ...fields, kind: "ESTIMATE" })) setSent(true);
  };

  return (
    <footer className="mt-auto bg-secondary text-white">
      {/* Pre-Footer Clear-Sky Rooftop Estimate Strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[oklch(0.36_0.08_215)] via-secondary to-[oklch(0.24_0.065_244)] p-7 sm:p-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {t("Clear-Sky Rooftop Estimate", "ক্লিয়ার-স্কাই ছাদের হিসাব", "footer/clear-sky-rooftop-estimate")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {t("Ready when your roof is.", "আপনার ছাদ প্রস্তুত হলেই আমরা প্রস্তুত।", "footer/ready-when-your-roof-is")}
              </h2>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-slate-300">
                {t("A clear-sky estimate for your address. No calls, no spam — just your roof's realistic kWh generation and payback math.", "আপনার ঠিকানার জন্য ক্লিয়ার-স্কাই হিসাব। কোনো কল নয়, স্প্যাম নয় — শুধু আপনার ছাদের বাস্তবসম্মত kWh উৎপাদন ও বিনিয়োগ-উদ্ধারের হিসাব।", "footer/a-clear-sky-estimate-for-your-address")}
              </p>

              {/* Ask AI about Green Dhaka */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">
                  {t("Ask AI about Green Dhaka:", "গ্রিন ঢাকা সম্পর্কে AI-কে জিজ্ঞেস করুন:", "footer/ask-ai-about-green-dhaka")}
                </span>
                {AI_LINKS.map((ai) => (
                  <a
                    key={ai.name}
                    href={ai.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition-transform hover:-translate-y-0.5 ${ai.accent}`}
                  >
                    <span>{ai.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-80" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              {sent ? (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-5 text-emerald-200">
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" aria-hidden="true" />
                  <p className="text-sm font-medium">
                    {t("Your request was received. Our team will use this email to follow up.", "আপনার অনুরোধ পেয়েছি। আমাদের টিম এই ইমেইলে যোগাযোগ করবে।", "footer/estimate-request-received")}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleEstimateSubmit}
                  className="solnce-field rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <InquiryHoneypot />
                  <label
                    htmlFor={emailId}
                    className="block text-sm font-semibold text-white"
                  >
                    {t("Email for a rooftop estimate", "ছাদের হিসাবের জন্য ইমেইল", "footer/email-for-a-rooftop-estimate")}
                  </label>
                  <span className="mt-0.5 mb-2.5 block text-xs text-slate-400">
                    {t("Enter the email address where we can reach you.", "যে ইমেইলে আপনাকে পাওয়া যাবে সেটি লিখুন।", "footer/estimate-email-hint")}
                  </span>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <input
                      id={emailId}
                      type="email"
                      required
                      autoComplete="email"
                      name="email"
                      maxLength={254}
                      placeholder="you@example.com"
                      className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-primary focus:bg-white/15"
                    />
                    <button
                      type="submit"
                      disabled={pending}
                      className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-solnce-gold px-5 py-3 text-sm font-extrabold text-[#12151C] shadow-sm transition-transform hover:-translate-y-0.5"
                    >
                      <span>{pending ? t("Sending…", "পাঠানো হচ্ছে…") : t("Request an estimate", "হিসাবের অনুরোধ করুন", "footer/request-an-estimate")}</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                  <InquiryFeedback error={error} />
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <BrandLogo inverted className="h-14 sm:h-14" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              {lang === "bn"
                ? "বাংলাদেশের প্রতিটি বাসার জন্য একটি সবুজ ভবিষ্যৎ।"
                : "A greener future for every home in Bangladesh."}{" "}
              {lang === "bn"
                ? "সার্ভে, ডিজাইন, ইনস্টলেশন, নেট মিটারিং ও ২৫ বছরের সেবা — সব এক জায়গায়।"
                : "Survey, design, installation, net metering and 25 years of service — all in one place."}
            </p>
          </div>

          {/* Green Dhaka offerings & solutions */}
          <nav aria-label="Solutions" className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              {lang === "bn" ? "সমাধানসমূহ" : "Solutions"}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {solutionLinks.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-slate-300 transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cities" className="text-slate-300 transition-colors hover:text-white">
                  {lang === "bn" ? "যেসব শহরে সেবা দিই" : "Cities we serve"}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              {t("Services", "সার্ভিস", "footer/services")}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    href={`/service/${svc.slug}`}
                    className="text-slate-300 transition-colors hover:text-white"
                  >
                    {svc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company & Partners */}
          <div className="space-y-8 lg:col-span-2">
            <nav aria-label="Company">
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {t("Company", "কোম্পানি", "footer/company")}
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <Link href="/" className="text-slate-300 hover:text-white">
                    {t("Home", "হোম", "footer/home")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-slate-300 hover:text-white"
                  >
                    {t("About Us", "আমাদের সম্পর্কে", "footer/about-us")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solar-calculator"
                    className="text-slate-300 hover:text-white"
                  >
                    {t("Solar Calculator", "সোলার ক্যালকুলেটর", "footer/solar-calculator")}
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-300 hover:text-white">
                    {t("Blogs", "ব্লগ", "footer/blogs")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-slate-300 hover:text-white"
                  >
                    {t("Contact", "যোগাযোগ", "footer/contact")}
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="For partners">
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {t("For partners", "অংশীদারদের জন্য", "footer/for-partners")}
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link
                    href="/associate"
                    className="text-slate-300 hover:text-white"
                  >
                    {t("Become an Associate", "অ্যাসোসিয়েট হোন", "footer/become-an-associate")}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Get in touch */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              {t("Get in touch", "যোগাযোগ করুন", "footer/get-in-touch")}
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{t(COMPANY_INFO.address, COMPANY_INFO.addressBn)}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail
                  className="h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  href={COMPANY_INFO.emailHref}
                  className="transition-colors hover:text-white"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone
                  className="h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="font-mono transition-colors hover:text-white"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-400">
              {t(COMPANY_INFO.hoursWeekday, COMPANY_INFO.hoursWeekdayBn)}
              <br />
              {t(COMPANY_INFO.hoursSaturday, COMPANY_INFO.hoursSaturdayBn)}
            </p>
          </div>
        </div>

        {/* Solar company near you — links to every city landing page */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm font-bold">
            {lang === "bn" ? "আপনার কাছাকাছি সোলার কোম্পানি" : "Solar company near you"}
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {divisions.map((d) => (
              <div key={d}>
                <p className="text-xs font-bold uppercase tracking-wide text-primary">
                  {divisionName(d, lang)}
                </p>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  {cities
                    .filter((c) => c.division === d)
                    .map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/solar-company-in-${c.slug}`}
                          className="text-slate-400 transition-colors hover:text-white"
                        >
                          {lang === "bn" ? `${cityName(c, lang)} শহরে সোলার` : `Solar in ${c.name}`}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Socials */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>{t(`© 2026 ${COMPANY_INFO.name}. All rights reserved.`, "© ২০২৬ গ্রিন ঢাকা। সর্বস্বত্ব সংরক্ষিত।")}</p>
          <div className="flex flex-wrap items-center gap-5">
            {(
              [
                ["Instagram", COMPANY_INFO.socials.instagram],
                ["LinkedIn", COMPANY_INFO.socials.linkedin],
                ["YouTube", COMPANY_INFO.socials.youtube],
                ["Facebook", COMPANY_INFO.socials.facebook],
              ] as const
            )
              .filter(([, href]) => href)
              .map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" className="hover:text-white">
                  {name}
                </a>
              ))}
            <Link href="/contact" className="hover:text-white">
              {t("Privacy Policy", "গোপনীয়তা নীতি", "footer/privacy-policy")}
            </Link>
            <Link href="/contact" className="hover:text-white">
              {t("Terms & Conditions", "শর্তাবলি", "footer/terms-conditions")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
